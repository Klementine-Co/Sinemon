from django.db import models
from django.conf import settings
from django.shortcuts import reverse
from django.utils.timezone import now

# from decimal import *
from django_countries.fields import CountryField
from base.models.baseuser import BaseUser_, BaseUser, BaseUserModel, BaseUserState
from base.baseuser import deferred
from django.utils.translation import gettext_lazy as _
from base.models.user import User_Custom, UserManager


class MemberManager(models.Manager):

    def get_or_create_from_request(self, request):

        if request.baseuser.is_visitor:
            request.baseuser = BaseUserModel.objects.get_or_create_from_request(request)

    def create_dependent(
        self,
        firstname,
        lastname,
        middlename,
        email,
        account_number,
        guardian_id,
        sex="E",
        namesuffix=None,
        previouslastname=None,
        username=None,
        password=None,
        address=None,
        address2=None,
        address3=None,
        city=None,
        county_code=None,
        state=None,
        country=None,
        zipcode=None,
        phonenumber=None,
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
            first_name=firstname,
            last_name=lastname,
            previous_last_name=previouslastname,
            middle_name=middlename,
            sex=sex,
            namesuffix=namesuffix,
            street_address=address,
            street_address2=address2,
            street_address3=address3,
            city=city,
            state=state,
            county_code=county_code,
            country=country,
            zipcode=zipcode,
            account_number=account_number,
        )

        user.set_password(password)
        user.is_provider = False
        user.is_member = True
        user.save(using=self._db)

        baseuser = BaseUser.objects.create(user=user)
        baseuser.recognize_as_registered()
        baseuser.save()

        member = Member.objects.create(member=baseuser)
        member.save()

        # Save member to Guardian's accounts and assign Gaurdian privileges
        assigned = Account.objects.assign_privilege(
            account_number=account_number,
            privilege="G",
            baseuser_id=guardian_id,
            userid=member.member_id,
        )

        return member

    def create_dependent_authority(
        self,
        firstname,
        lastname,
        middlename,
        email,
        authority_id,
        sex="E",
        namesuffix=None,
        previouslastname=None,
        username=None,
        password=None,
        address=None,
        address2=None,
        address3=None,
        city=None,
        county_code=None,
        state=None,
        country=None,
        zipcode=None,
    ):
        """
        Creates and saves a User with the given email, date of
        birth and password.
        """
        if not email:
            raise ValueError("Users must have an email address")

        account_number = self.create_account_number()
        user = User_Custom(
            email=self.normalize_email(email),
            username=username,
            first_name=firstname,
            last_name=lastname,
            previous_last_name=previouslastname,
            middle_name=middlename,
            sex=sex,
            namesuffix=namesuffix,
            street_address=address,
            street_address2=address2,
            street_address3=address3,
            city=city,
            state=state,
            county_code=county_code,
            country=country,
            zipcode=zipcode,
            account_number=account_number,
        )

        user.set_password(password)
        user.is_provider = False
        user.is_member = True
        user.save(using=self._db)

        baseuser = BaseUser.objects.create(user=user)
        baseuser.recognize_as_registered()
        baseuser.save()

        member = Member.objects.create(member=baseuser)
        member.save()

        # Save member to accounts with Authority privileges for the authority user
        assigned = Account.objects.assign_privilege(
            account_number=account_number,
            privilege="T",
            baseuser_id=authority_id,
            userid=member.member_id,
        )

        return member

    def create_member(
        self,
        firstname,
        lastname,
        middlename,
        email,
        sex="E",
        namesuffix=None,
        previouslastname=None,
        username=None,
        password=None,
        address=None,
        address2=None,
        address3=None,
        city=None,
        county_code=None,
        state=None,
        country=None,
        zipcode=None,
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
            first_name=firstname,
            last_name=lastname,
            previous_last_name=previouslastname,
            middle_name=middlename,
            sex=sex,
            namesuffix=namesuffix,
            street_address=address,
            street_address2=address2,
            street_address3=address3,
            city=city,
            state=state,
            county_code=county_code,
            country=country,
            zipcode=zipcode,
        )

        user.set_password(password)
        user.is_provider = False
        user.is_member = True
        user.save(using=self._db)

        baseuser = BaseUser.objects.create(user=user)
        baseuser.recognize_as_registered()
        baseuser.save()

        member = Member.objects.create(member=baseuser)
        member.save()

        return member


class Member(models.Model):
    SALUTATION = [("mrs", _("Mrs.")), ("mr", _("Mr.")), ("na", _("(n/a)"))]

    member = models.OneToOneField(
        BaseUser,
        on_delete=models.CASCADE,
        primary_key=True,
        related_name="member",
        limit_choices_to={"recognized": BaseUserState.REGISTERED},
    )

    icon = models.ImageField(null=True, upload_to="img/")
    salutation = models.CharField(
        _("Salutation"), max_length=5, choices=SALUTATION, null=True
    )

    def __str__(self):
        return f"{self.member.__str__()}"
