from base.models.badge import Badge

from rest_framework import serializers

from rest_framework.serializers import SerializerMethodField, Serializer

# #from django.utils import six


class BadgeSerializer(Serializer):
    # icon = serializers.ImageField()
    badge = serializers.CharField()
    badge_type = serializers.CharField()
    tier = serializers.CharField()
    # icon = serializers.SerializerMethodField('get_img')
    icon = serializers.ImageField()

    class Meta:
        model = Badge
        fields = "__all__"
        # fields = ['badge', 'received_date', 'prov', ]

    # def get_img(self, badges):
    #     # return badges.badge.icon.url
    #     request = self.context.get('request')
    #     photo_url = badges.badge.icon.url
    #     return request.build_absolute_uri(photo_url)
