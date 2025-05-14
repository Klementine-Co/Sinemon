import * as React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import { SignIn } from "./src/screens";
import { store } from "./src/state";
import { Provider } from "react-redux";
import { useAppDispatch, useAppSelector } from "./src/state/App/hooks";
import Tabs from "./src/screens/Components/navigation/tabs";
import * as actions from "./src/state/App/actions";
import Reviews from "./src/screens/Review/Reviews";


const Stack = createNativeStackNavigator<RootStackParamList>();

function App ( props: any ) {
    const dispatch = useAppDispatch();

    const user = useAppSelector( ( state ) => state.user );
    const queue = useAppSelector( ( state ) => state.queue );
    const myvisit = useAppSelector( ( state ) => state.myvisit );
    const socket = useAppSelector( ( state ) => state?.socket );
    const notifications = useAppSelector( ( state ) => state?.notifications );





    function getId ( x: TransformMessage ) {
        return Number( x.sender.user.id ) === Number( user.myid ) ? 1 : 2;
    };
    function getThreadTitle ( x: TransformMessage ) {
        return Number( x.sender.user.id ) === Number( user.myid ) ? x.receiver.user.first_name + ' ' + x.receiver.user.last_name : x.sender.user.first_name + ' ' + x.sender.user.last_name;
    };

    function getName ( x: TransformMessage ) {
        return x.sender.user.first_name + ' ' + x.sender.user.last_name;
    };

    function getGiftedChatMsgs ( messages: TransformMessage[] ) {
        var msgs = messages.map( ( x: TransformMessage ) =>
        (
            {
                thread_id: x.thread_id
                , notification_type: x.notification_type
                , _id: x.id
                , read_msg: x.read_msg
                , time: new Date( x.time )
                , msg: {
                    _id: x.id,
                    text: x.msg,
                    createdAt: new Date( x.time ),
                    notification_type: x.notification_type,
                    user: {
                        _id: getId( x ),
                        name: getName( x ),
                    }
                }
            }
        )
        ).sort( ( a, b ) => ( a.time < b.time ? 1 : -1 ) ) as Message[];
        return msgs;
    };

    function getNotification ( data: QueueStatus ) {
        //console.log( 'USER Notification', data );

        if ( data.notification === 'joined' ) {
            const queuedata: QueueData = { mystatus: 'inline', data: data.queue };
            dispatch( actions.set_queue( queuedata ) );
        }
        else if ( data.notification === 'waiting' ) {
            const queuedata = { mystatus: 'waiting', data: data.queue };
            //console.log('before dispatch', queuedata);

            dispatch( actions.set_queue( queuedata ) );
        }
        else if ( data.notification === 'left' ) {
            const queuedata = { mystatus: 'left', data: data.queue };
            dispatch( actions.set_queue( queuedata ) );
        }
        else if ( data.notification === 'finished' ) {
            const review: Review = {
                staff_stars: 0
                , bedside_stars: 0
                , office_stars: 0
                , dr_stars: 0
                , rating: 0
                , questions: data.questions as Questions
            };
            const myvisit = { ...data.myvisit, review: review, reviewed: false } as MyVisit;
            const queuedata = { mystatus: 'finished', data: undefined };
            dispatch( actions.set_queue( queuedata, myvisit ) );

        }
        else if ( data.notification === 'arrived' ) {
            const queuedata = { mystatus: data.queue.m_status === 'N' ? 'NO-SHOW' : 'arrived', data: data.queue } as QueueData;
            dispatch( actions.set_queue( queuedata ) );

        }
        else if ( data.notification === 'beingseen' ) {
            const queuedata = { mystatus: 'beingseen', data: data.queue } as QueueData;
            dispatch( actions.set_queue( queuedata ) );
        }
        else if ( data.notification === 'update' ) {
            const queuedata = { mystatus: data.status, data: data.queue } as QueueData;
            dispatch( actions.set_queue( queuedata ) );

        }
        else if ( data.notification === 'notinqueue' ) {
            const queuedata = { mystatus: 'notinqueue', data: undefined };
            dispatch( actions.set_queue( queuedata ) );
        }
    };



    const events = async () => {

        if ( socket?.connected !== undefined && socket?.disconnected !== undefined ) {
            socket.on( 'disconnect', () => {
                //console.log( 'Socket disconnected (client side): ', socket.connected );
            } );
            socket.once(
                'connect',
                () => {
                    //console.log( "Socket connected (client side): ", socket.connected );
                    if ( socket?.connected !== false && socket?.connected !== undefined ) {

                        socket.emit( 'connected', user.myid );
                    }
                }
            );

            socket.on( 'notification', ( data: QueueStatus ) => {
                getNotification( data );
            } );

            socket.on( 'retrievedMessages', ( data: { notifications: { notifications: TransformMessage[]; latest: TransformMessage; }[]; } ) => {

                if ( data?.notifications !== null && data?.notifications !== undefined ) {
                    const threads = data?.notifications.map( ( x: { notifications: TransformMessage[]; latest: TransformMessage; } ): Threads => (
                        {
                            messages: getGiftedChatMsgs( x.notifications ) as Message[]
                            , thread: getGiftedChatMsgs( [ x.latest ] )[ 0 ] as Message
                            , receiverName: getThreadTitle( x.latest )
                        }
                    )
                    ) as Threads[];
                    //console.log( 'THREADS', threads );

                    dispatch( actions.setNotifications( threads ) );;
                }

            } );
        }
    };

    React.useEffect( () => {
        //console.log( 'in use app js' );
        events();
    }, [ queue?.queuedata?.mystatus, user, notifications, myvisit, socket?.connected ] );


    //console.log(myvisit, 'MYVISIT');

    return (

        <NavigationContainer>
            <Stack.Navigator screenOptions={ {
                headerShown: false
            } }>
                {
                    user.authenticated === true ?
                        myvisit?.reviewed === false ?
                            ( <Stack.Screen name="Reviews" component={ Reviews } options={ { title: 'Reviews', } } /> )
                            :
                            ( <Stack.Screen name="Tabs" component={ Tabs } options={ { title: 'Tabs', } } /> )
                        :
                        ( <Stack.Screen name="SignIn" component={ SignIn } options={ { title: 'Sign in', } } /> )
                }
            </Stack.Navigator>
        </NavigationContainer >
    );
};

function mdsense () {

    return (
        <Provider store={ store }>
            <App />
        </Provider>
    );
}

export default mdsense;

