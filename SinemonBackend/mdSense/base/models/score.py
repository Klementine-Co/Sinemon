from django.db import models
from django.conf import settings
from django.shortcuts import reverse
from django.utils.timezone import now

# from decimal import *
from django_countries.fields import CountryField
from base.models.baseuser import BaseUser_, BaseUser
from base.models.provider import Provider
from base.baseuser import deferred


class Points(models.Model):

    points = models.IntegerField(default=0)
    mark_type = models.CharField(max_length=75)
    effective_date = models.DateTimeField(auto_now=True)
    end_date = models.DateTimeField(auto_now=False)
    created_by = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        limit_choices_to={"is_staff": True},
    )


class ScoreTrack(models.Model):
    prov = models.ForeignKey(Provider, on_delete=models.CASCADE)
    points = models.ForeignKey(Points, on_delete=models.CASCADE)
    date_submitted = models.DateTimeField(auto_now=True)


class Scores(models.Model):

    score = models.IntegerField(default=0)
    received_date = models.DateTimeField(auto_now=True)
    prov = models.ForeignKey(Provider, on_delete=models.CASCADE)
    number_of_negatives = models.IntegerField(default=0)

    def __str__(self):
        return f"{self.prov} -- {self.score} {self.number_of_negatives}"
