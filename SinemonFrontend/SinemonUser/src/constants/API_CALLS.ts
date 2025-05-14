import * as API from "./API";

import axios, { AxiosResponse } from "axios";

import * as Keychain from 'react-native-keychain';

import { COLORS } from "./appTheme";
import { initialState } from "../state/App/reducer";
import * as xml2js from 'xml-js';
const clientSignIn = () => {
    return ( {
        method: 'POST',
        url: `${ API.MDSENSELOGIN_URI }`,
        withCredentials: true,
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            // 'Content-Type': 'application/x-www-form-urlencoded',
            // "Access-Control-Allow-Origin": "*",
            // 'Host': '10.0.0.7',
            'Pragma': 'no-cache',
            'Cache-Control': 'no-cache',
        },
        //   validateStatus: function (status:Number) {
        //     return status <= 500; // Reject only if the status code is greater than or equal to 500
        //   }
    } );
};

const clientSignOut = ( crsf: string ) => {
    return ( {
        method: 'POST',
        url: `${ API.MDSENSELOGOUT_URI }`,
        withCredentials: true,
        headers: {
            // "Access-Control-Allow-Origin": "*",
            "Content-Type": "application/json",
            // "Content-Type": 'application/x-www-form-urlencoded',
            "Accept": "application/json",
            // "X-CSRFToken":crsf
        }
    } );
};





async function getCRSF ( crsf: String[] | String ) {



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

async function getSignIN ( resp: AxiosResponse<any, any> | undefined = undefined ): Promise<[ User, MyVisit ]> {

    //console.log('crsf', document.cookie.split(';'));
    const ud: UserData = {
        Member: resp?.data?.Member === undefined ? undefined : resp?.data?.Member[ 0 ] ?? {},
        BodyComp: resp?.data?.BodyComp === undefined ? undefined : resp?.data?.BodyComp[ 0 ] ?? {},
        labs: resp?.data?.labs ?? [],
        mdNotes: resp?.data?.mdNotes ?? [],
        Vaccinations: resp?.data?.Vaccinations ?? [],
        Visits: resp?.data?.Visits ?? [],
        Prescription: resp?.data?.Prescription ?? [],
        MedInsurance: resp?.data?.MedInsurance ?? [],
        RxInsurance: resp?.data?.RxInsurance ?? [],
        RxDiscount: resp?.data?.RxDiscount ?? [],
        Accounts: resp?.data?.User_Custom ?? [],
        Patientvisit: []
    };

    const myid = resp?.data?.Member === undefined ? undefined : resp?.data?.Member[ 0 ].member_id ?? 0;



    //console.log( 'THE DATA', resp?.data );


    const review: Review = {
        staff_stars: 0
        , bedside_stars: 0
        , office_stars: 0
        , dr_stars: 0
        , rating: 0
        , questions: resp?.data?.Reportcard as Questions
    };
    var visit = resp?.data?.Patientvisit.length > 0 ? resp?.data?.Patientvisit[ 0 ] : resp?.data?.Patientvisit;
    var reviewed = false;
    //console.log('THE VISIT', visit);

    if ( visit?.length === 0 ) {
        reviewed = true;
    }

    const myvisit: MyVisit = { ...visit, review: review, reviewed: reviewed };

    //console.log( resp?.headers[ 'set-cookie' ], 'CRSF token 1', resp?.headers[ 'vary' ][ 'Cookie' ] );

    //console.log( resp?.headers, 'CRSF tokens header', resp?.headers[ 'set-cookie' ] ?? resp?.headers[ 'Cookie' ] ?? '' );

    //console.log('MY VISIT', myvisit);


    // const CRSF = JSON.parse(<string>resp?.headers?.cookies?.replace(/'/g, '"'))?.csrftoken ?? await getCRSF(resp?.headers['set-cookie']??resp?.headers['Cookie']??'');


    //console.log(CRSF, 'CRSF token 2');


    if ( resp?.status === 200 ) {

        return [ <User> { crsf: 'undefined', myid: myid, authenticated: true, mydata: ud, status: true, color: 'green', show: false }, myvisit ];
    } else {
        return [ <User> { crsf: 'undefined', myid: myid, authenticated: false, mydata: ud, status: true, color: 'red', show: false }, myvisit ];
    }
};


const udata: UserData = {
    Member: {
        icon: null,
        member: {
            user: {
                city: "",
                email: "",
                first_name: "",
                icon: null,
                last_name: "",
                middle_name: "",
                phone_number: "",
                state: "",
                street_address: "",
                street_address2: "",
                username: "",
                zipcode: ""
            },
            salutation: null
        },
        member_id: 0,
        salutation: null
    },
    BodyComp: {
        bf: 0,
        bmi: 0,
        height: 0,
        id: 0,
        measurement: "",
        member: "",
        updated: "",
        weight: 0
    },
    labs: [],
    mdNotes: [],
    Visits: [],
    Vaccinations: [],
    Prescription: [],
    MedInsurance: [],
    RxInsurance: [],
    RxDiscount: [],
    Accounts: [],
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
        console.log(creds);
        
        if ( creds?.password !== null && creds?.password !== 'undefined' && creds?.password !== 'undefined' ) {

            //console.log( 'cleaning', <string> creds?.password );
            //console.log(<string>creds.password);

            //console.log(<string>creds.password);
            const response = await axios( { ...clientSignOut( <string> creds.password ) } );
            // alert(String(response.data.success));
            //console.log( response.data.success );
            //console.log( response, 'Logging Out' );
        }
        
        await Keychain.resetGenericPassword();
        // await SecureStore.deleteItemAsync( 'secure_token' );



        return payload;

    } catch ( error ) {
        //console.log( error, 'Error' );
        //console.log( 'ERR REQ', error?.request );
        //console.log( 'ERR RES', error?.response );
        return payload;
    }
};

