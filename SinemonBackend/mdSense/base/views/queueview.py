from base.models.provider import Provider
from base.models.license import *
from django.core.exceptions import ObjectDoesNotExist
from django.http import JsonResponse
from base.models.queue import Queue, QueueConfig
from drf_multiple_model.views import ObjectMultipleModelAPIView
from base.serializers.queueserializer import *
from base.producers.queueproducer import ExamplePublisher
from rest_framework.views import APIView
from rest_framework.decorators import api_view  # , permission_classes

# from rest_framework.permissions import BasePermission, IsAuthenticated
# from django.contrib.auth import authenticate
# class IsMember(BasePermission):
#     def has_permission(self, request, view):
#         return User_Custom.objects.filter(email=request.user)[0].is_member
# @permission_classes([IsAuthenticated and IsMember])


q = ExamplePublisher(
    "amqp://guest:guest@localhost:5672/%2F?connection_attempts=3&heartbeat=3600"
)
# @api_view(['GET'])
# def get_queue(request):

#     queueConfig = QueueConfig.objects.filter(prov_id=request.query_params['pid'])

#     return JsonResponse(QueueConfigSerializer(queueConfig), safe=False)

# @api_view(['POST'])
# def join_queue(request):
#     provider_id=request.query_params['pid']
#     member_id=request.query_params['mid']
#     print(member_id, provider_id)
#     # provider = Provider.objects.filter(provider_id=provider_id)
#     # member =  Member.objects.filter(member_id=member_id)
#     data = {'provider_id': provider_id, 'member_id':member_id}
#     q.queueing('join_queue', data)
#     queue = Queue.objects.filter(member=member_id, provider=provider_id)
#     queryset = queue

#     return JsonResponse(QueueSerializer(queue), safe=False)


class member_confirm_arrival(APIView):
    queryset = Queue.objects.all()

    def post(self, request):
        provider_id = request.data.get("provider")
        member_id = request.data.get("member")
        arrived = request.data.get("arrived")

        queue = Queue.objects.member_confirm_arrival(
            member=member_id, provider=provider_id, arrived=arrived
        )
        # q.queueing(method='member_confirm_arrival', body=data)
        data = {"provider_id": provider_id, "member_id": member_id, "arrived": arrived}

        return JsonResponse(data, safe=False)


class join_queue(APIView):
    queryset = Queue.objects.all()

    def get(self, request):
        provider_id = request.query_params["pid"]
        member_id = request.query_params["mid"]
        # provider = Provider.objects.filter(provider_id=provider_id)
        # member =  Member.objects.filter(member_id=member_id)
        data = {"provider_id": provider_id, "member_id": member_id}
        print(data)

        q.queueing(method="join_queue", body=data)

        return JsonResponse(data, safe=False)

    def post(self):
        pass


def update_queueConfig(request, provider_id):
    if request.method == "POST":
        capacity = request.POST.get("max_capacity")
        end_before_close = request.POST.get("minutes_before_close")
        time_before_noshow = request.POST.get("minutes_before_noshow")

        queueConfig = QueueConfig.objects.filter(prov_id=provider_id)
        queueConfig.capacity = capacity if capacity > 0 else queueConfig.capacity
        queueConfig.end_before_close = (
            end_before_close if end_before_close > 0 else queueConfig.end_before_close
        )
        queueConfig.time_before_noshow = (
            time_before_noshow
            if time_before_noshow > 0
            else queueConfig.time_before_noshow
        )
        queueConfig.save()

        return JsonResponse(QueueConfigSerializer(queueConfig), safe=False)

    return JsonResponse({"message": "Hello, world!"}, safe=False)


def update_lobbyConfig(request, provider_id):
    if request.method == "POST":
        email = request.POST.get("email")
        preferred_name = request.POST.get("preferred_name")
        open_time = request.POST.get("lobby_open_time")
        close_time = request.POST.get("lobby_close_time")
        lobby_street_address = request.POST.get("lobby_street_address")
        lobby_zipcode = request.POST.get("lobby_zipcode")
        lobby_city = request.POST.get("lobby_city")
        lobby_state = request.POST.get("lobby_state")
        lobby_phone = request.POST.get("lobby_phone")

        queueConfig = QueueConfig.objects.filter(prov_id=provider_id)
        queueConfig.open_time = open_time if open_time > 0 else queueConfig.open_time
        queueConfig.close_time = (
            close_time if close_time > 0 else queueConfig.close_time
        )
        queueConfig.save()

        provider = Provider.objects.filter(provider_id=provider_id)

        provider.provider_email = email if email > 0 else provider.provider_email
        provider.preferred_name = (
            preferred_name if preferred_name > 0 else provider.preferred_name
        )
        provider.lobby_street_address = (
            lobby_street_address
            if lobby_street_address > 0
            else provider.lobby_street_address
        )
        provider.lobby_city = lobby_city if lobby_city > 0 else provider.lobby_city
        provider.lobby_zipcode = (
            lobby_zipcode if lobby_zipcode > 0 else provider.lobby_zipcode
        )
        provider.lobby_state = lobby_state if lobby_state > 0 else provider.lobby_state
        provider.lobby_phone = lobby_phone if lobby_phone > 0 else provider.lobby_phone
        provider.save()

        resp = redirect(
            reverse("base:provider_queue_view") + "?pid={}".format(provider_id)
        )

        # resp.headers['Cookie'] = request.headers['Cookie']

        # print(response.Response(UserLoginSerializer(user).data).headers)
        return resp


