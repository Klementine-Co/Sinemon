type StateAction = { type: String, payload: object, helper_type:Number|String|QueueConfig};
type UserState = {
    user:User;
    queue:Queue;
    notifications:Threads[];
    socket: Socket;
    claim:Claim;
};
declare module 'react-native-tabs';