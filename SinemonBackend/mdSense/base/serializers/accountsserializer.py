# serializers.py in the users Django app
from django.db import transaction
from rest_framework import serializers
from dj_rest_auth.registration.serializers import RegisterSerializer

from dj_rest_auth.serializers import TokenSerializer

from base.serializers.userserializer import UserLoginSerializer


class MemberRegisterSerializer(RegisterSerializer):
    phone_number = serializers.CharField(max_length=30)

    # Define transaction.atomic to rollback the save operation in case of error
    @transaction.atomic
    def save(self, request):
        print(request)
        user = super().save(request)
        # user.gender = self.data.get('gender')
        user.phone_number = self.data.get("phone_number")
        user.save()
        return user


class MemberTokenSerializer(TokenSerializer):
    print("in token ser")
    user = UserLoginSerializer()
    token = serializers.CharField(source="key")

    # Define transaction.atomic to rollback the save operation in case of error

    class Meta(TokenSerializer.Meta):
        fields = ("user", "token")


# 'TOKEN_SERIALIZER': 'path.to.custom.TokenSerializer',
