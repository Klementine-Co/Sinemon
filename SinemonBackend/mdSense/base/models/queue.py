from django.db import models, transaction
from django.db.models.functions import *
from django.db.models import F, ExpressionWrapper, fields
from django.conf import settings
from django.shortcuts import reverse
from django.utils.timezone import now

# from decimal import *
from django_countries.fields import CountryField
from base.models.baseuser import BaseUser_  # , BaseUser
from base.baseuser import deferred
from base.models.provider import Provider
from base.models.member import Member
from base.models.enrollment import Enrollment
from django.core.paginator import Paginator

from base.models.reviews import *

from base.models.medinfo_release import *

from datetime import datetime as dt

mSTATUSES = (
    ("I", "IN LINE"),
    ("W", "WAITING"),
    ("B", "BEING SEEN"),
    ("A", "ARRIVED"),
    ("N", "NO-SHOW"),
    ("L", "LEFT"),
    ("S", "SEEN"),
    ("ON", "ON-BOARDING"),
    ("OFF", "OFF-BOARDING"),
    ("Z", "Z"),
)
pSTATUSES = (
    ("S", "SEEING PATIENT"),
    ("W", "WAITING"),
    ("C", "CONFIRMING"),
    ("D", "DONE W/ PATIENT"),
    ("N", "PATIENT NO-SHOW"),
    ("L", "PATIENT LEFT"),
    ("Z", "Z"),
)
CONFIGSTATUSES = (("P", "PAUSED"), ("A", "ACTIVE"))


class StatusChangeLog(models.Model):
    queue = models.ForeignKey(
        "Queue", related_name="status_changes", on_delete=models.CASCADE
    )
    old_status = models.CharField(max_length=3, choices=mSTATUSES)
    new_status = models.CharField(max_length=3, choices=mSTATUSES)
    change_time = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.queue.member} from {self.old_status} to {self.new_status} at {self.change_time}"


