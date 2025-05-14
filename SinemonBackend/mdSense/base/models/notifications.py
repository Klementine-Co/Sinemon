from django.db import models

# from django.conf import settings
# from django.shortcuts import reverse
# from django.utils.timezone import now
# from decimal import *
# from django_countries.fields import CountryField
from base.models.baseuser import BaseUser_, BaseUser

# from base.models.provider import Provider
# from base.models.member import Member
from base.baseuser import deferred
from base.models.medinfo_release import *

TYPE = (
    ("M", "Message"),
    ("I", "Announcment"),
    ("A", "Alert"),
    ("R", "Request"),
    ("X", "Answered"),
    ("Z", "Request Answered"),
    ("B", "Approved 30 days"),
    ("C", "Approved 90 days"),
    ("D", "Approved indefinitely"),
    ("N", "Not approved"),
)


class Notification(models.Model):

    thread_id = models.CharField(default=None, max_length=256)
    msg = models.TextField()
    time = models.DateTimeField(auto_now=True)
    sender = models.ForeignKey(
        BaseUser, on_delete=models.CASCADE, related_name="sender"
    )
    receiver = models.ForeignKey(
        BaseUser, on_delete=models.CASCADE, related_name="receiver"
    )  # , limit_choices_to={'is_staff': True, 'is_admin':True, 'is_provider':True})
    notification_type = models.CharField(
        max_length=16, choices=TYPE, help_text="Type of notification"
    )  # standard / metric
    read_msg = models.BooleanField(default=False)

    def save(self, *args, **kwargs):
        if self.thread_id is None:
            # self.thread_id = hashlib.sha256(self.from_.user_id + self.from_.user_id).hexdigest()
            self.thread_id = self.receiver.user_id + self.sender.user_id
        super().save(*args, **kwargs)

    def read(self, *args, **kwargs):
        if self.read == False:
            self.read = True
            super().save(*args, **kwargs)

    def answer(self, id, *args, **kwargs):

        from datetime import timedelta

        time = {
            "B": timedelta(30),
            "C": timedelta(90),
            "D": timedelta(365),
            "N": timedelta(60),
        }
        if self.notification_type in "BCDN":
            notis = Notification.objects.filter(
                notification_type="R", thread_id=self.thread_id, receiver=id
            )
            if notis.exists():
                notis = notis[0]
                notis.notification_type = "X"
                notis.save()
                print(notis)
            notis = Notification.objects.filter(
                notification_type="R", thread_id=self.thread_id, sender=id
            )
            if notis.exists():
                notis.delete()
                super().save(*args, **kwargs)

            release, created = Medinfo_release.objects.get_or_create(
                member_id=id, assigned_id=self.receiver
            )

            release.released = self.notification_type in "BCD"
            release.exp_time = time.get(self.notification_type)
            release.save()
            # notis.delete()
