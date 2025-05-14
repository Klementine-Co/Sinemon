from django.db import models
from django.conf import settings
from django.shortcuts import reverse
from django.utils.timezone import now

# from decimal import *
from django_countries.fields import CountryField
from base.models.baseuser import BaseUser_  # , BaseUser
from base.baseuser import deferred
from base.models.provider import Provider
from base.models.member import Member

# STATUSES = (
#     ("ESC", "ESCROW"),
#     ("RTC", "REQUEST TO CANCEL"),
#     ("RD", "REQUEST DENIED"),
#     ("STP", "SUMBITTED TO PUBLISH"),
#     ("P", "PUBLISHED"),

# )

# class Comment(models.Model):

#     comment = models.CharField(max_length=85)

#     published =  models.DateTimeField(auto_now=False)
#     status = models.CharField(max_length=65, choices=STATUSES)
#     time_limit = models.IntegerField(default=1) #In Days
#     member = models.ForeignKey(Member, on_delete=models.CASCADE)
#     prov = models.ForeignKey(Provider, on_delete=models.CASCADE)
