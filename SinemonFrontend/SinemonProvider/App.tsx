

import * as React from "react";
import { Text, View, StyleSheet, TextInput, Button, TouchableOpacity, Image } from 'react-native';
import { createNativeStackNavigator, NativeStackNavigationProp } from "@react-navigation/native-stack";
import { NavigationContainer, DefaultTheme, useNavigation } from "@react-navigation/native";

// extra screens
// import Tabs from "./navigation/tabs";

import { icons, COLORS, SIZES, API, appTheme } from './src/constants';



import axios from 'axios';

import { SignIn } from "./src/screens";

import { store } from "./src/state";
import { connect, Provider } from "react-redux";
import { useAppDispatch, useAppSelector } from "./src/state/App/hooks";
// import Home from "./src/screens/Home/Home";
import { current } from "@reduxjs/toolkit";
import Tabs from "./src/screens/Components/navigation/tabs";
import * as actions from "./src/state/App/actions";
// import Reviews from "./screens/Review/Reviews";

//   {/* <Text style={styles.paragraph}>🔐 Enter your key 🔐</Text> */}

import { parse, stringify } from 'flatted';

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    border: "transparent",
  },
};



const Stack = createNativeStackNavigator<RootStackParamList>();

// type appProp = StackNavigationProp<RootStackParamList, 'App'>;


