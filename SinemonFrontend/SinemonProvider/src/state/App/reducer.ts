import { produce } from "immer";
import SocketIOClient, { Socket } from "socket.io-client";

import { API } from "../../constants";
import axios from 'axios';

export const initialState: UserState = {
    user: {} as User,
    queue: {} as Queue,
    notifications: {} as Threads[],
    socket: {} as Socket,
    claim: {
        ref: 1,
        serviceitems: [] as ServiceItem[],
        diagnoses: [
            { ref: 1, code: '', desc: 'dx1' }
            , { ref: 2, code: '', desc: 'dx2' }
            , { ref: 3, code: '', desc: 'dx3' }
            , { ref: 4, code: '', desc: 'dx4' }
            , { ref: 5, code: '', desc: 'dx5' }
            , { ref: 6, code: '', desc: 'dx6' }
            , { ref: 7, code: '', desc: 'dx7' }
            , { ref: 8, code: '', desc: 'dx8' }
            , { ref: 9, code: '', desc: 'dx9' }
        ] as Diagnosis[],
        patient: {} as object | undefined,
        billing: {} as object | undefined,
        rendering: {} as object | undefined,
    } as Claim,
    //   appConfig: {
    //     // squareFormAppId: "sandbox-sq0idb-t0ibJCCJE38nDmIJCfxRvA",
    //     // squareFormLocationId: "8DMVFSNJXF2FB",
    //   } as AppConfig,
    //   pendingAnimations: [] as AnimationItem[],
};



