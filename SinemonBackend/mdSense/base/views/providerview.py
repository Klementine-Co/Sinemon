from base.models.provider import Provider, RenderingProvider
from base.models.license import *
from base.models.reviews import *
from base.serializers.patientvisitserializer import *
from base.serializers.providerserializer import (
    ProvidersSerializer,
    BillingProviderSerializer,
    # ProviderSerializer,
)
from rest_framework.generics import ListAPIView
from rest_framework.pagination import PageNumberPagination
from rest_framework import filters
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import viewsets
from drf_multiple_model.views import ObjectMultipleModelAPIView
from base.serializers.licenseserializer import *
from base.serializers.queueserializer import (
    QueueConfigSerializer,
    ProviderSearchSerializer,
)  # , QueueConfigsSerializer
from base.models.queue import QueueConfig


class StandardResultsSetPagination(PageNumberPagination):
    page_size = 25
    page_size_query_param = "page_size"
    max_page_size = 100


class PProfileView(ObjectMultipleModelAPIView):
    # queryset = Provider.objects.all()
    def get_queryset(self):
        return Provider.objects.filter(provider_id=self.request.query_params["pid"])

    def get_querylist(self):
        i_d = self.request.query_params["pid"]
        if i_d is not None:
            # print(Provider.objects.filter(provider_id=i_d)[0])
            provider = Provider.objects.filter(provider_id=i_d)
            licenses = License.objects.filter(prov_id=i_d)
            actions = Actions.objects.filter(prov_id=i_d)
            probations = Probations.objects.filter(prov_id=i_d)
            convictions = Convictions.objects.filter(prov_id=i_d)
            accusations = Accusations.objects.filter(prov_id=i_d)
            malpractices = Malpractices.objects.filter(prov_id=i_d)
            arbitrations = Arbitrations.objects.filter(prov_id=i_d)
            citations = Citations.objects.filter(prov_id=i_d)
            number_negatives_v = Number_negatives_v.objects.filter(prov_id=i_d)
            number_of_negatives = Number_of_negatives.objects.filter(prov_id=i_d)
            qc = QueueConfig.objects.filter(prov_id=i_d)
            pv = Patientvisit.objects.filter(prov_id=i_d)
            pv = pv if pv.exists() else pv.none()
            ratings = ProviderRatings.objects.filter(prov_id=i_d)
            ratings = ratings if ratings.exists() else ratings.none()
            renderingprovider = RenderingProvider.objects.filter(
                rendering_provider_id=i_d
            )

            querylist = [
                {
                    "queryset": provider if provider else provider.none(),
                    "serializer_class": ProvidersSerializer,
                },
                {
                    "queryset": (
                        renderingprovider
                        if renderingprovider
                        else renderingprovider.none()
                    ),
                    "serializer_class": BillingProviderSerializer,
                },
                {"queryset": pv, "serializer_class": PatientVisitIDSerializer},
                {"queryset": ratings, "serializer_class": ProviderRatingsSerializer},
                {
                    "queryset": qc if qc else qc.none(),
                    "serializer_class": QueueConfigSerializer,
                },
                {
                    "queryset": licenses if licenses else licenses.none(),
                    "serializer_class": LicenseSerializer,
                },
                {
                    "queryset": actions if actions else actions.none(),
                    "serializer_class": ActionsSerializer,
                },
                {
                    "queryset": probations if probations else probations.none(),
                    "serializer_class": ProbationsSerializer,
                },
                {
                    "queryset": convictions if convictions else convictions.none(),
                    "serializer_class": ConvictionsSerializer,
                },
                {
                    "queryset": accusations if accusations else accusations.none(),
                    "serializer_class": AccusationsSerializer,
                },
                {
                    "queryset": malpractices if malpractices else malpractices.none(),
                    "serializer_class": MalpracticesSerializer,
                },
                {
                    "queryset": arbitrations if arbitrations else arbitrations.none(),
                    "serializer_class": ArbitrationsSerializer,
                },
                {
                    "queryset": citations if citations else citations.none(),
                    "serializer_class": CitationsSerializer,
                },
                {
                    "queryset": (
                        number_negatives_v
                        if number_negatives_v
                        else number_negatives_v.none()
                    ),
                    "serializer_class": Number_negatives_vSerializer,
                },
                {
                    "queryset": (
                        number_of_negatives
                        if number_of_negatives
                        else number_of_negatives.none()
                    ),
                    "serializer_class": Number_of_negativesSerializer,
                },
            ]
            return querylist
        else:
            return Provider.objects.all()


class ProviderSearchAPI(ListAPIView):
    serializer_class = ProviderSearchSerializer
    pagination_class = StandardResultsSetPagination
    filter_backends = [DjangoFilterBackend]
    queryset = QueueConfig.objects.all().order_by("prov_id")
    filter_fields = (
        # 'email',
        "prov__npi",
        "prov__provider__user__zipcode",
        "prov__provider__user__city",
        "prov__provider__user__state",
    )

    def get_queryset(self):
        city = self.request.GET.get("city")
        # zipcode = self.request.GET.get('zipcode')
        # print(city.title())
        qs = None
        if city is not None:
            # print(Provider.objects.filter(provider__user__zipcode=zipcode))
            return self.queryset.filter(prov__provider__user__city=city.title())
        else:
            return QueueConfig.objects.all()


# from rest_framework.decorators import api_view, permission_classes
# from rest_framework.permissions import BasePermission, IsAuthenticated
# from django.contrib.auth import authenticate
# class IsMember(BasePermission):
#     def has_permission(self, request, view):
#         return User_Custom.objects.filter(email=request.user)[0].is_member
# @permission_classes([IsAuthenticated and IsMember])
class ProviderAPI(ListAPIView):
    serializer_class = ProvidersSerializer
    pagination_class = StandardResultsSetPagination
    filter_backends = [DjangoFilterBackend]
    queryset = Provider.objects.all().order_by("provider_id")
    filter_fields = (
        # 'email',
        "npi",
        "provider__user__zipcode",
        "provider__user__city",
        "provider__user__state",
    )

    def get_queryset(self):
        city = self.request.GET.get("city")
        # zipcode = self.request.GET.get('zipcode')
        # print(city.title())
        qs = None
        if city is not None:
            # print(Provider.objects.filter(provider__user__zipcode=zipcode))
            return self.queryset.filter(provider__user__city=city.title())
        else:
            return Provider.objects.all()


class ProviderViewAPI(viewsets.ModelViewSet):
    queryset = Provider.objects.all().order_by("provider_id")
    serializer_class = ProvidersSerializer
    lookup_fields = (
        "provider_id",
        "city",
    )
