import { useEffect } from 'react';
import { View } from 'react-native';
import { GiftedChat } from 'react-native-gifted-chat';
import { useAppSelector, useAppDispatch } from '../../../state/App/hooks';
import * as actions from '../../../state/App/actions';
import { Chat_styles } from './styles';
// import emojiUtils from 'emoji-utils';
// import SlackMessage from './SlackMessage.js';

export const ChatComponent = ( { messages, threadid, myid, first_name, last_name, customView: CustomView, customViewProps } ) => {



  const dispatch = useAppDispatch();
  //console.log(myid);

  const renderCustomViewInd = CustomView === undefined ? false : true;

  messages.sort( ( x, y ) => x.createdAt < y.createdAt ? 1 : -1 );

  useEffect( () => {
  }, [] );



  function onSend ( message: GiftdChatMsg[] ) {

    //console.log( 'on send msg', { msg: { ...message[ 0 ], notification_type: 'M' } } );

    let data = { msg: { ...message[ 0 ], notification_type: 'M' }, sender: myid, notification_type: 'M', receiver: Number( threadid ) - Number( myid ) };

    let newmessage: Message = { msg: { ...message[ 0 ], notification_type: 'M' }, _id: Number( myid ), notification_type: 'M', thread_id: String( threadid ), read_msg: 'true', time: new Date() };

    dispatch( actions.sendMessage( { newmessage: newmessage, data: data } ) );
    // }))
  }



  return (
    <View style={ Chat_styles.container }>
      <GiftedChat
        isCustomViewBottom={ true }
        renderCustomView={ ( item ) => {
          if ( renderCustomViewInd ) {
            return ( <CustomView { ...customViewProps } item={ item } /> );
          } else {
            return ( <></> );
          }
        } }
        messages={ messages }
        onSend={ ( messages: GiftdChatMsg[] ) => onSend( messages ) }
        user={ {
          _id: 1
          , name: first_name + ' ' + last_name
          // , avatar:{uri:'https://wallpapersdsc.net/wp-content/uploads/2017/05/Corn-Snake-Pictures.jpg'}
        } }
      />
    </View>

  );
};