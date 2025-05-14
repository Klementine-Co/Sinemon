from base.models.measure import Measures, Measure
from base.models.baseuser import BaseUser
from rest_framework import serializers
from base.serializers.baseuserserializer import (
    BaseUserInfoSerializer,
    BaseUserProviderSearchSerializer,
)

from rest_framework.serializers import SerializerMethodField, Serializer

# from django.utils import six


class MeasuresSerializer(Serializer):
    # icon = serializers.ImageField()
    assignee = serializers.CharField()
    measure = serializers.CharField()
    value = serializers.CharField()
    # icon = serializers.SerializerMethodField('get_img')

    class Meta:
        model = Measures
        fields = "__all__"
        # fields = ['badge', 'received_date', 'prov', ]

    # def get_img(self, Provider):
    #     # return badges.badge.icon.url
    #     request = self.context.get('request')
    #     photo_url = Provider.icon.url
    #     return request.build_absolute_uri(photo_url)


class MeasureSerializer(serializers.ModelSerializer):

    # measure =
    class Meta:
        model = Measure
        # fields = '__all__'
        fields = ["measure"]


class MeasuresProviderProfileSerializer(serializers.ModelSerializer):

    measure = serializers.PrimaryKeyRelatedField(
        queryset=Measure.objects.all(), many=True
    )
    assignee = BaseUserProviderSearchSerializer(many=True)

    class Meta:
        model = Measures
        # fields = '__all__'
        fields = ["rating", "assignee", "measure"]
