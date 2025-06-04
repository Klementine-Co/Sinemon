import {ORM_IPADDR, SOCKET_IPADDR} from './ipaddress';


export {ORM_IPADDR};

export const USPSUSERID = '535NA0003861';
export const USPSBASE_URI = "http://production.shippingapis.com/ShippingAPITest.dll?API=CityStateLookup&XML=";



export const MDSENSEQUEUE_URI = 'http://'+SOCKET_IPADDR+':9000/queue';

export const MDSENSEBASE_URI = 'http://'+ORM_IPADDR+':8080/api/';
// export const MDSENSELOGIN_URI = 'http://'+ORM_IPADDR+':8080/dj-rest-auth/login/';
export const MDSENSELOGIN_URI = 'http://'+ORM_IPADDR+':8080/provider/login/';
// export const MDSENSELOGIN_URI = 'http://'+ORM_IPADDR+':8080/account/login/';
export const MDSENSELOGOUT_URI = 'http://'+ORM_IPADDR+':8080/test/logout/';
// export const MDSENSELOGOUT_URI = 'http://'+ORM_IPADDR+':8080/dj-rest-auth/logout/';

export const MDSENSE_URI = 'http://'+ORM_IPADDR+':8080';

export const MDSENSEUPDATEMEMBER_URI = 'http://'+ORM_IPADDR+':8080/api/member/update/member/';
export const MDSENSEUPDATEMEDINSUR_URI = 'http://'+ORM_IPADDR+':8080/api/member/update/medicalinsurance/';
export const MDSENSEUPDATERXINSUR_URI = 'http://'+ORM_IPADDR+':8080/api/member/update/rxinsurance/';
export const MDSENSEUPDATEDRXINSUR_URI = 'http://'+ORM_IPADDR+':8080/api/member/update/rxdiscountinsurance/';
export const MDSENSEUPDATEMEDS_URI = 'http://'+ORM_IPADDR+':8080/api/member/update/meds/';
export const MDSENSEUPDATELABS_URI = 'http://'+ORM_IPADDR+':8080/api/member/update/labs/';

export const MDSENSECREATEMEMBER_URI = 'http://'+ORM_IPADDR+':8080/api/member/create/member/';
export const MDSENSECREATEMEDINSUR_URI = 'http://'+ORM_IPADDR+':8080/api/member/create/medicalinsurance/';
export const MDSENSECREATERXINSUR_URI = 'http://'+ORM_IPADDR+':8080/api/member/create/rxinsurance/';
export const MDSENSECREATEDRXINSUR_URI = 'http://'+ORM_IPADDR+':8080/api/member/create/rxdiscountinsurance/';
export const MDSENSECREATEMEDS_URI = 'http://'+ORM_IPADDR+':8080/api/member/create/meds/';
export const MDSENSECREATELABS_URI = 'http://'+ORM_IPADDR+':8080/api/member/create/labs/';


export const MDSENSECOMMENCEREVIEW_URI = 'http://'+ORM_IPADDR+':8080/api/member/review/';
export const MDSENSEGETPCODES_URI = 'http://'+ORM_IPADDR+':8080/api/pcodes/';
export const MDSENSEGETPCATCODES_URI = 'http://'+ORM_IPADDR+':8080/api/pcodes/desc/';
export const MDSENSEGETDCODES_URI = 'http://'+ORM_IPADDR+':8080/api/dcodes/';
export const MDSENSEGETDCATCODES_URI = 'http://'+ORM_IPADDR+':8080/api/dcodes/desc/';

export const MDSENSEGETMCODES_URI = 'http://'+ORM_IPADDR+':8080/api/mcodes/';
export const MDSENSEGETPOSCODES_URI = 'http://'+ORM_IPADDR+':8080/api/poscodes/';

export const MDSENSEGETCLAIM_URI = 'http://'+ORM_IPADDR+':8080/api/claim/view/';



// export export const ZIPCODEAPIKEY = 'mW5idjlOo3xuuhm8sjNFfAGMw3F7ZsaInpuBB8AWmKBBOycgKUQraT2atGxdfaDL';
export const ZIPCODEBASE_URI = 'https://www.zipcodeapi.com/rest/mW5idjlOo3xuuhm8sjNFfAGMw3F7ZsaInpuBB8AWmKBBOycgKUQraT2atGxdfaDL/multi-distance.json/';
// '70607/70122,70148,70601/mile'
// export  default {
//     USPSUSERID,
//     USPSBASE_URI,
//     MDSENSEBASE_URI,
//     ZIPCODEBASE_URI,
//     MDSENSELOGIN_URI,
//     MDSENSELOGOUT_URI,
//     MDSENSEQUEUE_URI,
//     ORM_IPADDR,
//     MDSENSE_URI,
//     MDSENSEUPDATEMEMBER_URI,
//     MDSENSEUPDATEMEDINSUR_URI,
//     MDSENSEUPDATERXINSUR_URI,
//     MDSENSEUPDATEDRXINSUR_URI,
//     MDSENSEUPDATEMEDS_URI,
//     MDSENSEUPDATELABS_URI,
//     MDSENSECREATEMEMBER_URI,
//     MDSENSECREATEMEDINSUR_URI,
//     MDSENSECREATERXINSUR_URI,
//     MDSENSECREATEDRXINSUR_URI,
//     MDSENSECREATEMEDS_URI,
//     MDSENSECREATELABS_URI,

//     MDSENSECOMMENCEREVIEW_URI,
    
    
// }