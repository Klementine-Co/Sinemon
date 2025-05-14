import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { COLORS, icons, SIZES } from "../../../constants";
import { Home, Billing, Account, MDNotes, Immunizations, InsuranceList, Insurance, Lab, RXInsurList, DRXInsurList, RXCard, RXDiscCard, Prescriptions, Edit, Threads, Chat, Reception, Queue, SearchResults, Search, MProfile, CodeLookup, CategoryFilter, SubCategoryFilter, Services, ServiceForm, DxForm, Visit, OfficeConfig } from "../../index";
import { Image, TouchableOpacity } from "react-native";
import Claim from "../../Billing/forms/claim";
import { ClaimView } from "../../Billing/ClaimView";
import { Speedometer } from "../Speedometer";



const Tab = createBottomTabNavigator<MainBottomTabParamList>();


function getOptions () {

    return ( {

        headerShown: true,
        headerStyle: { backgroundColor: 'grey', height: 90 },
        headerLeft: ( { onPress } ) => (
            <TouchableOpacity
                style={ { marginLeft: SIZES.padding } }
                onPress={ onPress }
            >
                <Image
                    source={ icons.back }
                    resizeMode="contain"
                    style={ {
                        width: 25,
                        height: 25,
                    } }
                />
            </TouchableOpacity>
        )
    } );
};


const HomeStack = createNativeStackNavigator<HomeStackParamList>();
function HomeStackScreen () {
    return (
        <HomeStack.Navigator screenOptions={ {
            headerShown: false
        } }>
            <HomeStack.Screen name='Home' component={ Home } />
            {/* <HomeStack.Screen name="SignIn" component={SignIn} /> */ }
        </HomeStack.Navigator>
    );
};


const BillingStack = createNativeStackNavigator<BillingStackParamList>();

function BillingStackScreen () {
    return (
        <BillingStack.Navigator screenOptions={ {
            headerShown: false
        } }>
            <BillingStack.Screen name='Visits' component={ Visit } />
            <BillingStack.Screen name="MProfile" component={ MProfile } />
            <BillingStack.Screen name="MDNotes" component={ MDNotes } />
            <BillingStack.Screen name="Immunizations" component={ Immunizations } />
            <BillingStack.Screen name="InsuranceList" component={ InsuranceList } />
            <BillingStack.Screen name="Insurance" component={ Insurance } />
            <BillingStack.Screen name="Lab" component={ Lab } />
            <BillingStack.Screen name="DRXInsurList" component={ DRXInsurList } />
            <BillingStack.Screen name="RXInsurList" component={ RXInsurList } />
            <BillingStack.Screen name="RXCard" component={ RXCard } />
            <BillingStack.Screen name="RXDiscCard" component={ RXDiscCard } />
            <BillingStack.Screen name="Prescriptions" component={ Prescriptions } />
            <BillingStack.Screen name="Edit" component={ Edit } />
            <BillingStack.Screen name='ClaimView' component={ ClaimView } />
            <BillingStack.Screen name='Billing' component={ Billing } />
            <BillingStack.Screen name='CategoryFilter' component={ CategoryFilter } />
            <BillingStack.Screen name='SubCategoryFilter' component={ SubCategoryFilter } />
            <BillingStack.Screen name='Services' component={ Services } />
            <BillingStack.Screen name='ServiceForm' component={ ServiceForm } />
            <BillingStack.Screen name='DxForm' component={ DxForm } />
            {/* <BillingStack.Screen name="SignIn" component={SignIn} /> */ }
        </BillingStack.Navigator>
    );
};



const AccountStack = createNativeStackNavigator<AccountStackParamList>();
function AccountStackScreen () {
    return (
        <AccountStack.Navigator screenOptions={ {
            headerShown: false
        } }>
            <AccountStack.Screen name="Account" component={ Account } />
            <AccountStack.Screen name="OfficeConfig" component={ OfficeConfig } />
        </AccountStack.Navigator>
    );
};


const ChatStack = createNativeStackNavigator<ThreadsStackParamList>();
function ChatStackScreen () {
    return (
        <ChatStack.Navigator screenOptions={ {
            headerShown: false
        } }>
            <ChatStack.Screen name="Threads" component={ Threads } />
            <ChatStack.Screen name="Chat" component={ Chat } options={ getOptions() } />
        </ChatStack.Navigator>
    );
};

const SearchStack = createNativeStackNavigator<SearchStackParamList>();
function SearchStackScreen () {
    return (
        <SearchStack.Navigator screenOptions={ {
            headerShown: false
        } }>
            <SearchStack.Screen name="Search" component={ Search } />
            <SearchStack.Screen name="SearchResults" component={ SearchResults } />
            <SearchStack.Screen name="MProfile" component={ MProfile } />
            <SearchStack.Screen name="MDNotes" component={ MDNotes } />
            <SearchStack.Screen name="Immunizations" component={ Immunizations } />
            <SearchStack.Screen name="InsuranceList" component={ InsuranceList } />
            <SearchStack.Screen name="Insurance" component={ Insurance } />
            <SearchStack.Screen name="Lab" component={ Lab } />
            <SearchStack.Screen name="DRXInsurList" component={ DRXInsurList } />
            <SearchStack.Screen name="RXInsurList" component={ RXInsurList } />
            <SearchStack.Screen name="RXCard" component={ RXCard } />
            <SearchStack.Screen name="RXDiscCard" component={ RXDiscCard } />
            <SearchStack.Screen name="Prescriptions" component={ Prescriptions } />
            <SearchStack.Screen name="Edit" component={ Edit } />
        </SearchStack.Navigator>
    );
};


