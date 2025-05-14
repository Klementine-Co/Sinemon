from rest_framework import serializers
from rest_framework.serializers import (
    SerializerMethodField,
    Serializer,
    ModelSerializer,
)

# from django.utils import six
from django.core.serializers import serialize
import json
from base.models.claim import *

from base.serializers.codesserializer import *


class Claim_InfoSerializer(Serializer):

    claimid = serializers.CharField()
    member = serializers.CharField(source="member.member_id")
    billing = serializers.CharField(source="billing.provider_id")
    total_amt = serializers.DecimalField(max_digits=15, decimal_places=3)
    loaded = serializers.DateTimeField()
    submitted = serializers.BooleanField()
    primary_diagnosis = serializers.CharField()

    class Meta:
        model = Claim_Info


class Claim_DetailSerializer(Serializer):

    claim = serializers.CharField(source="claim.claimid")
    ref = serializers.CharField()
    rendering = serializers.CharField(source="rendering.provider_id")
    referrer = serializers.CharField(source="referrer.provider_id")
    amt = serializers.DecimalField(max_digits=15, decimal_places=3)
    fromdate = serializers.DateTimeField()
    todate = serializers.DateTimeField()
    units = serializers.IntegerField()
    location = serializers.CharField()
    procedure_code = PcodesSerializer()
    place_of_service = POScodesSerializer()
    dx_pointer = serializers.CharField()

    class Meta:
        model = Claim_Detail


class Claim_DxSerializer(Serializer):

    claim = serializers.CharField(source="claim.claimid")
    ref = serializers.CharField()
    diagnosis = DcodesSerializer()

    class Meta:
        model = Claim_Dx


class Claim_MxSerializer(Serializer):

    claim = serializers.CharField(source="claim.claim.claimid")
    modifier = McodesSerializer()
    ref = serializers.CharField(source="claim.ref")

    class Meta:
        model = Claim_Mx
