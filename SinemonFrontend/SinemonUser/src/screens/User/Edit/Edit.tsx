
import React, { useState, useContext } from "react";
import {
    StyleSheet,
    View,
    Text,
} from "react-native";
import { COLORS, SIZES, API } from "../../../constants";
import Tabs from "react-native-tabs";
import axios from 'axios';

import EditPrescriptions from "./EditPrescriptions";
import EditLabs from "./EditLabs";
import EditMedInsur from "./EditMedInsur";

import EditRXInsur from "./EditRXInsur";
import EditDRXInsur from "./EditDRXInsur";

import { useAppSelector } from "../../../state/App/hooks";
import * as FORMS from "./Forms";

export function Edit () {
    const userd = useAppSelector( ( state ) => state.user );
    const initialData = undefined;
    const user = userd.mydata.Member.member.user;
    const prescriptions = userd.mydata.Prescription as Prescription[];
    const rxinsurances = userd.mydata.RxInsurance as RxInsurance[];
    const drxinsurances = userd.mydata.RxDiscount as RxDiscount[];
    const medinsurances = userd.mydata.MedInsurance as MedInsurance[];
    const labs = userd.mydata.labs as labs;


    const calladditem = ( URL: string, DATA: object, ITEM: string ) => {

        //console.log( 'calling api for edits', URL, DATA );

        axios( {
            method: 'POST',
            url: `${ URL }`,
            withCredentials: true,
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
                "Accept": "application/json",
                "X-CSRFToken": userd.crsf
            },
            data: DATA
        } ).then( ( response ) => {


            if ( response.status == 200 ) {
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

    function update ( ITEM: string, DATA: object ) {

        var update = undefined;
        switch ( ITEM ) {
            case "PROFILE":
                update = { ...userd, mydata: { ...userd.mydata, Member: [ DATA ] } };
                return;
            case "LAB":
                userd.mydata.labs.push( DATA );
                update = { ...userd, mydata: { ...userd.mydata, labs: userd.mydata.labs } };
                return;
            case "MEDS":
                userd.mydata.Prescription.push( DATA );
                update = { ...userd, mydata: { ...userd.mydata, Prescription: userd.mydata.Prescription } };
                return;
            case "MED INSUR":
                userd.mydata.MedInsurance.push( DATA );
                update = { ...userd, mydata: { ...userd.mydata, MedInsurance: userd.mydata.MedInsurance } };
                return;
            case "RXINSUR":
                userd.mydata.RxInsurance.push( DATA );
                update = { ...userd, mydata: { ...userd.mydata, RxInsurance: userd.mydata.RxInsurance } };
                return;
            case "DISCOUNT RXINSUR":
                userd.mydata.RxDiscount.push( DATA );
                update = { ...userd, mydata: { ...userd.mydata, RxDiscount: userd.mydata.RxDiscount } };
                return;
            default:
                break;
        }
    }
    function addItem ( ITEM: string, DATA: object ) {
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
    async function onSubmit ( data: object, item: string ) {
        //console.log( 'in on submit', data, item );
        addItem( item, data );
    }

    async function showImagePicker () {
        try {

        } catch ( e ) {
            return { error: e };
        }
    }


    const [ cItems, setCItems ] = React.useState( "Profile" );
    function _renderItem () {
        switch ( cItems ) {
            case "Profile":
                return ( <FORMS.Profile /> );
            case "Labs":
                return ( <EditLabs labs={ labs } /> );
            case "Meds":
                return ( <EditPrescriptions prescriptionss={ prescriptions } /> );
            case "Med Insur":
                return ( <EditMedInsur medinsurancess={ medinsurances } /> );
            case "RXInsur":
                return ( <EditRXInsur rxinsurancess={ rxinsurances } /> );
            case "Discount RXInsur":
                return ( <EditDRXInsur drxinsurances={ drxinsurances } /> );
            default:
                break;
        }
    }

    return (

        <View style={ styles.container }>
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
                        name="Discount RXInsur"
                        selectedIconStyle={ {
                            borderBottomWidth: 2,
                            borderBottomColor: "tomato",
                            borderTopWidth: 2,
                            borderTopColor: "tomato",
                            height: 25,
                            backgroundColor: "lightgrey",
                            borderRadius: 50,
                        } }
                        onSelect={ () => setCItems( "Discount RXInsur" ) }
                    >
                        Discount RXInsur
                    </Text>
                    <Text
                        name="RXInsur"
                        selectedIconStyle={ {
                            borderBottomWidth: 2,
                            borderBottomColor: "tomato",
                            borderTopWidth: 2,
                            borderTopColor: "tomato",
                            height: 25,
                            backgroundColor: "lightgrey",
                            borderRadius: 50,
                        } }
                        onSelect={ () => setCItems( "RXInsur" ) }
                    >
                        RXInsur
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
                        name="Med Insur"
                        selectedIconStyle={ {
                            borderBottomWidth: 2,
                            borderBottomColor: "tomato",
                            borderTopWidth: 2,
                            borderTopColor: "tomato",
                            height: 25,
                            backgroundColor: "lightgrey",
                            borderRadius: 50,
                        } }
                        onSelect={ () => setCItems( "Med Insur" ) }
                    >
                        Med Insur
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
                } }
            >
                { _renderItem() }
            </View>
        </View>
    );
};

const styles = StyleSheet.create( {
    container: {
        flex: 1,
        backgroundColor: COLORS.white,
        marginTop: 50,
    },
    listItem: {
        marginTop: 15,
        backgroundColor: "#FFF",
        width: "90%",
        flex: 1,
        alignSelf: "center",
        flexDirection: "row",
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