const QueueStack = createNativeStackNavigator<QueueStackParamList>();
function QueueStackScreen () {
    return (
        <QueueStack.Navigator screenOptions={ {
            headerShown: false
        } }>
            <QueueStack.Screen name="Queue" component={ Queue } />
        </QueueStack.Navigator>
    );
};


const tabOptions = {
    tabBarShowLabel: false,
    // headerShown:false,
    tabBarStyle: {
        height: 90,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 10,
        },
        shadowOpacity: 0.53,
        shadowRadius: 13.97,

        elevation: 21,
    },

};

function getICON ( route ) {

    return ( {
        ...tabOptions,

        tabBarIcon: ( { focused } ) => {

            switch ( route.name ) {
                case "HomeStackScreen":
                    return (
                        <Image
                            source={ icons.news }
                            resizeMode="contain"
                            style={ {
                                tintColor: focused ? COLORS.primary : COLORS.black,
                                width: 30,
                                height: 30
                            } }
                        />
                    );
                case "SearchStackScreen":
                    return (
                        <Image
                            source={ icons.search }
                            resizeMode="contain"
                            style={ {
                                tintColor: focused ? COLORS.primary : COLORS.black,
                                width: 30,
                                height: 30
                            } }
                        />
                    );
                case "QueueStackScreen":
                    return (
                        <Image
                            source={ icons.waiting }
                            resizeMode="contain"
                            style={ {
                                tintColor: focused ? COLORS.primary : COLORS.black,
                                width: 30,
                                height: 30
                            } }
                        />
                    );
                case "ChatStackScreen":
                    return (
                        <Image
                            source={ icons.chat }
                            resizeMode="contain"
                            style={ {
                                tintColor: focused ? COLORS.primary : COLORS.black,
                                width: 30,
                                height: 30
                            } }
                        />
                    );
                case "AccountStackScreen":
                    return (
                        <Image
                            source={ icons.profile }
                            resizeMode="contain"
                            style={ {
                                tintColor: focused ? COLORS.primary : COLORS.black,
                                width: 30,
                                height: 30
                            } }
                        />
                    );
                case "BillingStackScreen":
                    return (
                        <Image
                            source={ icons.visit_icon }
                            resizeMode="contain"
                            style={ {
                                tintColor: focused ? COLORS.primary : COLORS.black,
                                width: 30,
                                height: 30
                            } }
                        />
                    );
            }
        }
    } );
};

const Tabs = () => {
    return (
        <Tab.Navigator
            screenOptions={ ( { route } ) => getICON( route ) }
        >
            <Tab.Screen
                name="HomeStackScreen"
                component={ HomeStackScreen }
                options={ {
                    // tabBarShowLabel:false,
                    headerShown: false
                } }

            />
            <Tab.Screen
                name="SearchStackScreen"
                component={ SearchStackScreen }
                options={ {
                    // tabBarShowLabel:false,
                    headerShown: false
                } }
            />
            <Tab.Screen
                name="BillingStackScreen"
                component={ BillingStackScreen }
                // children = { (props) => <MProfile navigation={props.navigation}  route={{params: {args:{method:props.route.params?.args?.method, provider:props.route.params?.args?.provider}}}}  queue={queue}  /> }
                options={ {
                    // tabBarShowLabel:false,
                    headerShown: false
                } }
            />
            <Tab.Screen
                name="QueueStackScreen"
                // children = { (props) => <Queue navigation={props.navigation}  route={{params: {args:{method:props.route.params?.args?.method, provider:props.route.params?.args?.provider}}}}  queue={queueExists}  /> }
                component={ QueueStackScreen }
                // initialParams={{args:{method:''}}}
                options={ {
                    // tabBarShowLabel:false,
                    headerShown: false
                } }

            />
            <Tab.Screen
                name="ChatStackScreen"
                component={ ChatStackScreen }
                options={ {
                    // tabBarShowLabel:false,
                    headerShown: false
                } }
            />
            <Tab.Screen
                name="AccountStackScreen"
                component={ AccountStackScreen }
                // children = { (props) => <MProfile navigation={props.navigation}  route={{params: {args:{method:props.route.params?.args?.method, provider:props.route.params?.args?.provider}}}}  queue={queue}  /> }
                options={ {
                    // tabBarShowLabel:false,
                    headerShown: false
                } }
            />

        </Tab.Navigator>

    );
};

export default Tabs;
