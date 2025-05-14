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
    BaseUserNotificationSerializer,
)
from base.serializers.measureserializer import MeasuresProviderProfileSerializer

# from django.utils import six
from django.core.serializers import serialize
import json

from base.models.notifications import Notification


class NotificationSerializer(Serializer):

    thread_id = serializers.CharField()
    msg = serializers.CharField()
    time = serializers.DateTimeField()
    sender = BaseUserNotificationSerializer()
    receiver = BaseUserNotificationSerializer()
    notification_type = serializers.CharField()
    read_msg = serializers.CharField()
    id = serializers.CharField()

    class Meta:
        model = Notification
