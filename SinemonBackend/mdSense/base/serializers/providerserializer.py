from base.models.provider import Provider, Provider_Desc, RenderingProvider
from base.models.measure import Measures, Measure

# from base.serializers.badgeserializer import BadgesSerializers

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
)

# from base.serializers.voteserializer import VoteSerializer
from base.serializers.measureserializer import MeasuresProviderProfileSerializer

# from django.utils import six
from django.core.serializers import serialize

# class ProviderDescSerializer(Serializer):
#     specialty_code = serializers.CharField()
#     # prov_taxonomy_code = serializers.CharField()

#     class Meta:
#         model = Provider_Desc
#         fields = ['specialty_code',]

# def get_specialty_code(self, obj):

#     print(obj)
#     print(obj.objects.get(specialty_code=self.specialty_code).getSpecialty()['value'])
#     return obj.objects.get(specialty_code=self.specialty_code).getSpecialty()['value']


import json


class ProvidersSerializer(Serializer):
    provider = BaseUserProviderSearchSerializer()
    provider_id = serializers.PrimaryKeyRelatedField(read_only=True)
    salutation = serializers.CharField()
    specialty_code = serializers.CharField(source="get_specialty_code_display")
    prov_taxonomy_code = serializers.CharField(source="get_prov_taxonomy_code_display")
    npi = serializers.IntegerField()
    icon = serializers.ImageField()
    badge = BadgeSerializer()
    votee = serializers.IntegerField()
    about = serializers.CharField()
    tip = serializers.CharField()
    preferred_name = serializers.CharField()

    class Meta:
        model = Provider
        # fields = '__all__'
        # depth = 1 soecifies how deep to return results
        # fields = ['provider_id',  'prov_desc', 'npi', 'icon', 'salutation', 'badge', 'provider__user__city']

    def get_img(self, Provider):
        # return badges.badge.icon.url
        request = self.context.get("request")
        photo_url = Provider.icon.url
        return request.build_absolute_uri(photo_url) if photo_url else None


class BillingProviderSerializer(Serializer):

    billing_prov = ProvidersSerializer()

    class Meta:
        model = RenderingProvider


class ImageFiel(serializers.ImageField):
    def value_to_string(
        self, obj
    ):  # obj is Model instance, in this case, obj is 'Class'
        return obj.fig.url


class ProviderSerializer(Serializer):
    # icon = serializers.ImageField()
    provider = BaseUserInfoSerializer()
    provider_id = serializers.PrimaryKeyRelatedField(read_only=True)
    # prov_desc = serializers.SerializerMethodField('get_prov_desc')
    # prov_desc_ = serializers.SerializerMethodField('get_prov_desc')
    salutation = serializers.CharField()
    specialty_code = serializers.CharField(source="get_specialty_code_display")
    prov_taxonomy_code = serializers.CharField(source="get_prov_taxonomy_code_display")
    npi = serializers.IntegerField()
    icon = ImageFiel()
    preferred_name = serializers.CharField()
    # icon = serializers.SerializerMethodField('get_img')
    badge = BadgeSerializer()
    votee = serializers.IntegerField()
    about = serializers.CharField()
    tip = serializers.CharField()
    # measure =  MeasuresProviderProfileSerializer()
    # address = serializers.SerializerMethodField('get_address')
    # addy = AddressSerializer()
    lookup_fields = ("provider_id", "provider__city")
    extra_kwargs = {
        "url": {"lookup_field": "provider_id"},
        "address": {"required": True},
    }
    # icon = serializers.SerializerMethodField('get_img')

    # def get_address(self, obj):

    #     if Address.objects.filter(user=obj.provider):
    #         # x = serialize('json', [Address.objects.get(user=obj.provider)],ensure_ascii=False)
    #         # return json.loads(x)[0]
    #         return AddressSerializer(instance=Address.objects.get(user=obj.provider)).data
    #     else:
    #         return 'none'

    class Meta:
        model = Provider
        # fields = '__all__'
        # depth = 1 soecifies how deep to return results
        fields = [
            "provider_id",
            "provider",
            "prov_desc",
            "npi",
            "icon",
            "salutation",
            "badge",
            "votee",
        ]
        # required_fields = ['address',]

    def get_prov_desc(self, obj):

        if obj.prov_desc:
            # print(Provider_Desc.objects.get(specialty_code=obj.prov_desc.specialty_code).getSpecialty())
            # print(Address.objects.get(user=obj.provider))
            return (
                Provider_Desc.objects.get(specialty_code=obj.prov_desc.specialty_code)
                .getSpecialty()
                .lower()
            )
        else:
            return "none"

    def get_img(self, Provider):
        # return badges.badge.icon.url
        request = self.context.get("request")
        photo_url = Provider.icon.url
        return request.build_absolute_uri(photo_url)


class ProviderDescSerializer(Serializer):

    specialty_code = serializers.SerializerMethodField()
    id = serializers.SerializerMethodField()
    # prov_taxonomy_code = serializers.CharField()

    class Meta:
        model = Provider_Desc
        fields = ["specialty_code", "id"]

    def get_specialty_code(self, obj):

        return obj.getSpecialty().lower()

    def get_id(self, obj):

        return obj.specialty_code
