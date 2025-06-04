import asyncio
from os import environ as env
import django
import sys

# Setup Django environment
sys.path.append("../../../mdSense/")
env["DJANGO_SETTINGS_MODULE"] = "mdSense.settings"
env["DJANGO_ALLOW_ASYNC_UNSAFE"] = "true"
django.setup()
# from aiohttp import web
import uvicorn as web
import socketio
import random
from django.db.models import Q
from base.models.queue import Queue, QueueConfig
from base.serializers.queueserializer import (
    QueueConfigSerializer,
    QueueSerializer,
    PQueueSerializer,
)
from base.producers.queueproducer import ExamplePublisher
from datetime import datetime as dt
from django.conf import settings

# Import your Django models and serializers
from base.models.connections import Connection
from base.models.notifications import Notification

from base.serializers.notificationserializer import NotificationSerializer
from base.serializers.patientvisitserializer import *

# Setup Socket.IO server
sio = socketio.AsyncServer(async_mode="asgi", ping_interval=600, ping_timeout=15)
app = socketio.ASGIApp(sio)
q = ExamplePublisher(
    "amqp://guest:guest@localhost:5672/%2F?connection_attempts=3&heartbeat=3600"
)
#sio.attach(app)
members = {}
providers = {}


async def get_status_code(status):
    """Map status character to descriptive text."""
    return {"I": "inline", "W": "waiting", "A": "arrived", "B": "beingseen"}.get(
        status, None
    )


async def getSID(x):
    print("getting id", x)
    conn, created = Connection.objects.get_or_create(user_id=x)
    return conn.conn_id if conn.connected else None


async def setSID(x, sid):
    print("setting sid", "-->", sid, "for", x)
    conn, created = Connection.objects.get_or_create(user_id=x)
    conn.update_conn_id(sid)


def disconnectSID(x):
    conn = Connection.objects.filter(conn_id=x)
    if conn.exists():
        conn[0].disconnect()


@sio.event(namespace="/queue")
def disconnect(sid, environ, auth):
    print()
    print()
    print()
    print("Im disconnected at", dt.now(), sid, auth)
    disconnectSID(sid)


@sio.event(namespace="/queue")
def connect(sid, environ, auth):
    print()
    print()
    print()
    print("Im connected at", dt.now(), sid, auth)
    # print()
    # print()
    # print()
    # if await getSID(data) != sid:
    #     await setSID(data, sid)


@sio.on("connected", namespace="/queue")
async def connection(sid, data):
    # print()
    # print()
    # print()
    print("connected: ", dt.now(), data, sid)
    # print()
    # print()
    if await getSID(data) != sid:
        await setSID(data, sid)
        # print('in connection 1')



def getIDS(data):
    provData = data

    ids = []
    for x in provData.keys():
        if x != "provider" and x != "notification" and x != "queueConfig":
            if provData.get(x) != None:
                ids.append(
                    dict(dict(provData.get(x)[0]).get("member")).get("member_id")
                )

    return list(set(ids))


def getProvQueue(x):
    queueConfig = QueueConfigSerializer(QueueConfig.objects.filter(prov_id=x)[0]).data
    queueA = Queue.objects.filter(prov_id=x, m_status="A")
    queueA = PQueueSerializer(queueA, many=True).data if queueA.exists() else None
    queueB = Queue.objects.filter(prov_id=x, m_status="B")
    queueB = PQueueSerializer(queueB, many=True).data if queueB.exists() else None
    queueW = Queue.objects.filter(prov_id=x, m_status="W")
    queueW = PQueueSerializer(queueW, many=True).data if queueW.exists() else None
    queueI = Queue.objects.filter(prov_id=x, m_status="I")
    queueI = PQueueSerializer(queueI, many=True).data if queueI.exists() else None
    queueS = Queue.objects.filter(
        prov_id=x, m_status__in="SL", leave_date__date=dt.now().date()
    )
    queueS = PQueueSerializer(queueS, many=True).data if queueS.exists() else None
    item = queueB if queueB != None else queueA if queueA != None else queueW
    data = {
        "provider": x,
        "queueConfig": queueConfig,
        "item": item,
        "queueS": queueS,
        "queueI": queueI,
        "queueA": queueA,
        "queueB": queueB,
        "queueW": queueW,
        "notification": "notified",
    }

    return data


