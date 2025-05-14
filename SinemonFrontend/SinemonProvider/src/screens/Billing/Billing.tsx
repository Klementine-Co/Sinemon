
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
import { ScreenWidth } from "react-native-elements/dist/helpers";


export function Billing ( { route, navigation }: searchProp ) {
  // const [loading, setLoading] = useState(false);
  const claim = useAppSelector( ( state ) => state.claim );
  const user = useAppSelector( ( state ) => state.user );
  //console.log(user.mydata.Patientvisit);

  //console.log(route.params?.patient, 'patient');
  const patient = route.params?.patient;

  const [ cItems, setCItems ] = React.useState( "Claim" );

  const [ dlineitems, setDLineItem ] = useState(
    [
      { ref: 1, code: '', desc: 'dx1' }
      , { ref: 2, code: '', desc: 'dx2' }
      , { ref: 3, code: '', desc: 'dx3' }
      , { ref: 4, code: '', desc: 'dx4' }
      , { ref: 5, code: '', desc: 'dx5' }
      , { ref: 6, code: '', desc: 'dx6' }
      , { ref: 7, code: '', desc: 'dx7' }
      , { ref: 8, code: '', desc: 'dx8' }
      , { ref: 9, code: '', desc: 'dx9' }
    ] as Diagnosis[]
  );



  function setDCode ( pos: number, code: string, desc: string ) {
    //console.log( code, desc );

    switch ( pos ) {
      case 1:
        dlineitems.filter( x => x.ref === 1 )[ 0 ].code = code;
        dlineitems.filter( x => x.ref === 1 )[ 0 ].desc = desc;
        var dxdata = dlineitems;
        //console.log(dxdata);
        setDLineItem( dxdata );
        break;
      case 2:
        dlineitems.filter( x => x.ref === 2 )[ 0 ].code = code;
        dlineitems.filter( x => x.ref === 2 )[ 0 ].desc = desc;
        var dxdata = dlineitems;

        setDLineItem( dxdata );
        break;
      case 3:
        dlineitems.filter( x => x.ref === 3 )[ 0 ].code = code;
        dlineitems.filter( x => x.ref === 3 )[ 0 ].desc = desc;
        var dxdata = dlineitems;

        setDLineItem( dxdata );
        break;
      case 4:
        dlineitems.filter( x => x.ref === 4 )[ 0 ].code = code;
        dlineitems.filter( x => x.ref === 4 )[ 0 ].desc = desc;
        var dxdata = dlineitems;

        setDLineItem( dxdata );
        break;
      case 5:
        dlineitems.filter( x => x.ref === 5 )[ 0 ].code = code;
        dlineitems.filter( x => x.ref === 5 )[ 0 ].desc = desc;
        var dxdata = dlineitems;

        setDLineItem( dxdata );
        break;
      case 6:
        dlineitems.filter( x => x.ref === 6 )[ 0 ].code = code;
        dlineitems.filter( x => x.ref === 6 )[ 0 ].desc = desc;
        var dxdata = dlineitems;

        setDLineItem( dxdata );
        break;
      case 7:
        dlineitems.filter( x => x.ref === 7 )[ 0 ].code = code;
        dlineitems.filter( x => x.ref === 7 )[ 0 ].desc = desc;
        var dxdata = dlineitems;

        setDLineItem( dxdata );
        break;
      case 8:
        dlineitems.filter( x => x.ref === 8 )[ 0 ].code = code;
        dlineitems.filter( x => x.ref === 8 )[ 0 ].desc = desc;
        var dxdata = dlineitems;

        setDLineItem( dxdata );
        break;
      case 9:
        dlineitems.filter( x => x.ref === 9 )[ 0 ].code = code;
        dlineitems.filter( x => x.ref === 9 )[ 0 ].desc = desc;
        var dxdata = dlineitems;

        setDLineItem( dxdata );
        break;
      default:
        break;
    };
  };



  const Profile = () => {

    return (
      <View style={ { flex: 1, height: '100%', width: '100%', justifyContent: 'center', alignContent: 'center', marginTop: 30 } }>


      </View>
    );
  };

  const Service = () => {

    return (
      <View style={ { flex: 1, height: '100%', width: '100%', justifyContent: 'center', alignContent: 'center', marginTop: 0 } }>

        <ServiceList navigation={ navigation } startdate={ new Date( patient?.visit_date ) } />

      </View>
    );
  };
  const Diagnoses = () => {

    return (
      <View style={ { flex: 1, height: '100%', width: '100%', justifyContent: 'center', alignContent: 'center', marginTop: 0 } }>

        <DxList navigation={ navigation } lineitems=
          { dlineitems } />

      </View>
    );
  };

  const Claim_ = () => {

    return (
      <View style={ { flex: 1, height: '100%', width: '100%', justifyContent: 'center', alignContent: 'center', marginTop: 0 } }>

        <Claim navigation={ navigation } />

      </View>
    );
  };











  function _renderItem () {
    switch ( cItems ) {
      case "Profile":
        return ( <Profile /> );
      case "Services":
        return ( <Service /> );
      case "Diagnoses":
        return ( <Diagnoses /> );
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
        <Tabs
          style={ { backgroundColor: "white" } }
          selectedStyle={ { color: "tomato" } }
          selected={ cItems }
        >
          <Text
            style={ { fontSize: ( 16 / 375 ) * ScreenWidth } }
            name="Claim"
            selectedIconStyle={ {
              borderBottomWidth: 2,
              borderBottomColor: "tomato",
              borderTopWidth: 2,
              borderTopColor: "tomato",
              height: ( 25 / 375 ) * ScreenWidth,
              backgroundColor: "lightgrey",
              borderRadius: 50,
            } }
            onSelect={ () => setCItems( "Claim" ) }
          >
            Claim
          </Text>
          <Text
            style={ { fontSize: ( 16 / 375 ) * ScreenWidth } }
            name="Services"
            selectedIconStyle={ {
              borderBottomWidth: 2,
              borderBottomColor: "tomato",
              borderTopWidth: 2,
              borderTopColor: "tomato",
              height: ( 25 / 375 ) * ScreenWidth,
              backgroundColor: "lightgrey",
              borderRadius: 50,
            } }
            onSelect={ () => setCItems( "Services" ) }
          >
            Services
          </Text>
          <Text
            style={ { fontSize: ( 16 / 375 ) * ScreenWidth } }
            name="Diagnoses"
            selectedIconStyle={ {
              borderBottomWidth: 2,
              borderBottomColor: "tomato",
              borderTopWidth: 2,
              borderTopColor: "tomato",
              height: ( 25 / 375 ) * ScreenWidth,
              backgroundColor: "lightgrey",
              borderRadius: 50,
            } }
            onSelect={ () => setCItems( "Diagnoses" ) }
          >
            Diagnoses
          </Text>
          <Text
            style={ { fontSize: ( 16 / 375 ) * ScreenWidth } }
            name="Profile"
            selectedIconStyle={ {
              borderBottomWidth: 2,
              borderBottomColor: "tomato",
              borderTopWidth: 2,
              borderTopColor: "tomato",
              height: ( 25 / 375 ) * ScreenWidth,
              backgroundColor: "lightgrey",
              borderRadius: 50,
            } }
            onSelect={ () => setCItems( "Profile" ) }
          >
            Profile
          </Text>
        </Tabs>
      </View>
      <View
        style={ {
          flex: 1,
          paddingHorizontal: SIZES.padding,
          height: "100%",
        } }
      >
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


