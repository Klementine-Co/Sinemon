import { useEffect } from 'react';
import { IMessage } from 'react-native-gifted-chat';
import { useAppSelector, useAppDispatch } from '../../state/App/hooks';
import { ChatComponent } from "../../screens";
// import emojiUtils from 'emoji-utils';
// import SlackMessage from './SlackMessage.js';

export const Chat = ( { route, navigation }: threadsProp ) => {

  const threadid = route.params.threadid;
  const provider = useAppSelector( ( state ) => state.user.mydata.Provider );
  const myid = provider.provider_id;
  var notifications = useAppSelector( ( state ) => state.notifications );
  //console.log( notifications[ 0 ].messages, 'XXX' );

  var messages = notifications.filter( x => x.thread.thread_id == threadid )[ 0 ].messages.map( ( x ) => {
    //console.log( x.msg.user._id, 'X' );
    if ( !( x.msg.user._id === 2 && x.notification_type === 'R' ) == true ) {
      return x.msg;
    }
    // return ( { ...x.msg, notification_type: x.notification_type } );
  } ) as IMessage[];

  //console.log( messages, 'XX' );

  // messages = messages.filter( x => {
  //   return (
  //     !( x.user._id === 2 && x.notification_type === 'R' ) == true
  //   );
  // }
  // );
  const customView = undefined;
  const customViewProps = undefined;
  messages = messages.filter( item => item !== undefined );
  messages.sort( ( x, y ) => x.createdAt < y.createdAt ? 1 : -1 );
  useEffect( () => {
  }, [] );





  return (
    <ChatComponent messages={ messages } threadid={ threadid } myid={ myid } first_name={ provider.provider.user.first_name } last_name={ provider.provider.user.last_name } customView={ customView }
      customViewProps={ customViewProps } />
  );
};