export async function login ( email: string | undefined = undefined, password: string | undefined = undefined ) {
    const data = {
        "username": "bradley34@example.org",
        "email": "bradley34@example.org",
        "password": '1234'
    };
    try {

        await logout();

        const response = await axios( { ...clientSignIn(), data: data } );
        //console.log('response token1', response);
        //console.log('response data', response);

        const signedIN = await getSignIN( response );

        //console.log( signedIN, 'CRSF token 11' );

        if ( signedIN[ 0 ]?.crsf ) {
            //console.log( 'signed crsf', signedIN[ 0 ]?.crsf );

            await  Keychain.setGenericPassword( 'secure_token', signedIN[ 0 ].crsf );
            // await SecureStore.setItemAsync( 'secure_token', signedIN[ 0 ].crsf );
        }

        //console.log( "Response Data", response.data );

        return signedIN;
    } catch ( error ) {
        //console.log( 'THE ERR', error );

        //console.log( 'ERR REQ', error?.request );
        //console.log( 'ERR RES', error?.response );

        const signedIN = await getSignIN();
        return signedIN;
    }
};

const switchAccount = ( id: number, account_number: number ) => {
    return ( {
        method: 'GET',
        url: `${ API.MDSENSEMEMBERVIEW_URI }?mid=${ id }&account_number=${ account_number }`,
        headers: {
            'Content-Type': 'application/json;charset=UTF-8;application/x-www-form-urlencoded',
            "Access-Control-Allow-Origin": "*",
            'Accept': 'application/json',
        },
    } );
};
export async function switch_accounts ( id: number, account_number: number ) {

    try {


        const response = await axios( { ...switchAccount( id, account_number ) } );
        //console.log('response token1', response);
        //console.log('response data', response);

        const signedIN = await getSignIN( response );

        //console.log(signedIN, 'CRSF token 11');



        //console.log( "Response Data", response.data );

        return signedIN;
    } catch ( error ) {
        //console.log( 'THE ERR', error );

        //console.log( 'ERR REQ', error?.request );
        //console.log( 'ERR RES', error?.response );

        const signedIN = await getSignIN();
        return signedIN;
    }
};

const retrieveLoc = () => {
    return ( {
        method: 'GET',
        url: "https://production.shippingapis.com/ShippingAPITest.dll?API=CityStateLookup&XML=<CityStateLookupRequest USERID=\"535NA0003861\"><ZipCode ID=\"0\"><Zip5>95678</Zip5></ZipCode></CityStateLookupRequest>",
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
// function to parse the XML response


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
        // console.log(response, 'RESPONSE LOC');
        const location = parseLocation( response.data );
        //console.log(location);
        console.log(location, 'location data')

        return location;
    } catch ( error ) {
        //console.log( error );
        //console.log( error?.request );
        //console.log( error?.response );

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



export async function getProvider ( id: number ) {
    try {
        const response = await axios( { ...retrieveProvider( id ) } );
        return response;
    } catch ( error ) {
        console.log( error );
        console.log( error?.request );
        console.log( error?.response );

        return undefined;
    }

};

const review = ( id: Number, pid: Number, crsf: string, data: Review ) => {
    return ( {
        method: 'POST',
        url: `${ API.MDSENSECOMMENCEREVIEW_URI }${ id }?pid=${ pid }`,
        headers: {
            'Content-Type': 'application/json',//'application/x-www-form-urlencoded',
            'Accept': 'application/json',
            "X-CSRFToken": crsf,
        },
        data: data
    } );
};


export async function submitreview ( id: Number, pid: Number, crsf: string, data: Review ) {

    //console.log( 'In submit review', data );
    try {
        const response = await axios( { ...review( id, pid, crsf, data ) } );
        //console.log(response);

        return response;

    } catch ( error ) {
        //console.log( error?.request );
        //console.log( error?.response );

        return undefined;
    }
};
































