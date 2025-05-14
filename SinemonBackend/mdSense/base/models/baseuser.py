from django.db import models
from django.conf import settings
from django.shortcuts import reverse
from django.utils.timezone import now

# from decimal import *
from django_countries.fields import CountryField

from base.baseuser.signals import baseuser_recognized
from base.baseuser.fields import JSONField  # , ChoiceEnumField,  ChoiceEnum
from base.baseuser import deferred
from importlib import import_module

SessionStore = import_module(settings.SESSION_ENGINE).SessionStore()


import string

import warnings
from django.contrib.auth import get_user_model
from django.contrib.auth.models import AnonymousUser
from django.contrib.auth.signals import user_logged_in, user_logged_out
from django.core.exceptions import ObjectDoesNotExist
from django.db import DEFAULT_DB_ALIAS
from django.core.exceptions import FieldDoesNotExist
from django.dispatch import receiver
from django.utils import timezone
from django.utils.functional import SimpleLazyObject
from django.utils.translation import gettext_lazy as _


###########################################################

from django.template.loader import select_template
from django.conf import settings


# from base.services.baseuser_manager import BaseUserManager, BaseUserState

# from django_enumfield import enum
# class BaseUserState(enum.Enum):
#     UNRECOGNIZED = 1
#     GUEST = 2
#     REGISTERED = 3
# from enumfields import EnumField
# from enum import Enum
from django_enumfield import enum


class BaseUserState(enum.Enum):
    UNRECOGNIZED = 0  # "Unrecognized"
    GUEST = 1  # "Guest"
    REGISTERED = 2  # "Registered"


class BaseUserQuerySet(models.QuerySet):
    def _filter_or_exclude(self, negate, *args, **kwargs):
        """
        Emulate filter queries on a BaseUser using attributes from the User object.
        Example: BaseUser.objects.filter(last_name__icontains='simpson') will return
        a queryset with customers whose last name contains "simpson".
        """
        opts = self.model._meta
        lookup_kwargs = {}
        for key, lookup in kwargs.items():
            try:
                field_name = key[: key.index("__")]
            except ValueError:
                field_name = key
            if field_name == "pk":
                field_name = opts.pk.name
            try:
                opts.get_field(field_name)
                if isinstance(lookup, get_user_model()):
                    lookup.pk  # force lazy object to resolve
                lookup_kwargs[key] = lookup
            except FieldDoesNotExist as fdne:
                try:
                    get_user_model()._meta.get_field(field_name)
                    lookup_kwargs["user__" + key] = lookup
                except FieldDoesNotExist:
                    raise fdne
                except Exception as othex:
                    raise othex
        result = super()._filter_or_exclude(negate, *args, **lookup_kwargs)
        return result


# Functions Used for logic in API:

# Create Users
# Get Users
# Update Users


class BaseUserManager(models.Manager):
    """
    Manager for the BaseUser database model. This manager can also cope with customers, which have
    an entity in the database but otherwise are considered as anonymous. The username of these
    so called unrecognized customers is a compact version of the session key.
    """

    BASE64_ALPHABET = (
        string.digits + string.ascii_uppercase + string.ascii_lowercase + ".@"
    )
    REVERSE_ALPHABET = dict((c, i) for i, c in enumerate(BASE64_ALPHABET))
    BASE36_ALPHABET = string.digits + string.ascii_lowercase

    _queryset_class = BaseUserQuerySet

    @classmethod
    def encode_session_key(cls, session_key):
        """
        Session keys have base 36 and length 32. Since the field ``username`` accepts only up
        to 30 characters, the session key is converted to a base 64 representation, resulting
        in a length of approximately 28.
        """
        return cls._encode(int(session_key[:32], 36), cls.BASE64_ALPHABET)

    @classmethod
    def decode_session_key(cls, compact_session_key):
        """
        Decode a compact session key back to its original length and base.
        """
        base_length = len(cls.BASE64_ALPHABET)
        n = 0
        for c in compact_session_key:
            n = n * base_length + cls.REVERSE_ALPHABET[c]
        return cls._encode(n, cls.BASE36_ALPHABET).zfill(32)

    @classmethod
    def _encode(cls, n, base_alphabet):
        base_length = len(base_alphabet)
        s = []
        while True:
            n, r = divmod(n, base_length)
            s.append(base_alphabet[r])
            if n == 0:
                break
        return "".join(reversed(s))

    def get_queryset(self):
        """
        Whenever we fetch from the BaseUser table, inner join with the User table to reduce the
        number of presumed future queries to the database.
        """
        qs = self._queryset_class(self.model, using=self._db).select_related("user")
        return qs

    def create(self, *args, **kwargs):
        if "user" in kwargs and kwargs["user"].is_authenticated:
            kwargs.setdefault("recognized", BaseUserState.REGISTERED)
        baseuser = super().create(*args, **kwargs)
        return baseuser

    def _get_visiting_user(self, session_key):
        """
        Since the BaseUser has a 1:1 relation with the User object, look for an entity of a
        User object. As its ``username`` (which must be unique), use the given session key.
        """
        username = self.encode_session_key(session_key)
        print(session_key)
        try:
            print("in _get_visiting_user")
            user = get_user_model().objects.get(username=username)
        except get_user_model().DoesNotExist:
            user = AnonymousUser()
        return user

    def get_from_request(self, request):
        """
        Return an BaseUser object for the current User object.
        """
        if request.user.is_anonymous and request.session.session_key:
            # the visitor is determined through the session key
            print("\n\n\nget from request", request)
            user = self._get_visiting_user(request.session.session_key)
        else:
            user = request.user
        try:
            if user.baseuser:
                return user.baseuser
        except AttributeError:
            pass
        if request.user.is_authenticated:
            baseuser, created = self.get_or_create(user=user)
            if created:
                baseuser.recognize_as_registered(request)
        else:
            baseuser = VisitingBaseUser()
        return baseuser

    def get_or_create_from_request(self, request):
        if request.user.is_authenticated:
            user = request.user
            recognized = BaseUserState.REGISTERED
            baseuser, created = self.get_or_create(user=user, recognized=recognized)
        else:
            if not request.session.session_key:
                request.session.cycle_key()
                assert request.session.session_key
            username = self.encode_session_key(request.session.session_key)
            # create or get a previously created inactive intermediate user,
            # which later can declare himself as guest, or register as a valid Django user
            try:
                user = get_user_model().objects.get(username=username)
            except get_user_model().DoesNotExist:
                user = get_user_model().objects.create_user(
                    email=username + "@temp.com", username=username
                )
                user.is_active = False
                user.save()
                recognized = BaseUserState.UNRECOGNIZED
                baseuser, created = self.get_or_create(user=user, recognized=recognized)

            recognized = BaseUserState.UNRECOGNIZED
        baseuser, created = self.get_or_create(user=user, recognized=recognized)
        return baseuser


