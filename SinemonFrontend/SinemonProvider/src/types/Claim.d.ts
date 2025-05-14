
type Service = {
     code:string
    ,desc:string
    ,fromdate:Date
    ,todate:Date
    ,units:number
    ,minutes?:number
    ,place_of_service:string
};

type Modifier = {
     code:string
    ,desc:string
    ,ref:number
};

type ServiceItem = {
     service:Service
    ,modifiers:Modifier[]
    ,dx_pointer:string
    ,ref:number
};

type Diagnosis  = {
     code:string
    ,desc:string
    ,ref:number
};

type Claim = {
        ref:number
    ,serviceitems:ServiceItem[] 
    ,diagnoses:Diagnosis[]
    ,patient?:object
    ,billing?:object
    ,rendering?:object
};

