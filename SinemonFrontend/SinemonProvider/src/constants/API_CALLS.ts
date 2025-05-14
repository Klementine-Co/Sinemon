import * as API from "./API";

import axios, { AxiosResponse } from "axios";

import * as Keychain from 'react-native-keychain';
import { COLORS } from "./appTheme";
import { initialState } from "../state/App/reducer";
import * as xml2js from 'xml-js';
const clientSignIn = () => {
    //console.log( API.MDSENSELOGIN_URI );
    return ( {
        method: 'POST',
        url: `${ API.MDSENSELOGIN_URI }`,
        withCredentials: true,
        headers: {
            'Content-Type': 'application/json',
            // 'Content-Type': 'application/x-www-form-urlencoded',
            // "Access-Control-Allow-Origin": "*",
            'Accept': 'application/json',
            'Host': `${ API.IPADDR }`
        },
        validateStatus: function ( status: Number ) {
            return status as number <= 500; // Reject only if the status code is greater than or equal to 500
        }
    } );
};

const clientSignOut = ( crsf: string ) => {
    return ( {
        method: 'POST',
        url: `${ API.MDSENSELOGOUT_URI }`,
        headers: {
            // "Access-Control-Allow-Origin": "*",
            "Content-Type": "application/json",
            // "Content-Type": 'application/x-www-form-urlencoded',
            "Accept": "application/json",
            "X-CSRFToken": crsf
        }
    } );
};





async function getCRSF ( crsf: String[] | String ) {

    //console.log('crsf', crsf);

    let CRSF: String = '';
    const reg: RegExp = new RegExp( 'csrftoken' );
    if ( crsf.length > 0 ) {
        CRSF = String( crsf );
        //console.log(CRSF);

        const crsfarray = CRSF.split( ';' );
        for ( let index = 0; index < crsfarray.length; index++ ) {
            let element = crsfarray[ index ];
            if ( reg.test( element ) ) {
                CRSF = element.replace( 'csrftoken', '' ).replace( '=', '' );
                return <string> CRSF;
            }
        }
        return '';
    } else {
        return '';
    }
};

async function getSignIN ( resp: AxiosResponse<any, any> | undefined = undefined ) {



    const ud: UserData = {
        Provider: resp?.data?.Provider === undefined ? undefined : resp?.data?.Provider[ 0 ] ?? {}
        , Billing: resp?.data?.RenderingProvider === undefined ? undefined : resp?.data?.RenderingProvider[ 0 ] ?? {}
        , QueueConfig: resp?.data?.QueueConfig === undefined ? undefined : resp?.data?.QueueConfig[ 0 ] ?? {}
        , License: resp?.data?.License ?? []
        , Actions: resp?.data?.Actions ?? []
        , Probations: resp?.data?.Probations ?? []
        , Convictions: resp?.data?.Convictions ?? []
        , Accusations: resp?.data?.Accusations ?? []
        , Malpractices: resp?.data?.Malpractices ?? []
        , Arbitrations: resp?.data?.Arbitrations ?? []
        , Citations: resp?.data?.Citations ?? []
        , Patientvisit: resp?.data?.Patientvisit ?? []
        , Number_negatives_v: resp?.data?.Number_negatives_v ?? []
        , Number_of_negatives: resp?.data?.Number_of_negatives ?? []
    };

    const myid = resp?.data?.Provider === undefined ? undefined : resp?.data?.Provider[ 0 ].provider_id ?? 0;

    // const CRSF = JSON.parse(<string>resp?.headers?.cookies?.replace(/'/g, '"'))?.csrftoken ?? await getCRSF(resp?.headers['set-cookie']??resp?.headers['Cookie']??'');

    //console.log(JSON.parse(<string>resp?.headers?.cookies?.replace(/'/g, '"')), 'CRSF token 1');
    //console.log(CRSF, 'CRSF token 2 Myid:', myid);
    //console.log( resp?.headers[ 'set-cookie' ], 'CRSF token 1', resp?.headers[ 'vary' ][ 'Cookie' ] );

    //console.log( resp?.headers, 'CRSF tokens header', resp?.headers[ 'set-cookie' ] ?? resp?.headers[ 'Cookie' ] ?? '' );

    if ( resp?.status === 200 ) {

        return <User> { crsf: 'undefined', myid: myid, authenticated: true, mydata: ud, status: true, color: 'green', show: false };
    } else {
        return <User> { crsf: 'undefined', myid: myid, authenticated: false, mydata: ud, status: true, color: 'red', show: false };
    }
};


