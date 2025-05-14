from base.models.member import Member
from base.models.medinfo import *
from base.models.insurances import *
from base.serializers.memberserializer import (
    MembersSerializer,
    # MemberSerializer,
)
from base.models.user import User_Custom
from rest_framework.generics import ListAPIView
from rest_framework.pagination import PageNumberPagination
from rest_framework import filters
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import viewsets
from rest_framework.views import APIView
from drf_multiple_model.views import ObjectMultipleModelAPIView
from base.serializers.licenseserializer import *
from base.serializers.userserializer import *
from base.serializers.queueserializer import QueueConfigSerializer
from base.models.queue import QueueConfig
from base.serializers.medinfoserializer import *
from base.serializers.insuranceserializer import *

from rest_framework.permissions import IsAuthenticated
from rest_framework.authentication import (
    TokenAuthentication,
    SessionAuthentication,
    BasicAuthentication,
)

from base.permissions.view_member_medinfo import MedinfoPermission
from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.http import JsonResponse


# from django.views.decorators.csrf import csrf_protect
# @csrf_protect


from django.views.decorators.csrf import csrf_exempt


@csrf_exempt
# @api_view(['GET', 'POST'])
def update_member(request, member_id):

    print(member_id)

    if request.method == "POST":
        city = request.POST.get("city")
        state = request.POST.get("state")
        zipcode = request.POST.get("zipcode")
        email = request.POST.get("email")
        username = request.POST.get("username")
        icon = request.POST.get("icon")
        first_name = request.POST.get("first_name")
        middle_name = request.POST.get("middle_name")
        last_name = request.POST.get("last_name")
        street_address = request.POST.get("street_address")
        street_address2 = request.POST.get("street_address2")
        phone_number = request.POST.get("phone_number")

        user = User_Custom.objects.filter(id=member_id, is_member=True)[0]
        user.update(
            city,
            state,
            zipcode,
            email,
            username,
            icon,
            first_name,
            middle_name,
            last_name,
            street_address,
            street_address2,
            phone_number,
        )

        print(user.zipcode)

        return JsonResponse(UserMemberSearchSerializer(user).data, safe=False)

    return JsonResponse({"message": "Hello, world!"}, safe=False)


def update_med_insurance(request, member_id):

    print(member_id)

    if request.method == "POST":
        insurer = request.POST.get("insurer")
        id_member = request.POST.get("id_member")
        group_no = request.POST.get("group_no")
        benefit_plan = request.POST.get("benefit_plan")
        card = request.POST.get("card")

        if id_member and group_no:
            medinsurance = MedInsurance.objects.filter(
                id_member=id_member, group_no=group_no, member_id=member_id
            )[0]
            medinsurance.update(insurer, id_member, group_no, benefit_plan, card)
        else:
            medinsurance = MedInsurance.objects.filte(member_id=member_id)
            medinsurance = medinsurance[0] if medinsurance.exists() else None

        print(medinsurance)

        return JsonResponse(MedInsuranceSerializer(medinsurance).data, safe=False)

    return JsonResponse({"message": "Hello, world!"}, safe=False)


@csrf_exempt
def update_rx_insurance(request, member_id):

    print("rxinsur", member_id)

    if request.method == "POST":
        # print(request.form)
        insurer = request.POST.get("insurer")
        id_member = request.POST.get("id_member")
        group_no = request.POST.get("group_no")
        benefit_plan = request.POST.get("benefit_plan")
        rxbin = request.POST.get("rxbin")
        rxpcn = request.POST.get("rxpcn")
        rxgrp = request.POST.get("rxgrp")
        card = request.POST.get("card")

        if id_member and group_no:
            # print('e')
            rxinsurance = RxInsurance.objects.filter(
                id_member=id_member, group_no=group_no, member_id=member_id
            )[0]
            rxinsurance.update(
                insurer, id_member, group_no, benefit_plan, rxbin, rxpcn, rxgrp, card
            )
        else:
            # print('d')
            rxinsurance = RxInsurance.objects.filter(member_id=1)
            rxinsurance = rxinsurance[0] if rxinsurance.exists() else None

        # print(rxinsurance.id_member)

        return JsonResponse(RxInsuranceSerializer(rxinsurance).data, safe=False)

    return JsonResponse({"message": "Hello, world!"}, safe=False)


def update_discrx_insurance(request, member_id):

    print(member_id)

    if request.method == "POST":
        insurer = request.POST.get("insurer")
        id_member = request.POST.get("id_member")
        rxbin = request.POST.get("rxbin")
        rxpcn = request.POST.get("rxpcn")
        rxgrp = request.POST.get("rxgrp")
        card = request.POST.get("card")

        if id_member:
            rxdiscount = RxDiscount.objects.filter(
                id_member=id_member, member_id=member_id
            )[0]
            rxdiscount.update(insurer, id_member, rxbin, rxpcn, rxgrp, card)
        else:
            rxdiscount = RxDiscount.objects.filter(member_id=member_id)
            rxdiscount = rxdiscount[0] if rxdiscount.exists() else None

        print(rxdiscount)

        return JsonResponse(RxDiscountSerializer(rxdiscount).data, safe=False)

    return JsonResponse({"message": "Hello, world!"}, safe=False)


def update_meds(request, member_id):

    print(member_id)

    if request.method == "POST":
        prescribed_date = request.POST.get("prescribed_date")
        ndc = request.POST.get("ndc")
        expiration_date = request.POST.get("expiration_date")
        lot_no = request.POST.get("lot_no")

        if ndc:
            prescription = Prescription.objects.filter(member_id=member_id, ndc=ndc)[0]
            prescription.update(prescribed_date, ndc, expiration_date, lot_no)
        else:
            prescription = Prescription.objects.filter(member_id=member_id)
            prescription = prescription[0] if prescription.exists() else None

        print(prescription)

        return JsonResponse(PrescriptionSerializer(prescription).data, safe=False)

    return JsonResponse({"message": "Hello, world!"}, safe=False)


def update_labs(request, member_id):

    if request.method == "POST":

        prov = request.POST.get("prov")
        lab = request.POST.get("lab")
        status = request.POST.get("status")
        brief_desc = request.POST.get("brief_desc")
        uploaded = request.POST.get("uploaded")

        if prov and status and uploaded:
            labss = labs.objects.filter(uploaded=uploaded, member_id=member_id)[0]
            labss.update(prov, lab, status, brief_desc)
        else:
            labss = labs.objects.filter(member_id=member_id)
            labss = labss[0] if labss.exists() else None

        print("labss in updateviews", labss)

        return JsonResponse(labsSerializer(labss).data, safe=False)

    return JsonResponse({"message": "Hello, world!"}, safe=False)
