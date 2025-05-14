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


class Enrollment(models.Model):

    member = models.ForeignKey(Member, on_delete=models.CASCADE)
    prov = models.ForeignKey(Provider, on_delete=models.CASCADE)
    release_data_to_prov = models.BooleanField(default=False)
