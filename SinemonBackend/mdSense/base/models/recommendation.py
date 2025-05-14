from django.db import models
from django.conf import settings
from django.shortcuts import reverse
from django.utils.timezone import now

# from decimal import *
from django_countries.fields import CountryField
from base.models.baseuser import BaseUser_, BaseUser
from base.baseuser import deferred


class Recommendation(models.Model):

    recommendation = models.CharField(max_length=75)
    created_by = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        limit_choices_to={"is_staff": True},
    )


class Recommendations(models.Model):

    recommendation = models.ForeignKey(Recommendation, on_delete=models.CASCADE)
    published = models.DateTimeField(auto_now=True)
    recommendnee = models.ForeignKey(
        BaseUser, on_delete=models.CASCADE, related_name="recommendnee"
    )
    recommendor = models.ForeignKey(
        BaseUser, on_delete=models.CASCADE, related_name="recommendor"
    )
