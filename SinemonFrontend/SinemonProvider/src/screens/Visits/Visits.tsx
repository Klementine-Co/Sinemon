
import React, { } from "react";
import {
  StyleSheet,
  View,
  Text,
} from "react-native";
import { COLORS, SIZES } from "../../constants";
import Tabs from "react-native-tabs";
// import Form, {TYPES} from 'react-native-basic-form';

import { useAppSelector } from '../../state/App/hooks';
import VisitList from "./VisitList";


export function Visit ( { route, navigation }: searchProp ) {
  // const [loading, setLoading] = useState(false);
  const claim = useAppSelector( ( state ) => state.claim );
  const visits = useAppSelector( ( state ) => state.user.mydata.Patientvisit );
  //console.log(claim, 'Claim');







  const Visits = () => {

    return (
      <View style={ { flex: 1, height: '100%', width: '100%', justifyContent: 'center', alignContent: 'center' } }>

        <VisitList navigation={ navigation } />

      </View>
    );
  };

  const Claims = () => {

    return (
      <View style={ { flex: 1, height: '100%', width: '100%', justifyContent: 'center', alignContent: 'center', marginTop: 0 } }>



      </View>
    );
  };










  const [ cItems, setCItems ] = React.useState( "Visits" );
  function _renderItem () {
    switch ( cItems ) {
      case "Visits":
        return ( <Visits /> );
      case "Claims":
        return ( <Claims /> );
      default:
        break;
    }
  }
  // render() {
  return (

    <View style={ styles.container }>
      {/* <View style={{ top: "2.5%", marginBottom: 5 }}> */ }
      <View style={ { height: 0, marginTop: 30 } }>
        {/* <Tabs
          style={{ backgroundColor: "white" }}
          selectedStyle={{ color: "tomato" }}
          selected={cItems}
        >
          <Text
            name="Visits"
            selectedIconStyle={{
              borderBottomWidth: 2,
              borderBottomColor: "tomato",
              borderTopWidth: 2,
              borderTopColor: "tomato",
              height: 25,
              backgroundColor: "lightgrey",
              borderRadius: 50,
            }}
            onSelect={() => setCItems("Visits")}
          >
            Visits
          </Text>
          <Text
            name="Claims"
            selectedIconStyle={{
              borderBottomWidth: 2,
              borderBottomColor: "tomato",
              borderTopWidth: 2,
              borderTopColor: "tomato",
              height: 25,
              backgroundColor: "lightgrey",
              borderRadius: 50,
            }}
            onSelect={() => setCItems("Claims")}
          >
            Claims
          </Text>
        </Tabs> */}
      </View>
      <View
        style={ {
          flex: 1,
          paddingHorizontal: SIZES.padding,
          height: "100%",
        } }
      >
        {/* <View
        style={{
          flex: 1,
          paddingHorizontal: SIZES.padding,
          marginTop: "5%",
          height: "100%",
        }}
      > */}
        { _renderItem() }
      </View>
    </View>
  );
  // };
};

const styles = StyleSheet.create( {
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
    marginTop: 40,
  },
  listItem: {
    // margin:10,
    // padding:10,
    marginTop: 15,
    backgroundColor: "#FFF",
    width: "90%",
    flex: 1,
    alignSelf: "center",
    flexDirection: "row",
    // borderRadius:5,
    // borderBottomWidth:1
  },
  shadow: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
} );


