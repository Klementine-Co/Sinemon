
import React, { useState, useContext } from "react";
import {
  StyleSheet,
  View,
  Text,
} from "react-native";
import { COLORS, SIZES, API } from "../../constants";
import Tabs from "react-native-tabs";
// import Form, {TYPES} from 'react-native-basic-form';
import axios from 'axios';


import { useAppSelector } from '../../state/App/hooks';
import { ServiceForm, PrescriptionForm } from "./forms";
import ServiceList from "./forms/servicelist";
import DxList from "./forms/dxlist";
import Claim from "./forms/claim";


export function ClaimView ( { route, navigation }: searchProp ) {
  // const [loading, setLoading] = useState(false);
  const claim = useAppSelector( ( state ) => state.claim );
  const user = useAppSelector( ( state ) => state.user );
  //console.log(user.mydata.Patientvisit);

  //console.log(route.params?.patient, 'patient');
  const patient = route.params?.patient;


  const [ cItems, setCItems ] = React.useState( "Claim" );




  const Claim_ = () => {

    return (
      <View style={ { flex: 1, height: '100%', width: '100%', justifyContent: 'center', alignContent: 'center', marginTop: 0 } }>

        <Claim navigation={ navigation } />

      </View>
    );
  };











  function _renderItem () {
    switch ( cItems ) {
      case "Claim":
        return ( <Claim_ /> );
      default:
        break;
    }
  }
  // render() {
  return (

    <View style={ styles.container }>
      {/* <View style={{ top: "2.5%", marginBottom: 5 }}> */ }
      <View style={ { height: 40, marginTop: 30 } }>
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


