import { produce } from "immer";
import { WritableDraft } from "immer/dist/internal";
import { Socket } from "socket.io-client";

export const initialState: UserState = {
  user: {} as User,
  queue: {} as Queue,
  myvisit: {} as MyVisit,
  notifications: {} as Threads[],
  socket: {} as Socket,
};

export const stateReducer = ( state = initialState, action: any ) => produce<UserState>( state, ( draft ) => {
  switch ( action.type ) {
    case "init":
      draft.user = action.payload as User;
      draft.myvisit = action.helper_type as MyVisit;
      break;

    case "set-socket":
      draft.socket = action.payload;
      break;

    case "set_mydata":
      draft.user.mydata = action.payload;
      break;

    case "set_show":
      draft.user.show = action.payload;
      break;
    case "clear":
      //console.log(action.payload.user, "action payload");
      draft.user = action.payload.user;
      break;

    case "add_mydata":
      switch ( action.helper_type ) {
        case "PROFILE":
          draft.user.mydata.Member = [ action.payload ];
          break;
        case "LAB":
          draft.user.mydata.labs.push( action.payload );
          break;
        case "MEDS":
          draft.user.mydata.Prescription.push( action.payload );
          break;
        case "MED INSUR":
          draft.user.mydata.MedInsurance.push( action.payload );
          break;
        case "RXINSUR":
          draft.user.mydata.RxInsurance.push( action.payload );
          break;
        case "DISCOUNT RXINSUR":
          draft.user.mydata.RxDiscount.push( action.payload );
          break;
        default:
          return draft;
      }
      break;

    case "join_queue":
    case "leave_queue":
    case "finish_queue":
      draft.queue.queue = action.payload;
      if ( draft.socket.connected === false ) draft.socket.connect();
      draft.socket.emit( "join_leave", action.payload );
      break;

    case "set_queue":
      // console.log('set queue', action.payload);
      
      switch ( typeof action.helper_type ) {
        case "number":
          draft.queue.queuedata = action.payload;
          draft.queue.queue = {
            member: draft.user.myid,
            from: "member",
            provider: action.payload?.data?.prov?.provider_id,
            method: undefined,
          } as QueueAction;
          break;
        default:
          draft.queue.queuedata = action.payload;
          draft.myvisit = action.helper_type;
          break;
      }
      break;

    case "set_notifications":
      draft.notifications = action.payload;
      break;

    case "sendMessage":

      draft.notifications
        .filter(
          ( x ) => x.thread.thread_id == action.payload.newmessage.thread_id
        )[ 0 ]
        .messages.push( action.payload.newmessage );
      draft.notifications
        .filter(
          ( x ) => x.thread.thread_id == action.payload.newmessage.thread_id
        )[ 0 ]
        .messages.sort( ( a: Message, b: Message ) =>
          a.time < b.time ? 1 : -1
        );

      draft.notifications.filter(
        ( x ) => x.thread.thread_id == action.payload.newmessage.thread_id
      )[ 0 ].thread = action.payload.newmessage;
      draft.socket.emit( "sendMessage", action.payload.data );


      let options = 'BCDN';

      if ( options.includes( action.payload.newmessage?.notification_type ) ) {

        draft.notifications.filter( x => x.thread.thread_id == action.payload.newmessage.thread_id )[ 0 ].messages = draft.notifications.filter( x => x.thread.thread_id == action.payload.newmessage.thread_id )[ 0 ].messages.filter( x =>
          !( x.notification_type === 'R' && x.msg.text === 'Please select' && x.msg?.user._id === action.payload?.newmessage?.msg.user._id ) );
      }


      break;
    case "set_visit":
      draft.myvisit = action.payload;
      break;
    case "set_mystatus":
      draft.queue.queuedata.mystatus = action.payload;
      break;

    case "rate_visit":
      switch ( action.payload.type ) {
        case "bedsidestars":
          draft.myvisit.review.bedside_stars = action.payload.rating;
          break;
        case "officestars":
          draft.myvisit.review.office_stars = action.payload.rating;
          break;
        case "staffstars":
          draft.myvisit.review.staff_stars = action.payload.rating;
          break;
        case "drstars":
          draft.myvisit.review.dr_stars = action.payload.rating;
          break;
        default:
          return draft;
      }
      break;

    case "comment_visit":
      draft.myvisit.review.comment = action.payload;
      break;

    case "answer_question":
      draft.myvisit.review.questions.filter(
        ( x: Question ) => x.id === action.helper_type
      )[ 0 ].answer = action.payload.answer;
      break;

    case "review_visit":
      draft.myvisit = {} as MyVisit;
      break;
    default:
      return draft;
  }
} );