class QueueManager(models.Manager):
    def __init__(self):
        super(QueueManager, self).__init__()

    def record_status_change(self, queue_entry, new_status):
        old_status = queue_entry.m_status

        # Save the old status before updating to the new status
        if old_status != new_status:
            # Record the status change
            StatusChangeLog.objects.create(
                queue=queue_entry,
                old_status=old_status,
                new_status=new_status,
                change_time=now(),  # This line can be omitted since change_time defaults to now
            )

            # # Update the Queue entry with the new status
            # queue_entry.m_status = new_status
            # queue_entry.save(update_fields=['m_status'])

            # Calculate and return the duration since the last status change
            last_change = (
                StatusChangeLog.objects.filter(queue=queue_entry)
                .order_by("-change_time")
                .first()
            )

            if last_change:
                duration_since_last_change = now() - last_change.change_time
                return (
                    duration_since_last_change.total_seconds() / 60
                )  # duration in minutes
            else:
                return None
        else:
            # No status change, so no new log entry and no duration calculation
            return None

    def update_seen_avg(self, provider, date):
        # Fetch status changes for "BEING SEEN" to "SEEN" transitions for the provider on the specified date
        status_changes = (
            StatusChangeLog.objects.filter(
                queue__prov=provider,
                change_time__date=date,
                new_status="S",  # Assuming new_status 'S' indicates the transition to "SEEN"
            )
            .annotate(
                prev_status=F("old_status"),
                prev_change_time=Lag(
                    "change_time", default=None, order_by="change_time"
                ),
            )
            .exclude(prev_status=F("new_status"))
        )  # Exclude logs where previous status is the same as new status

        # Calculate the durations between these transitions
        durations = status_changes.annotate(
            duration=ExpressionWrapper(
                F("change_time") - F("prev_change_time"),
                output_field=fields.DurationField(),
            )
        )

        # Calculate the average duration
        average_duration_seconds = durations.aggregate(avg_duration=Avg("duration"))[
            "avg_duration"
        ]

        if average_duration_seconds:
            # Convert average duration to minutes and update seen_avg in QueueConfig
            avg_duration_minutes = average_duration_seconds.total_seconds() / 60
            QueueConfig.objects.filter(prov=provider).update(
                seen_avg=avg_duration_minutes
            )

    def update_time_between_patients(self, provider):
        # Calculate the average time between patients for those seen today
        try:
            queueConfig = QueueConfig.objects.get(prov=provider)
        except QueueConfig.DoesNotExist:
            raise Exception(
                "Queue configuration does not exist for the specified provider."
            )
        today_seen = Queue.objects.filter(
            prov=provider, m_status="S", leave_date__date=now().date()
        ).annotate(
            processing_time=ExpressionWrapper(
                F("leave_date") - F("join_date"), output_field=fields.DurationField()
            )
        )

        avg_time = today_seen.aggregate(avg_processing_time=Avg("processing_time"))[
            "avg_processing_time"
        ]

        if avg_time is not None:
            # Update the time_between_patients with the new average
            queueConfig.time_between_patients = avg_time.total_seconds() / 60
            queueConfig.save()

    def calculate_average_duration(self, arrived_logs, seen_logs):
        total_duration = timedelta(seconds=0)
        count = 0

        # Assuming arrived_logs and seen_logs are dictionaries with queue_id as keys and datetime objects as values
        for queue_id, arrived_time in arrived_logs.items():
            if queue_id in seen_logs:
                duration = seen_logs[queue_id] - arrived_time
                total_duration += duration
                count += 1

        return (total_duration.total_seconds() / 60) / count if count else 0

    def update_waiting_to_be_seen_avg(self, provider, current_date=dt.now().date()):
        # Fetch ARRIVED and BEING SEEN logs for the current day
        arrived_logs = (
            StatusChangeLog.objects.filter(
                queue__prov=provider, new_status="A", change_time__date=current_date
            )
            .order_by("change_time")
            .values_list("queue_id", "change_time")
        )

        seen_logs = (
            StatusChangeLog.objects.filter(
                queue__prov=provider,
                old_status="A",
                new_status="B",
                change_time__date=current_date,
            )
            .order_by("change_time")
            .values_list("queue_id", "change_time")
        )

        # Convert QuerySets to dictionaries for easier lookup
        arrived_dict = {log[0]: log[1] for log in arrived_logs}
        seen_dict = {log[0]: log[1] for log in seen_logs}

        # Calculate average duration
        average_duration = self.calculate_average_duration(arrived_dict, seen_dict)

        # Update QueueConfig
        QueueConfig.objects.filter(prov=provider).update(
            waiting_to_be_seen_avg=average_duration
        )

    def refresh_estimated_wait_times(self, provider):
        queueConfig = QueueConfig.objects.get(prov=provider)
        today = dt.now().date()
        # First, ensure the time_between_patients & waiting_to_be_seen_avg is updated
        self.update_time_between_patients(provider)
        self.update_waiting_to_be_seen_avg(provider, today)

        relevant_statuses = ["W", "I", "ON", "A"]

        # Transition members from ON to IN LINE if applicable
        onboards = Queue.objects.filter(
            prov=provider, m_status="ON", join_date__date=today
        )
        if onboards:
            for queue_entry in onboards:
                self.record_status_change(queue_entry, "I")
            onboards.update(m_status="I")

        # Handle special case: No member is waiting but members are in line
        if not Queue.objects.filter(
            prov=provider, m_status="W", join_date__date=today
        ).exists():
            # Find the member in line with the earliest join date and update them to WAITING
            earliest_member_in_line = (
                Queue.objects.filter(prov=provider, m_status="I", join_date__date=today)
                .order_by("join_date")
                .first()
            )

            if earliest_member_in_line:
                self.record_status_change(earliest_member_in_line, "W")
                earliest_member_in_line.m_status = "W"
                earliest_member_in_line.save()

        # Fetch and order queue members for today after status updates
        queue_members = Queue.objects.filter(
            prov=provider, join_date__date=today, m_status__in=relevant_statuses
        ).order_by("join_date")

        for member in queue_members:
            if member.m_status == "A":
                # Update ARRIVED members' wait time to the new average
                member.est_wait_time = queueConfig.waiting_to_be_seen_avg
            elif member.m_status == "W":
                member.est_wait_time = queueConfig.time_between_patients
            else:
                # Update based on their position in the queue
                member_index = list(queue_members).index(member)
                member.est_wait_time = (
                    member_index + 1
                ) * queueConfig.time_between_patients
            member.save()

        # Update QueueConfig's estimated wait time with the last member's wait
        if queue_members.exists():
            queueConfig.est_wait_time = queue_members.last().est_wait_time
            queueConfig.save()

    @transaction.atomic
    def join_queue(self, member, provider):

        queueConfig = QueueConfig.objects.select_for_update().filter(prov=provider)[0]
        full = True
        # print(provider, member)
        enrolled = None
        # try:
        enrolled, _ = Enrollment.objects.get_or_create(prov=provider, member=member)
        # Check if the queue capacity has been reached
        if queueConfig.inqueue >= queueConfig.capacity:
            return "Queue is full", True
        # Check if the member is already in a queue
        if self.filter(member=member, m_status__in="IWAB").exists():
            return "Member is already in a queue", False

        full = False
        # Increment the inqueue counter
        queueConfig.inqueue = F("inqueue") + 1
        queueConfig.save()

        # Refresh the object to get the updated value
        queueConfig.refresh_from_db()

        # Create the queue entry for the member
        queue_entry = self.create(
            member=member,
            prov=provider,
            m_status="ON",  # Assuming 'ON' means they've just joined the queue
            position=queueConfig.inqueue,  # Set their position based on inqueue counter
        )
        queue_entry.save()
        try:
            medinfo, created = Medinfo_release.objects.get_or_create(
                member_id=member.member_id, assigned_id=provider.provider_id
            )
            # medinfo.save()
        except Medinfo_release.DoesNotExist:
            print("Medinfo Release DNE")

        # Refresh wait times and update statuses
        self.refresh_estimated_wait_times(queueConfig.prov)
        # Refresh the object to get the updated value
        queue_entry.refresh_from_db()
        return queue_entry, full

    def provider_confirm_done(self, member_id, provider_id, done=False):
        current_time = now()

        if done:
            try:
                queueConfig = QueueConfig.objects.get(prov_id=provider_id)
                # Assuming each Queue object has a direct link to a Patientvisit via `patient_visit` field.
                queue_entry = Queue.objects.get(
                    member_id=member_id,
                    prov_id=provider_id,
                    m_status="B",  # BEING SEEN
                    p_status="S",  # SEEING PATIENT
                )

                # Directly access the Patientvisit object from the queue_entry
                patient_visit = queue_entry.patient_visit
                if patient_visit and patient_visit.asked == "N":
                    patient_visit.asked = "Y"  # Update to ASKING status
                    patient_visit.save()

                # Update member and provider statuses within the queue entry
                self.record_status_change(queue_entry, "S")
                queue_entry.m_status = "S"  # SEEN
                queue_entry.p_status = "D"  # DONE W/ PATIENT
                queue_entry.leave_date = current_time
                queue_entry.save()

                # Decrement in-queue count and update seen_avg duration
                queueConfig.inqueue = F("inqueue") - 1
                queueConfig.save()
                # Refresh wait times and update statuses
                self.refresh_estimated_wait_times(queueConfig)
                self.update_seen_avg(provider_id, current_time)

                return queue_entry, current_time
            except Queue.DoesNotExist:
                print("Queue entry does not exist.")
            except QueueConfig.DoesNotExist:
                print("Queue Config does not exist.")
        else:
            print("Operation not performed because 'done' flag is False.")
        return None

    def member_confirm_finished(self, member, provider, done=False):
        current_time = now()
        if done:
            try:
                # Get the latest queue entry for the member and provider where the visit hasn't been asked
                latest_queue_entry = (
                    Queue.objects.filter(
                        member=member,
                        prov=provider,
                        patient_visit__asked="N",  # Ensure we're looking at visits that haven't been asked
                    )
                    .select_related("patient_visit")
                    .latest("join_date")
                )

                # Access the Patientvisit directly from the Queue's patient_visit field
                patient_visit = latest_queue_entry.patient_visit

                # Update the visit to "ASKING"
                if patient_visit:
                    patient_visit.updateVisit(asked="Y")
                    print("Visit updated to ASKING status.")

                    # Optionally, perform additional actions like getting questions
                    questions = (
                        patient_visit.getquestions()
                        if hasattr(patient_visit, "getquestions")
                        else None
                    )

                    return questions, patient_visit
            except Queue.DoesNotExist:
                print("No applicable queue entry found.")
        else:
            print("Operation not done due to 'done' flag being False.")
        return None

    def leave_queue(self, member, provider):
        current_time = dt.now()
        relevant_statuses = ["ON", "I", "W", "A"]
        try:
            queue_config = QueueConfig.objects.get(prov=provider)
        except QueueConfig.DoesNotExist:
            raise Exception(
                "Queue configuration does not exist for the specified provider."
            )

        if queue_config.inqueue <= 0:
            raise Exception("The queue should contain at least one member.")

        try:
            queue_item = Queue.objects.get(
                member=member, prov=provider, m_status__in=relevant_statuses
            )

            # Update Medinfo_release's released field to False
            Medinfo_release.objects.filter(
                member_id=member.member_id, assigned_id=provider.provider_id
            ).update(released=False)

            # Update statuses and leave date
            self.record_status_change(queue_item, "L")
            queue_item.m_status = "L"
            queue_item.p_status = "L"
            queue_item.leave_date = current_time
            queue_item.save()

            # Decrement the queue counter and ensure it does not go below zero
            QueueConfig.objects.filter(prov=provider).update(inqueue=F("inqueue") - 1)
            queue_config.refresh_from_db()
            queue_item.refresh_from_db()
            # Refresh wait times and update statuses
            self.refresh_estimated_wait_times(queue_config.prov)

            return queue_item, queue_item.leave_date

        except Queue.DoesNotExist:
            raise Exception(
                "Queue item does not exist for the specified member and provider."
            )

    def member_confirm_arrival(self, member, provider, arrived=False):
        try:

            item = Queue.objects.get(member=member, prov=provider, m_status="W")
            self.record_status_change(item, "A" if arrived else "N")
            item.m_status = "A" if arrived else "N"
            item.save()
            # Refresh wait times and update statuses
            self.refresh_estimated_wait_times(item.prov)
            return item, dt.now()
        except Queue.DoesNotExist:
            print("Queue DNE")

    def provider_confirm_arrival(self, member_id, provider_id, arrived=False):
        try:
            queue_entry = Queue.objects.select_related("prov").get(
                member_id=member_id, prov_id=provider_id, m_status="A"
            )
            current_time = now()
            queue_config = QueueConfig.objects.get(prov=queue_entry.prov)

            if arrived:
                new_member_status = "B"  # BEING SEEN
                new_provider_status = "S"  # SEEING PATIENT
                servicing = True
            else:
                new_member_status = "N"  # NO-SHOW
                new_provider_status = "N"  # PATIENT NO-SHOW
                servicing = False

            # Log status change and update Queue entry
            self.record_status_change(queue_entry, new_member_status)
            queue_entry.m_status = new_member_status
            queue_entry.prov.p_status = new_provider_status
            queue_entry.save()
            queue_entry.prov.save()

            # Create PatientVisit if member has arrived
            if arrived:
                Patientvisit.objects.create(
                    member_id=member_id, provider_id=provider_id
                )

            # Refresh wait times and update statuses
            self.refresh_estimated_wait_times(queue_config.prov)
            # Update waiting_to_be_seen_avg in QueueConfig
            self.update_waiting_to_be_seen_avg(queue_entry.prov, current_time)

            return servicing, queue_entry, current_time
        except Queue.DoesNotExist:
            print("Queue entry does not exist.")
        except QueueConfig.DoesNotExist:
            print("QueueConfig does not exist.")
            return False, None, now()

    def get_position(self, queueConfig):
        return queueConfig.inqueue


