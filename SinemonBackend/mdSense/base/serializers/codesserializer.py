from rest_framework import serializers
from rest_framework.serializers import (
    SerializerMethodField,
    Serializer,
    ModelSerializer,
)

# from django.utils import six
from django.core.serializers import serialize
import json
from base.models.MEDCODES import *


class PcodesSerializer(Serializer):

    desc = serializers.CharField()
    code = serializers.CharField()

    class Meta:
        model = Pcodes


class PcodesCatSerializer(Serializer):

    cat_desc = serializers.CharField()
    cat = serializers.CharField()

    class Meta:
        model = Pcodes


class McodesSerializer(Serializer):

    desc = serializers.CharField()
    code = serializers.CharField()

    class Meta:
        model = Mcodes


class POScodesSerializer(Serializer):

    desc = serializers.CharField()
    code = serializers.CharField()

    class Meta:
        model = POScodes


class DcodesSerializer(Serializer):

    desc = serializers.CharField()
    code = serializers.CharField()

    class Meta:
        model = Dcodes


class POScodesSerializer(Serializer):

    desc = serializers.CharField()
    code = serializers.CharField()

    class Meta:
        model = POScodes


class DcodesCatSerializer(Serializer):

    cat_desc = serializers.CharField()
    cat = serializers.CharField()

    class Meta:
        model = Dcodes


class McodesSerializer(Serializer):

    desc = serializers.CharField()
    code = serializers.CharField()

    class Meta:
        model = Mcodes
