from django.db import models
from django.conf import settings
from django.shortcuts import reverse
from django.utils.timezone import now

# from decimal import *
from django_countries.fields import CountryField
from base.models.baseuser import BaseUser_, BaseUser
from base.models.provider import Provider
from base.models.member import Member
from base.baseuser import deferred
from django.utils.functional import SimpleLazyObject
from django.utils.translation import gettext_lazy as _
from datetime import timedelta, datetime, time, timezone
import numpy as np
from django.contrib.auth import get_user_model
from math import floor

# class TimeSlotManager(models.Manager):

#     def create_(self, timegap, open, close):

#         array = np.array([])
#         timegap = timedelta(minutes=timegap)

#         x = super().get_or_create(start_time=datetime.strptime(str(open), '%H:%M:%S').time(),end_time=datetime.strptime(str(close), '%H:%M:%S').time())
#         array = np.append(array, x)

#         slot_start = open
#         slot_end = open + timegap


#         date_time_obj = datetime.strptime(str(slot_start), '%H:%M:%S')

#         # print('Time:', date_time_obj.time())

#         while slot_end < close:

#             # print(slot_end)
#             # print(slot_start)
#             # print(array)
#             x , created = super().get_or_create(start_time=datetime.strptime(str(slot_start), '%H:%M:%S').time(),end_time=datetime.strptime(str(slot_end), '%H:%M:%S').time())
#             array = np.append(array, x)
#             # print(x)
#             # print(array)
#             slot_start = slot_end
#             slot_end = slot_start + timegap


#         return array


# class TimeSlot(models.Model):
#     TIME_GAP = 30 #minutes
#     start_time = models.TimeField( auto_now=False, auto_now_add=False)
#     end_time = models.TimeField( auto_now=False, auto_now_add=False)

#     objects = TimeSlotManager()

#     def __str__(self):
#         return f"{self.start_time} - {self.end_time}"

#     def set_time_gap(self, minutes):
#         self.TIME_GAP = minutes


# class AvailabilityManager(models.Manager):

#     def create(self, close, open, timegap, prov):

#         slots = TimeSlot.objects.create_(timegap, open, close)
#         # availability = super().create()
#         array = np.array([])

#         # print('slots')
#         # print(slots[1])

#         for i in slots:
#             # availability.slots.add(i)
#             if isinstance(i, TimeSlot):
#                 # print('timeslot')
#                 # print(i)
#                 availability , created= super().get_or_create(slot = i, prov=prov)
#                 # print(availability)
#                 # availability.save()
#                 # print(availability)
#                 array = np.append(array, availability)
#                 # for i in array:
#                 #  print(i)

#         # print(array)
#         # for x in array:
#         #     print(x)
#         return array


# class Availability(models.Model):
#     TIME_GAP = 30 #minutes
#     slot = models.ForeignKey(TimeSlot, on_delete=models.CASCADE, null=True)
#     prov = models.ForeignKey(Provider, on_delete=models.CASCADE, null=True)
#     open = models.BooleanField(default=True)

#     objects =  AvailabilityManager()

# #     def set_time_gap(self, minutes):
# #         self.TIME_GAP = minutes

#     def isopen(self):
#         return self.open

# #     # def get_open_slots(self):
# #     #     if self.open == True:
# #     #         return self.slot

#     def __str__(self):
#         return f"{self.prov} - {self.slot.__str__()} {self.open}"


APPOINTMENT_DURATION_TYPES = (
    ("10", "10 Minute"),
    ("15", "15 Minute"),
    ("25", "25 Minute"),
    ("30", "30 Minute"),
    ("45", "45 Minute"),
    ("60", "60 Minute"),
)


class AppointmentType(models.Model):

    appointment_duration = models.CharField(
        max_length=2, choices=APPOINTMENT_DURATION_TYPES
    )
    appointment_type_name = models.CharField(max_length=600, blank=False, null=False)

    def __str__(self):
        return f"{self.appointment_type_name} | {self.appointment_duration}"


