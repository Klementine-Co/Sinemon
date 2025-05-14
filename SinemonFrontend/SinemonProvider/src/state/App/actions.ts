
import { AnyAction, Dispatch } from "redux";
import { AppDispatch } from "../store";
import * as APICALLS from "../../constants/API_CALLS";
import SocketIOClient, { Socket } from 'socket.io-client';
import { API } from "../../constants";

export const initUser = ( user: User ): StateAction =>
    ( { type: "init", payload: user, helper_type: 0 } );

export const setShow = ( show: Boolean ): StateAction =>
    ( { type: "set_show", payload: show, helper_type: 0 } );


export const clear = ( payload: UserState ): StateAction =>
    ( { type: "clear", payload: payload, helper_type: 0 } );


export const setSocket = ( payload: Socket ): StateAction =>
    ( { type: "set-socket", payload: payload, helper_type: 0 } );

export const setServiceItem = ( payload: ServiceItem ): StateAction =>
    ( { type: "set_serviceitem", payload: payload, helper_type: 0 } );

export const setProcedure = ( payload: { ref: number, code: string, desc: string; } ): StateAction =>
    ( { type: "set_pcode", payload: payload, helper_type: 0 } );

export const setModifier = ( payload: { ref: number, modifier: Modifier; } ): StateAction =>
    ( { type: "set_mx", payload: payload, helper_type: 0 } );

export const setDiagnosis = ( payload: Diagnosis ): StateAction =>
    ( { type: "set_dx", payload: payload, helper_type: 0 } );

export const setUnits = ( payload: { ref: number, units: number; } ): StateAction =>
    ( { type: "set_units", payload: payload, helper_type: 0 } );
export const setPlaceofService = ( payload: { ref: number, place_of_service: string; } ): StateAction =>
    ( { type: "set_place_of_service", payload: payload, helper_type: 0 } );
export const setDate = ( payload: { ref: number, date: Date; }, type: string ): StateAction =>
    ( { type: "set_date", payload: payload, helper_type: type } );
export const setClaim = ( payload: Claim ): StateAction =>
    ( { type: "set_claim", payload: payload, helper_type: 0 } );



export const login = ( email: string | undefined = undefined, password: string | undefined = undefined ) => {
    return async ( dispatch: AppDispatch ) => {
        const signedin = await APICALLS.login( email, password );
        dispatch( initUser( signedin ) );
        var socket: Socket = require( 'socket.io-client' ).connect( API.MDSENSEQUEUE_URI );
        dispatch( setSocket( socket ) );
        //console.log(signedin.myid);
        socket.emit( 'connected', signedin.myid );
        socket.emit( 'retrieveMessages', signedin.myid );
    };
};
export const logout = () => {
    return async ( dispatch: AppDispatch ) => {
        dispatch( setShow( Boolean( false ) ) );
        const signedout = APICALLS.logout();
        dispatch( clear( ( await signedout ) ) );
    };
};


export const setMyData = ( mydata: UserData ): StateAction =>
    ( { type: "set_mydata", payload: mydata, helper_type: 0 } );


export const setMyStatus = ( mystatus: String ): StateAction =>
    ( { type: "set_mystatus", payload: mystatus, helper_type: 0 } );


// export const addMyData = (item: UserDataItem, ITEM:String): StateAction =>
//     ({ type: "add_mydata",payload: item, helper_type:ITEM });


export const deleteMyData = ( item: UserDataItem ): StateAction =>
    ( { type: "delete_mydata", payload: item, helper_type: 0 } );
// export const setQueue = (queuedata:QueueData,  myvisit?:MyVisit) => {
//     return async (dispatch: AppDispatch) => {

//         dispatch(set_queue(queuedata, myvisit));
//     }
// };


export const set_queue = ( queue: Queue ): StateAction =>
    ( { type: "set_queue", payload: queue, helper_type: 0 } );

export const setMyQueue = ( queuedata: QueueData ): StateAction =>
    ( { type: "set_myqueue", payload: queuedata, helper_type: 0 } );


//     refreshProvider

// export const setNotificationsfunc = (notifications: Threads[], myid?:Number) => {
//         return async (dispatch: AppDispatch) => {
//             if (notifications.)
//             const signedout = APICALLS.refreshProvider(myid);
//             dispatch(clear((await signedout)));
//         }
//     };

export const setNotifications = ( notifications: Threads[] ): StateAction =>
    ( { type: "set_notifications", payload: notifications, helper_type: 0 } );

export const sendMessage = ( { newmessage, data }: sendMsg ): StateAction =>
    ( { type: "sendMessage", payload: { newmessage, data }, helper_type: 0 } );




// export 