@sio.on("update", namespace="/queue")
async def updateee(sid, data):
    print()
    print()
    print()
    print("update: ", dt.now())
    member = data["member"]
    ssid = await getSID(member)
    if ssid == None:
        await setSID(member, sid)
    else:
        sid = ssid

    queue = Queue.objects.filter(member_id=member, m_status__in="IWBA")
    if queue.exists() and queue.count() == 1:
        await sio.emit(
            "notification",
            data={
                "member": member,
                "provider": QueueSerializer(queue[0]).data["prov"]["provider_id"],
                "notification": "update",
                "status": await get_status_code(queue[0].m_status),
                "queue": QueueSerializer(queue[0]).data,
            },
            namespace="/queue",
            room=sid,
        )
    else:
        await sio.emit(
            "notification",
            data={
                "member": member,
                "provider": "undefined",
                "notification": "notinqueue",
            },
            namespace="/queue",
            room=sid,
        )


@sio.on("messageSaved", namespace="/queue")
async def messageSaved(sid, data):
    print()
    print()
    print()
    print("saving message: ", dt.now())


def getNotifications(myid):
    print()
    print()
    print()
    print("getNotifications: ", dt.now())

    notifications = None

    notification = Notification.objects.filter(Q(sender_id=myid) | Q(receiver_id=myid))

    if notification.exists():
        notifications = []
        threads = set(notification.values_list("thread_id", flat=True))
        for x in threads:
            n = notification.filter(thread_id=x)
            latest = n.latest("time")
            n = NotificationSerializer(n, many=True).data
            latest = NotificationSerializer(latest).data
            notifications.append({"thread_id": x, "notifications": n, "latest": latest})
    else:
        notifications = None

    return notifications


@sio.on("retrieveMessages", namespace="/queue")
async def retrieveMessages(sid, myid):

    print()
    print()
    print()
    print("retrieveMessages: ", dt.now())

    if isinstance(myid, dict):
        myid = myid.get("myid")

    ssid = await getSID(myid)
    if ssid == None:
        await setSID(myid, sid)
    else:
        sid = ssid
    notifications = getNotifications(myid)

    data = {"notifications": notifications}

    print(sid, "my sid in retrieve messages my id", myid)
    await sio.emit("retrievedMessages", data=data, namespace="/queue", room=sid)


@sio.on("sendMessage", namespace="/queue")
async def sendMessage(sid, data):
    print()
    print()
    print()
    print("sendMessage: ", dt.now())

    receiver = data["receiver"]
    sid = await getSID(receiver)
    q.message(data)


@sio.on("notify_provider", namespace="/queue")
async def notify_provider(sid, data):
    print("Notified provider ", sid)
    print()
    print()
    print()
    print("notify_provider: ", dt.now())

    provider = data["provider"]
    questions = data["questions"] if "questions" in data else None
    myvisit = data["myvisit"] if "myvisit" in data else None
    member = data["member"] if "member" in data else None
    p_status = data["p_status"] if "p_status" in data else None
    date = dt.strptime(data["date"], "%Y-%m-%d").date() if "date" in data else None

    ssid = await getSID(provider)
    if ssid == None:
        await setSID(provider, sid)
    else:
        sid = ssid

    data = getProvQueue(provider)
    await sio.emit("notified", data=data, namespace="/queue", room=sid)
    ids = getIDS(data)
    DNS = None
    if myvisit != None and questions != None:
        DNS = member
    if p_status:
        print(ids, "ids to send to")
        if DNS != None:
            print(p_status, date)
            ssid = await getSID(member)
            if ssid != None:
                print(member, "sending to")
                await sio.emit(
                    "notification",
                    data={
                        "member": member,
                        "provider": provider,
                        "notification": "finished",
                        "questions": questions,
                        "myvisit": myvisit,
                    },
                    namespace="/queue",
                    room=ssid,
                )
    for id in ids:
        ssid = await getSID(id)
        if ssid != None and id != DNS:
            print()
            print()
            print(ssid, "sid to send to", id)
            await updateee(ssid, {"member": id})
            print()
        else:
            pass