class OfficeManager(models.Manager):

    def getMinutes(self, timearg):
        return (timearg.hour * 60) + (timearg.minute)

    def getHoursandMinutes(self, minutesarg):
        hours = floor(minutesarg / 60)
        return hours, (((minutesarg / 60) - hours) * 60)

    def getTimeBefore(self, timearg1, timearg2, duration, office):
        availability = []
        duration = int(duration)
        ## MAYBE ADD SOME SORTING AND SEARCHING FOR N LOG(N) , A TREE MAYBE
        # if duration == 30:
        # for x in office:
        # if getMinutes(x.appointment_date.time()) > timearg1

    def getTimeAfter(self, timearg1, timearg2, duration):
        print("")

    def create_appointment(self, start_time, appointment_type, prov):

        config, _ = OfficeConfig.objects.get_or_create(prov_id=prov)

        opening_minutes = self.getMinutes(config.open_time)
        closing_minutes = self.getMinutes(config.close_time)
        starting_minutes = self.getMinutes(start_time.time())

        appointment_duration = int(appointment_type.appointment_duration)

        requested_slot = appointment_duration + starting_minutes

        hour, minute = self.getHoursandMinutes(requested_slot)

        slot = datetime.combine(
            start_time, time(int(hour), int(minute)), tzinfo=timezone.utc
        )

        office = Office.objects.filter(config=config)
        add = True
        offices = []

        print(starting_minutes, requested_slot)

        if opening_minutes < requested_slot < closing_minutes:
            print("Can add", slot, appointment_type)
            requesting_appt = Office.objects.all()
            for x in requesting_appt:
                minutes_chk = self.getMinutes(x.appointment_date.time())
                minutes_chk1 = int(x.appointment_type.appointment_duration)
                if (
                    starting_minutes <= (minutes_chk + minutes_chk1) <= requested_slot
                ) or (starting_minutes <= (minutes_chk) <= requested_slot):
                    add = False
                    # print('indicated false')
                # print(minutes_chk, minutes_chk1)
                # print(starting_minutes > (minutes_chk))
                # print(requested_slot > (minutes_chk))
                if (
                    (
                        (starting_minutes > (minutes_chk))
                        and (requested_slot > (minutes_chk))
                    )
                    or (
                        (starting_minutes < (minutes_chk))
                        and (requested_slot < (minutes_chk))
                    )
                    and add == True
                ):
                    offices.append(
                        {
                            "config": config,
                            "start_time": start_time,
                            "appointment_type": appointment_type,
                        }
                    )
            if not requesting_appt.exists():
                office = Office(
                    config=config,
                    appointment_date=start_time,
                    appointment_type=appointment_type,
                )
                office.save()

            if len(offices) > 0 and add == True:
                x = offices[0]
                office = Office(
                    config=x.get("config"),
                    appointment_date=x.get("start_time"),
                    appointment_type=x.get("appointment_type"),
                )
                office.save()
                print("\n\n\n\n")
                print("Added", office)
                print("\n\n\n\n")

    def getFilled(self):
        print("")
        filled = Office.objects.filter(status="P")
        print(filled)
        return filled

    def returnSlots(self, prov):
        print("")
        slots = {}
        slots_ = []
        return_slots = []
        closed_slots = []
        config, _ = OfficeConfig.objects.get_or_create(prov_id=prov)
        filled = Office.objects.filter(status="P", config=config)
        increment = 15
        from datetime import datetime as dt

        today_ = datetime.now().date()
        # slot = datetime.combine(today_, config.open_time, tzinfo=timezone.utc)
        opentime = self.getMinutes(config.open_time)
        closetime = self.getMinutes(config.close_time)
        time_chk = opentime

        while time_chk < closetime:

            for slot in filled:
                begin = self.getMinutes(slot.appointment_date.time())
                end = int(slot.appointment_type.appointment_duration) + begin

                if begin <= time_chk <= end:
                    today_ = slot.appointment_date.date()
                    slots.update({time_chk: "closed", "id": slot.id})
                    break
                else:
                    slots.update({time_chk: "open", "id": -1})
            slots_.append(slots)
            slots = {}

            time_chk += increment

        for item in slots_:
            # print(item.get('id'), item.get(list(item.keys())[0]),list(item.keys())[0])
            hour, minute = self.getHoursandMinutes(list(item.keys())[0])
            slot = datetime.combine(
                today_, time(int(hour), int(minute)), tzinfo=timezone.utc
            )
            return_slots.append(
                {
                    "slot": slot,
                    "status": item.get(list(item.keys())[0]),
                    "id": item.get("id"),
                }
            )

        slots_ = {}
        counter = 0
        prev = None
        prev_id = 0
        dels = []
        for index, slot in enumerate(return_slots):
            if slot.get("id") != -1:

                if prev_id == slot.get("id"):
                    dels.append(index)
                    print(dels, len(dels), prev_id, slot.get("id"))
                    counter += 1

                if prev_id != slot.get("id") or index == (len(return_slots) - 1):
                    if len(dels) > 0 and counter > 1:
                        print(1, dels, len(dels), prev_id, slot.get("id"))
                        dels = dels[: len(dels) - 1]
                        print(2, dels, len(dels), prev_id, slot.get("id"))
                    prev_id = slot.get("id")
                    counter = 1
            else:
                if prev_id != -1:
                    if len(dels) > 0 and counter > 1:
                        print(1, dels, len(dels), prev_id, slot.get("id"))
                        dels = dels[: len(dels) - 1]
                        print(2, dels, len(dels), prev_id, slot.get("id"))
                        prev_id = 0
                        counter = 1
                    #     dels.pop()

                # if (prev_id != slot.get('id') or index == (len(return_slots) - 1)) and prev != None:
                #     prev = None
                #     if len(dels) > 0:
                #         dels.pop()

                # elif prev != None and prev_id == slot.get('id'):
                #     dels.append(index)

        # print(dels, (len(return_slots) - 1))

        # for j, i in enumerate(return_slots):
        #     print(j, i)

        return [i for j, i in enumerate(return_slots) if j not in dels]
        # return return_slots


