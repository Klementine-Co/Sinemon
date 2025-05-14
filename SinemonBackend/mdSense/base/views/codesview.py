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

from base.models.MEDCODES import *
from base.serializers.codesserializer import *


def get_Mcodes(request):

    # print(request.GET.get('cat'))

    if request.method == "GET":

        cat_desc = request.GET.get("cat_desc")
        Mcodess = Mcodes.objects.filter(cat_desc=cat_desc)

        return JsonResponse(McodesSerializer(Mcodess, many=True).data, safe=False)

    return JsonResponse({"message": "Hello, world!"}, safe=False)


def get_POScodes(request):

    # print(request.GET.get('cat'))

    if request.method == "GET":

        desc = request.GET.get("desc")
        POScodess = POScodes.objects.filter(desc=desc)

        return JsonResponse(POScodesSerializer(POScodess, many=True).data, safe=False)

    return JsonResponse({"message": "Hello, world!"}, safe=False)


def get_Pcodes(request):

    # print(request.GET.get('cat'))

    if request.method == "GET":

        cat = request.GET.get("cat")
        Pcodess = Pcodes.objects.filter(cat=cat)

        return JsonResponse(PcodesSerializer(Pcodess, many=True).data, safe=False)

    return JsonResponse({"message": "Hello, world!"}, safe=False)


def get_PcodesCat(request):

    if request.method == "GET":
        cat_desc = request.GET.get("cat_desc")
        Pcodess = Pcodes.objects.filter(cat_desc=cat_desc)

        return JsonResponse(PcodesCatSerializer(Pcodess, many=True).data, safe=False)

    return JsonResponse({"message": "Hello, world!"}, safe=False)


def get_Dcodes(request):

    if request.method == "GET":
        cat = request.GET.get("cat")
        Dcodess = Dcodes.objects.filter(cat=cat)

        return JsonResponse(DcodesSerializer(Dcodess, many=True).data, safe=False)

    return JsonResponse({"message": "Hello, world!"}, safe=False)


def get_DcodesCat(request):

    if request.method == "GET":
        cat_desc = request.GET.get("cat_desc")
        Dcodess = Dcodes.objects.filter(cat_desc=cat_desc)

        return JsonResponse(DcodesCatSerializer(Dcodess, many=True).data, safe=False)

    return JsonResponse({"message": "Hello, world!"}, safe=False)
