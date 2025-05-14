
import { AnyAction, Dispatch } from "redux";
import { AppDispatch } from "../store";
import * as APICALLS from "./../../constants/API_CALLS";
import SocketIOClient, { Socket } from 'socket.io-client'
import { API } from "../../constants";

export const initUser = (user: User, myvisit:MyVisit): StateAction =>
    ({ type: "init", payload: user, helper_type:myvisit });

export const setShow = (show: Boolean): StateAction =>
    ({ type: "set_show", payload: show, helper_type:0 });


export const clear = (payload:UserState): StateAction =>
    ({ type: "clear", payload: payload, helper_type:0 });


export const setSocket = (payload:Socket): StateAction =>
({ type: "set-socket", payload: payload, helper_type:0 });

export const switchaccount = (id:number, account_number:number) => {
    return async (dispatch: AppDispatch) => {
        const signedin = await APICALLS.switch_accounts(id, account_number);
        dispatch(initUser(signedin[0], signedin[1]));
        var socket :Socket = require('socket.io-client').connect(API.MDSENSEQUEUE_URI);
        dispatch(setSocket(socket));
        dispatch(setNotifications({} as Threads[]));
        socket.emit('connected', signedin[0].myid);
        socket.emit('retrieveMessages', signedin[0].myid);
    }
};

export const login = (email:string|undefined=undefined, password:string|undefined=undefined) => {
        return async (dispatch: AppDispatch) => {
            const signedin = await APICALLS.login(email, password)
            dispatch(initUser(signedin[0], signedin[1]));
            var socket :Socket = require('socket.io-client').connect(API.MDSENSEQUEUE_URI);
            dispatch(setSocket(socket));
            socket.emit('connected', signedin[0].myid);
            socket.emit('retrieveMessages', signedin[0].myid);
        }
    };
    export const logout = () => {
        return async (dispatch: AppDispatch) => {
            dispatch(setShow(Boolean(false)));
            const signedout = APICALLS.logout();
            dispatch(clear((await signedout)));
        }
    };

  
export const setMyData = (mydata: UserData): StateAction =>
    ({ type: "set_mydata", payload: mydata, helper_type:0 });
export const setMyStatus = (mystatus: String): StateAction =>
    ({ type: "set_mystatus", payload: mystatus, helper_type:0 });

  
export const addMyData = (item: UserDataItem, ITEM:String): StateAction =>
    ({ type: "add_mydata",payload: item, helper_type:ITEM });

  
export const deleteMyData = (item: UserDataItem): StateAction =>
    ({ type: "delete_mydata", payload: item, helper_type:0 });    
// export const setQueue = (queuedata:QueueData,  myvisit?:MyVisit) => {
//     return async (dispatch: AppDispatch) => {
        
//         dispatch(set_queue(queuedata, myvisit));
//     }
// };
export const set_queue = (queuedata: QueueData, myvisit?:MyVisit): StateAction =>
    ({ type: "set_queue", payload: queuedata, helper_type:myvisit??0 });


export const joinQueue = (queueaction: QueueAction): StateAction =>
    ({ type: "join_queue", payload: queueaction, helper_type:0 });

  
export const leaveQueue = (queueaction: QueueAction): StateAction =>
    ({ type: "leave_queue", payload: queueaction, helper_type:0 });

  
export const finishQueue = (queueaction: QueueAction): StateAction =>
    ({ type: "finish_queue", payload: queueaction, helper_type:0 });

  
export const setMyQueue = (queuedata: QueueData): StateAction =>
    ({ type: "set_myqueue", payload: queuedata, helper_type:0});
  
  
export const setNotifications = (notifications: Threads[]): StateAction =>
    ({ type: "set_notifications", payload: notifications, helper_type:0 });
  
export const sendMessage = ({newmessage, data}: sendMsg): StateAction =>
    ({ type: "sendMessage", payload: {newmessage, data}, helper_type:0 });
  
  
export const reviewVisit = (review: Review): StateAction =>
    ({ type: "review_visit", payload: review, helper_type:0 });

export const review = (id:Number, pid:Number, crsf:string, data:Review) => {
    return async (dispatch: AppDispatch) => {

        const response = await APICALLS.submitreview(id, pid, crsf, data);
        
        if (response?.status == 200) {
            dispatch(reviewVisit(data));
        };
    };
};
  
export const setMyVisit = (myvisit: MyVisit): StateAction =>
    ({ type: "set_visit", payload: myvisit, helper_type:0 });
  
  
export const rateVisit = (rate: Rate): StateAction =>
    ({ type: "rate_visit", payload: rate, helper_type:0 });
  
  
export const commentVisit = (comment: VisitComment): StateAction =>
    ({ type: "comment_visit", payload: comment, helper_type:0 });
  
  
export const answerQuestion = (question: Question, ID:number): StateAction =>
    ({ type: "answer_question", payload: question, helper_type:ID });


// export 