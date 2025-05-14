# from django.db import models
# from django.conf import settings
# from django.shortcuts import reverse
# from django.utils.timezone import now
# # from decimal import *
# from django_countries.fields import CountryField

# from base.baseuser.signals import baseuser_recognized
# from base.baseuser.fields import ChoiceEnum, ChoiceEnumField, JSONField
# from base.baseuser import deferred
# from importlib import import_module

# SessionStore = import_module(settings.SESSION_ENGINE).SessionStore()


# import string

# import warnings
# from django.contrib.auth import get_user_model
# from django.contrib.auth.models import AnonymousUser
# from django.contrib.auth.signals import user_logged_in, user_logged_out
# from django.core.exceptions import ObjectDoesNotExist
# from django.db import DEFAULT_DB_ALIAS
# from django.core.exceptions import FieldDoesNotExist
# from django.dispatch import receiver
# from django.utils import timezone
# from django.utils.functional import SimpleLazyObject
# from django.utils.translation import gettext_lazy as _


# ###########################################################

# from django.template.loader import select_template
# from django.conf import settings

from os import environ as env
import django
import sys

sys.path.append("path/to/project/")
env["DJANGO_SETTINGS_MODULE"] = "mdSense.settings"
env["DJANGO_ALLOW_ASYNC_UNSAFE"] = "true"
django.setup()
import pandas as pd

from base.models.provider import Provider, Provider_Desc
from base.models.user import User_Custom
from base.models.baseuser import BaseUser

from base.models.vote import Vote

# from scipy import special
# from datetime import datetime, now
import numpy as np


# Update scores before 15th of current month
# def calculate_votes(prov):

#     array = np.array([])
#     votes = 0

#     votes_qs = Vote.objects.filter(prov=prov)
#     for vote in votes_qs:
#         if vote.received_date <  datetime.strptime(datetime.now().strftime("%Y-%m-15"),"%Y-%m-%d") and vote.received_date > datetime.strptime((datetime.now().replace(day=1) - timedelta(days=1)).replace(day=15).strftime("%Y-%m-%d"), "%Y-%m-%d"):
#             array = np.append(array, vote)
#     for i in array:
#         votes += i.vote

#     return votes

# def calculate_negatives(prov):

#     from django.db import connection
#     raw_query = " select * from public.\"License\" a join \"LicenseSecondaryStatusCodeModifiers\" b on a.\"LicenseID\" = b.\"LicenseID\" where b.\"SecondaryStatusCodeModifier\" in ('50', '71') and a.\"PrimaryStatusCode\" = '20' order by 1 desc"
#     cursor = connection.cursor()
#     cursor.execute(raw_query)
#     y = cursor.fetchall()

#     return votes


for i in Provider.objects.all():
    i.save()

    # score += score - (status * special.polygamma(0, years)) + votes/years
