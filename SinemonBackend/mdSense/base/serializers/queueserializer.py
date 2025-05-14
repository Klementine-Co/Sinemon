from rest_framework import serializers
from rest_framework.serializers import (
    SerializerMethodField,
    Serializer,
    ModelSerializer,
)
from base.serializers.providerserializer import ProviderSerializer
from base.serializers.memberserializer import MemberSerializer

# from django.utils import six
from django.core.serializers import serialize
from base.models.queue import *


class QueueSerializer(serializers.ModelSerializer):

    # m_status = serializers.CharField()
    # p_status = serializers.CharField()
    # est_wait_time = serializers.IntegerField()
    # join_date = serializers.DateTimeField()
    # leave_date = serializers.DateTimeField()
    prov = ProviderSerializer()
    member = MemberSerializer()
    # position = serializers.IntegerField()

    class Meta:
        model = Queue
        fields = "__all__"
        # fields = ['badge', 'received_date', 'prov', ]


class PQueueSerializer(Serializer):

    m_status = serializers.CharField()
    p_status = serializers.CharField()
    est_wait_time = serializers.IntegerField()
    join_date = serializers.DateTimeField()
    leave_date = serializers.DateTimeField()
    prov = serializers.CharField(source="prov.provider_id")
    member = MemberSerializer()
    position = serializers.IntegerField()

    class Meta:
        model = Queue
        # fields = '__all__'
        # exclude = ('prov', 'member')
        # fields = ['m_status', 'p_status', 'prov_id', 'member_id', 'join_date', 'leave_date', 'position', 'est_wait_time']


class ProviderSearchSerializer(Serializer):

    open_time = serializers.TimeField()
    close_time = serializers.TimeField()
    status = serializers.CharField()
    inqueue = serializers.IntegerField()
    end_before_close = serializers.IntegerField()
    est_wait_time = serializers.SerializerMethodField("get_wait")
    prov_firstname = serializers.CharField(source="prov.provider.user.first_name")
    prov_lastname = serializers.CharField(source="prov.provider.user.last_name")
    prov = serializers.CharField(source="prov.provider_id")
    lobby_state = serializers.CharField(source="prov.lobby_state")
    lobby_city = serializers.CharField(source="prov.lobby_city")
    lobby_zipcode = serializers.CharField(source="prov.lobby_zipcode")
    lobby_street_address = serializers.CharField(source="prov.lobby_street_address")
    lobby_phone = serializers.CharField(source="prov.lobby_phone")
    specialty_code = serializers.CharField(source="prov.get_specialty_code_display")
    prov_taxonomy_code = serializers.CharField(
        source="prov.get_prov_taxonomy_code_display"
    )
    preferred_name = serializers.CharField(source="prov.preferred_name")
    npi = serializers.CharField(source="prov.npi")
    salutation = serializers.CharField(source="prov.salutation")

    class Meta:
        model = QueueConfig
        # fields = ['badge', 'received_date', 'prov', ]

    def get_wait(self, obj):

        return obj.getWaitTime()


class QueueConfigSerializer(Serializer):

    open_time = serializers.TimeField()
    close_time = serializers.TimeField()
    status = serializers.CharField()
    capacity = serializers.IntegerField()
    inqueue = serializers.IntegerField()
    end_before_close = serializers.IntegerField()
    time_before_noshow = serializers.IntegerField()
    time_between_patients = serializers.IntegerField()
    pause_time = serializers.IntegerField()
    est_wait_time = serializers.SerializerMethodField("get_wait")
    prov_firstname = serializers.CharField(source="prov.provider.user.first_name")
    prov_lastname = serializers.CharField(source="prov.provider.user.last_name")
    prov = serializers.CharField(source="prov.provider_id")

    class Meta:
        model = QueueConfig
        # fields = ['badge', 'received_date', 'prov', ]

    def get_wait(self, obj):

        return obj.getWaitTime()


# class QueueConfigsSerializer(Serializer):


#     open_time = serializers.TimeField()
#     close_time = serializers.TimeField()
#     status = serializers.CharField()
#     capacity = serializers.IntegerField()
#     inqueue = serializers.IntegerField()
#     end_before_close = serializers.IntegerField()
#     time_before_noshow = serializers.IntegerField()
#     time_between_patients = serializers.IntegerField()
#     pause_time = serializers.IntegerField()
#     est_wait_time = serializers.SerializerMethodField('get_wait')
#     prov = ProviderSerializer()


#     class Meta:
#         model = QueueConfig
#         # fields = ['badge', 'received_date', 'prov', ]


#     def get_wait(self, obj):

#         return obj.getWaitTime()
