from base.models.member import Member
from base.models.insurances import *
from rest_framework import serializers
from rest_framework.serializers import (
    SerializerMethodField,
    Serializer,
    ModelSerializer,
)
from base.serializers.bageserializer import BadgeSerializer
from base.serializers.baseuserserializer import (
    BaseUserInfoSerializer,
    BaseUserProviderSearchSerializer,
    BaseUserMemberSearchSerializer,
)
from base.serializers.measureserializer import MeasuresProviderProfileSerializer

# from django.utils import six
from django.core.serializers import serialize
import json

from base.serializers.memberserializer import (
    MembersSerializer,
    MemberSerializer,
)

from base.serializers.providerserializer import (
    ProvidersSerializer,
    ProviderSerializer,
)


class MedInsuranceSerializer(Serializer):

    member = serializers.CharField(source="member.member_id")
    insurer = serializers.CharField()
    id_member = serializers.CharField()
    group_no = serializers.CharField()
    benefit_plan = serializers.CharField()
    card = serializers.FileField()
    uploaded = serializers.DateTimeField()

    class Meta:
        model = MedInsurance


class RxInsuranceSerializer(Serializer):

    member = serializers.CharField(source="member.member_id")
    insurer = serializers.CharField()
    id_member = serializers.CharField()
    group_no = serializers.CharField()
    benefit_plan = serializers.CharField()
    rxbin = serializers.CharField()
    rxpcn = serializers.CharField()
    rxgrp = serializers.CharField()
    card = serializers.FileField()
    uploaded = serializers.DateTimeField()

    class Meta:
        model = RxInsurance


class RxDiscountSerializer(Serializer):

    member = serializers.CharField(source="member.member_id")
    insurer = serializers.CharField()
    id_member = serializers.CharField()
    rxbin = serializers.CharField()
    rxpcn = serializers.CharField()
    rxgrp = serializers.CharField()
    card = serializers.FileField()
    uploaded = serializers.DateTimeField()

    class Meta:
        model = RxDiscount
