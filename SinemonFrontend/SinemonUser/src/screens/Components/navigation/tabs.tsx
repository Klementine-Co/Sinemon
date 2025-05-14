import {
  BottomTabNavigationOptions,
  createBottomTabNavigator,
} from "@react-navigation/bottom-tabs";
import {
  createNativeStackNavigator,
  NativeStackNavigationOptions,
} from "@react-navigation/native-stack";
import { COLORS, icons, SIZES } from "../../../constants";
import {
  Home,
  Account,
  MDNotes,
  Immunizations,
  InsuranceList,
  Insurance,
  Lab,
  RXInsurList,
  DRXInsurList,
  RXCard,
  RXDiscCard,
  Prescriptions,
  Edit,
  Threads,
  Chat,
  Reception,
  Queue,
  SearchResults,
  Search,
  PProfile,
  SwitchAccounts,
} from "../../../screens";
import { GestureResponderEvent, Image, TouchableOpacity } from "react-native";
import { RouteProp } from "@react-navigation/native";

const Tab = createBottomTabNavigator<MainBottomTabParamList>();

// function getOptions() {
//   return {
//     headerShown: true,
//     headerStyle: { backgroundColor: "grey", height: 90 },
//     headerLeft: (onPress: (event: GestureResponderEvent) => void) => (
//       <TouchableOpacity style={{ marginLeft: SIZES.padding }} onPress={onPress}>
//         <Image
//           source={icons.back}
//           resizeMode="contain"
//           style={{
//             width: 25,
//             height: 25,
//           }}
//         />
//       </TouchableOpacity>
//     ),
//   };
// };

function getOptions(){

  return ({
      
      headerShown: true,
      headerStyle:{backgroundColor:'grey', height:90},
      headerLeft:({ onPress }) => (
          <TouchableOpacity
              style={{ marginLeft: SIZES.padding }}
              onPress={onPress}
          >
              <Image
                  source={icons.back}
                  resizeMode="contain"
                  style={{
                      width: 25,
                      height: 25,
                  }}
              />
          </TouchableOpacity>
      )
  });
};

const HomeStack = createNativeStackNavigator<HomeStackParamList>();
function HomeStackScreen() {
  return (
    <HomeStack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <HomeStack.Screen name="Home" component={Home} />
    </HomeStack.Navigator>
  );
}

const AccountStack = createNativeStackNavigator<AccountStackParamList>();
function AccountStackScreen() {
  return (
    <AccountStack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <AccountStack.Screen name="Account" component={Account} />
      <AccountStack.Screen name="SwitchAccounts" component={SwitchAccounts} />
      <AccountStack.Screen name="MDNotes" component={MDNotes} />
      <AccountStack.Screen name="Immunizations" component={Immunizations} />
      <AccountStack.Screen name="InsuranceList" component={InsuranceList} />
      <AccountStack.Screen name="Insurance" component={Insurance} />
      <AccountStack.Screen name="Lab" component={Lab} />
      <AccountStack.Screen name="DRXInsurList" component={DRXInsurList} />
      <AccountStack.Screen name="RXInsurList" component={RXInsurList} />
      <AccountStack.Screen name="RXCard" component={RXCard} />
      <AccountStack.Screen name="RXDiscCard" component={RXDiscCard} />
      <AccountStack.Screen name="Prescriptions" component={Prescriptions} />
      <AccountStack.Screen name="Edit" component={Edit} />
    </AccountStack.Navigator>
  );
}

const ChatStack = createNativeStackNavigator<ThreadsStackParamList>();

function ChatStackScreen() {
  return (
    <ChatStack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <ChatStack.Screen name="Threads" component={Threads} />
      <ChatStack.Screen
        name="Chat"
        component={Chat}
        options={getOptions() as NativeStackNavigationOptions}
        
      />
    </ChatStack.Navigator>
  );
}

const SearchStack = createNativeStackNavigator<SearchStackParamList>();

function SearchStackScreen() {
  return (
    <SearchStack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <SearchStack.Screen name="Search" component={Search} />
      <SearchStack.Screen name="SearchResults" component={SearchResults} />
      <SearchStack.Screen name="Reception" component={Reception} />
      <SearchStack.Screen name="PProfile" component={PProfile} />
    </SearchStack.Navigator>
  );
}

const QueueStack = createNativeStackNavigator<QueueStackParamList>();

function QueueStackScreen() {
  return (
    <QueueStack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <QueueStack.Screen name="Queue" component={Queue} />
      <QueueStack.Screen name="PProfile" component={PProfile} />
    </QueueStack.Navigator>
  );
}

const tabOptions = {
  tabBarShowLabel: false,
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

function getICON(
  route: RouteProp<MainBottomTabParamList, keyof MainBottomTabParamList>
): BottomTabNavigationOptions {
  return {
    ...tabOptions,
    tabBarIcon: ({ focused }) => {
      switch (route.name) {
        case "HomeStackScreen":
          return (
            <Image
              source={icons.news}
              resizeMode="contain"
              style={{
                tintColor: focused ? COLORS.primary : COLORS.black,
                width: 30,
                height: 30,
              }}
            />
          );
        case "SearchStackScreen":
          return (
            <Image
              source={icons.search}
              resizeMode="contain"
              style={{
                tintColor: focused ? COLORS.primary : COLORS.black,
                width: 30,
                height: 30,
              }}
            />
          );
        case "QueueStackScreen":
          return (
            <Image
              source={icons.waiting}
              resizeMode="contain"
              style={{
                tintColor: focused ? COLORS.primary : COLORS.black,
                width: 30,
                height: 30,
              }}
            />
          );
        case "ChatStackScreen":
          return (
            <Image
              source={icons.chat}
              resizeMode="contain"
              style={{
                tintColor: focused ? COLORS.primary : COLORS.black,
                width: 30,
                height: 30,
              }}
            />
          );
        case "AccountStackScreen":
          return (
            <Image
              source={icons.profile}
              resizeMode="contain"
              style={{
                tintColor: focused ? COLORS.primary : COLORS.black,
                width: 30,
                height: 30,
              }}
            />
          );
      }
    },
  };
}

const Tabs = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        ...getICON(route),
      })}
    >
      <Tab.Screen
        name="HomeStackScreen"
        component={HomeStackScreen}
        options={{
          // tabBarShowLabel:false,
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="SearchStackScreen"
        component={SearchStackScreen}
        options={{
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="QueueStackScreen"
        component={QueueStackScreen}
        options={{
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="ChatStackScreen"
        component={ChatStackScreen}
        options={{
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="AccountStackScreen"
        component={AccountStackScreen}
        options={{
          headerShown: false,
        }}
      />
    </Tab.Navigator>
  );
};

export default Tabs;