const udata: UserData = {
    Provider: {},
    Billing: {},
    QueueConfig: {},
    License: [],
    Actions: [],
    Probations: [],
    Convictions: [],
    Accusations: [],
    Malpractices: [],
    Arbitrations: [],
    Citations: [],
    Number_negatives_v: [],
    Number_of_negatives: [],
    Patientvisit: []
};
const user: User = {
    myid: 0
    , crsf: ''
    , authenticated: false
    , mydata: udata
    , status: false
    , color: 'grey'
    , show: false

};

const payload = { ...initialState, user: user };

export async function logout () {

    try {
        const creds =  await Keychain.getGenericPassword();
        // const creds = { password: await SecureStore.getItemAsync( 'secure_token' ) };


        if ( creds?.password !== null && creds?.password !== 'undefined' && creds?.password !== 'undefined' ) {

            //console.log( 'cleaning', <string> creds?.password );
            //console.log(<string>creds.password);

            //console.log(<string>creds.password);
            const response = await axios( { ...clientSignOut( <string> creds.password ) } );
            // alert(String(response.data.success));
            //console.log( response.data.success );
            //console.log( response, 'Logging Out' );
            //console.log(response, 'Logging Out');
        }

        await Keychain.resetGenericPassword();
        // await SecureStore.deleteItemAsync( 'secure_token' );



        return payload;

    } catch ( error ) {
        //console.log( error, 'Error' );
        return payload;
    }
};

export async function login ( email: string | undefined = undefined, password: string | undefined = undefined ) {
    const data = {
        "username": email ?? "Benatti.atwood.david.wade@provider.com",
        "email": email ?? "Benatti.atwood.david.wade@provider.com",
        "password": password ?? '1234'
    };

    //console.log('logging in', data);

    try {

        await logout();
        const response = await axios( { ...clientSignIn(), data: data } );
        //console.log('response token1', response.data);

        const signedIN = await getSignIN( response );
        //console.log('response data', signedIN);
        if ( signedIN?.crsf ) {
            //console.log('signed crsf',signedIN?.crsf );

            // await  Keychain.setGenericPassword(email ?? "bradley34@example.org", signedIN.crsf)
            await  Keychain.setGenericPassword( 'secure_token', signedIN.crsf );
            // await SecureStore.setItemAsync( 'secure_token', signedIN.crsf );
        }

        //console.log(signedIN);

        return signedIN;
    } catch ( error ) {
        //console.log( error );
        //console.log( error?.response );
        //console.log( error?.request );

        const signedIN = await getSignIN();
        return signedIN;
    }
};









async function getRefreshed ( resp: AxiosResponse<any, any> | undefined = undefined ) {



    const ud: UserData = {
        Provider: resp?.data?.Provider === undefined ? undefined : resp?.data?.Provider[ 0 ] ?? {}
        , Billing: resp?.data?.RenderingProvider === undefined ? undefined : resp?.data?.RenderingProvider[ 0 ] ?? {}
        , QueueConfig: resp?.data?.QueueConfig === undefined ? undefined : resp?.data?.QueueConfig[ 0 ] ?? {}
        , License: resp?.data?.License ?? []
        , Actions: resp?.data?.Actions ?? []
        , Probations: resp?.data?.Probations ?? []
        , Convictions: resp?.data?.Convictions ?? []
        , Accusations: resp?.data?.Accusations ?? []
        , Malpractices: resp?.data?.Malpractices ?? []
        , Arbitrations: resp?.data?.Arbitrations ?? []
        , Citations: resp?.data?.Citations ?? []
        , Patientvisit: resp?.data?.Patientvisit ?? []
        , Number_negatives_v: resp?.data?.Number_negatives_v ?? []
        , Number_of_negatives: resp?.data?.Number_of_negatives ?? []
    };



    if ( resp?.status === 200 ) {

        return ud;
    } else {
        return undefined;
    }
};

