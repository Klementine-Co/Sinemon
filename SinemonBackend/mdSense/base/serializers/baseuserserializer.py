from base.models.baseuser import BaseUser

# from base.serializers.badgeserializer import BadgesSerializers

from rest_framework import serializers

from rest_framework.serializers import SerializerMethodField, Serializer

from base.serializers.userserializer import (
    UserInfoSerializer,
    UserProviderSearchSerializer,
    UserMemberSearchSerializer,
    UserNotificationSerializer,
)


# from django.utils import six


class BaseUserInfoSerializer(Serializer):

    user = UserInfoSerializer()

    class Meta:
        model = BaseUser
        # fields = '__all__'
        # fields = ['badge', 'received_date', 'provider__user__city', ]

    # def get_img(self, Provider):
    #     # return badges.badge.icon.url
    #     request = self.context.get('request')
    #     photo_url = Provider.icon.url
    #     return request.build_absolute_uri(photo_url)


class BaseUserProviderSearchSerializer(Serializer):

    user = UserProviderSearchSerializer()

    class Meta:
        model = BaseUser


class BaseUserMemberSearchSerializer(Serializer):

    user = UserMemberSearchSerializer()

    class Meta:
        model = BaseUser


class BaseUserNotificationSerializer(Serializer):

    user = UserNotificationSerializer()

    class Meta:
        model = BaseUser
