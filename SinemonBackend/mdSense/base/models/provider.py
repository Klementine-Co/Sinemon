from django.db import models
from django.conf import settings
from django.shortcuts import reverse
from django.utils.timezone import now

# from decimal import *
from django_countries.fields import CountryField
from base.models.baseuser import BaseUser_, BaseUser, BaseUserState
from base.baseuser import deferred
from django.template.loader import select_template
from django.utils.translation import gettext_lazy as _
from base.models.user import STATES
from ckeditor.fields import RichTextField

from .CODES import *
from base.models.user import User_Custom, UserManager

# class Provider_Taxonomy(models.Model):
#     medicare_specialty_code = models.TextField(db_column='MEDICARE_SPECIALTY_CODE', blank=True, null=True)  # Field name made lowercase.
#     medicare_prov_supplier_type = models.TextField(db_column='MEDICARE_PROV_SUPPLIER_TYPE', blank=True, null=True)  # Field name made lowercase.
#     prov_taxonomy_code = models.TextField(db_column='PROV_TAXONOMY_CODE', blank=True, null=True)  # Field name made lowercase.
#     prov_taxonomy_desc = models.TextField(db_column='PROV_TAXONOMY_DESC', blank=True, null=True)  # Field name made lowercase.
#     id =  models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')
#     # prov_tax_pk = models.TextField(primary_key=True)


class Provider_Desc(models.Model):
    specialty_code = models.TextField(
        db_column="SPECIALTY_CODE", choices=SPECIALTY_CODES, primary_key=True
    )  # Field name made lowercase.
    prov_taxonomy_code = models.TextField(
        db_column="PROV_TAXONOMY_CODE", blank=True, null=True, choices=TAXONOMY_CODES
    )  # Field name made lowercase.

    def __str__(self):
        # return self.get_specialty_code_display()
        return f"{ self.get_specialty_code_display()} -- { self.get_prov_taxonomy_code_display()}"
        # return f"{ self.get_specialty_code_display()}"

    def getSpecialty(self):
        return self.get_specialty_code_display()


class ProviderManager(UserManager):
    def create_provider(
        self,
        first_name,
        last_name,
        middle_name,
        email,
        previous_last_name=None,
        sex=None,
        namesuffix=None,
        username=None,
        password=None,
        street_address=None,
        street_address2=None,
        street_address3=None,
        city=None,
        county_code=None,
        state=None,
        country=None,
        zipcode=None,
        npi=None,
    ):
        """
        Creates and saves a User with the given email, date of
        birth and password.
        """
        if not email:
            raise ValueError("Users must have an email address")

        user = User_Custom(
            email=self.normalize_email(email),
            username=username,
            first_name=first_name,
            last_name=last_name,
            previous_last_name=previous_last_name,
            middle_name=middle_name,
            sex=sex,
            namesuffix=namesuffix,
            street_address=street_address,
            street_address2=street_address2,
            street_address3=street_address3,
            city=city,
            state=state,
            county_code=county_code,
            country=country,
            zipcode=zipcode,
            account_number=self.create_account_number(),
        )

        user.set_password(password)
        user.is_provider = True
        user.save(using=self._db)

        baseuser = BaseUser.objects.create(user=user)
        baseuser.recognize_as_registered()
        baseuser.save()

        provider = Provider.objects.create(provider=baseuser, npi=npi)
        ProviderRatings.objects.create(prov=provider)
        provider.save()

        return provider


class Provider(models.Model):

    provider = models.OneToOneField(
        BaseUser,
        on_delete=models.CASCADE,
        primary_key=True,
        related_name="provider",
        limit_choices_to={
            "recognized": BaseUserState.REGISTERED,
        },
    )
    badge = models.ForeignKey("base.Badge", on_delete=models.CASCADE, null=True)
    # measure = models.ManyToManyField("base.Measures", null=True)
    # prov_desc = models.ForeignKey(Provider_Desc, on_delete=models.CASCADE, null=True, blank=True)
    icon = models.ImageField(
        null=True,
        upload_to="static/img/",
        blank=True,
        default="static/img/158927_6IGzGKC_YrQuS8o_HPZyBVY.jpg",
    )
    salutation = models.CharField(
        _("Salutation"),
        max_length=24,
        null=True,
        blank=True,
        help_text="e.g Dr, NP, BSN",
    )
    npi = models.CharField(max_length=28, unique=True, null=True, blank=True)
    votee = models.IntegerField(default=0)
    specialty_code = models.TextField(
        db_column="SPECIALTY_CODE", choices=SPECIALTY_CODES, blank=True, null=True
    )  # Field name made lowercase.
    prov_taxonomy_code = models.TextField(
        db_column="PROV_TAXONOMY_CODE", blank=True, null=True, choices=TAXONOMY_CODES
    )  # Field name made lowercase.
    about = RichTextField(null=True, blank=True)
    tip = RichTextField(null=True, blank=True)
    billing = models.BooleanField(default=True)
    lobby_street_address = models.CharField(max_length=128, null=True)
    lobby_city = models.TextField(null=True, blank=True)
    lobby_state = models.CharField(max_length=30, choices=STATES, null=True)
    lobby_county_code = models.CharField(max_length=3, null=True, blank=True)
    lobby_country = CountryField(
        multiple=False, blank_label="(select country)", default="US", null=True
    )
    lobby_zipcode = models.CharField(max_length=11, null=True)
    lobby_phone = models.CharField(max_length=20, null=True)
    provider_email = models.EmailField(
        _("provider email address"), unique=True, max_length=254, null=True, blank=True
    )
    preferred_name = models.CharField(
        _("preferred name"), max_length=120, blank=True, null=True
    )

    objects = ProviderManager()

    # address = models.ForeignKey("base.Address", on_delete=models.CASCADE, null=True, limit_choices_to={ 'user':})

    def __str__(self):
        return f"{self.provider.__str__()}"
        # return f"{self.provider.__str__()} : {self.prov_desc.__str__()}"

    def get_email(self):
        return self.provider.email

    def save(self, *args, **kwargs):
        if not self.lobby_street_address:
            self.lobby_street_address = (
                self.provider.user.street_address
                + " "
                + self.provider.user.street_address2
                + " "
                + self.provider.user.street_address3
            )
        if not self.lobby_city:
            self.lobby_city = self.provider.user.city
        if not self.lobby_state:
            self.lobby_state = self.provider.user.state
        if not self.lobby_county_code:
            self.lobby_county_code = self.provider.user.county_code
        if not self.lobby_country:
            self.lobby_country = self.provider.user.country
        if not self.lobby_zipcode:
            self.lobby_zipcode = self.provider.user.zipcode
        if not self.lobby_phone:
            self.lobby_phone = self.provider.user.phone_number
        if not self.preferred_name:
            self.preferred_name = self.provider.user.last_name

        super(Provider, self).save(*args, **kwargs)


class RenderingProvider(models.Model):

    rendering_provider = models.OneToOneField(
        Provider,
        on_delete=models.CASCADE,
        primary_key=True,
        related_name="rendering_provider",
    )
    use_billing_lobby_address = models.BooleanField(
        default=False
    )  # Defaults to rendering lobby address
    billing_prov = models.ForeignKey(
        Provider, on_delete=models.CASCADE, null=True, related_name="billing_provider"
    )
