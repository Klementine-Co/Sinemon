from rest_framework.generics import ListAPIView
from rest_framework.pagination import PageNumberPagination
from rest_framework import filters
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import viewsets
from rest_framework.views import APIView
from drf_multiple_model.views import ObjectMultipleModelAPIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.authentication import (
    TokenAuthentication,
    SessionAuthentication,
    BasicAuthentication,
)
from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.http import JsonResponse

# from django.views.decorators.csrf import csrf_protect
# @csrf_protect
from django.views.decorators.csrf import csrf_exempt

from base.models.claim import *
from base.serializers.claimserializer import *


class ClaimView(ObjectMultipleModelAPIView):
    # queryset = Provider.objects.all()
    def get_queryset(self):
        return Claim_Info.objects.filter(claimid=self.request.query_params["cid"])

    def get_querylist(self):
        i_d = self.request.query_params["cid"]
        if i_d is not None:
            # print(Provider.objects.filter(provider_id=i_d)[0])
            claim = Claim_Info.objects.filter(claimid=i_d)
            details = Claim_Detail.objects.filter(claim_id=i_d)
            diagnoses = Claim_Dx.objects.filter(claim_id=i_d)
            modifiers = Claim_Mx.objects.filter(claim_id__in=[x.id for x in details])

            querylist = [
                {
                    "queryset": claim if claim else claim.none(),
                    "serializer_class": Claim_InfoSerializer,
                },
                {
                    "queryset": details if details else details.none(),
                    "serializer_class": Claim_DetailSerializer,
                },
                {"queryset": diagnoses, "serializer_class": Claim_DxSerializer},
                {
                    "queryset": modifiers if modifiers else modifiers.none(),
                    "serializer_class": Claim_MxSerializer,
                },
            ]
            return querylist
        else:
            return Claim_Info.objects.all()


def submit_claim(request):

    if request.method == "POST":

        # print(request.body)
        data = json.loads(request.body)

        # print(data)
        dr_rating = data.get("dr_stars")

    return JsonResponse({"message": "Hello, world!"}, safe=False)
