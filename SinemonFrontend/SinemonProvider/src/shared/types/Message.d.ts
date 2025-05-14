

type GiftdChatMsg = {
    _id: number | string;
    text: string;
    createdAt: Date;
    user: {
        _id: number;
        name: string;
    };
    notification_type?: string;
};
type Message = {
    _id: number
    , thread_id: String
    , msg: GiftdChatMsg
    , read_msg: String
    , notification_type: String
    , time: Date;
    //    ,latest:boolean

};
type Threads = {
    messages: Message[]
    , thread: Message
    , receiverName: String;
    // ,receiverImg:object

};


type sendMsg = {
    newmessage: Message,
    data: object;
};

type TransformMessage = {
    id: number;
    msg: string;
    notification_type: string;
    read_msg: string;
    receiver: {
        user: {
            id: string;
            first_name: string;
            last_name: string;
        };
    };
    sender: {
        user: {
            id: string;
            first_name: string;
            last_name: string;
        };
    };
    thread_id: string;
    time: string;
};

// export {};