# create a view to view all a provider's queues and their queueconfigs using a get request
class QQueueView(ObjectMultipleModelAPIView):
    def get_queryset(self):
        return Provider.objects.filter(provider_id=self.request.query_params["pid"])

    def get_querylist(self):
        i_d = self.request.query_params["pid"]
        if i_d is not None:
            return (
                {
                    "queryset": Provider.objects.filter(provider=i_d),
                    "serializer_class": ProviderSerializer,
                },
                {
                    "queryset": QueueConfig.objects.filter(provider=i_d),
                    "serializer_class": QueueConfigSerializer,
                },
            )
        else:
            return Provider.objects.all()


@api_view(["POST"])
def start_queue(request):
    provider = Provider.objects.filter(provider_id=request.query_params["pid"])
    queueConfig = QueueConfig.objects.filter(provider=provider)[0]
    if queueConfig.status == "P":
        queueConfig.status = "A"
        queueConfig.save()
    return JsonResponse(QueueConfigSerializer(queueConfig), safe=False)


@api_view(["POST"])
def pause_queue(request):
    provider = Provider.objects.filter(provider_id=request.query_params["pid"])
    queueConfig = QueueConfig.objects.filter(provider=provider)[0]
    if queueConfig.status == "A":
        queueConfig.status = "P"
        queueConfig.save()
    return JsonResponse(QueueConfigSerializer(queueConfig), safe=False)


@api_view(["POST"])
def leave_queue(request):
    provider = Provider.objects.filter(provider_id=request.query_params["pid"])
    member = Member.objects.filter(member_id=request.query_params["mid"])

    queue = Queue.objects.leave_queue(member=member, provider=provider)

    return JsonResponse(QueueSerializer(queue), safe=False)


@api_view(["GET"])
def my_queue(request):
    provider = Provider.objects.filter(provider_id=request.query_params["pid"])[0]
    member = Member.objects.filter(member_id=request.query_params["mid"])[0]
    queueConfig = QueueConfig.objects.filter(prov_id=request.query_params["pid"])[0]
    queue = Queue.objects.filter(
        member=member, provider=provider, m_status__in="IB", p_status__in="WS"
    )[
        0
    ]  # , join_date__date=dt.now().date())
    queue.est_wait_time = Queue.objects.get_wait(queueConfig, member, provider)
    queue.save()
    if queue.est_wait_time == queueConfig.time_between_patients:
        pass

    return JsonResponse(QueueSerializer(queue), safe=False)


# class join_queue(APIView):
#     queryset = Queue.objects.all()

#     def get(self, request):
#         provider_id=request.query_params['firstname']
#         member_id=request.query_params['mid']
#         # provider = Provider.objects.filter(provider_id=provider_id)
#         # member =  Member.objects.filter(member_id=member_id)
#         data = {'provider_id': provider_id, 'member_id':member_id}
#         print(data)

#         q.queueing(method='join_queue', body=data)

#         return JsonResponse(data, safe=False)


def exist(x):

    return False if x is None or x == "None" else True


def queues(request, providerid):

    firstname = None
    lastname = None
    member, memberids = None, None

    if request.method == "GET":
        # print(request.GET)
        if request.GET.get("firstname") and request.GET.get("firstname") != "None":
            firstname = request.GET.get("firstname")
        if request.GET.get("lastname") and request.GET.get("lastname") != "None":
            lastname = request.GET.get("lastname")

        print(lastname)
        member = Member.objects.filter(member__user__last_name=lastname)

        print([x for x in member.values()])

        if firstname and lastname:
            member = Member.objects.filter(
                member__user__first_name=firstname, member__user__last_name=lastname
            )
            memberids = [x.get("member_id") for x in member.values()]
        elif firstname:
            member = Member.objects.filter(member__user__first_name=firstname)
            memberids = [x.get("member_id") for x in member.values()]
        elif lastname:
            member = Member.objects.filter(member__user__last_name=lastname)
            memberids = [x.get("member_id") for x in member.values()]

        print(memberids)

        if memberids:
            queue = Queue.objects.filter(
                prov_id=providerid, m_status__in="SB", member_id__in=memberids
            )
        else:
            queue = Queue.objects.filter(prov_id=providerid, m_status__in="SB")

        return JsonResponse(QueueSerializer(queue, many=True).data, safe=False)
