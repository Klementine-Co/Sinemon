
import React, { useState, useContext } from "react";
import {
  StyleSheet,
  View,
  Text,
} from "react-native";
import { COLORS, SIZES, API } from "../../../constants";
import Tabs from "react-native-tabs";
// import Form, {TYPES} from 'react-native-basic-form';
import axios from 'axios';

import EditPrescriptions from "./EditPrescriptions";
import EditLabs from "./EditLabs";
import EditMedInsur from "./EditMedInsur";

import EditRXInsur from "./EditRXInsur";
import EditDRXInsur from "./EditDRXInsur";

import { useAppSelector } from "../../../../state/App/hooks";
import { InsuranceForm, LabForm, PrescriptionForm, ProfileForm } from "./forms";
import EditInsurances from "./EditInsurances";

export function Edit ( { route, navigation }: searchProp ) {
  // const [loading, setLoading] = useState(false);
  const userd = useAppSelector( ( state ) => state.user );

  //console.log( 'member data', route.params.healthRecord );

  //Used in EDIT MODE
  const initialData = undefined;
  const healthRecord = route.params.healthRecord as HealthRecord;

  const prescriptions = healthRecord.Prescription;
  const rxinsurances = healthRecord.RxInsurance;
  const rxdiscounts = healthRecord.RxDiscount;
  const medinsurances = healthRecord.MedInsurance;
  const labs = healthRecord.labs;




  //console.log(user);

  // const userfields = [
  //     [{name: 'first_name', label: 'First Name', required: true, type: TYPES.Text}],
  //     {name: 'last_name', label: 'Last Name', required: true, type: TYPES.Text},
  //     {name: 'middle_name', label: 'Middle Name', required: true, type: TYPES.Text},
  //     {name: 'phone_number', label: 'Phone Number', required: true, type: TYPES.Text},
  //     {name: 'city', label: 'City', required: true, type: TYPES.Text},
  //     {name: 'state', label: 'State', required: true, type: TYPES.Text},
  //     {name: 'street_address', label: 'Street Address', required: true, type: TYPES.Text}, 
  //     {name: 'street_address2', label: 'Street Address 2', required: true, type: TYPES.Text}, 
  //     {name: 'zipcode', label: 'Zipcode', required: true, type: TYPES.Text}, 
  //     {name: 'email', label: 'Email Address', required: true, type: TYPES.Email}, 
  //     {name: 'username', label: 'Username', required: true, autoCapitalize: "none", autoCorrect: false},
  //     {name: 'icon', label: 'Profile Image', required: false, type: TYPES.Image},
  // ];

  // const medinsurancefields = [

  //     [{name: 'insurer', label: 'Insurer', required: true, type: TYPES.Text}],
  //     [{name: 'id_member', label: 'RX Member ID', required: true, type: TYPES.Text}],
  //     {name: 'group_no', label: 'RX Group No.', required: true, type: TYPES.Text},
  //     {name: 'benefit_plan', label: 'Benefit Plan', required: true, type: TYPES.Text},
  //     {name: 'card', label: 'Card', required: false, type: TYPES.Image}, 
  // ];
  // const rxfields = [
  //     [{name: 'insurer', label: 'Insurer', required: true, type: TYPES.Text}],
  //     [{name: 'id_member', label: 'RX Member ID', required: true, type: TYPES.Text}],
  //     {name: 'group_no', label: 'RX Group No.', required: true, type: TYPES.Text},
  //     {name: 'rxbin', label: 'RXBIN', required: true, type: TYPES.Text},
  //     {name: 'rxgrp', label: 'RXGRP', required: true, type: TYPES.Text},
  //     {name: 'rxpcn', label: 'RXPCN', required: true, type: TYPES.Text},
  //     {name: 'benefit_plan', label: 'Benefit Plan', required: true, type: TYPES.Text}, 
  //     {name: 'contact', label: 'Contact Number', required: true, type: TYPES.Number},  //TODO ADD PHONE NUMBER FIELD
  //     {name: 'card', label: 'Card', required: false, type: TYPES.Image},
  // ];
  // const drxfields = [
  //     [{name: 'insurer', label: 'Insurer', required: true, type: TYPES.Text}],
  //     [{name: 'id_member', label: 'RX Member ID', required: true, type: TYPES.Text}],
  //     {name: 'group_no', label: 'RX Group No.', required: true, type: TYPES.Text},
  //     {name: 'rxbin', label: 'RXBIN', required: true, type: TYPES.Text},
  //     {name: 'rxgrp', label: 'RXGRP', required: true, type: TYPES.Text},
  //     {name: 'rxpcn', label: 'RXPCN', required: true, type: TYPES.Text},
  //     {name: 'contact', label: 'Contact Number', required: true, type: TYPES.Number}, 
  //     {name: 'card', label: 'Card', required: false, type: TYPES.Image},
  // ];



  const calladditem = ( URL: string, DATA: object, ITEM: string ) => {

    //console.log( 'calling api for edits', URL, DATA );

    axios( {
      method: 'POST',
      url: `${ URL }`,
      withCredentials: true,
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        // "Content-Type": "multipart/form-data",
        "Accept": "application/json",
        "X-CSRFToken": userd.crsf
      },
      data: DATA
    } ).then( ( response ) => {


      if ( response.status == 200 ) {
        //console.log('success ', response.data);
        update( ITEM, response.data );

      }
    } ).catch( ( error ) => {
      // Error
      //console.log( error.response.data );
      if ( error.response ) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        //console.log( error.response.data );
        //console.log( error.response.status );
        //console.log( error.response.headers );
      } else if ( error.request ) {
        // The request was made but no response was received
        // `error.request` is an instance of XMLHttpRequest in the 
        // browser and an instance of
        // http.ClientRequest in node.js
        //console.log( error.request );
      } else {
        // Something happened in setting up the request that triggered an Error
        //console.log( 'Error', error.message );
      }
      //console.log( error.config );
    } );
  };



  function update ( ITEM, DATA ) {

    var update = undefined;
    switch ( ITEM ) {
      case "PROFILE":
        update = { ...userd, mydata: { ...healthRecord, Member: [ DATA ] } };
        //  userd.setMyQueue(update);
        return;
      case "LAB":
        healthRecord.labs.push( DATA );
        update = { ...userd, mydata: { ...healthRecord, labs: healthRecord.labs } };
        // userd.setMyQueue(update);
        return;
      case "MEDS":
        healthRecord.Prescription.push( DATA );
        update = { ...userd, mydata: { ...healthRecord, Prescription: healthRecord.Prescription } };
        // userd.setMyQueue(update);
        return;
      case "MED INSUR":
        healthRecord.MedInsurance.push( DATA );
        update = { ...userd, mydata: { ...healthRecord, MedInsurance: healthRecord.MedInsurance } };
        // userd.setMyQueue(update);
        return;
      case "RXINSUR":
        healthRecord.RxInsurance.push( DATA );
        update = { ...userd, mydata: { ...healthRecord, RxInsurance: healthRecord.RxInsurance } };
        // userd.setMyQueue(update);
        return;
      case "DISCOUNT RXINSUR":
        healthRecord.RxDiscount.push( DATA );
        update = { ...userd, mydata: { ...healthRecord, RxDiscount: healthRecord.RxDiscount } };
        // userd.setMyQueue(update);
        return;
      default:
        break;
    }
  }
  function addItem ( ITEM: string, DATA: object ) {
    //console.log(ITEM, ' whereami');
    switch ( ITEM ) {
      case "PROFILE":
        calladditem( API.MDSENSEUPDATEMEMBER_URI + userd.myid, DATA, ITEM );
        return;
      case "LAB":
        calladditem( API.MDSENSECREATELABS_URI + userd.myid, DATA, ITEM );
        return;
      case "MEDS":
        calladditem( API.MDSENSECREATEMEDS_URI + userd.myid, DATA, ITEM );
        return;
      case "MED INSUR":
        calladditem( API.MDSENSECREATEMEDINSUR_URI + userd.myid, DATA, ITEM );
        return;
      case "RXINSUR":
        calladditem( API.MDSENSECREATERXINSUR_URI + userd.myid, DATA, ITEM );
        return;
      case "DISCOUNT RXINSUR":
        calladditem( API.MDSENSECREATEDRXINSUR_URI + userd.myid, DATA, ITEM );
        return;
      default:
        break;
    }
  }
  async function onSubmit ( data: object, item ) {
    //console.log( 'in on submit', data, item );
    addItem( item, data );
    // setLoading(true);


  }

  async function showImagePicker () {
    try {
      //return - cancelled or error or uri
      //return {cancelled:true}
      //return {error:"error message}
      //return {uri:...}
    } catch ( e ) {
      return { error: e };
    }
  }



  const Profile = () => {
    return (
      <View style={ { flex: 1, height: '100%', width: '100%', justifyContent: 'center', alignContent: 'center', marginVertical: 40 } }>
        <ProfileForm member={ healthRecord.Member } />
      </View>
    );
  };
  const Lab = () => {
    return (
      <View style={ { flex: 1, height: '100%', width: '100%', justifyContent: 'center', alignContent: 'center', marginVertical: 40 } }>
        <LabForm />
      </View>
    );
  };
  const Prescription = () => {
    return (
      <View style={ { flex: 1, height: '100%', width: '100%', justifyContent: 'center', alignContent: 'center', marginVertical: 40 } }>
        <PrescriptionForm />
      </View>
    );
  };
  const Insurance = ( { title } ) => {
    //console.log( title );

    return (
      <View style={ { flex: 1, height: '100%', width: '100%', justifyContent: 'center', alignContent: 'center', marginVertical: 40 } }>
        <InsuranceForm title={ title } />
      </View>
    );
  };







  let med: MedInsurance[] = medinsurances.map( item => ( {
    ...item,
    title: `Medical`
  } ) );
  let rx: RxInsurance[] = rxinsurances.map( item => ( {
    ...item,
    title: `RX`
  } ) );

  let rxd: RxDiscount[] = rxdiscounts.map( item => ( {
    ...item,
    title: `RX Discount`
  } ) );

  let insurances = [ ...med, ...rx, ...rxd ];

  const [ cItems, setCItems ] = React.useState( "Profile" );
  function _renderItem () {
    switch ( cItems ) {
      case "Profile":
        return ( <Profile /> );
      case "Labs":
        return ( <EditLabs labs={ labs } lab={ <Lab /> } navigation={ undefined } /> );
      case "Meds":
        return ( <EditPrescriptions prescriptionss={ prescriptions } prescription={ <Prescription /> } navigation={ undefined } route={ undefined } /> );
      case "Insurance":
        return ( <EditInsurances insurances={ insurances } Insurance={ Insurance } navigation={ undefined } route={ undefined } /> );
      case "Meds":
        return ( <EditPrescriptions prescriptionss={ prescriptions } prescription={ <Prescription /> } navigation={ undefined } route={ undefined } /> );
      default:
        break;
    }
  }
  // render() {


  return (

    <View style={ styles.container }>
      {/* <View style={{ top: "2.5%", marginBottom: 5 }}> */ }
      <View style={ { height: 50, marginTop: 30 } }>
        <Tabs
          style={ { backgroundColor: "white" } }
          selectedStyle={ { color: "tomato" } }
          selected={ cItems }
        >
          <Text
            name="Labs"
            selectedIconStyle={ {
              borderBottomWidth: 2,
              borderBottomColor: "tomato",
              borderTopWidth: 2,
              borderTopColor: "tomato",
              height: 25,
              backgroundColor: "lightgrey",
              borderRadius: 50,
            } }
            onSelect={ () => setCItems( "Labs" ) }
          >
            Labs
          </Text>
          <Text
            name="Meds"
            selectedIconStyle={ {
              borderBottomWidth: 2,
              borderBottomColor: "tomato",
              borderTopWidth: 2,
              borderTopColor: "tomato",
              height: 25,
              backgroundColor: "lightgrey",
              borderRadius: 50,
            } }
            onSelect={ () => setCItems( "Meds" ) }
          >
            Meds
          </Text>

          <Text
            name="Insurance"
            selectedIconStyle={ {
              borderBottomWidth: 2,
              borderBottomColor: "tomato",
              borderTopWidth: 2,
              borderTopColor: "tomato",
              height: 25,
              backgroundColor: "lightgrey",
              borderRadius: 50,
            } }
            onSelect={ () => setCItems( "Insurance" ) }
          >
            Insurance
          </Text>
          <Text
            name="Profile"
            selectedIconStyle={ {
              borderBottomWidth: 2,
              borderBottomColor: "tomato",
              borderTopWidth: 2,
              borderTopColor: "tomato",
              height: 25,
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
          // height: "100%",
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
    marginTop: 50,
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


