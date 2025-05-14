from base.models.member import Member
from base.models.medinfo import *
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


class PrescriptionSerializer(Serializer):

    id = serializers.IntegerField()
    prescribed_date = serializers.DateTimeField()
    ndc = serializers.IntegerField()
    expiration_date = serializers.DateTimeField()
    lot_no = serializers.CharField()
    prescriber = serializers.IntegerField()
    member = serializers.CharField(source="member.member_id")

    class Meta:
        model = Prescription


class BodyCompSerializer(Serializer):

    id = serializers.IntegerField()
    member = serializers.CharField(source="member.member_id")
    bmi = serializers.IntegerField()  # integer
    bf = serializers.IntegerField()  # percent
    height = serializers.IntegerField()  # inches for standard / centimeters for metric
    weight = serializers.IntegerField()  # lbs for standard / kgs for metric
    measurement = serializers.CharField()  # standard / metric
    updated = serializers.DateTimeField()

    class Meta:
        model = BodyComp


class VaccinationsSerializer(Serializer):

    id = serializers.IntegerField()
    prov_firstname = serializers.CharField(source="prov.provider.user.first_name")
    prov_lastname = serializers.CharField(source="prov.provider.user.last_name")
    prov = serializers.CharField(source="prov.provider_id")
    vaccination = serializers.CharField()
    vaccination_date = serializers.DateTimeField()
    member = serializers.CharField(source="member.member_id")

    class Meta:
        model = Vaccinations


class VisitsSerializer(Serializer):

    id = serializers.IntegerField()
    prov_firstname = serializers.CharField(source="prov.provider.user.first_name")
    prov_lastname = serializers.CharField(source="prov.provider.user.last_name")
    prov = serializers.CharField(source="prov.provider_id")
    visit_date = serializers.DateTimeField()
    approved_activity = serializers.CharField()
    member = serializers.CharField(source="member.member_id")

    class Meta:
        model = Visits


class mdNotesSerializer(Serializer):

    id = serializers.IntegerField()
    prov_firstname = serializers.CharField(source="prov.provider.user.first_name")
    prov_lastname = serializers.CharField(source="prov.provider.user.last_name")
    prov = serializers.CharField(source="prov.provider_id")
    note = serializers.CharField()
    chief_complaint = serializers.CharField()
    history = serializers.CharField()
    exam = serializers.CharField()
    assessment = serializers.CharField()
    member = serializers.CharField(source="member.member_id")
    uploaded = serializers.DateTimeField()

    class Meta:
        model = mdNotes


class labsSerializer(Serializer):

    id = serializers.IntegerField()
    prov_firstname = serializers.CharField(source="prov.provider.user.first_name")
    prov_lastname = serializers.CharField(source="prov.provider.user.last_name")
    prov = serializers.CharField(source="prov.provider_id")
    lab = serializers.FileField()
    # member_id = serializers.SerializerMethodField('get_memberid')#MemberSerializer()
    status = serializers.CharField()
    uploaded = serializers.DateTimeField()
    brief_desc = serializers.CharField()
    member = serializers.CharField(source="member.member_id")

    class Meta:
        model = labs

    # def get_memberid