class OfficeConfig(models.Model):
    prov = models.ForeignKey(Provider, on_delete=models.CASCADE)
    open_time = models.TimeField(auto_now=False, auto_now_add=False, default=time(6, 0))
    close_time = models.TimeField(
        auto_now=False, auto_now_add=False, default=time(17, 0)
    )

    @property
    def open(self):
        return datetime.now().time() < self.close_time

    def __str__(self):
        return f"{self.open} | {self.open_time}--{self.close_time}"


APPOINTMENT_STATUSES = (("D", "DONE"), ("C", "CANCELED"), ("P", "PENDING"))


class Office(models.Model):

    config = models.ForeignKey(OfficeConfig, on_delete=models.CASCADE, null=True)
    appointment_type = models.ForeignKey(
        AppointmentType, on_delete=models.CASCADE, null=True
    )
    appointment_date = models.DateTimeField(auto_now=False)
    status = models.CharField(
        choices=APPOINTMENT_STATUSES, max_length=1, null=True, blank=True, default="P"
    )

    objects = OfficeManager()

    def __str__(self):
        return f"{self.appointment_type} -- {self.appointment_date} | {self.status}--{self.config}"


# class Appointment(models.Model):

#     member = models.ForeignKey(Member, on_delete=models.CASCADE, null=True)
#     slot = models.ForeignKey(TimeSlot, on_delete=models.CASCADE, null=True)
#     start_date = models.DateField(auto_now=False, auto_now_add=False, null=True)
#     end_date = models.DateField(auto_now=False, auto_now_add=False, null=True)
#     prov = models.ForeignKey(Provider, on_delete=models.CASCADE)


#     def __str__(self):
#         return f"{self.member} |{self.slot.__str__()}| {self.start_date}--{self.end_date}"
