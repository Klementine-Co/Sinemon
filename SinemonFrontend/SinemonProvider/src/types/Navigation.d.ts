type RootStackParamList = {
    SignIn: undefined;
    Tabs: undefined;
    App: undefined;
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
    BillingStackScreen: undefined;
};


type HomeStackParamList = {
    Home: undefined;
    // Speedometer:Speedometer;
};

type homeProp = StackNavigationProp<HomeStackParamList, 'speedometer'>;


type BillingStackParamList = {
    Visits: undefined;
    ClaimView: undefined;
    Billing: undefined;
    CodeLookup: undefined;
    CategoryFilter: undefined;
    SubCategoryFilter: undefined;
    Services: undefined;
    ServiceForm: undefined;
    DxForm: undefined;
    MProfile:
    {
        member: undefined;
    };
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


type billingProp = StackNavigationProp<BillingStackParamList, 'billing'>;


type AccountStackParamList = {
    Account: undefined;
    // Visit:undefined;

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
    Search: undefined;
    SearchResults:
    {
        location: undefined;
    };
    MProfile:
    {
        member: undefined;
    };
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
    Edit: undefined;
};

type searchProp = NativeStackScreenProps<SearchStackParamList, 'Search'>;


type QueueStackParamList = {
    Queue: undefined;
};

type queueProp = NativeStackScreenProps<QueueStackParamList, 'Queue'>;
// type accountProp = StackNavigationProp<AccountStackParamList, 'Account'>;
// type profileProp = StackNavigationProp<AccountStackParamList, 'Profile_renderItem'>;
// type mdNotesProp = StackNavigationProp<AccountStackParamList, 'MDNotes'>;
