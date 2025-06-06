# import json
# import pika

# credentials = pika.PlainCredentials('rabbit', 'rabbit')

# def opened(connection):
#     print('Opening connection')

# def openn(connection):
#     print('Opening connection')


# connection = pika.SelectConnection()


# channel = connection.channel(on_open_callback=opened)


# # print(channel)

# try:
#     channel.exchange_declare(exchange='providerqueue',
#                          exchange_type="direct",
#                          durable=True,
#                          auto_delete=False)
#     # Step #2 - Block on the IOLoop
#     connection.ioloop.start()

# # Catch a Keyboard Interrupt to make sure that the connection is closed cleanly
# except KeyboardInterrupt:

#     # Gracefully close the connection
#     connection.close()


# def queueing(method, body):
#     properties = pika.BasicProperties(content_type=method, delivery_mode=2)
#     channel.basic_publish(exchange='providerqueue', routing_key='provqueue', body=json.dumps(body), properties=properties)

import functools
import logging
import json
import pika

# from pika.exchange_type import ExchangeType

LOG_FORMAT = (
    "%(levelname) -10s %(asctime)s %(name) -30s %(funcName) "
    "-35s %(lineno) -5d: %(message)s"
)
LOGGER = logging.getLogger(__name__)


class ExamplePublisher(object):
    """This is an example publisher that will handle unexpected interactions
    with RabbitMQ such as channel and connection closures.
    If RabbitMQ closes the connection, it will reopen it. You should
    look at the output, as there are limited reasons why the connection may
    be closed, which usually are tied to permission related issues or
    socket timeouts.
    It uses delivery confirmations and illustrates one way to keep track of
    messages that have been sent and if they've been confirmed by RabbitMQ.
    """

    # EXCHANGE = 'providerqueue'
    # EXCHANGE_TYPE = 'direct'
    # PUBLISH_INTERVAL = 1
    # QUEUE = 'lobby'
    # ROUTING_KEY = 'provqueue'

    EXCHANGE = ["lobby", "messaging"]
    EXCHANGE_TYPE = "direct"
    QUEUE = {"lobby": "lobby", "messaging": "messaging"}
    ROUTING_KEY = {"lobby": "lobby", "messaging": "messaging"}
    PUBLISH_INTERVAL = 1

    def __init__(self, amqp_url):
        """Setup the example publisher object, passing in the URL we will use
        to connect to RabbitMQ.
        :param str amqp_url: The URL for connecting to RabbitMQ
        """
        self._connection = None
        self._channel = None

        self._deliveries = None
        self._acked = None
        self._nacked = None
        self._message_number = None

        self._stopping = False
        self._url = amqp_url

    def connect(self):
        """This method connects to RabbitMQ, returning the connection handle.
        When the connection is established, the on_connection_open method
        will be invoked by pika.
        :rtype: pika.SelectConnection
        """
        print("Connecting to %s" % self._url)
        LOGGER.info("Connecting to %s", self._url)
        return pika.SelectConnection(
            pika.URLParameters(self._url),
            on_open_callback=self.on_connection_open,
            on_open_error_callback=self.on_connection_open_error,
            on_close_callback=self.on_connection_closed,
        )

    def on_connection_open(self, _unused_connection):
        """This method is called by pika once the connection to RabbitMQ has
        been established. It passes the handle to the connection object in
        case we need it, but in this case, we'll just mark it unused.
        :param pika.SelectConnection _unused_connection: The connection
        """
        print("Connection opened")
        LOGGER.info("Connection opened")
        self.open_channel()

    def on_connection_open_error(self, _unused_connection, err):
        """This method is called by pika if the connection to RabbitMQ
        can't be established.
        :param pika.SelectConnection _unused_connection: The connection
        :param Exception err: The error
        """
        print("Connection open failed, reopening in 5 seconds: %s" % err)
        LOGGER.error("Connection open failed, reopening in 5 seconds: %s", err)
        self._connection.ioloop.call_later(5, self._connection.ioloop.stop)

    def on_connection_closed(self, _unused_connection, reason):
        """This method is invoked by pika when the connection to RabbitMQ is
        closed unexpectedly. Since it is unexpected, we will reconnect to
        RabbitMQ if it disconnects.
        :param pika.connection.Connection connection: The closed connection obj
        :param Exception reason: exception representing reason for loss of
            connection.
        """
        self._channel = None
        if self._stopping:
            self._connection.ioloop.stop()
        else:
            print("Connection closed, reopening in 5 seconds: %s" % reason)
            LOGGER.warning("Connection closed, reopening in 5 seconds: %s", reason)
            self._connection.ioloop.call_later(5, self._connection.ioloop.stop)

    def open_channel(self):
        """This method will open a new channel with RabbitMQ by issuing the
        Channel.Open RPC command. When RabbitMQ confirms the channel is open
        by sending the Channel.OpenOK RPC reply, the on_channel_open method
        will be invoked.
        """
        print("Creating a new channel")
        LOGGER.info("Creating a new channel")
        self._connection.channel(on_open_callback=self.on_channel_open)

    def on_channel_open(self, channel):
        """This method is invoked by pika when the channel has been opened.
        The channel object is passed in so we can make use of it.
        Since the channel is now open, we'll declare the exchange to use.
        :param pika.channel.Channel channel: The channel object
        """
        print("Channel opened")
        LOGGER.info("Channel opened")
        self._channel = channel
        self.add_on_channel_close_callback()
        self.setup_exchange(self.EXCHANGE)

        LOGGER.info("Channel opened")

        self.add_on_channel_close_callback()

    def add_on_channel_close_callback(self):
        """This method tells pika to call the on_channel_closed method if
        RabbitMQ unexpectedly closes the channel.
        """
        LOGGER.info("Adding channel close callback")
        self._channel.add_on_close_callback(self.on_channel_closed)

    def on_channel_closed(self, channel, reason):
        """Invoked by pika when RabbitMQ unexpectedly closes the channel.
        Channels are usually closed if you attempt to do something that
        violates the protocol, such as re-declare an exchange or queue with
        different parameters. In this case, we'll close the connection
        to shutdown the object.
        :param pika.channel.Channel channel: The closed channel
        :param Exception reason: why the channel was closed
        """
        print("Channel %i was closed: %s" % (channel, reason))
        LOGGER.warning("Channel %i was closed: %s", channel, reason)
        self._channel = None
        if not self._stopping:
            self._connection.close()

    def setup_exchange(self, exchange_name):
        """Setup the exchange on RabbitMQ by invoking the Exchange.Declare RPC
        command. When it is complete, the on_exchange_declareok method will
        be invoked by pika.
        :param str|unicode exchange_name: The name of the exchange to declare
        """
        print("Declaring exchange %s" % str(exchange_name))
        LOGGER.info("Declaring exchange %s", str(exchange_name))
        # Note: using functools.partial is not required, it is demonstrating
        # how arbitrary data can be passed to the callback when it is called
        cb1 = functools.partial(self.on_exchange_declareok, userdata=exchange_name[0])
        cb2 = functools.partial(self.on_exchange_declareok, userdata=exchange_name[1])

        self._channel.exchange_declare(
            exchange=exchange_name[0], exchange_type=self.EXCHANGE_TYPE, callback=cb1
        )

        self._channel.exchange_declare(
            exchange=exchange_name[1], exchange_type=self.EXCHANGE_TYPE, callback=cb2
        )

    def on_exchange_declareok(self, _unused_frame, userdata):
        """Invoked by pika when RabbitMQ has finished the Exchange.Declare RPC
        command.
        :param pika.Frame.Method unused_frame: Exchange.DeclareOk response frame
        :param str|unicode userdata: Extra user data (exchange name)
        """
        LOGGER.info("Exchange declared: %s" % userdata)
        self.setup_queue(self.QUEUE[userdata], userdata)

    def setup_queue(self, queue_name, exchange):
        """Setup the queue on RabbitMQ by invoking the Queue.Declare RPC
        command. When it is complete, the on_queue_declareok method will
        be invoked by pika.
        :param str|unicode queue_name: The name of the queue to declare.
        """
        LOGGER.info("Declaring queue %s", queue_name)

        cb1 = functools.partial(
            self.on_queue_declareok, userdata=queue_name, exch=exchange
        )

        self._channel.queue_declare(queue=queue_name, callback=cb1, durable=True)

    def on_queue_declareok(self, _unused_frame, userdata, exch):
        """Method invoked by pika when the Queue.Declare RPC call made in
        setup_queue has completed. In this method we will bind the queue
        and exchange together with the routing key by issuing the Queue.Bind
        RPC command. When this command is complete, the on_bindok method will
        be invoked by pika.
        :param pika.frame.Method method_frame: The Queue.DeclareOk frame
        """

        queue_name = userdata
        print("Binding %s to %s with %s" % (exch, queue_name, self.ROUTING_KEY[exch]))
        LOGGER.info(
            "Binding %s to %s with %s", exch, queue_name, self.ROUTING_KEY[exch]
        )
        cb = functools.partial(self.on_bindok, userdata=queue_name)
        self._channel.queue_bind(
            queue=queue_name,
            exchange=exch,
            routing_key=self.ROUTING_KEY[exch],
            callback=cb,
        )

    def on_bindok(self, _unused_frame, userdata):
        """This method is invoked by pika when it receives the Queue.BindOk
        response from RabbitMQ. Since we know we're now setup and bound, it's
        time to start publishing."""
        print("Queue bound: %s" % userdata)
        LOGGER.info("Queue bound: %s", userdata)
        self.start_publishing()

    def start_publishing(self):
        """This method will enable delivery confirmations and schedule the
        first message to be sent to RabbitMQ
        """
        print("Issuing consumer related RPC commands")
        LOGGER.info("Issuing consumer related RPC commands")
        self.enable_delivery_confirmations()
        self.schedule_next_message()

    def enable_delivery_confirmations(self):
        """Send the Confirm.Select RPC method to RabbitMQ to enable delivery
        confirmations on the channel. The only way to turn this off is to close
        the channel and create a new one.
        When the message is confirmed from RabbitMQ, the
        on_delivery_confirmation method will be invoked passing in a Basic.Ack
        or Basic.Nack method from RabbitMQ that will indicate which messages it
        is confirming or rejecting.
        """
        print("Issuing Confirm.Select RPC command")
        LOGGER.info("Issuing Confirm.Select RPC command")
        self._channel.confirm_delivery(self.on_delivery_confirmation)

    def on_delivery_confirmation(self, method_frame):
        """Invoked by pika when RabbitMQ responds to a Basic.Publish RPC
        command, passing in either a Basic.Ack or Basic.Nack frame with
        the delivery tag of the message that was published. The delivery tag
        is an integer counter indicating the message number that was sent
        on the channel via Basic.Publish. Here we're just doing house keeping
        to keep track of stats and remove message numbers that we expect
        a delivery confirmation of from the list used to keep track of messages
        that are pending confirmation.
        :param pika.frame.Method method_frame: Basic.Ack or Basic.Nack frame
        """
        confirmation_type = method_frame.method.NAME.split(".")[1].lower()
        print(
            "Received %s for delivery tag: %i"
            % (confirmation_type, method_frame.method.delivery_tag)
        )
        LOGGER.info(
            "Received %s for delivery tag: %i",
            confirmation_type,
            method_frame.method.delivery_tag,
        )
        if confirmation_type == "ack":
            self._acked += 1
        elif confirmation_type == "nack":
            self._nacked += 1
        self._deliveries.remove(method_frame.method.delivery_tag)
        print(
            "Published %i messages, %i have yet to be confirmed, "
            "%i were acked and %i were nacked"
            % (self._message_number, len(self._deliveries), self._acked, self._nacked)
        )
        LOGGER.info(
            "Published %i messages, %i have yet to be confirmed, "
            "%i were acked and %i were nacked",
            self._message_number,
            len(self._deliveries),
            self._acked,
            self._nacked,
        )

    def schedule_next_message(self):
        """If we are not closing our connection to RabbitMQ, schedule another
        message to be delivered in PUBLISH_INTERVAL seconds.
        """
        LOGGER.info("Scheduling next message for %0.1f seconds", self.PUBLISH_INTERVAL)
        self._connection.ioloop.call_later(self.PUBLISH_INTERVAL, self.queueing)

    response = ""

    def on_reply(self, channel, method, properties, body):
        # print('body ', body)
        # print('meth ', method)
        # print('prop ', properties)
        self.response = body

    def message(self, body):
        """If the class is not stopping, publish a message to RabbitMQ,
        appending a list of deliveries with the message number that was sent.
        This list will be used to check for delivery confirmations in the
        on_delivery_confirmations method.
        Once the message has been sent, schedule another message to be sent.
        The main reason I put scheduling in was just so you can get a good idea
        of how the process is flowing by slowing down and speeding up the
        delivery intervals by changing the PUBLISH_INTERVAL constant in the
        class.
        """
        # print('In messaging 1')
        if self._channel is None or not self._channel.is_open:
            self._channel = pika.BlockingConnection(
                pika.URLParameters(self._url)
            ).channel()
            # print('In messaging 2')

        # result = self._channel.queue_declare(queue='replied', exclusive=True)
        # callback_queue = result.method.queue

        # self._channel.basic_consume(self.on_reply,
        # queue='replied')

        # self.schedule_next_message()

        properties = pika.BasicProperties(content_type="sending", delivery_mode=2)
        self._channel.basic_publish(
            self.EXCHANGE[1],
            self.ROUTING_KEY[self.EXCHANGE[1]],
            json.dumps(body),
            properties,
        )

    def queueing(self, method, body):
        """If the class is not stopping, publish a message to RabbitMQ,
        appending a list of deliveries with the message number that was sent.
        This list will be used to check for delivery confirmations in the
        on_delivery_confirmations method.
        Once the message has been sent, schedule another message to be sent.
        The main reason I put scheduling in was just so you can get a good idea
        of how the process is flowing by slowing down and speeding up the
        delivery intervals by changing the PUBLISH_INTERVAL constant in the
        class.
        """
        # print('In queueing 1')
        if self._channel is None or not self._channel.is_open:
            self._channel = pika.BlockingConnection(
                pika.URLParameters(self._url)
            ).channel()
            # print('In queueing 2')

        # result = self._channel.queue_declare(queue='replied', exclusive=True)
        # callback_queue = result.method.queue

        # self._channel.basic_consume(self.on_reply,
        # queue='replied')

        # self.schedule_next_message()

        if method == "join_queue":

            properties = pika.BasicProperties(content_type=method, delivery_mode=2)
            self._channel.basic_publish(
                self.EXCHANGE[0],
                self.ROUTING_KEY[self.EXCHANGE[0]],
                json.dumps(body),
                properties,
            )
        elif method == "leave_queue":

            properties = pika.BasicProperties(content_type=method, delivery_mode=2)
            self._channel.basic_publish(
                self.EXCHANGE[0],
                self.ROUTING_KEY[self.EXCHANGE[0]],
                json.dumps(body),
                properties,
            )
        elif method == "finish_queue":

            properties = pika.BasicProperties(content_type=method, delivery_mode=2)
            self._channel.basic_publish(
                self.EXCHANGE[0],
                self.ROUTING_KEY[self.EXCHANGE[0]],
                json.dumps(body),
                properties,
            )
            # print('response ', self.response)
        elif method == "m_arrived_queue":
            properties = pika.BasicProperties(content_type=method, delivery_mode=2)
            self._channel.basic_publish(
                self.EXCHANGE[0],
                self.ROUTING_KEY[self.EXCHANGE[0]],
                json.dumps(body),
                properties,
            )
        elif method == "member_confirm":
            properties = pika.BasicProperties(content_type=method, delivery_mode=2)
            self._channel.basic_publish(
                self.EXCHANGE[0],
                self.ROUTING_KEY[self.EXCHANGE[0]],
                json.dumps(body),
                properties,
            )
        elif method == "member_confirm_done":
            properties = pika.BasicProperties(content_type=method, delivery_mode=2)
            self._channel.basic_publish(
                self.EXCHANGE[0],
                self.ROUTING_KEY[self.EXCHANGE[0]],
                json.dumps(body),
                properties,
            )
        # self._message_number += 1
        # self._deliveries.append(self._message_number)
        LOGGER.info("Published message # %i", self._message_number)
        print("Published message # ", self._message_number)
        print()
        print("Done")
        # return self.response

    def run(self):
        """Run the example code by connecting and then starting the IOLoop."""
        while not self._stopping:
            self._connection = None
            self._deliveries = []
            self._acked = 0
            self._nacked = 0
            self._message_number = 0

            try:
                self._connection = self.connect()
                self._connection.ioloop.start()
            except KeyboardInterrupt:
                self.stop()
                if self._connection is not None and not self._connection.is_closed:
                    # Finish closing
                    self._connection.ioloop.start()

        LOGGER.info("Stopped")

    def stop(self):
        """Stop the example by closing the channel and connection. We
        set a flag here so that we stop scheduling new messages to be
        published. The IOLoop is started because this method is
        invoked by the Try/Catch below when KeyboardInterrupt is caught.
        Starting the IOLoop again will allow the publisher to cleanly
        disconnect from RabbitMQ.
        """
        LOGGER.info("Stopping")
        self._stopping = True
        self.close_channel()
        self.close_connection()

    def close_channel(self):
        """Invoke this command to close the channel with RabbitMQ by sending
        the Channel.Close RPC command.
        """
        if self._channel is not None:
            LOGGER.info("Closing the channel")
            self._channel.close()

    def close_connection(self):
        """This method closes the connection to RabbitMQ."""
        if self._connection is not None:
            LOGGER.info("Closing connection")
            self._connection.close()


# def main():
#     logging.basicConfig(level=logging.DEBUG, format=LOG_FORMAT)

#     # Connect to localhost:5672 as guest with the password guest and virtual host "/" (%2F)
#     example = ExamplePublisher(
#         'amqp://guest:guest@localhost:5672/%2F?connection_attempts=3&heartbeat=3600'
#     )
#     example.run()


# if __name__ == '__main__':
#     main()