const retrieveProvider = ( id: number ) => {
    return ( {
        method: 'GET',
        url: `${ API.MDSENSEBASE_URI }provider/?pid=${ id }`,
        headers: {
            'Content-Type': 'application/json;charset=UTF-8;application/x-www-form-urlencoded',
            "Access-Control-Allow-Origin": "*",
            'Accept': 'application/json',
        },
    } );
};


export async function refreshProvider ( id: number ) {
    try {
        const response = await axios( { ...retrieveProvider( id ) } );
        const refreshed = await getRefreshed( response );
        return refreshed;
    } catch ( error ) {
        //console.log( error );

        return undefined;
    }

};




const retrieveLoc = () => {
    return ( {
        method: 'GET',
        url: "https://production.shippingapis.com/ShippingAPITest.dll?API=CityStateLookup&XML=<CityStateLookupRequest USERID=\"535NA0003861\"><ZipCode ID=\"0\"><Zip5>91316</Zip5></ZipCode></CityStateLookupRequest>",
        headers: {
            "Content-Type": "text/xml",
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Credentials": true,
            "Access-Control-Allow-Methods": "GET",
        },
    } );
};

interface CityStateLookupResponse {
    CityStateLookupResponse: {
        ZipCode: {
            City: {
                _text: string;
            };
            State: {
                _text: string;
            };
            Zip5: {

            };
            _attributes: {

            };
            _declaration: {
            };
        };
    };
}

const parseLocation = ( data: string ) => {

    // Parse the XML to JavaScript object
    const result = xml2js.xml2json( data, { compact: true, spaces: 4 } );
    const jsonObj: CityStateLookupResponse = JSON.parse( result );
    const city = jsonObj.CityStateLookupResponse.ZipCode.City._text;
    const state = jsonObj.CityStateLookupResponse.ZipCode.State._text;

    const location = {
        city: city,
        state: state
    };
    //console.log( 'City ', location );
    return location;
};

export async function getLocation ( zipcode?: string ) {
    try {
        const response = await axios( { ...retrieveLoc() } );
        const location = parseLocation( response.data );
        //console.log(location);
        //console.log(location, 'location data')

        return location;
    } catch ( error ) {
        //console.log( error );
        //console.log( error?.response );
        //console.log( error?.request );

        return undefined;
    }

};


const retrieveMember = ( id: number ) => {
    return ( {
        method: 'GET',
        url: `${ API.MDSENSEBASE_URI }member/?mid=${ id }`,
        headers: {
            'Content-Type': 'application/json;charset=UTF-8;application/x-www-form-urlencoded',
            "Access-Control-Allow-Origin": "*",
            'Accept': 'application/json',
        },
    } );
};



export async function getMember ( id: number ) {
    try {
        //console.log( 'Member ID:', id );

        const response = await axios( { ...retrieveMember( id ) } );
        //console.log( 'GET MEMEBER RESPONSE', response );
        return response;
    } catch ( error ) {
        if ( error?.response?.data?.detail === "You do not have permission to perform this action." ) {
            //console.log( 'NO permision' );

            return 'rqa';
        };

        //console.log( error );
        //console.log( error?.response );
        //console.log( error?.request );

        return undefined;
    }
};





const retrievePcodes = ( cat: string ) => {//console.log(cat, 'CATEGORY');
    return ( {
        method: 'GET',
        url: `${ API.MDSENSEGETPCODES_URI }?cat=${ cat }`,
        headers: {
            'Content-Type': 'application/json;charset=UTF-8;application/x-www-form-urlencoded',
            "Access-Control-Allow-Origin": "*",
            'Accept': 'application/json',
        },
    } );
};



export async function getPcodes ( cat: string ) {
    try {
        //console.log(cat, 'pcode cat');

        const response = await axios( { ...retrievePcodes( cat ) } );
        //console.log(response);
        return response;
    } catch ( error ) {
        if ( error?.response?.data?.detail === "You do not have permission to perform this action." ) {
            return 'rqa';
        };

        //console.log( error );
        //console.log( error?.response );
        //console.log( error?.request );

        return undefined;
    }
};


