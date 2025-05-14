from django.db import models
from django.conf import settings
from django.shortcuts import reverse
from django.utils.timezone import now

# from decimal import *
from django_countries.fields import CountryField
from base.models.baseuser import BaseUser_, BaseUser
from base.baseuser import deferred
from django.utils.translation import gettext_lazy as _
from base.models.provider import Provider


class BadgesQuerySet(models.QuerySet):

    def badge_images(self):
        return self.all().badge__icon


class Badge(models.Model):

    badge = models.CharField(max_length=75)
    badge_type = models.CharField(max_length=75)
    tier = models.IntegerField(default=0)
    icon = models.ImageField(null=True, upload_to="static/img/")
    load_date = models.DateTimeField(auto_now=True)
    created_by = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        limit_choices_to={"is_staff": True},
    )

    def __str__(self):
        return f"{self.badge} -- {self.badge_type} -- {self.tier}"


# class BadgesManager(models.Manager):


#     def get_queryset_imgs(self):
#         return BadgesQuerySet(self.model, using=self._db)


class Badges(models.Model):

    badge = models.ForeignKey(Badge, on_delete=models.CASCADE)
    received_date = models.DateTimeField(default=now)
    prov = models.ForeignKey(Provider, on_delete=models.CASCADE)

    # imgs = BadgesManager()

    def __str__(self):
        return f"{self.badge} -- {self.prov}"