class BaseUser_(models.Model, metaclass=deferred.ForeignKeyBuilder):
    """
    https://github.com/awesto/django-shop/tree/master
    BaseUser is a profile model that extends
    the django User model if a baseuser is authenticated. On checkout, a User
    object is created for anonymous customers also (with unusable password).
    """

    user = models.OneToOneField(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        primary_key=True,
        related_name="baseuser",
    )

    recognized = enum.EnumField(
        BaseUserState,
        null=True,
        # max_length=12,
        # _("Recognized as"),
        # enum_type=BaseUserState,
        # help_text=_("Designates the state the customer is recognized as."),
    )

    extra = JSONField(
        editable=False,
        verbose_name=_("Extra information about this baseuser"),
    )

    objects = BaseUserManager()

    class Meta:
        abstract = True

    def __str__(self):
        return self.get_username()

    def get_username(self):
        return self.user.get_username()

    def get_full_name(self):
        return self.user.get_full_name()

    @property
    def first_name(self):
        # pending deprecation: warnings.warn("Property first_name is deprecated and will be removed")
        return self.user.first_name

    @first_name.setter
    def first_name(self, value):
        # pending deprecation: warnings.warn("Property first_name is deprecated and will be removed")
        self.user.first_name = value

    @property
    def last_name(self):
        # pending deprecation: warnings.warn("Property last_name is deprecated and will be removed")
        return self.user.last_name

    @last_name.setter
    def last_name(self, value):
        # pending deprecation: warnings.warn("Property last_name is deprecated and will be removed")
        self.user.last_name = value

    @property
    def email(self):
        return self.user.email

    @email.setter
    def email(self, value):
        self.user.email = value

    @property
    def date_joined(self):
        return self.user.date_joined

    @property
    def last_login(self):
        return self.user.last_login

    @property
    def groups(self):
        return self.user.groups

    @property
    def is_anonymous(self):
        return self.recognized in (BaseUserState.UNRECOGNIZED, BaseUserState.GUEST)

    @property
    def is_authenticated(self):
        return self.recognized is BaseUserState.REGISTERED

    @property
    def is_recognized(self):
        """
        https://github.com/awesto/django-shop/tree/master
        Return True if the baseuser is associated with a User account.
        Unrecognized customers have accessed the site, but did not register
        an account nor declared themselves as guests.
        """
        return self.recognized is not BaseUserState.UNRECOGNIZED

    @property
    def is_guest(self):
        """
        Return true if the baseuser isn't associated with valid User account, but declared
        himself as a guest, leaving their email address.
        """
        return self.recognized is BaseUserState.GUEST

    def recognize_as_guest(self, request=None, commit=True):
        """
        Recognize the current baseuser as guest baseuser.
        """
        if self.recognized != BaseUserState.GUEST:
            self.recognized = BaseUserState.GUEST
            if commit:
                self.save(update_fields=["recognized"])
            baseuser_recognized.send(
                sender=self.__class__, baseuser=self, request=request
            )

    @property
    def is_registered(self):
        """
        Return true if the baseuser has registered himself.
        """
        return self.recognized is BaseUserState.REGISTERED

    def recognize_as_registered(self, request=None, commit=True):
        """
        Recognize the current baseuser as registered baseuser.
        """
        if self.recognized != BaseUserState.REGISTERED:
            self.recognized = BaseUserState.REGISTERED
            if commit:
                self.save(update_fields=["recognized"])
            baseuser_recognized.send(
                sender=self.__class__, baseuser=self, request=request
            )

    @property
    def is_visitor(self):
        """
        Always False for instantiated BaseUser objects.
        """
        return False

    @property
    def is_expired(self):
        """
        Return True if the session of an unrecognized baseuser expired or is not decodable.
        Registered customers never expire.
        Guest customers only expire, if they failed fulfilling the purchase.
        """
        is_expired = False
        if self.recognized is BaseUserState.UNRECOGNIZED:
            try:
                session_key = BaseUserManager.decode_session_key(self.user.username)
                is_expired = not SessionStore.exists(session_key)
            except KeyError:
                msg = "Unable to decode username '{}' as session key"
                warnings.warn(msg.format(self.user.username))
                is_expired = True
        return is_expired

    def get_or_assign_number(self):
        """
        Hook to get or to assign the customers number. It is invoked, every time an Order object
        is created. Using a baseuser number, which is different from the primary key is useful for
        merchants, wishing to assign sequential numbers only to customers which actually bought
        something. Otherwise the baseuser number (primary key) is increased whenever a site visitor
        puts something into the cart. If he never proceeds to checkout, that entity expires and may
        be deleted at any time in the future.
        """
        return self.get_number()

    def get_number(self):
        """
        Hook to get the baseuser's number. BaseUsers haven't purchased anything may return None.
        """
        return str(self.user_id)

    def save(self, **kwargs):
        if "update_fields" not in kwargs:
            self.user.save(using=kwargs.get("using", DEFAULT_DB_ALIAS))
        super().save(**kwargs)

    def delete(self, *args, **kwargs):
        if self.user.is_active and self.recognized is BaseUserState.UNRECOGNIZED:
            # invalid state of baseuser, keep the referred User
            super().delete(*args, **kwargs)
        else:
            # also delete self through cascading
            self.user.delete(*args, **kwargs)