const retrievePCatcodes = ( cat_desc: string ) => {
    return ( {
        method: 'GET',
        url: `${ API.MDSENSEGETPCATCODES_URI }?cat_desc=${ cat_desc }`,
        headers: {
            'Content-Type': 'application/json;charset=UTF-8;application/x-www-form-urlencoded',
            "Access-Control-Allow-Origin": "*",
            'Accept': 'application/json',
        },
    } );
};

export async function getPCatcodes ( cat_desc: string ) {
    try {
        //console.log(cat_desc);

        const response = await axios( { ...retrievePCatcodes( cat_desc ) } );
        //console.log(response);
        return response;
    } catch ( error ) {
        if ( error?.response?.data?.detail === "You do not have permission to perform this action." ) {
            return 'rqa';
        };

        //console.log( error );
        //console.log( error?.response );
        //console.log( error?.request );

        return undefined;
    }
};




const retrieveDcodes = ( cat: string ) => {
    return ( {
        method: 'GET',
        url: `${ API.MDSENSEGETDCODES_URI }?cat=${ cat }`,
        headers: {
            'Content-Type': 'application/json;charset=UTF-8;application/x-www-form-urlencoded',
            "Access-Control-Allow-Origin": "*",
            'Accept': 'application/json',
        },
    } );
};



export async function getDcodes ( cat: string ) {
    try {
        //console.log(cat);

        const response = await axios( { ...retrieveDcodes( cat ) } );
        //console.log(response);
        return response;
    } catch ( error ) {
        if ( error?.response?.data?.detail === "You do not have permission to perform this action." ) {
            return 'rqa';
        };

        //console.log( error );
        //console.log( error?.response );
        //console.log( error?.request );

        return undefined;
    }
};

const retrieveDCatcodes = ( cat_desc: string ) => {
    return ( {
        method: 'GET',
        url: `${ API.MDSENSEGETDCATCODES_URI }?cat_desc=${ cat_desc }`,
        headers: {
            'Content-Type': 'application/json;charset=UTF-8;application/x-www-form-urlencoded',
            "Access-Control-Allow-Origin": "*",
            'Accept': 'application/json',
        },
    } );
};

export async function getDCatcodes ( cat_desc: string ) {
    try {
        //console.log(cat_desc);

        const response = await axios( { ...retrieveDCatcodes( cat_desc ) } );
        //console.log(response);
        return response;
    } catch ( error ) {
        if ( error?.response?.data?.detail === "You do not have permission to perform this action." ) {
            return 'rqa';
        };

        //console.log( error );
        //console.log( error?.response );
        //console.log( error?.request );
        return undefined;
    }
};

const retrieveMcodes = ( cat_desc: string ) => {//console.log(cat_desc, 'CATEGORY');
    return ( {
        method: 'GET',
        url: `${ API.MDSENSEGETMCODES_URI }?cat_desc=${ cat_desc }`,
        headers: {
            'Content-Type': 'application/json;charset=UTF-8;application/x-www-form-urlencoded',
            "Access-Control-Allow-Origin": "*",
            'Accept': 'application/json',
        },
    } );
};



export async function getMcodes ( cat_desc: string ) {
    try {
        //console.log(cat_desc, 'mcode cat');

        const response = await axios( { ...retrieveMcodes( cat_desc ) } );
        //console.log(response);
        return response;
    } catch ( error ) {
        if ( error?.response?.data?.detail === "You do not have permission to perform this action." ) {
            return 'rqa';
        };

        //console.log( error );
        //console.log( error?.response );
        //console.log( error?.request );

        return undefined;
    }
};


const retrievePOScodes = ( desc: string ) => {//console.log(desc, 'CATEGORY');
    return ( {
        method: 'GET',
        url: `${ API.MDSENSEGETPOSCODES_URI }?desc=${ desc }`,
        headers: {
            'Content-Type': 'application/json;charset=UTF-8;application/x-www-form-urlencoded',
            "Access-Control-Allow-Origin": "*",
            'Accept': 'application/json',
        },
    } );
};



