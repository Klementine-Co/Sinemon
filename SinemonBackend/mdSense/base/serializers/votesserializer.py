from base.models.vote import Votes

from rest_framework import serializers

from rest_framework.serializers import SerializerMethodField, Serializer

# from django.utils import six


class VotesSerializer(Serializer):

    vote = serializers.IntegerField()

    class Meta:
        model = Votes
        fields = "__all__"
        # fields = ['badge', 'received_date', 'prov', ]

    # def get_img(self, badges):
    #     # return badges.badge.icon.url
    #     request = self.context.get('request')
    #     photo_url = badges.badge.icon.url
    #     return request.build_absolute_uri(photo_url)
