import { IMessage } from "react-native-gifted-chat";
import { useAppSelector, useAppDispatch } from "../../state/App/hooks";
import * as ACTIONS from "../../state/App/actions";
import { useEffect } from "react";
import { RQA } from "./RQA";
import { ChatComponent } from "../../screens";
export const Chat = ( { route, navigation }: threadsProp ) => {
  //console.log(route.params);
  const dispatch = useAppDispatch();
  const threadid = route.params.threadid;
  const member: any = useAppSelector( ( state ) => state.user.mydata.Member );
  const myid = member.member_id;
  var notifications = useAppSelector( ( state ) =>
    state.notifications
  );//as IMessage[]
  var messages = notifications.filter( ( x ) => x.thread.thread_id == threadid )[ 0 ]
    .messages.map( ( x ) => {
      return x.msg;
    } ) as IMessage[];
  //console.log(member.member_id);
  messages.sort( ( x, y ) => x.createdAt < y.createdAt ? 1 : -1 );
  useEffect( () => {
    //console.log( messages );
  }, [] );


  function answerAccess ( answer: String ) {
    var provider_id: Number = Number( threadid ) - Number( myid );
    const myname = `${ member.member.user.first_name } ${ member.member.user.last_name }`;
    const msg = [ { "_id": 1, "createdAt": new Date(), "text": answer !== 'N' ? 'Approved' : 'Not approved', "user": { "_id": 1, "name": myname } } ];
    let data = { msg: msg[ 0 ], sender: myid, notification_type: answer, receiver: provider_id };
    let newmessage: Message = { msg: msg[ 0 ], _id: Number( myid ), notification_type: answer, thread_id: String( threadid ), read_msg: 'true', time: new Date() };
    //console.log( 'DEBUG approving request', newmessage );
    dispatch( ACTIONS.sendMessage( { newmessage: newmessage, data: data } ) );
  }



  return (
    <ChatComponent messages={ messages } threadid={ threadid } myid={ myid } first_name={ member.member.user.first_name } last_name={ member.member.user.last_name } customView={ RQA }
      customViewProps={ { answerAccess: answerAccess } } />
  );
};