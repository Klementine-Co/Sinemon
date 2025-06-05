# from sys import path
from os import environ
import json
import pika
import django
import sys

sys.path.append("../../mdSense/")
environ["DJANGO_SETTINGS_MODULE"] = "mdSense.settings"
django.setup()
from base.models.provider import Provider
from base.models.member import Member
from base.models.queue import Queue
from base.serializers.queueserializer import QueueSerializer, QueueConfigSerializer
from base.models.enrollment import Enrollment
import logging
import functools

LOGGER = logging.getLogger("django")
# print(LOGGER)
import time
import uvicorn as web
import socketio

from django.conf import settings

from base.models.notifications import Notification
from base.models.connections import Connection

from base.serializers.notificationserializer import NotificationSerializer
from base.serializers.patientvisitserializer import *


class MasterConsumer(object):

    EXCHANGE = ["lobby", "messaging", "dead_letter"]
    EXCHANGE_TYPE = "direct"
    QUEUE = {"lobby": "lobby", "messaging": "messaging", "dead_letter": "dead_letter"}
    ROUTING_KEY = {"lobby": "lobby", "messaging": "messaging"}

    sio = socketio.Client(
        logger=True,
        engineio_logger=True,
    )

    def __init__(self, amqp_url):

        self.should_reconnect = False
        self.was_consuming = False

        self._connection = None
        self.messaging_channel = None

        self._closing = False
        self._consumer_tag = []
        self._url = amqp_url
        self._consuming = {}
        # In production, experiment with higher prefetch values
        # for higher consumer throughput
        self._prefetch_count = 1

        self.channels = {}
        self.consumers = []
        self.consumer_tags = {}
        self.functions = {}

    def connect(self, consumers):  # step 1

        self.consumers = consumers
        LOGGER.info("Connecting to %s".format(self._url))
        print("Connecting to %s" % self._url)
        try:
            connection = pika.SelectConnection(
                parameters=pika.URLParameters(self._url),
                on_open_callback=self.on_connection_open,  # step 2
                on_open_error_callback=self.on_connection_open_error,
                on_close_callback=self.on_connection_closed,
            )
            return connection
        except pika.exceptions.AMQPConnectionError as err:
            print("Connection failed: %s" % err)
            print("Failed to connect, retrying...")
            time.sleep(5)
            LOGGER.error("Connection failed: %s", err)
            return None

    def close_connection(self):
        self._consuming = {}
        if self._connection.is_closing or self._connection.is_closed:
            LOGGER.info("Connection is closing or already closed")
        else:
            LOGGER.info("Closing connection")
            self._connection.close()

    def on_connection_open(self, _unused_connection):  # step 3

        LOGGER.info("Connection opened")
        for x in self.consumers:
            self.open_channel(x)  # step 4

        # self.open_channel(self.consumers[0]) # step 4
        # self.open_channel(self.consumers[1]) # step 4

    def on_connection_open_error(self, _unused_connection, err):

        print("Connection open failed: %s" % err)
        LOGGER.error("Connection open failed: %s", err)
        self.reconnect()

    def on_connection_closed(self, _unused_connection, reason_text):

        for x in self.channels:
            self.channels.update({x: None})

        if self._closing:
            self._connection.ioloop.stop()
        else:
            LOGGER.warning("Connection closed, reconnect necessary: %s", reason_text)
            self.reconnect()

    def reconnect(self):

        self.should_reconnect = True
        self.stop()

    def open_channel(self, consumer):  # step 5

        LOGGER.info("Creating a new channel")
        print("Creating a new channel")

        cb1 = functools.partial(self.on_channel_open, consumer=consumer)

        self._connection.channel(on_open_callback=cb1)  # step 6

    def on_channel_open(self, channel, consumer):  # step 7

        LOGGER.info("Channel opened")
        print("Channel opened")
        self.channels.update({consumer: channel})
        self._consuming.update({consumer: False})
        # self.messaging_channel = channel # step 8 setchannel
        self.add_on_channel_close_callback(consumer)

        self.setup_exchange(consumer)  # step 9

    def add_on_channel_close_callback(self, consumer):

        print("Adding channel close callback")
        LOGGER.info("Adding channel close callback")
        self.channels.get(consumer).add_on_close_callback(self.on_channel_closed)

    def on_channel_closed(self, channel, reason):

        print("Channel {} was closed: {}".format(channel, reason))
        LOGGER.warning("Channel %i was closed: %s", channel, reason)
        self.close_connection()

    def setup_exchange(self, exchange_name):

        LOGGER.info("Declaring exchange: %s", str(exchange_name))
        # Note: using functools.partial is not required, it is demonstrating
        # how arbitrary data can be passed to the callback when it is called
        cb1 = functools.partial(self.on_exchange_declareok, exchange=exchange_name)

        self.channels.get(exchange_name).exchange_declare(
            exchange=exchange_name, exchange_type=self.EXCHANGE_TYPE, callback=cb1
        )

    def on_exchange_declareok(self, _unused_frame, exchange):

        LOGGER.info("Exchange declared: {}".format(str(exchange)))
        self.setup_queue(exchange, exchange)

    def setup_queue(self, queue_name, exchange):

        LOGGER.info("Declaring queue {}".format(str(queue_name)))
        arguments = {
            "x-dead-letter-exchange": self.EXCHANGE[
                2
            ],  # Messages from this queue go to the dead_letter on failure
            "x-dead-letter-routing-key": self.EXCHANGE[2],
        }
        cb1 = functools.partial(
            self.on_queue_declareok, queue_name=queue_name, exchange=exchange
        )
        if exchange != "dead_letter":
            self.channels.get(exchange).queue_declare(
                queue=queue_name, durable=True, arguments=arguments, callback=cb1
            )
        else:
            self.channels.get(exchange).queue_declare(
                queue=queue_name, durable=True, callback=cb1
            )

    def on_queue_declareok(self, _unused_frame, queue_name, exchange):

        LOGGER.info("Binding {} to {} with {}".format(exchange, queue_name, exchange))
        cb = functools.partial(self.on_bindok, queue_name=queue_name)

        self.channels.get(exchange).queue_bind(
            queue=queue_name, exchange=exchange, routing_key=exchange, callback=cb
        )

    def on_bindok(self, _unused_frame, queue_name):

        LOGGER.info("Queue bound: {}".format(queue_name))
        self.set_qos(queue_name)

    def set_qos(self, queue_name):

        cb = functools.partial(self.on_basic_qos_ok, queue_name=queue_name)

        self.channels.get(queue_name).basic_qos(
            prefetch_count=self._prefetch_count, callback=cb
        )

    def on_basic_qos_ok(self, _unused_frame, queue_name):

        LOGGER.info("QOS set to: {}".format(self._prefetch_count))
        self.start_consuming(queue_name)

    def consumed(self):
        print("consumed")

    def start_consuming(self, queue_name):
        print("here")
        LOGGER.info("Issuing consumer related RPC commands")
        self.add_on_cancel_callback(queue_name)

        if queue_name == "lobby":
            consumer_tag = self.channels.get(queue_name).basic_consume(
                queue_name, self.lobby
            )
        else:
            consumer_tag = self.channels.get(queue_name).basic_consume(
                queue_name, self.messaging
            )

        self.consumer_tags.update({queue_name: consumer_tag})

        self.was_consuming = True
        self._consuming.update({queue_name: True})

    def add_on_cancel_callback(self, queue_name):

        cb = functools.partial(self.on_consumer_cancelled, queue_name=queue_name)

        LOGGER.info("Adding consumer cancellation callback")
        self.channels.get(queue_name).add_on_cancel_callback(cb)

    def on_consumer_cancelled(self, method_frame, queue_name):

        LOGGER.info(
            "Consumer was cancelled remotely, shutting down: %r".format(method_frame)
        )
        if self.channels.get(queue_name):
            self.channels.get(queue_name).close()

    @sio.event(namespace="/queue")
    def handlemessaging(self):
        print("Messaging Task")

    @sio.event(namespace="/queue")
    def handlelobby(self):
        print("Lobby Task")
        # sio.disconnect()
        # pass

    def setFunctions(self, queue):
        self.functions.update({queue: queue})

    def lobby(self, _unused_channel, basic_deliver, properties, body):
        print("Received in lobby queue...")
        try:
            if not self.sio.connected:
                # self.sio.connect('http://{}:8080/queue'.format(settings.ALLOWED_HOSTS[0]))
                self.sio.connect(
                    "http://{}:8080/queue".format(settings.ALLOWED_HOSTS[0])
                )
            # print(body)
            data = json.loads(body)
            print()
            print()
            # print(data)
            print()
            print()
            provider = Provider.objects.filter(provider_id=data["provider_id"])
            member = Member.objects.filter(member_id=data["member_id"])

            if not provider.exists():
                raise Exception("No provider")
            else:
                provider = provider[0]

            if not member.exists():
                raise Exception("No member")
            else:
                member = member[0]

            if properties.content_type == "join_queue":
                print("In queueconsumer.py join_queue  ")
                queue, full = Queue.objects.join_queue(member=member, provider=provider)

                if full:
                    # raise Exception("Queue is full")
                    print("Queue is full")
                if queue is None:
                    # raise Exception("Queue should not be None")
                    print("Queue should not be None")
                    exit()

                if queue.m_status == "W" and not full:
                    print("waiting in join queue...")
                    # self.sio.connect('http://192.168.1.56:8080')
                    self.sio.emit(
                        "notify_member",
                        data={
                            "member_sid": data["member_sid"],
                            "member": member.pk,
                            "provider": provider.pk,
                            "m_status": "waiting",
                            "queue": QueueSerializer(queue).data,
                        },
                        callback=self.handlelobby,
                        namespace="/queue",
                    )
                    # self.sio.disconnect()
                elif queue.m_status == "I" and not full:
                    print("In line in join queue...")
                    # self.sio.connect('http://192.168.1.56:8080')
                    self.sio.emit(
                        "notify_member",
                        data={
                            "member_sid": data["member_sid"],
                            "member": member.pk,
                            "provider": provider.pk,
                            "m_status": "inline",
                            "queue": QueueSerializer(queue).data,
                        },
                        callback=self.handlelobby,
                        namespace="/queue",
                    )
                # self.sio.disconnect()
                # print('READYING')

                # from datetime import datetime as dt
                # print(dt.now())
                print()
                print()
                print(member, "joined ", provider, " queue.")
                print()
                print()
                # LOGGER.info('Joining', member, "joined ", provider," queue.")

            elif properties.content_type == "leave_queue":
                print("In queueconsumer.py leave_queue  ")
                queue, time_left = Queue.objects.leave_queue(
                    member=member, provider=provider
                )

                # self.sio.connect('http://192.168.1.56:8080/queue')
                self.sio.emit(
                    "notify_member",
                    data={
                        "member_sid": data["member_sid"],
                        "member": member.pk,
                        "provider": provider.pk,
                        "m_status": "leaving",
                        "queue": QueueSerializer(queue).data,
                    },
                    callback=self.handlelobby,
                    namespace="/queue",
                )
                # self.sio.disconnect()
                print()
                print()
                print(member, "left ", provider, " queue. at ", time_left)
                print()
                print()
                # LOGGER.info(member, "left ", provider," queue.")
            elif properties.content_type == "finish_queue":
                print("In queueconsumer.py finished_queue  ")
                print("DEBUG in finish_queue 1")
                questions, item = Queue.objects.member_confirm_finished(
                    member=member, provider=provider, done=True
                )
                print("DEBUG in finish_queue 2", item)

                print("DEBUG in finish_queue 3")
                # self.sio.connect('http://192.168.1.56:8080/queue')
                self.sio.emit(
                    "notify_member",
                    data={
                        "member_sid": data["member_sid"],
                        "member": member.pk,
                        "provider": provider.pk,
                        "m_status": "finished",
                        "questions": ReportCardQuestionsSerializer(
                            questions, many=True
                        ).data,
                        "myvisit": PatientVisitIDSerializer2(item).data,
                    },
                    callback=self.handlelobby,
                    namespace="/queue",
                )
                # self.sio.disconnect()
                print()
                print()
                print(member, "finished ", provider, " queue. at ")
                print()
                print()
                # LOGGER.info(member, "left ", provider," queue.")

            elif properties.content_type == "m_arrived_queue":

                queue, time_left = Queue.objects.member_confirm_arrival(
                    member=member, provider=provider, arrived=data["arrived"]
                )

                # self.sio.connect('http://192.168.1.56:8080/queue')
                self.sio.emit(
                    "notify_member",
                    data={
                        "member_sid": data["member_sid"],
                        "member": member.pk,
                        "provider": provider.pk,
                        "m_status": "arrived",
                        "queue": QueueSerializer(queue).data,
                    },
                    callback=self.handlelobby,
                    namespace="/queue",
                )
                print()
                print()
                print(member, "arrived at ", provider, " queue. at ", time_left)
                print()
                print()

            elif properties.content_type == "member_confirm":

                servicing, queue, time_left = Queue.objects.provider_confirm_arrival(
                    member=member, provider=provider, arrived=data["arrived"]
                )

                # self.sio.connect('http://192.168.1.56:8080/queue')
                if servicing:
                    self.sio.emit(
                        "notify_provider",
                        data={
                            "provider_sid": data["provider_sid"],
                            "member": member.pk,
                            "provider": provider.pk,
                            "p_status": "seeing patient",
                            "queue": QueueSerializer(queue).data,
                        },
                        callback=self.handlelobby,
                        namespace="/queue",
                    )
                    print()
                    print()
                    print(
                        member,
                        "arrival confirmed by ",
                        provider,
                        " queue. at ",
                        time_left,
                    )
                    print()
                    print()
                else:
                    self.sio.emit(
                        "notify_provider",
                        data={
                            "provider_sid": data["provider_sid"],
                            "member": member.pk,
                            "provider": provider.pk,
                            "p_status": "patient no-show",
                            "queue": QueueSerializer(queue).data,
                        },
                        callback=self.handlelobby,
                        namespace="/queue",
                    )
                    print()
                    print()
                    print(
                        member,
                        "no show confirmed by ",
                        provider,
                        " queue. at ",
                        time_left,
                    )
                    print()
                    print()

                # LOGGER.info(member, "left ", provider," queue.")
            # self.sio.disconnect()
            elif properties.content_type == "member_confirm_done":

                from datetime import datetime as dt

                date = dt.now().date()
                pv = Patientvisit.objects.filter(
                    asked="Y", prov=provider, member=member, visit_date__date=date
                )
                myvisit = None
                questions = None
                if not pv.exists():
                    questions, item = Queue.objects.member_confirm_finished(
                        member=member, provider=provider, done=True
                    )
                    questions = ReportCardQuestionsSerializer(questions, many=True).data
                    myvisit = PatientVisitIDSerializer2(item).data
                queue, time_left = Queue.objects.provider_confirm_done(
                    member=member, provider=provider, done=data["done"]
                )

                # self.sio.connect('http://192.168.1.56:8080/queue')
                self.sio.emit(
                    "notify_provider",
                    data={
                        "provider_sid": data["provider_sid"],
                        "member": member.pk,
                        "provider": provider.pk,
                        "p_status": "done w/ patient",
                        "queue": QueueSerializer(queue).data,
                        "date": str(date),
                        "questions": questions,
                        "myvisit": myvisit,
                    },
                    callback=self.handlelobby,
                    namespace="/queue",
                )
                print()
                print()
                print(member, "has been seen by ", provider, " queue. at ", time_left)
                print()
                print()

            LOGGER.info(
                "Received message # %s from %s: %s",
                basic_deliver.delivery_tag,
                properties.app_id,
                body,
            )
            self.acknowledge_message(
                basic_deliver.delivery_tag, _unused_channel, "lobby"
            )
        except Exception as e:
            print(f"Error processing message: {e}")
            self.acknowledge_message_error(
                basic_deliver.delivery_tag, _unused_channel, "lobby"
            )

    def messaging(self, _unused_channel, basic_deliver, properties, body):
        print("Received in messaging queue...")
        try:
            if not self.sio.connected:
                self.sio.connect(
                    "http://{}:8080/queue".format(settings.ALLOWED_HOSTS[0])
                )
            # print(body)
            data = json.loads(body)
            # print()
            # print('in messaging consumer')
            # print(data)
            # print()
            # print()

            receiver = data["receiver"]
            sender = data["sender"]
            msg = data["msg"]["text"]
            notification_type = data["notification_type"]

            threadid = int(receiver) + int(sender)
            threadid = str(threadid)

            chk1 = Notification.objects.filter(
                thread_id=threadid,
                notification_type="R",
                sender_id=sender,
                msg=msg,
                receiver_id=receiver,
            )

            if not (chk1.exists() and notification_type == "R"):
                notification = Notification(
                    receiver_id=receiver,
                    sender_id=sender,
                    msg=msg,
                    notification_type=notification_type,
                )
                notification.save()
                if notification_type == "R":
                    notification = Notification(
                        receiver_id=sender,
                        sender_id=receiver,
                        msg="Please select",
                        notification_type=notification_type,
                    )
                    notification.save()
                    self.sio.emit(
                        "retrieveMessages",
                        data={"myid": sender},
                        callback=self.handlemessaging,
                        namespace="/queue",
                    )
            else:
                pass

            chk1 = Notification.objects.filter(
                thread_id=threadid,
                notification_type="R",
                sender_id=sender,
                receiver_id=receiver,
            )
            if notification_type in "BCDN" and chk1.exists():
                print("answering")
                notification.answer(sender)

            # print("messaging queue...")
            # self.sio.connect('http://192.168.1.56:8080')
            self.sio.emit(
                "messageSaved",
                data={"message": msg},
                callback=self.handlemessaging,
                namespace="/queue",
            )

            # self.sio.emit('retrieveMessages', data = {'myid':sender}, callback=self.handlemessaging, namespace='/queue')
            self.sio.emit(
                "retrieveMessages",
                data={"myid": receiver},
                callback=self.handlemessaging,
                namespace="/queue",
            )

            LOGGER.info(
                "Received message # {} from {}: {}".format(
                    basic_deliver.delivery_tag, properties.app_id, body
                )
            )
            self.acknowledge_message(
                basic_deliver.delivery_tag, _unused_channel, "messaging"
            )

        except Exception as e:
            print(f"Error processing message: {e}")
            self.acknowledge_message_error(
                basic_deliver.delivery_tag, _unused_channel, "messaging"
            )

    def acknowledge_message(self, delivery_tag, _unused_channel, typee):

        LOGGER.info("Acknowledging message {}".format(delivery_tag))
        self.channels.get(typee).basic_ack(delivery_tag)

    def acknowledge_message_error(self, delivery_tag, _unused_channel, typee):

        LOGGER.info("Acknowledging message error {}".format(delivery_tag))
        self.channels.get(typee).basic_nack(delivery_tag, requeue=False)

    def stop_consuming(self, consumer):

        if self.channels.get(consumer):
            LOGGER.info("Sending a Basic.Cancel RPC command to RabbitMQ")
            cb = functools.partial(
                self.on_cancelok,
                tag=self.consumer_tags.get(consumer),
                consumer=consumer,
            )
            self.channels.get(consumer).basic_cancel(
                self.consumer_tags.get(consumer), cb
            )

    def on_cancelok(self, _unused_frame, tag, consumer):

        self._consuming.update({consumer: False})
        LOGGER.info(
            "RabbitMQ acknowledged the cancellation of the consumer: {}".format(
                consumer
            )
        )

        self.close_channel(consumer)

    def close_channel(self, consumer):

        LOGGER.info("Closing the channel for consumer {}".format(consumer))
        self.channels.get(consumer).close()

    def run(self, consumers):
        self._connection = self.connect(consumers)
        print("in MasterConsumer")
        self._connection.ioloop.start()

    def stop(self):
        if not self._closing:
            self._closing = True
            LOGGER.info("Stopping")

            for x in self._consuming:
                if self._consuming.get(x):
                    self.stop_consuming(x)
                    self._connection.ioloop.start()

            self._connection.close()
            LOGGER.info("Stopped")


def main():
    # logging.basicConfig(level=logging.DEBUG, format=LOG_FORMAT)
    amqp_url = "amqp://guest:guest@rabbitmq:5672/%2F"
    consumer = MasterConsumer(amqp_url)
    consumers = ["lobby", "messaging"]
    # consumer.setFunctions(consumers[0])
    # consumer.setFunctions(consumers[1])
    try:
        consumer.run(consumers)
    except (
        pika.exceptions.ConnectionClosedByBroker,
        pika.exceptions.ChannelClosedByBroker,
    ) as err:
        print("Connection closed by broker: {}, {}".format(err, type(err)))
        print("Failed to connect, retrying...")
        LOGGER.error("Connection closed by broker: %s", err)
        conn.close()
        time.sleep(5)
        consumer.stop()
        consumer.run(consumers)
    except KeyboardInterrupt:
        consumer.stop()


if __name__ == "__main__":
    main()