BaseUserModel = deferred.MaterializedModel(BaseUser_)


class VisitingBaseUser:
    """
    This dummy object is used for customers which just visit the site. Whenever a VisitingBaseUser
    adds something to the cart, this object is replaced against a real BaseUser object.
    """

    user = AnonymousUser()

    def __str__(self):
        return "Visitor"

    @property
    def email(self):
        return ""

    @email.setter
    def email(self, value):
        pass

    @property
    def is_anonymous(self):
        return True

    @property
    def is_authenticated(self):
        return False

    @property
    def is_recognized(self):
        return False

    @property
    def is_guest(self):
        return False

    @property
    def is_registered(self):
        return False

    @property
    def is_visitor(self):
        return True

    def save(self, **kwargs):
        pass


@receiver(user_logged_in)
def handle_baseuser_login(sender, **kwargs):
    """
    Update request.baseuser to an authenticated BaseUser
    #"""
    # print('Update request.baseuser to an authenticated BaseUser')
    try:
        # print('working', kwargs['user'].baseuser)
        kwargs["request"].baseuser = kwargs["user"].baseuser
    except (AttributeError, ObjectDoesNotExist):
        print("exception", kwargs["user"].baseuser)
        kwargs["request"].baseuser = SimpleLazyObject(
            lambda: BaseUserModel.objects.get_from_request(kwargs["request"])
        )


@receiver(user_logged_out)
def handle_baseuser_logout(sender, **kwargs):
    """
    Update request.baseuser to a visiting BaseUser
    """
    # defer assignment to anonymous baseuser, since the session_key is not yet rotated
    kwargs["request"].baseuser = SimpleLazyObject(
        lambda: BaseUserModel.objects.get_from_request(kwargs["request"])
    )


##################################################################################################################
##################################################################################################################


class BaseUser(BaseUser_):
    """
    Default materialized model for BaseUser, adding a baseuser's number and salutation.

    If this model is materialized, then also register the corresponding serializer class
    :class:`shop.serializers.defaults.baseuser.BaseUserInfoSerializer`.
    """

    number = models.PositiveIntegerField(
        _("BaseUser Number"),
        null=True,
        default=None,
        unique=True,
    )

    def get_number(self):
        return self.number

    def get_or_assign_number(self):
        if self.number is None:
            aggr = BaseUser.objects.filter(number__isnull=False).aggregate(
                models.Max("number")
            )
            self.number = (aggr["number__max"] or 0) + 1
            self.save()
        return self.get_number()

    def as_text(self):
        template_names = [
            "{}/baseuser.txt".format(settings.APP_LABEL),
            "core/baseuser.txt",
        ]
        template = select_template(template_names)
        return template.render({"baseuser": self})
