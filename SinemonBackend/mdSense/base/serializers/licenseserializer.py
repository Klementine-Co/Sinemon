from base.models.license import *

# from base.models.measure import Measures, Measure

# from base.serializers.badgeserializer import BadgesSerializers

from rest_framework import serializers

from rest_framework.serializers import (
    SerializerMethodField,
    Serializer,
    ModelSerializer,
)


from base.serializers.providerserializer import ProviderSerializer

# from base.serializers.baseuserserializer import BaseUserInfoSerializer, BaseUserProviderSearchSerializer
# from base.serializers.voteserializer import VoteSerializer
# from base.serializers.measureserializer import MeasuresProviderProfileSerializer

# from django.utils import six
from django.core.serializers import serialize


import json


class LicenseSerializer(Serializer):

    prov_firstname = serializers.CharField(source="prov.provider.user.first_name")
    prov_lastname = serializers.CharField(source="prov.provider.user.last_name")
    prov = serializers.CharField(source="prov.provider_id")
    licensenumber = serializers.CharField()
    licensetype = serializers.CharField()
    shortdescription = serializers.CharField()
    no_practice_permitted = serializers.CharField()

    class Meta:
        model = License


class ActionsSerializer(Serializer):

    prov_firstname = serializers.CharField(source="prov.provider.user.first_name")
    prov_lastname = serializers.CharField(source="prov.provider.user.last_name")
    prov = serializers.CharField(source="prov.provider_id")
    effective_date = serializers.DateTimeField(format="%d-%b-%Y")
    summary = serializers.CharField()
    authority = serializers.CharField()
    action = serializers.CharField()

    class Meta:
        model = Actions


class ProbationsSerializer(Serializer):

    prov_firstname = serializers.CharField(source="prov.provider.user.first_name")
    prov_lastname = serializers.CharField(source="prov.provider.user.last_name")
    prov = serializers.CharField(source="prov.provider_id")
    summary = serializers.CharField()
    casenumber = serializers.CharField()
    age_of_probation = serializers.CharField()
    effective_date = serializers.DateTimeField(format="%d-%b-%Y")
    end_date = serializers.DateTimeField(format="%d-%b-%Y")
    pstatus = serializers.CharField()
    status = serializers.CharField()

    class Meta:
        model = Probations


class ConvictionsSerializer(Serializer):

    prov_firstname = serializers.CharField(source="prov.provider.user.first_name")
    prov_lastname = serializers.CharField(source="prov.provider.user.last_name")
    prov = serializers.CharField(source="prov.provider_id")
    effective_date = serializers.DateTimeField(format="%d-%b-%Y")
    summary = serializers.CharField()
    sentence = serializers.CharField()
    court = serializers.CharField()
    classs = serializers.CharField()

    class meta:
        model = Convictions


class AccusationsSerializer(Serializer):

    prov_firstname = serializers.CharField(source="prov.provider.user.first_name")
    prov_lastname = serializers.CharField(source="prov.provider.user.last_name")
    prov = serializers.CharField(source="prov.provider_id")
    effective_date = serializers.DateTimeField(format="%d-%b-%Y")
    casenumber = serializers.CharField()
    description = serializers.CharField()

    class meta:
        model = Accusations


class MalpracticesSerializer(Serializer):

    prov_firstname = serializers.CharField(source="prov.provider.user.first_name")
    prov_lastname = serializers.CharField(source="prov.provider.user.last_name")
    prov = serializers.CharField(source="prov.provider_id")
    effective_date = serializers.DateTimeField(format="%d-%b-%Y")
    amount = serializers.IntegerField()
    authority = serializers.CharField()
    docket = serializers.CharField()

    class meta:
        model = Malpractices


class ArbitrationsSerializer(Serializer):

    prov_firstname = serializers.CharField(source="prov.provider.user.first_name")
    prov_lastname = serializers.CharField(source="prov.provider.user.last_name")
    prov = serializers.CharField(source="prov.provider_id")
    effective_date = serializers.DateTimeField(format="%d-%b-%Y")
    amount = serializers.IntegerField()
    authority = serializers.CharField()
    docket = serializers.CharField()

    class meta:
        model = Arbitrations


class CitationsSerializer(Serializer):

    prov_firstname = serializers.CharField(source="prov.provider.user.first_name")
    prov_lastname = serializers.CharField(source="prov.provider.user.last_name")
    prov = serializers.CharField(source="prov.provider_id")
    dateresolved = serializers.CharField()
    datecitationissued = serializers.DateTimeField(format="%d-%b-%Y")
    resolved = serializers.CharField()
    cause = serializers.CharField()
    amount = serializers.IntegerField()

    class meta:
        model = Citations


class Number_negatives_vSerializer(Serializer):

    prov_firstname = serializers.CharField(source="prov.provider.user.first_name")
    prov_lastname = serializers.CharField(source="prov.provider.user.last_name")
    prov = serializers.CharField(source="prov.provider_id")
    col = serializers.CharField()
    cnt = serializers.IntegerField()

    class meta:
        model = Number_negatives_v


class Number_of_negativesSerializer(Serializer):

    prov_firstname = serializers.CharField(source="prov.provider.user.first_name")
    prov_lastname = serializers.CharField(source="prov.provider.user.last_name")
    prov = serializers.CharField(source="prov.provider_id")
    sum = serializers.IntegerField()

    class meta:
        model = Number_of_negatives
