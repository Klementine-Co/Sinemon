from base.models.member import Member
from base.models.medinfo import *
from base.models.insurances import *
from base.models.reviews import *
from base.serializers.memberserializer import (
    MembersSerializer,
    # MemberSerializer,
    AccountsSerializer,
    # AccountSerializer
)
from base.models.medinfo_release import *
from base.serializers.medinfo_releaseserializer import *
from base.serializers.licenseserializer import *
from base.serializers.userserializer import *
from base.serializers.queueserializer import QueueConfigSerializer
from base.models.queue import QueueConfig
from base.serializers.medinfoserializer import *
from base.serializers.insuranceserializer import *

from base.models.user import User_Custom
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

from base.permissions import *
from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.http import JsonResponse
from django.shortcuts import redirect, reverse

from base.serializers.patientvisitserializer import *


class StandardResultsSetPagination(PageNumberPagination):
    page_size = 25
    page_size_query_param = "page_size"
    max_page_size = 100


class MemberAPI(ListAPIView):
    serializer_class = MembersSerializer
    pagination_class = StandardResultsSetPagination
    filter_backends = [DjangoFilterBackend]
    queryset = Member.objects.all().order_by("member_id")
    filter_fields = (
        # 'email',
        "member__user__first_name",
        "member__user__last_name",
        "member__user__username",
        "member__user__zipcode",
        "member__user__city",
        "member__user__state",
    )

    def get_queryset(self):
        first_name = self.request.GET.get("firstname")
        last_name = self.request.GET.get("lastname")
        mid = self.request.GET.get("mid")
        # zipcode = self.request.GET.get('zipcode')

        print(last_name)
        qs = None
        if exist(mid):
            return self.queryset.filter(member_id=mid)
        elif exist(first_name) and exist(last_name):
            return self.queryset.filter(
                member__user__first_name=first_name.title(),
                member__user__last_name=last_name.title(),
            )
        elif exist(first_name) and not exist(first_name):
            return self.queryset.filter(member__user__first_name=first_name.title())
        elif not exist(first_name) and exist(first_name):
            return self.queryset.filter(member__user__last_name=last_name.title())
        else:
            return Member.objects.all()


# mbrs = Patientvisit.objects.filter(member_id=i_d).values('member_id')
# medinfombrs = Medinfo_release.objects.filter(member_id__in=mbrs)
# Medinfo_release.objects.filter( assigned_id=)


class MembersAPI(ListAPIView):
    serializer_class = MedinfoReleaseSerializer
    pagination_class = StandardResultsSetPagination
    filter_backends = [DjangoFilterBackend]
    queryset = Medinfo_release.objects.all().order_by("released")
    filter_fields = (
        # 'email',
        "member__user__first_name",
        "member__user__last_name",
        "member__user__username",
        "member__user__zipcode",
        "member__user__city",
        "member__user__state",
    )

    def get_queryset(self):
        first_name = self.request.GET.get("firstname")
        last_name = self.request.GET.get("lastname")
        mid = self.request.GET.get("mid")
        myid = self.request.baseuser.user_id
        # print(myid)
        # zipcode = self.request.GET.get('zipcode')

        print(last_name)
        qs = None
        if exist(mid):
            return self.queryset.filter(assigned_id=myid, member_id=mid)
        elif exist(first_name) and exist(last_name):
            return self.queryset.filter(
                assigned_id=myid,
                member__user__first_name=first_name.title(),
                member__user__last_name=last_name.title(),
            )
        elif exist(first_name) and not exist(first_name):
            return self.queryset.filter(
                assigned_id=myid, member__user__first_name=first_name.title()
            )
        elif not exist(first_name) and exist(first_name):
            return self.queryset.filter(
                assigned_id=myid, member__user__last_name=last_name.title()
            )
        else:
            return self.queryset.filter(assigned_id=myid)


def exist(x):

    return False if x is None or x == "None" else True


