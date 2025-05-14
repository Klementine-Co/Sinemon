type RootStackParamList = {
    SignIn: undefined;
    Tabs: undefined;
    App: undefined;
    Reviews: undefined;
};
type signInProp = StackNavigationProp<RootStackParamList, 'SignIn'>;
type tabProp = StackNavigationProp<RootStackParamList, 'Tab'>;
type appProp = StackNavigationProp<RootStackParamList, 'App'>;

type MainBottomTabParamList = {
    HomeStackScreen: undefined;
    SearchStackScreen: undefined;
    QueueStackScreen: undefined;
    ChatStackScreen: undefined;
    AccountStackScreen: undefined;
};


type HomeStackParamList = {
    Home: undefined;
};


// type homeProp = StackNavigationProp<HomeStackParamList, 'home'>;


type AccountStackParamList = {
    Account: undefined;
    SwitchAccounts: undefined;
    Profile_renderItem: undefined;
    MDNotes: {
        mdnote: any;
    };
    Immunizations: {
        vaccines: any;
    };
    InsuranceList: {
        medinsurance: any;
    };
    Insurance: {
        item: any;
    };
    Lab: {
        lab: any;
    };
    RXInsurList: {
        rxinsurances: any;
    };
    DRXInsurList: {
        rxdiscounts: any;
    };
    RXCard: {
        item: any;
    };
    RXDiscCard: {
        item: any;
    };
    Prescriptions: {
        prescriptions: any;
    };
    Edit: {
        healthRecord: undefined;
    };
};

type accountProp = NativeStackScreenProps<AccountStackParamList, 'Account'>;


type ThreadsStackParamList = {
    Chat: {
        threadid: Number,
        // messages:object
    };
    Threads: undefined;
};

type threadsProp = NativeStackScreenProps<ThreadsStackParamList, 'Threads'>;


type SearchStackParamList = {
    Reception: {
        queueConfig: number,
        // messages:object
    };
    Search: undefined;
    SearchResults:
    {
        location: undefined;
    };
    PProfile:
    {
        provider: undefined;
    };
};

type searchProp = NativeStackScreenProps<SearchStackParamList, 'Search'>;


type QueueStackParamList = {
    Queue: undefined;
    PProfile:
    {
        provider: undefined;
    };
};

type queueProp = NativeStackScreenProps<QueueStackParamList, 'Queue'>;
// type accountProp = StackNavigationProp<AccountStackParamList, 'Account'>;
// type profileProp = StackNavigationProp<AccountStackParamList, 'Profile_renderItem'>;
// type mdNotesProp = StackNavigationProp<AccountStackParamList, 'MDNotes'>;
