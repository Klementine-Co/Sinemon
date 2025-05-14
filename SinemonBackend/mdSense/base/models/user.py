from __future__ import unicode_literals
from django.contrib.auth.models import BaseUserManager, AbstractBaseUser
from django.db import models
from django.core.mail import send_mail
from django.contrib.auth.models import PermissionsMixin

# from django.contrib.auth.base_user import AbstractBaseUser

from django.utils.translation import ugettext_lazy as _
from django.utils.timezone import now
from base.models.baseuser import BaseUser
from django_countries.fields import CountryField
import string
import random

STATES = (
    ("AL", "Alabama"),
    ("AK", "Alaska"),
    ("AZ", "Arizona"),
    ("AR", "Arkansas"),
    ("CA", "California"),
    ("CO", "Colorado"),
    ("CT", "Connecticut"),
    ("DE", "Delaware"),
    ("FL", "Florida"),
    ("GA", "Georgia"),
    ("HI", "Hawaii"),
    ("ID", "Idaho"),
    ("IL", "Illinois"),
    ("IN", "Indiana"),
    ("IA", "Iowa"),
    ("KS", "Kansas"),
    ("KY", "Kentucky"),
    ("LA", "Louisiana"),
    ("ME", "Maine"),
    ("MD", "Maryland"),
    ("MA", "Massachusetts"),
    ("MI", "Michigan"),
    ("MN", "Minnesota"),
    ("MS", "Mississippi"),
    ("MO", "Missouri"),
    ("MT", "Montana"),
    ("NE", "Nebraska"),
    ("NV", "Nevada"),
    ("NH", "New Hampshire"),
    ("NJ", "New Jersey"),
    ("NM", "New Mexico"),
    ("NY", "New York"),
    ("NC", "North Carolina"),
    ("ND", "North Dakota"),
    ("OH", "Ohio"),
    ("OK", "Oklahoma"),
    ("OR", "Oregon"),
    ("PA", "Pennsylvania"),
    ("RI", "Rhode Island"),
    ("SC", "South Carolina"),
    ("SD", "South Dakota"),
    ("TN", "Tennessee"),
    ("TX", "Texas"),
    ("UT", "Utah"),
    ("VT", "Vermont"),
    ("VA", "Virginia"),
    ("WA", "Washington"),
    ("WV", "West Virginia"),
    ("WI", "Wisconsin"),
    ("WY", "Wyoming"),
)


class UserManager(BaseUserManager):

    # define get_random_string function
    def get_random_string(self, length):
        # choose from all numbers
        digits = string.digits
        result_str = "".join((random.choice(digits) for i in range(length)))
        return result_str

    # create unique 11 digit key
    def create_account_number(self):
        key = self.get_random_string(length=11)
        while User_Custom.objects.filter(account_number=key).exists():
            key = self.get_random_string(length=11)
        return key

    def create_user(self, email, username=None, password=None):
        """
        Creates and saves a User with the given email, date of
        birth and password.
        """
        if not email:
            raise ValueError("Users must have an email address")

        user = self.model(
            email=self.normalize_email(email),
            username=username,
        )

        user.set_password(password)
        user.save(using=self._db)
        return user

    # assign authority to user for existing member account
    def assign_authority(self, userid, account_number, authority_id):
        assigned = Account.objects.assign_privilege(
            account_number=account_number,
            privilege="T",
            baseuser_id=authority_id,
            userid=userid,
        )

        return True

    def create_superuser(self, email, password):
        """
        Creates and saves a superuser with the given email, date of
        birth and password.
        """
        user = self.create_user(
            email,
            password=password,
        )
        user.is_admin = True
        user.is_staff = True
        user.is_superuser = True
        user.save(using=self._db)
        return user


from phonenumber_field.modelfields import PhoneNumberField


class User_Custom(AbstractBaseUser, PermissionsMixin):
    account_number = models.CharField(max_length=11, null=True, blank=True)
    username = models.CharField(_("username"), max_length=120, blank=True, null=True)
    email = models.EmailField(_("email address"), unique=True)
    first_name = models.CharField(_("first name"), max_length=30, blank=True)
    middle_name = models.CharField(_("middle name"), max_length=30, blank=True)
    previous_last_name = models.TextField(null=True, blank=True)
    last_name = models.CharField(_("last name"), max_length=30, blank=True)
    namesuffix = models.CharField(null=True, blank=True, max_length=3)
    date_joined = models.DateTimeField(_("date joined"), auto_now_add=True)
    is_active = models.BooleanField(_("active"), default=True)
    is_admin = models.BooleanField(_("admin"), default=False)
    is_staff = models.BooleanField(_("staff"), default=False)
    is_provider = models.BooleanField(_("provider"), default=False)
    is_member = models.BooleanField(_("member"), default=False)
    icon = models.ImageField(null=True, blank=True, upload_to="static/img/")
    ssn = models.CharField(_("SSN"), max_length=9, null=True, blank=True)
    last_access = models.DateTimeField(
        _("Last accessed"),
        default=now,
    )
    date_of_birth = models.DateField(null=True, blank=True)
    phone_number = PhoneNumberField(blank=True)
    sex = models.CharField(null=True, blank=True, max_length=1)
    street_address = models.CharField(max_length=128, null=True)
    street_address2 = models.CharField(max_length=128, null=True, blank=True)
    street_address3 = models.CharField(max_length=128, null=True, blank=True)
    city = models.TextField(null=True, blank=True)
    state = models.CharField(max_length=30, choices=STATES, null=True)
    county_code = models.CharField(max_length=3, null=True, blank=True)
    country = CountryField(
        multiple=False, blank_label="(select country)", default="US", null=True
    )
    zip9 = models.CharField(max_length=10, null=True)
    zipcode = models.CharField(max_length=11, null=True)

    objects = UserManager()

    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = []

    class Meta:
        verbose_name = _("user")
        verbose_name_plural = _("users")
        app_label = "base"
        db_table = "base_user_custom"

    def get_full_name(self):
        """
        Returns the first_name plus the last_name, with a space in between.
        """
        full_name = "%s %s" % (self.first_name, self.last_name)
        return full_name.strip()

    def get_short_name(self):
        """
        Returns the short name for the user.
        """
        return self.first_name

    def get_email(self):
        """
        Returns the email for the user.
        """
        return self.email

    def email_user(self, subject, message, from_email=None, **kwargs):
        """
        Sends an email to this User_Custom.
        """
        send_mail(subject, message, from_email, [self.email], **kwargs)

    def update(
        self,
        city,
        state,
        zipcode,
        username,
        icon,
        first_name,
        middle_name,
        last_name,
        street_address,
        street_address2,
        phone_number,
        *args,
        **kwargs
    ):

        self.city = city
        self.state = state
        self.zipcode = zipcode
        # self.email = email
        self.username = username
        self.icon = icon
        self.first_name = first_name
        self.middle_name = middle_name
        self.last_name = last_name
        self.street_address = street_address
        self.street_address2 = street_address2
        self.phone_number = phone_number

        super().save(*args, **kwargs)

    # def update(self, **kwargs):

    #     print(kwargs['zipcode'])

    # super().save(*args, **kwargs)
