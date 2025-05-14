from django.db import models
from django.conf import settings
from django.shortcuts import reverse
from django.utils.timezone import now

# from decimal import *
from django_countries.fields import CountryField
from base.models.baseuser import BaseUser_, BaseUser, BaseUserState
from base.models.provider import Provider
from base.baseuser import deferred
from django.template.loader import select_template
from django.utils.translation import gettext_lazy as _


class ProviderProfile(models.Model):

    provider = models.OneToOneField(
        Provider,
        on_delete=models.CASCADE,
        primary_key=True,
        related_name="providerProfile",
    )
    video = models.FileField(
        upload_to="videos_uploaded",
        null=True,
        validators=[
            FileExtensionValidator(
                allowed_extensions=["MOV", "avi", "mp4", "webm", "mkv"]
            )
        ],
    )
    tip = models.CharField(max_length=280, null=True, blank=True)
    about = models.CharField(max_length=400, null=True, blank=True)

    badge = models.ForeignKey("base.Badge", on_delete=models.CASCADE, null=True)
    measure = models.ManyToManyField("base.Measures", null=True)
    # prov_desc = models.ForeignKey(Provider_Desc, on_delete=models.CASCADE, null=True, blank=True)
    icon = models.ImageField(null=True, upload_to="static/img/", blank=True)
    tip = models.CharField(max_length=280, null=True, blank=True)
    salutation = models.CharField(
        _("Salutation"), max_length=5, choices=SALUTATION, null=True, blank=True
    )
    npi = models.CharField(max_length=28, unique=True, null=True, blank=True)
    votee = models.IntegerField(default=0)
    specialty_code = models.TextField(
        db_column="SPECIALTY_CODE", choices=SPECIALTY_CODES, blank=True, null=True
    )  # Field name made lowercase.
    prov_taxonomy_code = models.TextField(
        db_column="PROV_TAXONOMY_CODE", blank=True, null=True, choices=TAXONOMY_CODES
    )  # Field name made lowercase.
    # about = models.TextField(null=True, blank=True)

    # address = models.ForeignKey("base.Address", on_delete=models.CASCADE, null=True, limit_choices_to={ 'user':})

    def __str__(self):
        return f"{self.provider.__str__()}"
        # return f"{self.provider.__str__()} : {self.prov_desc.__str__()}"

    def get_email(self):
        return self.provider.email


def do():
    return 1
