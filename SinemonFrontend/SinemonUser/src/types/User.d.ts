
type UserData = HealthRecord;

type UserDataItem = object;

type User = {
    myid: number
    , crsf: string
    , authenticated: boolean
    , mydata: UserData
    , status: boolean
    , color: string
    , show: boolean;
}


