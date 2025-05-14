from base.models.score import Scores

from rest_framework import serializers

from rest_framework.serializers import SerializerMethodField, Serializer

# from django.utils import six


class ScoresSerializer(Serializer):
    # icon = serializers.ImageField()
    score = serializers.CharField()
    received_date = serializers.CharField()
    prov = serializers.CharField()
    number_of_negatives = serializers.CharField()

    class Meta:
        model = Scores
        fields = "__all__"
        # fields = ['badge', 'received_date', 'prov', ]
