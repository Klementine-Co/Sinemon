from base.models.user import User_Custom

# from base.serializers.badgeserializer import BadgesSerializers

from rest_framework import serializers

from rest_framework.serializers import SerializerMethodField, Serializer


# from django.utils import six


class UserLoginSerializer(Serializer):
    # icon = serializers.ImageField()
    username = serializers.CharField()
    email = serializers.CharField()
    id = serializers.CharField()

    # badges = BadgesSerializer()
    # icon = serializers.SerializerMethodField('get_img')

    class Meta:
        model = User_Custom


class UserNotificationSerializer(Serializer):
    # icon = serializers.ImageField()
    username = serializers.CharField()
    email = serializers.CharField()
    id = serializers.CharField()
    first_name = serializers.CharField()
    last_name = serializers.CharField()
    middle_name = serializers.CharField()
    icon = serializers.ImageField()

    # badges = BadgesSerializer()
    # icon = serializers.SerializerMethodField('get_img')

    class Meta:
        model = User_Custom


class UserInfoSerializer(Serializer):
    # icon = serializers.ImageField()
    username = serializers.CharField()
    email = serializers.CharField()
    first_name = serializers.CharField()
    last_name = serializers.CharField()
    middle_name = serializers.CharField()
    icon = serializers.ImageField()

    street_address = serializers.CharField()
    street_address2 = serializers.CharField()
    city = serializers.CharField()
    state = serializers.CharField()
    county_code = serializers.CharField()
    country = serializers.CharField()
    zipcode = serializers.CharField()

    # badges = BadgesSerializer()
    # icon = serializers.SerializerMethodField('get_img')

    class Meta:
        model = User_Custom
        # fields = '__all__'
        # fields = ['badge', 'received_date', 'provider__user', ]

    # def get_img(self, Provider):
    #     # return badges.badge.icon.url
    #     request = self.context.get('request')
    #     photo_url = Provider.icon.url
    #     return request.build_absolute_uri(photo_url)


# class UserSerializer(Serializer):
#     # icon = serializers.ImageField()
#     username = serializers.CharField()
#     email = serializers.CharField()
#     first_name = serializers.CharField()
#     middle_name = serializers.CharField()
#     last_name = serializers.CharField()
#     icon = serializers.ImageField()
#     sex = serializers.CharField()
#     phone_number = serializers.CharField()
#     street_address = serializers.CharField()
#     street_address2 =  serializers.CharField()
#     street_address3 =  serializers.CharField()
#     city = serializers.CharField()
#     state = serializers.CharField()
#     county_code = serializers.CharField()
#     country = serializers.CharField()
#     zipcode = serializers.CharField()


#     # badges = BadgesSerializer()
#     # icon = serializers.SerializerMethodField('get_img')


#     class Meta:
#         model = User_Custom


class UserProviderSearchSerializer(serializers.ModelSerializer):

    class Meta:
        model = User_Custom
        # fields = '__all__'
        fields = [
            "city",
            "state",
            "zipcode",
            "email",
            "username",
            "icon",
            "first_name",
            "middle_name",
            "last_name",
            "street_address",
            "street_address2",
            "phone_number",
        ]


class UserMemberSearchSerializer(serializers.ModelSerializer):

    class Meta:
        model = User_Custom
        # fields = '__all__'
        fields = [
            "city",
            "state",
            "zipcode",
            "email",
            "username",
            "icon",
            "first_name",
            "middle_name",
            "last_name",
            "street_address",
            "street_address2",
            "phone_number",
        ]
