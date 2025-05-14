from base.models.appointment import Availability

from rest_framework import serializers

# from django.utils import six


class AppointmentSerializer(serializers.ModelSerializer):
    slot = serializers.CharField()
    open = serializers.CharField()
    prov = serializers.CharField()

    class Meta:
        model = Availability
        fields = "__all__"


#         fields = (
#             'slot',
#             'prov',
#             'open'
#         )

# class AppointmentSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = Availability
#         fields = '__all__'
# def get_slot(self, obj):
#     return six.text_type(obj.slot)