# #https://stackoverflow.com/questions/42297614/django-forms-with-reactjs
# class MemberCreateUpdate(APIView):
#     # Assume you have a model named UserProfile
#     # And a serializer for that model named UserSerializer
#     # This is the view to let users update their profile info.
#     # Like E-Mail, Birth Date etc.

#     def get_object(self, pk):
#         try:
#             return User_Custom.objects.get(pk=pk)
#         except:
#             return None

#     # this method will be called when your request is GET
#     # we will use this to fetch field names and values while creating our form on React side
#     def get(self, request, pk, format=None):
#         user = self.get_object(pk)

#         if not user:
#             return JsonResponse({'status': 0, 'message': 'User with this id not found'})

#         # You have a serializer that you specified which fields should be available in fo
#         serializer = UserSerializer(user)
#         # And here we send it those fields to our react component as json
#         # Check this json data on React side, parse it, render it as form.
#         return JsonResponse(serializer.data, safe=False)

#     # this method will be used when user try to update or save their profile
#     # for POST requests.
#     def post(self, request, pk, format=None):
#         try:
#             user = self.get_object(pk)
#         except:
#             return JsonResponse({'status': 0, 'message': 'User with this id not found'})

#         e_mail = request.data.get("email", None)
#         birth_date = request.data.get('birth_date', None)
#         job = request.data.get('job', None)

#         user.email = e_mail
#         user.birth_date = birth_date
#         user.job = job

#         try:
#             user.save()
#             return JsonResponse({'status': 1, 'message': 'Your profile updated successfully!'})
#         except:
#             return JsonResponse({'status': 0, 'message': 'There was something wrong while updating your profile.'})

#     def post(self, request):
#         article = request.data.get('article')

#         # Create an article from the above data
#         serializer = ArticleSerializer(data=article)
#         if serializer.is_valid(raise_exception=True):
#             article_saved = serializer.save()
#         return Response({"success": "Article '{}' created successfully".format(article_saved.title)})