export const stateReducer = ( state = initialState, action: any ) => produce<UserState>( state, draft => {
    //console.log(action);

    switch ( action.type ) {
        case "init":
            draft.user = action.payload;
            draft.claim.billing = action.payload?.mydata?.Billing;
            draft.claim.rendering = action.payload?.mydata?.Provider;
            break;

        // case "init_app_config":
        //     draft.appConfig = action.payload;
        // break;

        case "set-socket":
            draft.socket = action.payload;
            break;

        case "set_mydata":
            draft.user.mydata = action.payload;
            draft.claim.billing = action.payload?.Billing;
            draft.claim.rendering = action.payload?.Provider;
            break;

        case "set_show":
            draft.user.show = action.payload;
            break;
        case "clear":
            //console.log( action.payload.user, 'action payload' );
            draft.user = action.payload.user;
            break;


        case "join_queue":
        case "leave_queue":
        case "finish_queue":
            draft.queue.queue = action.payload;
            if ( draft.socket.connected === false ) draft.socket.connet();
            draft.socket.emit( 'join_leave', action.payload );
            break;

        case "set_queue":
            draft.queue = action.payload;
            break;

        case "set_notifications":
            draft.notifications = action.payload;
            break;


        case "sendMessage":
            //console.log( '\n\n\n\nDEBUG\n\n\n' );
            //console.log( draft.notifications );
            //console.log( action.payload.newmessage.msg.user.name );
            //console.log( '\n\n\n\nDEBUG\n\n\n' );
            const newthread: Threads = {
                messages: [ action.payload.newmessage ] as Message[],
                thread: action.payload.newmessage as Message,
                receiverName: action.payload.newmessage.msg.user.name

            };
            if ( draft.notifications.length === undefined ) {
                //console.log( 'I\'m empty' );
                draft.notifications = [ newthread ] as Threads[];
                draft.socket.emit( 'sendMessage', action.payload.data );
            } else {


                const exists = draft.notifications.filter( x => x.thread.thread_id == action.payload.newmessage.thread_id )[ 0 ].messages.filter( x => x.notification_type === 'R' && x.msg.text === action.payload?.newmessage?.msg.text && x.msg?.user._id === action.payload?.newmessage?.msg.user._id );

                //console.log( exists );

                //console.log(exists.length);


                if ( exists.length < 1 ) {

                    draft.notifications.filter( x => x.thread.thread_id == action.payload.newmessage.thread_id )[ 0 ].messages.push( action.payload.newmessage );
                    draft.notifications.filter( x => x.thread.thread_id == action.payload.newmessage.thread_id )[ 0 ].messages.sort( ( a: { time: Date; }, b: { time: Date; } ) => ( a.time < b.time ? 1 : -1 ) );
                    draft.notifications.filter( x => x.thread.thread_id == action.payload.newmessage.thread_id )[ 0 ].thread = action.payload.newmessage;
                    draft.socket.emit( 'sendMessage', action.payload.data );
                }
            }
            break;

        case "set_dx":
            //console.log( action.payload );
            draft.claim.diagnoses.filter( x => x.ref === action.payload.ref )[ 0 ].code = action.payload.code;
            draft.claim.diagnoses.filter( x => x.ref === action.payload.ref )[ 0 ].desc = action.payload.desc;
            break;
        case "set_mx":

            //console.log('DEBUG in set mx', action.payload);

            if ( draft.claim.serviceitems.length > 0 ) {
                if ( draft.claim.serviceitems.filter( x => x.ref === action.payload.ref ).length > 0 ) {
                    if ( draft.claim.serviceitems.filter( x => x.ref === action.payload.ref )[ 0 ].modifiers.filter( x => x.ref === action.payload?.modifier.ref ).length > 0 ) {
                        draft.claim.serviceitems.filter( x => x.ref === action.payload.ref )[ 0 ].modifiers[ action.payload?.modifier.ref - 1 ] = action.payload?.modifier;
                        //console.log('DEBUG set 1');
                    }

                }
            } else {
                //console.log('DEBUG set 2');
                var mxs = [
                    {
                        ref: 1,
                        desc: 'mx1',
                        code: 'mx1',
                    },
                    {
                        ref: 2,
                        desc: 'mx2',
                        code: 'mx2',
                    },
                    {
                        ref: 3,
                        desc: 'mx3',
                        code: 'mx3',
                    },
                    {
                        ref: 4,
                        desc: 'mx4',
                        code: 'mx4',
                    },
                ] as Modifier[];
                //console.log( mxs.filter( x => x.ref === action.payload?.modifier.ref )[ 0 ] );
                mxs[ action.payload?.modifier.ref - 1 ] = action.payload?.modifier;
                //console.log( mxs.filter( x => x.ref === action.payload?.modifier.ref )[ 0 ] );

                draft.claim.serviceitems.push( {
                    service: {
                        code: ''
                        , desc: ''
                        , fromdate: new Date()
                        , todate: new Date()
                        , units: 0
                        , mintues: 0
                        , place_of_service: ''
                    },
                    modifiers: mxs,
                    dx_pointer: '',
                    ref: 1
                } as ServiceItem );
            }
            break;
        case "set_serviceitem":

            if ( draft.claim.serviceitems.filter( x => x.ref === action.payload.ref ).length > 0 ) {
                draft.claim.serviceitems.filter( x => x.ref === action.payload.ref )[ 0 ] = action.payload;
            } else {
                draft.claim.serviceitems.push( action.payload );
            }
            break;
        case "set_pcode":

            //console.log(draft.claim.serviceitems);

            if ( draft.claim.serviceitems.length > 0 ) {
                //console.log(action.payload.ref, 'REF', draft.claim.serviceitems.filter(x=> x.ref === action.payload.ref).length);

                //console.log('action', draft.claim.serviceitems.map(x=>x.ref).reduce(function(x, y){return Math.max(x, y);}) + 1);
                if ( draft.claim.serviceitems.filter( x => x.ref === action.payload.ref ).length > 0 ) {
                    draft.claim.serviceitems.filter( x => x.ref === action.payload.ref )[ 0 ].service.code = action.payload?.code;
                    draft.claim.serviceitems.filter( x => x.ref === action.payload.ref )[ 0 ].service.desc = action.payload?.desc;
                } else {
                    //console.log(draft.claim.serviceitems, '1');

                    draft.claim.serviceitems.push( {
                        service: {
                            code: action.payload?.code
                            , desc: action.payload?.desc
                            , fromdate: new Date()
                            , todate: new Date()
                            , units: 0
                            , mintues: 0
                            , place_of_service: ''
                        },
                        modifiers: [
                            {
                                ref: 1,
                                desc: 'mx1',
                                code: 'mx1',
                            },
                            {
                                ref: 2,
                                desc: 'mx2',
                                code: 'mx2',
                            },
                            {
                                ref: 3,
                                desc: 'mx3',
                                code: 'mx3',
                            },
                            {
                                ref: 4,
                                desc: 'mx4',
                                code: 'mx4',
                            },
                        ],
                        dx_pointer: '',
                        ref: action.payload.ref
                    } as ServiceItem );

                    //console.log(draft.claim.serviceitems, '2');
                }
            } else {
                draft.claim.serviceitems.push( {
                    service: {
                        code: action.payload?.code
                        , desc: action.payload?.desc
                        , fromdate: new Date()
                        , todate: new Date()
                        , units: 0
                        , mintues: 0
                        , place_of_service: ''
                    },
                    modifiers: [
                        {
                            ref: 1,
                            desc: 'mx1',
                            code: 'mx1',
                        },
                        {
                            ref: 2,
                            desc: 'mx2',
                            code: 'mx2',
                        },
                        {
                            ref: 3,
                            desc: 'mx3',
                            code: 'mx3',
                        },
                        {
                            ref: 4,
                            desc: 'mx4',
                            code: 'mx4',
                        },
                    ],
                    dx_pointer: '',
                    ref: 1
                } as ServiceItem );
            }
            break;
        case "set_units":

            if ( draft.claim.serviceitems.filter( x => x.ref === action.payload.ref ).length > 0 ) {
                draft.claim.serviceitems.filter( x => x.ref === action.payload.ref )[ 0 ].service.units = action.payload?.units;
            }
            break;
        case "set_place_of_service":

            if ( draft.claim.serviceitems.length > 0 ) {
                if ( draft.claim.serviceitems.filter( x => x.ref === action.payload.ref ).length > 0 ) {
                    draft.claim.serviceitems.filter( x => x.ref === action.payload.ref )[ 0 ].service.place_of_service = action.payload?.place_of_service;

                }
            } else {
                var mxs = [
                    {
                        ref: 1,
                        desc: 'mx1',
                        code: 'mx1',
                    },
                    {
                        ref: 2,
                        desc: 'mx2',
                        code: 'mx2',
                    },
                    {
                        ref: 3,
                        desc: 'mx3',
                        code: 'mx3',
                    },
                    {
                        ref: 4,
                        desc: 'mx4',
                        code: 'mx4',
                    },
                ] as Modifier[];

                draft.claim.serviceitems.push( {
                    service: {
                        code: ''
                        , desc: ''
                        , fromdate: new Date()
                        , todate: new Date()
                        , units: 0
                        , mintues: 0
                        , place_of_service: action.payload?.place_of_service
                    },
                    modifiers: mxs,
                    dx_pointer: '',
                    ref: 1
                } as ServiceItem );
            }
            break;
        case "set_date":

            //console.log(action.helper_type );

            if ( draft.claim.serviceitems.filter( x => x.ref === action.payload.ref ).length > 0 && action.helper_type === 'from' ) {
                draft.claim.serviceitems.filter( x => x.ref === action.payload.ref )[ 0 ].service.fromdate = action.payload?.date;
            };
            if ( draft.claim.serviceitems.filter( x => x.ref === action.payload.ref ).length > 0 && action.helper_type === 'to' ) {
                draft.claim.serviceitems.filter( x => x.ref === action.payload.ref )[ 0 ].service.todate = action.payload?.date;
            };
            break;
        case "set_claim":
            draft.claim = action.payload;
            break;
        // case "answer_question":
        //     draft.myvisit.review.questions.filter( (x: Question) =>x.id === action.helper_type)[0].answer = action.payload;
        //     break;

        default:
            return draft;
        // break;
    }
} );