function App ( props: any ) {

  const dispatch = useAppDispatch();


  const user = useAppSelector( ( state ) => state?.user );
  const socket = useAppSelector( ( state ) => state?.socket );
  const queue = useAppSelector( ( state ) => state?.queue );
  const notifications = useAppSelector( ( state ) => state?.notifications );
  const claim = useAppSelector( ( state ) => state?.claim );




  function getId ( x: TransformMessage ) {

    return Number( x.sender.user.id ) === Number( user.myid ) ? 1 : 2;
  };
  function getThreadTitle ( x: TransformMessage ) {
    return Number( x.sender.user.id ) === Number( user.myid ) ? x.receiver.user.first_name + ' ' + x.receiver.user.last_name : x.sender.user.first_name + ' ' + x.sender.user.last_name;
  };

  // function islatest(arg1:Number, arg2:Number){

  //   return arg1 === arg2;
  // };
  // function getThread(messages:object[], id:Number){

  //   return messages.filter(x=>x.threadid === id);
  // }

  function getName ( x: TransformMessage ) {
    return x.sender.user.first_name + ' ' + x.sender.user.last_name;
  };

  function getGiftedChatMsgs ( messages: TransformMessage[] ) {

    // function getGiftedChatMsgs(messages:object[], latest:Number){
    var msgs = messages.map( ( x: TransformMessage ) =>
    (
      {
        thread_id: x.thread_id
        , notification_type: x.notification_type
        , _id: x.id
        // ,latest: islatest(Number(x.id), Number(latest))
        , read_msg: x.read_msg
        , time: new Date( x.time )
        , msg: {
          _id: x.id,
          text: x.msg,
          createdAt: new Date( x.time ),
          user: {
            _id: getId( x ),
            name: getName( x ),
          }
        }
      }

    )
    ).sort( ( a, b ) => ( a.time < b.time ? 1 : -1 ) ) as Message[];

    console.log( '\n\n\n', msgs[ 0 ] );
    return msgs;
  };



  function getNotification ( data: {
    item: QueueItem[]
    , queueS?: QueueItem[]
    , queueA?: QueueItem[]
    , queueW?: QueueItem[]
    , queueB?: QueueItem[]
    , queueI?: QueueItem[]
    , notification: string;
  } ) {

    //console.log( data );
    if ( data.notification === 'notified' ) {

      let seen = data.queueS;
      //console.log('notified', seen);
      seen = seen === null ? seen ?? undefined : seen;

      if ( seen !== undefined ) seen = seen.slice().sort( ( a, b ) => {
        // Handle cases where leave_date can be null
        if ( a.leave_date === null && b.leave_date === null ) {
          return 0;  // Both are null, consider them equal
        } else if ( a.leave_date === null ) {
          return -1;  // Consider null less than any date
        } else if ( b.leave_date === null ) {
          return 1;  // Consider any date greater than null
        } else {
          // If both are non-null, compare as usual
          return a.leave_date > b.leave_date ? 1 : a.leave_date < b.leave_date ? -1 : 0;
        }
      } );


      const item = data?.item === undefined || data.item === null ? undefined : data?.item[ 0 ];

      const queuedata: QueueData = { queueitem: item, queueS: seen, queueA: data.queueA, queueW: data.queueW, queueB: data.queueB, queueI: data.queueI, status: item?.m_status };

      const queue: QueueAction = { provider: user.myid, member: item?.member?.member_id, from: 'provider' };

      const QUEUE: Queue = { queue: queue, queuedata: queuedata };

      //console.log('QUEUE', QUEUE);

      dispatch( actions.set_queue( QUEUE ) );


    };

  };


  // const navigation = useNavigation<appProp>();



  const events = async () => {

    if ( socket?.connected !== undefined && socket?.disconnected !== undefined ) {
      socket.on( 'disconnect', () => {
        console.log( 'Socket disconnected (client side): ', socket.connected );
        // setConnected(false);
      } );


      socket.once(
        'connect',
        () => {
          console.log( "Socket connected (client side): ", socket.connected );
          if ( socket?.connected !== false && socket?.connected !== undefined ) {
            //console.log( 'MY ID to the socket', user.myid );

            socket.emit( 'connected', user.myid );
          }

          // setConnected(true);
        }
      );

      socket.on( 'notified', ( data: {
        item: QueueItem[]
        , queueS?: QueueItem[]
        , queueA?: QueueItem[]
        , queueW?: QueueItem[]
        , queueB?: QueueItem[]
        , queueI?: QueueItem[]
        , notification: string;
      } ) => {
        getNotification( data );
        //console.log(getGiftedChatMsgs(data?.notifications));
      } );

      socket.on( 'retrievedMessages', ( data: { notifications: { notifications: TransformMessage[]; latest: TransformMessage; }[]; } ) => {

        console.log( 'socket receiver', data?.notifications[ 0 ]?.notifications[ 0 ].receiver );
        console.log( 'socket sender', data?.notifications[ 0 ]?.notifications[ 0 ].sender );

        // const messages  = getGiftedChatMsgs(data?.notifications[0].notifications) as Message[];

        const threads = data?.notifications.map( ( x: { notifications: TransformMessage[]; latest: TransformMessage; } ): Threads => (

          {
            messages: getGiftedChatMsgs( x.notifications as TransformMessage[] ) as Message[]
            , thread: getGiftedChatMsgs( [ x.latest ] as TransformMessage[] )[ 0 ] as Message
            , receiverName: getThreadTitle( x.latest )
            // ,receiverImg:x.latest.reciver.img
          }
        )
        ) as Threads[];
        //console.log(threads);

        dispatch( actions.setNotifications( threads ) );;
        //console.log(messages.filter(x=> x.msg));
        // retrieveMessages(data);
      } );


    }



  };

  React.useEffect( () => {
    //console.log( 'in use app js' );
    events();
  }, [ queue?.queuedata?.status, user, notifications, claim, socket?.connected ] );



  // return(
  // <></>


  // );

  function enrichWithTypeInformation ( obj ) {
    for ( const key in obj ) {
      if ( obj.hasOwnProperty( key ) && typeof obj[ key ] === 'object' && obj[ key ] !== null ) {
        const element = obj[ key ];
        // Recursively enrich nested objects
        enrichWithTypeInformation( element );
        // Store the constructor name as a property
        element._type = element.constructor.name;
      }
    }
  }
  //console.log(notifications);
  const currentState = store.getState();
  // console.log( currentState );  // This will output the entire state to the console
  const USER = currentState.user;
  const QUEUE = currentState.queue;



  let Provider = USER.mydata?.Provider;
  let QueueConfig = USER.mydata?.QueueConfig;
  let License = USER.mydata?.License;
  let Actions = USER.mydata?.Actions;
  let Probations = USER.mydata?.Probations;
  let Convictions = USER.mydata?.Convictions;
  let Accusations = USER.mydata?.Accusations;
  let Malpractices = USER.mydata?.Malpractices;
  let Arbitrations = USER.mydata?.Arbitrations;
  let Citations = USER.mydata?.Citations;
  let Number_negatives_v = USER.mydata?.Number_negatives_v;
  let Number_of_negatives = USER.mydata?.Number_of_negatives;

  // let MYDATA = {
  // Provider: {
  //   ...Provider,
  //   about: "Dummy",
  //   tip: "Dummy",
  // },
  //   QueueConfig: QueueConfig,
  //   License: License,
  //   Actions: Actions,
  //   Probations: Probations,
  //   Convictions: Convictions,
  //   Accusations: Accusations,
  //   Malpractices: Malpractices,
  //   Arbitrations: Arbitrations,
  //   Citations: Citations,
  //   Number_negatives_v: Number_negatives_v,
  //   Number_of_negatives: Number_of_negatives,
  // };

  console.log( '\n' );
  console.log( '\n' );
  console.log( '\n' );

  // console.log( MYDATA );

  // let MYDATA = {
  //   queue: QUEUE.queue,
  //   queuedata: {
  //     status: QUEUE.queuedata?.status
  //     , queueitem: QUEUE.queuedata?.queueitem
  //     , queueS: QUEUE.queuedata?.queueS
  //     , queueA: QUEUE.queuedata?.queueA
  //     , queueW: QUEUE.queuedata?.queueW
  //     , queueB: QUEUE.queuedata?.queueB
  //     , queueI: QUEUE.queuedata?.queueI
  //   }
  // };
  // console.log( MYDATA );

  // Enrich the currentState with type information
  // enrichWithTypeInformation( currentState );
  // To use this state for testing or as a base for mock data:
  // const mockState = stringify( currentState );

  // console.log( '' );
  // console.log( '' );
  // console.log( '' );
  // console.log( mockState );



  return (
    <NavigationContainer>


      <Stack.Navigator screenOptions={ {
        headerShown: false
      } }>
        {

          user.authenticated === true ?
            ( <Stack.Screen name="Tabs" component={ Tabs } options={ { title: 'Tabs', } } /> )
            :
            ( <Stack.Screen name="SignIn" component={ SignIn } options={ { title: 'Sign in', } } /> )

        }
      </Stack.Navigator>

    </NavigationContainer >
  );
};


// const mapStateToProps = (state: UserState) => {
//   const user = state
//   return { user }
// }

// export default connect(mapStateToProps)(App);

function mdsense () {
  //console.log(store.getState(), 'in mdsense');



  return (
    <Provider store={ store }>
      <App />
    </Provider>
  );
}

export default mdsense;

