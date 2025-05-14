from base.models.member import Member
from base.models.medinfo import *
from base.models.medinfo_release import *
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

from base.models.reviews import *

from base.serializers.claimserializer import *


class CommentingSerializer(Serializer):

    id = serializers.IntegerField()
    comment = serializers.CharField()
    comment_type = serializers.CharField()
    status = serializers.CharField()
    member = serializers.CharField(source="member.member_id")
    prov = serializers.CharField(source="prov.provider_id")
    # comment_ = serializers.SerializerMethodField('get_address')

    class Meta:
        model = Comment


class CommentSerializer(Serializer):

    id = serializers.IntegerField()
    comment = serializers.CharField()
    comment_type = serializers.CharField()
    response = serializers.CharField()
    status = serializers.CharField()
    time_limit = serializers.IntegerField()
    published = serializers.DateTimeField()
    responded = serializers.DateTimeField()
    member = serializers.CharField(source="member.member_id")
    prov = serializers.CharField(source="prov.provider_id")
    # comment_ = serializers.SerializerMethodField('get_address')

    class Meta:
        model = Comment


class ReportCardSerializer(Serializer):

    id = serializers.IntegerField()
    prov_taxonomy_code = serializers.CharField()
    specialty_code = serializers.CharField()
    question = serializers.CharField()

    class Meta:
        model = Reportcard


class ReportCardQuestionsSerializer(Serializer):

    id = serializers.IntegerField()
    question = serializers.CharField()

    class Meta:
        model = Reportcard


class PatientVisitSerializer(Serializer):

    id = serializers.IntegerField()
    prov_firstname = serializers.CharField(source="prov.provider.user.first_name")
    prov_lastname = serializers.CharField(source="prov.provider.user.last_name")
    prov = serializers.CharField(source="prov.provider_id")
    visit_date = serializers.DateTimeField()
    # approved_activity = serializers.CharField()
    member = serializers.CharField(source="member.member_id")
    counter = serializers.IntegerField()
    dr_rating = serializers.IntegerField()
    staff_rating = serializers.IntegerField()
    bedside_rating = serializers.IntegerField()
    office_rating = serializers.IntegerField()
    comment = CommentingSerializer()

    class Meta:
        model = Patientvisit


class PatientVisitIDSerializer(Serializer):

    id = serializers.IntegerField()
    member_firstname = serializers.CharField(source="member.member.user.first_name")
    member_lastname = serializers.CharField(source="member.member.user.last_name")
    prov = serializers.CharField(source="prov.provider_id")
    visit_date = serializers.DateTimeField()
    counter = serializers.IntegerField()
    # approved_activity = serializers.CharField()
    member = serializers.CharField(source="member.member_id")
    billed = serializers.BooleanField()
    # claim = serializers.CharField(source = "claim.claimid")
    claim = Claim_InfoSerializer()
    released = serializers.SerializerMethodField("get_releaseChk")

    class Meta:
        model = Patientvisit

    def get_releaseChk(self, obj):

        chk = Medinfo_release.objects.filter(assigned_id=obj.prov.provider_id)
        if chk:
            return chk[0].viewable
        else:
            return False


class PatientVisitIDSerializer2(Serializer):

    id = serializers.IntegerField()
    prov_firstname = serializers.CharField(source="prov.provider.user.first_name")
    prov_lastname = serializers.CharField(source="prov.provider.user.last_name")
    prov = serializers.CharField(source="prov.provider_id")
    visit_date = serializers.DateTimeField()
    counter = serializers.IntegerField()
    # approved_activity = serializers.CharField()
    member = serializers.CharField(source="member.member_id")
    # billed = serializers.BooleanField()

    class Meta:
        model = Patientvisit


class ProviderRatingsSerializer(Serializer):

    prov = serializers.CharField(source="prov.provider_id")
    dr_rating = serializers.IntegerField()
    staff_rating = serializers.IntegerField()
    bedside_rating = serializers.IntegerField()
    office_rating = serializers.IntegerField()
    rating = serializers.CharField()
    score = serializers.IntegerField()
    update_date = serializers.DateTimeField()

    class Meta:
        model = ProviderRatings
