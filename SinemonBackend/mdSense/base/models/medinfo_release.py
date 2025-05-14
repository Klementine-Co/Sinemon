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
from base.models.user import User_Custom


from datetime import datetime, timedelta

from django.db.models import Q


# class Medinfo_releaseManager(models.Manager):

#     def __init__(self):
#         super(Medinfo_releaseManager, self).__init__()

#     def get_expired(self):

#         self.


#         x, created = super().get_or_create(measure=measure, assignee=assigned, assignor=assignor)


#         if created == True:
#             measures.value += value
#             measures.save()
#             x.value = value
#             x.save()

#         else:
#             measures.value -= x.value
#             measures.value += value
#             measures.save()
#             x.value = value
#             x.save()

#         return x, created


# Create a list for PRIVILEGES
PRIVILEGES = (
    ("A", "Admin"),
    ("P", "Provider"),
    ("1", "Scheduling Staff"),
    ("2", "Record Notes Staff"),
    ("3", "Assistant Staff"),
    ("C", "Caretaker"),
    ("R", "Case Manager"),
    ("T", "Authority"),
    ("G", "Gaurdian"),
    ("N", "None"),
)


# create Accounts manager
class AccountsManager(models.Manager):
    def __init__(self):
        super(AccountsManager, self).__init__()

    # assign privileges to user for existing member
    def assign_privilege(self, account_number, userid, baseuser_id, privilege):
        # get baseuser from user id
        baseuser = BaseUser.objects.get(user_id=baseuser_id)
        accounts = Account.objects.filter(
            account_number=account_number, privileges=privilege, assigned=baseuser
        )
        if not accounts.exists():
            Accounts.objects.create(
                account_number=account_number, privileges=privilege, assigned=baseuser
            )

        Medinfo_release.objects.get_or_create(
            member=Member.objects.get(member_id=userid),
            assigned=baseuser,
            exp_time=timedelta(days=365),
        )

        return True

    # create a function get list of user_custom using account number
    def get_users(self, assigned_id, privilege):

        # get baseuser from user id
        baseuser = BaseUser.objects.get(user_id=assigned_id)
        accounts = [
            account.account_number
            for account in Accounts.objects.filter(
                assigned=baseuser, privilege__in=privilege
            )
        ]
        # filter user_custom that user_id not equal to assigned_id

        return User_Custom.objects.filter(
            Q(account_number__in=accounts) | Q(id=assigned_id)
        )


class Accounts(models.Model):
    account_number = models.CharField(max_length=11, null=True, blank=True)
    privilege = models.CharField(
        choices=PRIVILEGES,
        default=PRIVILEGES[7][0],
        max_length=1,
        null=True,
        blank=True,
    )
    assigned = models.ForeignKey(
        BaseUser, on_delete=models.CASCADE, null=True, blank=True
    )

    objects = AccountsManager()


class Medinfo_release(models.Model):

    exp_time = models.DurationField(default=timedelta(days=60))
    date_released = models.DateTimeField(auto_now=True)
    released = models.BooleanField(default=False)
    assigned = models.ForeignKey(
        BaseUser, on_delete=models.CASCADE, null=True, blank=True
    )
    member = models.ForeignKey(Member, on_delete=models.CASCADE)

    @property
    def viewable(self):
        # print(self.exp_time, self.date_released.date())
        return (
            (self.exp_time + self.date_released.date()) > datetime.now().date()
        ) and self.released

    @property
    def expired(self):
        return (self.exp_time + self.date_released.date()) <= datetime.now().date()