@sio.on("notify_member", namespace="/queue")
async def notify_member(sid, data):
    print()
    print()
    print()
    print("notify_member: ", dt.now())

    member_sid = data["member_sid"]
    queue = data["queue"] if "queue" in data else None
    questions = data["questions"] if "questions" in data else None
    myvisit = data["myvisit"] if "myvisit" in data else None

    m_status = data["m_status"]
    member = data["member"]
    provider = data["provider"]

    ssid = await getSID(member)
    if ssid == None:
        await setSID(member, sid)
    else:
        sid = ssid

    print("MY MSTATUS ", m_status, "sending to SID", sid)
    if m_status == "inline":
        await sio.emit(
            "notification",
            data={
                "member": member,
                "provider": provider,
                "notification": "joined",
                "queue": queue,
            },
            namespace="/queue",
            room=sid,
        )

    if m_status == "waiting":
        await sio.emit(
            "notification",
            data={
                "member": member,
                "provider": provider,
                "notification": "waiting",
                "queue": queue,
            },
            namespace="/queue",
            room=sid,
        )
    if m_status == "arrived":
        await sio.emit(
            "notification",
            data={
                "member": member,
                "provider": provider,
                "notification": "arrived",
                "queue": queue,
            },
            namespace="/queue",
            room=sid,
        )

    if m_status == "leaving":
        await sio.emit(
            "notification",
            data={
                "member": member,
                "provider": provider,
                "notification": "left",
                "queue": queue,
            },
            namespace="/queue",
            room=sid,
        )

    if m_status == "finished":
        await sio.emit(
            "notification",
            data={
                "member": member,
                "provider": provider,
                "notification": "finished",
                "questions": questions,
                "myvisit": myvisit,
            },
            namespace="/queue",
            room=sid,
        )

        queueW = Queue.objects.filter(prov_id=provider, m_status="W")
        if queueW.exists():
            sid = await getSID(queueW[0].member.pk)
            if sid:
                await sio.emit(
                    "notification",
                    data={
                        "member": queueW[0].member.pk,
                        "provider": queueW[0].prov.pk,
                        "notification": "waiting",
                        "queue": QueueSerializer(queueW[0]).data,
                    },
                    namespace="/queue",
                    room=sid,
                )

    sid = await getSID(provider)
    if sid:
        await sio.emit(
            "notified", data=getProvQueue(provider), namespace="/queue", room=sid
        )


@sio.on("lobby", namespace="/queue")
async def mylobby(sid, data):
    print()
    print()
    print()
    print("mylobby: ", dt.now())

    providers.update({data["provider"]: sid})

    ssid = await getSID(data["provider"])
    if ssid == None:
        await setSID(data["provider"], sid)
    else:
        sid = ssid

    if data["method"] == "member_confirm":
        data = {
            "provider_id": data["provider"],
            "member_id": data["member"],
            "provider_sid": sid,
            "arrived": data["arrived"],
        }
        q.queueing(method="member_confirm", body=data)

    elif data["method"] == "member_confirm_done":
        data = {
            "provider_id": data["provider"],
            "member_id": data["member"],
            "provider_sid": sid,
            "done": data["done"],
        }
        q.queueing(method="member_confirm_done", body=data)


@sio.on("join_leave", namespace="/queue")
async def join_leave(sid, data):

    print()
    print()
    print()
    print("join_leave: ", dt.now())

    if data["method"] == "join":
        data = {
            "provider_id": data["provider"],
            "member_id": data["member"],
            "member_sid": sid,
        }
        member = data["member_id"]
        ssid = await getSID(member)
        if ssid == None:
            await setSID(member, sid)
        else:
            sid = ssid

        q.queueing(method="join_queue", body=data)

    elif data["method"] == "leave":
        data = {
            "provider_id": data["provider"],
            "member_id": data["member"],
            "member_sid": sid,
        }
        q.queueing(method="leave_queue", body=data)
    elif data["method"] == "finish":
        data = {
            "provider_id": data["provider"],
            "member_id": data["member"],
            "member_sid": sid,
        }
        q.queueing(method="finish_queue", body=data)

    elif data["method"] == "arrived":
        data = {
            "provider_id": data["provider"],
            "member_id": data["member"],
            "member_sid": sid,
            "arrived": data["arrived"],
        }
        q.queueing(method="m_arrived_queue", body=data)


@sio.on("disconnect", namespace="/queue")
def disconnect(sid):
    print("disconnect ", sid)
    disconnectSID(sid)


if __name__ == "__main__":
    web.run(app, host=settings.ALLOWED_HOSTS[1], port=8080)