class MProfileView(ObjectMultipleModelAPIView):
    # queryset = Member.objects.all()
    authentication_classes = [SessionAuthentication]
    # permission_classes = [SwitchMemberAccounts, MedinfoPermission, ]

    def get_permissions(self):

        if self.request.query_params.get("account_number", None):
            print(self.request.query_params["account_number"])
            return [SwitchMemberAccounts()]
        else:
            return [MedinfoPermission()]

    def get_serializer_context(self):

        context = super(MProfileView, self).get_serializer_context()
        # print('Context', self.request.user.id)
        context["accountid"] = self.request.user.id
        return context

    def get_queryset(self):
        # print('getting list 1', self.request.user.id)
        # print('getting list 2', self.request.baseuser.user_id)

        return Member.objects.filter(member_id=self.request.query_params["mid"])

    def get_querylist(self):
        # print('getting list 1', self.request.user.id)
        # print('getting list 2', self.request.baseuser.user_id)
        # print(self.request.context, 'Session')
        # print('getting list 2', self.request.headers)
        # print('getting list 3', self.request.COOKIES)
        # print('getting list 4', self.request.META['CSRF_COOKIE'])
        i_d = self.request.query_params["mid"]
        # my_i_d = self.request.query_params["myid"]
        # print(i_d)
        # if my_i_d:
        #     if my_i_d != i_d:
        #         released = Medinfo_release.objects.filter(assigned_id=my_i_d, member_id=i_d)

        if i_d is not None:
            # print('ID', i_d)
            member = Member.objects.filter(member_id=i_d)
            prescriptions = Prescription.objects.filter(member_id=i_d)
            bodycomp = BodyComp.objects.filter(member_id=i_d)
            vaccinations = Vaccinations.objects.filter(member_id=i_d)
            visits = Visits.objects.filter(member_id=i_d)
            mdnotes = mdNotes.objects.filter(member_id=i_d)
            labss = labs.objects.filter(member_id=i_d)
            medinsurance = MedInsurance.objects.filter(member_id=i_d)
            rxinsurance = RxInsurance.objects.filter(member_id=i_d)
            rxdiscount = RxDiscount.objects.filter(member_id=i_d)
            pv = Patientvisit.objects.filter(member_id=i_d, asked="Y")
            accounts = Accounts.objects.get_users(
                assigned_id=self.request.baseuser.user_id, privilege="GTC"
            )

            # print('bodycomp', bodycomp)

            questions = pv[0].getquestions() if pv.exists() else pv.none()
            pv = pv if pv.exists() else pv.none()

            if str(self.request.baseuser.user_id) == str(i_d):
                # print('DEBUG')
                visit = [
                    {
                        "queryset": questions,
                        "serializer_class": ReportCardQuestionsSerializer,
                    },
                    {"queryset": pv, "serializer_class": PatientVisitIDSerializer2},
                ]
            else:
                visit = [{"queryset": pv, "serializer_class": PatientVisitIDSerializer}]

            # print('questions', questions)
            print("ACCOUNTS!! ", self.request.baseuser.user_id)
            # print(AccountSerializer(AccountsSerializer(accounts)) if accounts else accounts.none())
            # print(ReleasedSerializer(released[0]).data)
            querylist = visit + [
                {
                    "queryset": member if member else member.none(),
                    "serializer_class": MembersSerializer,
                },
                # {'queryset': released if released else released.none(), 'serializer_class': ReleasedSerializer},
                # {'queryset': questions, 'serializer_class': ReportCardQuestionsSerializer},
                {
                    "queryset": accounts if accounts else accounts.none(),
                    "serializer_class": AccountsSerializer,
                },
                {
                    "queryset": (
                        prescriptions if prescriptions else prescriptions.none()
                    ),
                    "serializer_class": PrescriptionSerializer,
                },
                {
                    "queryset": bodycomp if bodycomp else bodycomp.none(),
                    "serializer_class": BodyCompSerializer,
                },
                {
                    "queryset": vaccinations if vaccinations else vaccinations.none(),
                    "serializer_class": VaccinationsSerializer,
                },
                {
                    "queryset": visits if visits else visits.none(),
                    "serializer_class": VisitsSerializer,
                },
                {
                    "queryset": mdnotes if mdnotes else mdnotes.none(),
                    "serializer_class": mdNotesSerializer,
                },
                {
                    "queryset": labss if labss else labss.none(),
                    "serializer_class": labsSerializer,
                },
                {
                    "queryset": medinsurance if medinsurance else medinsurance.none(),
                    "serializer_class": MedInsuranceSerializer,
                },
                {
                    "queryset": rxinsurance if rxinsurance else rxinsurance.none(),
                    "serializer_class": RxInsuranceSerializer,
                },
                {
                    "queryset": rxdiscount if rxdiscount else rxdiscount.none(),
                    "serializer_class": RxDiscountSerializer,
                },
                {
                    "queryset": rxdiscount if rxdiscount else rxdiscount.none(),
                    "serializer_class": RxDiscountSerializer,
                },
            ]
            # print(querylist)
            return querylist
        else:
            return Member.objects.all()


# from django.views.decorators.csrf import csrf_protect
# @csrf_protect

from django.template import RequestContext

from django.template.context_processors import csrf

from django.views.decorators.csrf import csrf_exempt, csrf_protect