# TODO add time field for provider updates for statuses and time field for member updates for statuses


class Queue(models.Model):

    join_date = models.DateTimeField(auto_now=True)
    leave_date = models.DateTimeField(auto_now=False, null=True, blank=True)
    m_status = models.CharField(max_length=12, choices=mSTATUSES, default="ON")
    p_status = models.CharField(max_length=15, choices=pSTATUSES, default="W")
    est_wait_time = models.IntegerField(default=1)  # In minutes
    member = models.ForeignKey(Member, on_delete=models.CASCADE)
    prov = models.ForeignKey(Provider, on_delete=models.CASCADE)
    waited = models.BooleanField(default=False)
    position = models.IntegerField(default=0)
    # queueTicket = models.BigIntegerField(default=0)

    objects = QueueManager()

    # def getTicket(self):

    #     q = Queue.objects.filter(prov=self.prov, member=self.member)

    #     if q.exists():

    def __str__(self):

        return " %s Joined: %s Wait: %s Provider: %s Member Status: %s" % (
            self.member.member.user.get_email(),
            self.join_date,
            self.est_wait_time,
            self.prov.provider.user.get_full_name(),
            self.m_status,
        )


class QueueConfig(models.Model):

    open_time = models.TimeField(auto_now=False)
    close_time = models.TimeField(auto_now=False)
    status = models.CharField(max_length=6, choices=CONFIGSTATUSES)
    capacity = models.IntegerField(default=15)
    inqueue = models.IntegerField(default=0)
    end_before_close = models.IntegerField(default=1)  # In minutes
    time_before_noshow = models.IntegerField(default=1)  # In minutes
    time_between_patients = models.IntegerField(default=1)  # In minutes
    pause_time = models.IntegerField(default=1)  # In minutes
    est_wait_time = models.IntegerField(default=1)  # In minutes
    waiting_to_be_seen_avg = models.IntegerField(default=1)  # In minutes
    seen_avg = models.IntegerField(default=1)  # In minutes
    prov = models.ForeignKey(Provider, on_delete=models.CASCADE)

    def __str__(self):

        return " Provider: %s inqueue: %s status: %s capacity: %s" % (
            self.prov.provider.user.get_full_name(),
            self.inqueue,
            self.status,
            self.capacity,
        )

    def getWaitTime(self):
        # Filter queues for this provider with statuses IN LINE or WAITING
        total_wait_time = Queue.objects.filter(
            prov=self.prov, m_status__in=["I", "W"]  # 'I' for IN LINE, 'W' for WAITING
        ).aggregate(total=Coalesce(Sum("est_wait_time"), 0))["total"]

        # Update the estimated wait time in the current QueueConfig instance
        self.est_wait_time = total_wait_time
        self.save(update_fields=["est_wait_time"])

        return total_wait_time
