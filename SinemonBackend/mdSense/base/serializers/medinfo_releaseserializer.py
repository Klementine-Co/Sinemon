from base.models.member import Member
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

from base.serializers.memberserializer import (
    MembersSerializer,
    MemberSerializer,
)

from base.serializers.providerserializer import (
    ProvidersSerializer,
    ProviderSerializer,
)


class Medinfo_ReleaseSerializer(Serializer):

    released = serializers.Field()
    expired = serializers.Field()
    viewable = serializers.Field()
    assigned = serializers.CharField(source="assigned.user_id")
    member = serializers.CharField(source="member.member_id")

    class Meta:
        model = Medinfo_release
        fields = (
            "member",
            "assigned",
            "released",
            "expired",
            "exp_time",
            "date_released",
            "viewable",
        )


class MedinfoReleaseSerializer(Serializer):

    # released = serializers.Field()
    date_released = serializers.DateTimeField()
    expired = serializers.BooleanField()
    assigned = serializers.CharField(source="assigned.user_id")
    member = MemberSerializer()
    viewable = serializers.BooleanField()

    class Meta:
        model = Medinfo_release
        fields = (
            "member",
            "assigned",
            "released",
            "expired",
            "date_released",
            "viewable",
        )


class ReleasedSerializer(serializers.ModelSerializer):

    # expired = serializers.Field()

    class Meta:
        model = Medinfo_release
        fields = ("expired",)