export async function getPOScodes ( desc: string ) {
    try {
        //console.log(desc, 'poscode cat');

        const response = await axios( { ...retrievePOScodes( desc ) } );
        //console.log(response);
        return response;
    } catch ( error ) {
        if ( error?.response?.data?.detail === "You do not have permission to perform this action." ) {
            return 'rqa';
        };

        //console.log( error );
        //console.log( error?.response );
        //console.log( error?.request );

        return undefined;
    }
};



var service: Service = {
    code: ''
    , desc: ''
    , fromdate: new Date()
    , todate: new Date()
    , units: 0
    , minutes: 0
    , place_of_service: ''
};

var dxs: Diagnosis[] = [];

var mxs: Modifier[] = [];

var serviceitem: ServiceItem = {
    service: {} as Service
    , modifiers: [] as Modifier[]
    , dx_pointer: ''
    , ref: 0
};


var claim: Claim = {
    ref: 0
    , serviceitems: [] as ServiceItem[]
    , diagnoses: [] as Diagnosis[]
    , patient: {}
    , billing: {}
    , rendering: {}
};


const retrieveClaim = ( claimid: string ) => {
    return ( {
        method: 'GET',
        url: `${ API.MDSENSEGETCLAIM_URI }?cid=${ claimid }`,
        headers: {
            'Content-Type': 'application/json;charset=UTF-8;application/x-www-form-urlencoded',
            "Access-Control-Allow-Origin": "*",
            'Accept': 'application/json',
        },
    } );
};

export async function getClaim ( claimid: string ) {
    try {
        //console.log(claimid);

        const response = await axios( { ...retrieveClaim( claimid ) } );


        claim.ref = response?.data.Claim_Info[ 0 ].claimid;
        claim.billing = response?.data.Claim_Info[ 0 ].billing;
        claim.patient = response?.data.Claim_Info[ 0 ].member;
        dxs.push( { ref: 1, code: response?.data.Claim_Info[ 0 ].primary_diagnosis.split( " - " )[ 0 ], desc: response?.data.Claim_Info[ 0 ].primary_diagnosis.split( " - " )[ 1 ] } as Diagnosis );


        response?.data?.Claim_Dx.filter( ( x: { diagnosis: { code: any; desc: any; }; ref: any; } ) => dxs.push( { code: x.diagnosis.code, desc: x.diagnosis.desc, ref: x.ref } as Diagnosis ) );

        dxs.map( ( x, index ) => x.ref = Number( x.ref ) + index );
        //console.log(dx);

        claim.diagnoses = dxs;


        response?.data?.Claim_Mx.filter( ( x: { modifier: { code: any; desc: any; }; ref: any; } ) => mxs.push( { code: x.modifier.code, desc: x.modifier.desc, ref: x.ref } as Modifier ) );


        response?.data?.Claim_Detail.filter( ( x: { procedure_code: { code: any; desc: any; }; fromdate: any; todate: any; units: any; place_of_service: { desc: any; }; dx_pointer: any; ref: any; } ) => claim.serviceitems.push(

            {
                service: {
                    code: x.procedure_code.code
                    , desc: x.procedure_code.desc
                    , fromdate: new Date( x.fromdate )
                    , todate: new Date( x.todate )
                    , units: x.units
                    , minutes: 0
                    , place_of_service: x.place_of_service.desc
                },
                modifiers: mxs,
                dx_pointer: x.dx_pointer,
                ref: x.ref

            } as ServiceItem
        ) );



        //console.log('Claim', claim);
        var tmp = claim;
        dxs = [];
        mxs = [];
        claim = {
            ref: 0
            , serviceitems: [] as ServiceItem[]
            , diagnoses: [] as Diagnosis[]
            , patient: {}
            , billing: {}
            , rendering: {}
        };

        return tmp;
    } catch ( error ) {
        if ( error?.response?.data?.detail === "You do not have permission to perform this action." ) {
            return {} as Claim;
        };

        //console.log( error );
        //console.log( error?.response );
        //console.log( error?.request );
        return {} as Claim;
    }
};

