# @csrf_exempt
# @api_view(['GET', 'POST'])
# @csrf_protect
def update_member(request, member_id):

    # csrf1 = csrf(request)['csrf_token']
    # print(csrf1)

    print(request.session)

    if request.method == "POST":

        # print(request.POST)
        # print(request.POST)
        # print(json.loads(request.body))
        data = json.loads(request.body)
        city = data.get("city")
        state = data.get("state")
        zipcode = data.get("zipcode")
        email = data.get("email")
        username = data.get("username")
        icon = None
        first_name = data.get("first_name")
        middle_name = data.get("middle_name")
        last_name = data.get("last_name")
        street_address = data.get("street_address")
        street_address2 = data.get("street_address2")
        phone_number = data.get("phone_number")

        user = User_Custom.objects.filter(id=member_id, is_member=True)[0]
        user.update(
            city,
            state,
            zipcode,
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

        return JsonResponse(
            MembersSerializer(Member.objects.filter(member_id=member_id)[0]).data,
            safe=False,
        )

    return JsonResponse({"message": "Hello, world!"}, safe=False)


# create a post request to create a dependent for a member using create_dependent
# @api_view(['GET', 'POST'])
# @csrf_protect
def create_dependent(request, member_id):

    if request.method == "POST":
        # print(request.POST)
        # print(json.loads(request.body))
        data = json.loads(request.body)
        city = data.get("city")
        state = data.get("state")
        zipcode = data.get("zipcode")
        email = data.get("email")
        username = data.get("username")
        icon = None
        first_name = data.get("first_name")
        middle_name = data.get("middle_name")
        last_name = data.get("last_name")
        street_address = data.get("street_address")
        street_address2 = data.get("street_address2")
        phone_number = data.get("phone_number")

        user = User_Custom.objects.filter(id=member_id, is_member=True)[0]
        # create a dependent for the user using the user's account number
        dependent = user.create_dependent(
            guardian_id=member_id,
            account_number=user.account_number,
            city=city,
            state=state,
            zipcode=zipcode,
            username=username,
            firstname=first_name,
            middlename=middle_name,
            lastname=last_name,
            address=street_address,
            address2=street_address2,
            phonenumber=phone_number,
        )

        resp = redirect(reverse("base:member_view") + "?mid={}".format(user.id))

        # resp.headers['Cookie'] = request.headers['Cookie']

        # print(response.Response(UserLoginSerializer(user).data).headers)
        return resp

        # return JsonResponse(MembersSerializer(Member.objects.filter(member_id=member_id)[0]).data, safe=False)


def update_bodycomp(request, member_id):

    # csrf1 = csrf(request)['csrf_token']
    # print(csrf1)

    print(request.session)

    if request.method == "POST":

        # print(request.POST)
        # print(request.POST)
        # print(json.loads(request.body))
        data = json.loads(request.body)

        bmi = data.get("bmi")
        bf = data.get("bf")
        height = data.get("height")
        weight = data.get("weight")

        bodycomp, created = BodyComp.objects.get_or_create(member_id=member_id)

        print(bodycomp)

        bodycomp.update(bmi, bf, height, weight)

        return JsonResponse(
            BodyCompSerializer(
                BodyComp.objects.filter(member_id=member_id),
                many=True,
                context={"request": request},
            ).data,
            safe=False,
        )

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


# @csrf_exempt
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
        prescriber = request.POST.get("prescriber")

        if ndc and prescriber:
            prescription = Prescription.objects.filter(
                member_id=member_id, ndc=ndc, prescriber=prescriber
            )[0]
            prescription.update(prescribed_date, ndc, expiration_date, lot_no)
        else:
            prescription = Prescription.objects.filter(member_id=member_id)
            prescription = prescription[0] if prescription.exists() else None

        print(prescription)

        return JsonResponse(PrescriptionSerializer(prescription).data, safe=False)

    return JsonResponse({"message": "Hello, world!"}, safe=False)


def update_labs(request, member_id):

    if request.method == "POST":
        data = json.loads(request.body)

        # print(data, 'DATA')

        prov = data.get("prov")
        lab = data.get("lab")
        status = data.get("status")
        brief_desc = data.get("brief_desc")
        uploaded = data.get("uploaded")

        # print('data in memberview', member_id, prov, status, uploaded)

        # file = open(lab.get('uri'), 'rb')
        # print('file', file)

        if prov != None and status != None and uploaded != None:
            labss = labs.objects.filter(uploaded=uploaded, member_id=member_id)[0]
            # print('labss', labss)
            labss.update(prov, lab, status, brief_desc)
            labss = labs.objects.filter(member_id=member_id)
        else:
            labss = labs.objects.filter(member_id=member_id)

        labss = labss if labss.exists() else None
        # print('labss', labss)

        return JsonResponse(
            labsSerializer(labss, many=True, context={"request": request}).data,
            safe=False,
        )

    return JsonResponse({"message": "Hello, world!"}, safe=False)


def create_member(request):

    # csrf1 = csrf(request)['csrf_token']
    # print(csrf1)

    print(request.session)

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
        sex = request.POST.get("sex")
        namesuffix = request.POST.get("namesuffix")
        password = request.POST.get("password")

        member = User_Custom.objects.create_member(
            firstname=first_name,
            lastname=last_name,
            middlename=middle_name,
            email=email,
            sex=sex,
            namesuffix=namesuffix,
            username=username,
            password=password,
            address=street_address,
            address2=street_address2,
            city=city,
            state=state,
            zipcode=zipcode,
        )
        # user.update(city, state, zipcode, email, username, icon, first_name, middle_name, last_name, street_address, street_address2, phone_number)

        print(member.zipcode)

        return JsonResponse(UserMemberSearchSerializer(member).data, safe=False)

    return JsonResponse({"message": "Hello, world!"}, safe=False)


def create_med_insurance(request, member_id):

    print(member_id)

    if request.method == "POST":
        insurer = request.POST.get("insurer")
        id_member = request.POST.get("id_member")
        group_no = request.POST.get("group_no")
        benefit_plan = request.POST.get("benefit_plan")
        card = request.POST.get("card")
        member = Member.objects.filter(member_id=member_id)[0]

        if id_member and group_no:

            medinsurance = MedInsurance.objects.create(
                id_member=id_member,
                group_no=group_no,
                member=member,
                benefit_plan=benefit_plan,
                card=card,
                insurer=insurer,
            )

        else:
            medinsurance = None

        print(medinsurance)

        return JsonResponse(MedInsuranceSerializer(medinsurance).data, safe=False)

    return JsonResponse({"message": "Hello, world!"}, safe=False)


# @csrf_exempt
def create_rx_insurance(request, member_id):

    print("rxinsur", member_id)

    if request.method == "POST":
        print(request.POST)
        insurer = request.POST.get("insurer")
        id_member = request.POST.get("id_member")
        group_no = request.POST.get("group_no")
        benefit_plan = request.POST.get("benefit_plan")
        rxbin = request.POST.get("rxbin")
        rxpcn = request.POST.get("rxpcn")
        rxgrp = request.POST.get("rxgrp")
        card = request.POST.get("card")
        member = Member.objects.filter(member_id=member_id)[0]

        if id_member and group_no:
            # print('e')
            rxinsurance = RxInsurance.objects.create(
                id_member=id_member,
                group_no=group_no,
                member=member,
                rxbin=rxbin,
                rxpcn=rxpcn,
                rxgrp=rxgrp,
                benefit_plan=benefit_plan,
                card=card,
                insurer=insurer,
            )
        else:
            rxinsurance = None

        # print(rxinsurance.id_member)

        return JsonResponse(RxInsuranceSerializer(rxinsurance).data, safe=False)

    return JsonResponse({"message": "Hello, world!"}, safe=False)


def create_discrx_insurance(request, member_id):

    print(member_id)

    if request.method == "POST":
        insurer = request.POST.get("insurer")
        id_member = request.POST.get("id_member")
        rxbin = request.POST.get("rxbin")
        rxpcn = request.POST.get("rxpcn")
        rxgrp = request.POST.get("rxgrp")
        card = request.POST.get("card")
        member = Member.objects.filter(member_id=member_id)[0]

        if id_member:
            # print('e')
            rxdiscount = RxDiscount.objects.create(
                id_member=id_member,
                member=member,
                rxbin=rxbin,
                rxpcn=rxpcn,
                rxgrp=rxgrp,
                card=card,
                insurer=insurer,
            )
        else:
            rxdiscount = None

        print(rxdiscount)

        return JsonResponse(RxDiscountSerializer(rxdiscount).data, safe=False)

    return JsonResponse({"message": "Hello, world!"}, safe=False)


def create_meds(request, member_id):

    print(member_id)

    if request.method == "POST":
        # print(request.POST)
        # print(json.loads(request.body))
        data = json.loads(request.body)
        # print(json.dumps(request.POST.dict().keys()[0]))
        prescribed_date = data.get("prescribed_date")
        ndc = data.get("ndc")
        expiration_date = data.get("expiration_date")
        lot_no = data.get("lot_no")
        prescriber = data.get("prescriber")
        member = Member.objects.filter(member_id=member_id)[0]

        if ndc and prescriber:
            prescription = Prescription.objects.create(
                prescriber=prescriber,
                member=member,
                ndc=ndc,
                expiration_date=expiration_date,
                prescribed_date=prescribed_date,
                lot_no=lot_no,
            )
        else:
            prescription = None

        prescriptions = Prescription.objects.filter(member_id=member_id)
        prescriptions = prescriptions if prescriptions.exists() else None

        return JsonResponse(
            PrescriptionSerializer(
                prescriptions, many=True, context={"request": request}
            ).data,
            safe=False,
        )

    return JsonResponse({"message": "Hello, world!"}, safe=False)


def create_labs(request, member_id):

    if request.method == "POST":
        data = json.loads(request.body)

        prov = data.get("prov")
        lab = data.get("lab")
        status = data.get("status")
        brief_desc = data.get("brief_desc")

        member = Member.objects.filter(member_id=member_id)[0]
        provider = Provider.objects.filter(provider_id=prov)[0]

        if lab:
            labs.objects.create(
                member=member,
                lab=lab,
                status=status,
                brief_desc=brief_desc,
                prov=provider,
            )
        else:
            labs.objects.create(
                member=member, status=status, brief_desc=brief_desc, prov=provider
            )

        labss = labs.objects.filter(member_id=member_id)
        labss = labss if labss.exists() else None

        # print(labss)

        return JsonResponse(
            labsSerializer(labss, many=True, context={"request": request}).data,
            safe=False,
        )

    return JsonResponse({"message": "Hello, world!"}, safe=False)


def create_mdnotes(request, member_id):

    if request.method == "POST":

        data = json.loads(request.body)

        note = data.get("note")
        chief_complaint = data.get("chief_complaint")
        history = data.get("history")
        exam = data.get("exam")
        assessment = data.get("assessment")

        member = Member.objects.filter(member_id=member_id)[0]
        provider = Provider.objects.filter(provider_id=prov)[0]

        mdnote = mdNotes.objects.create(
            member=member,
            chief_complaint=chief_complaint,
            history=history,
            assessment=assessment,
            note=note,
            exam=exam,
            prov=provider,
        )

        mdnotes = mdNotes.objects.filter(member_id=member_id)
        mdnotes = mdnotes if mdnotes.exists() else None

        return JsonResponse(
            mdNotesSerializer(mdnotes, many=True, context={"request": request}).data,
            safe=False,
        )

    return JsonResponse({"message": "Hello, world!"}, safe=False)


def delete_labs(request, member_id):

    if request.method == "POST":
        data = json.loads(request.body)
        id = data.get("id")
        labs.objects.filter(id=id).delete()

        return JsonResponse(
            labsSerializer(
                labs.objects.filter(member_id=member_id),
                many=True,
                context={"request": request},
            ).data,
            safe=False,
        )

    return JsonResponse({"message": "Hello, world!"}, safe=False)


def delete_meds(request, member_id):

    if request.method == "POST":
        data = json.loads(request.body)
        id = data.get("id")
        Prescription.objects.filter(id=id).delete()

        return JsonResponse(
            PrescriptionSerializer(
                Prescription.objects.filter(member_id=member_id),
                many=True,
                context={"request": request},
            ).data,
            safe=False,
        )

    return JsonResponse({"message": "Hello, world!"}, safe=False)


def delete_mdnotes(request, member_id):

    if request.method == "POST":
        data = json.loads(request.body)
        id = data.get("id")
        mdNotes.objects.filter(id=id).delete()

        return JsonResponse(
            mdNotesSerializer(
                mdNotes.objects.filter(member_id=member_id),
                many=True,
                context={"request": request},
            ).data,
            safe=False,
        )

    return JsonResponse({"message": "Hello, world!"}, safe=False)
