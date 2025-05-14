from base.models.member import Member
from base.models.user import *
from base.models.measure import Measures, Measure
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

from base.models.medinfo_release import *


class MembersSerializer(Serializer):

    member = BaseUserMemberSearchSerializer()
    member_id = serializers.PrimaryKeyRelatedField(read_only=True)
    salutation = serializers.CharField()
    icon = serializers.ImageField()

    class Meta:
        model = Member


class MemberSerializer(Serializer):
    member = BaseUserMemberSearchSerializer()
    member_id = serializers.PrimaryKeyRelatedField(read_only=True)
    salutation = serializers.CharField()
    icon = serializers.ImageField()

    lookup_fields = ("member_id", "member__city")
    extra_kwargs = {
        "url": {"lookup_field": "member_id"},
        "address": {"required": True},
    }

    class Meta:
        model = Member
        fields = ["member_id", "member", "icon", "salutation"]


# Create Account serializer


class AccountsSerializer(Serializer):

    # def __init__(self, *args, **kwargs):
    # self.accountid = kwargs.pop('accountid', None)
    # super(AccountsSerializer, self).__init__(*args, **kwargs)

    # def to_representation(self, instance):

    #     ret = super(AccountsSerializer, self).to_representation(instance)
    #     request = self.context.get('request')
    #     if request and self.accountid:
    #         ret['accountid'] = request.build_absolute_uri(self.accountid)

    #     return ret

    # def to_representation(self, instance):

    #     accountid = self.context.get('accountid', None)
    #     print('CONTEXT ACCT ID', accountid)
    #     ret = super(AccountsSerializer, self).to_representation(instance)
    #     request = self.context.get('request')
    #     if request and accountid:
    #         ret['accountid'] = request.build_absolute_uri(accountid)

    #     return ret

    id = serializers.PrimaryKeyRelatedField(read_only=True)
    first_name = serializers.CharField()
    last_name = serializers.CharField()
    middle_name = serializers.CharField()
    email = serializers.CharField()
    account_number = serializers.CharField()
    privilege = serializers.SerializerMethodField("get_privilege")

    def get_privilege(self, User_Custom):
        # print(User_Custom.account_number, self.fields, self.context)
        request = self.context.get("request")
        # privilege = Accounts.objects.filter(account_number = User_Custom.account_number, assigned_id=self.accountid)
        privilege = Accounts.objects.filter(
            account_number=User_Custom.account_number,
            assigned_id=self.context.get("accountid", None),
        )
        if privilege.exists():
            privilege = privilege[0].get_privilege_display()
        else:
            privilege = None
        # print(privilege)
        return privilege

    class Meta:
        model = User_Custom

        fields = ["id", "first_name", "last_name", "middle_name", "email", "privilege"]
