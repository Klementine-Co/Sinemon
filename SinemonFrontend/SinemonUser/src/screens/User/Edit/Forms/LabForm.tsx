
import React, { useState, useContext, Dispatch, SetStateAction } from "react";
import {
    StyleSheet,
    View,
    Text,
} from "react-native";
import { COLORS, SIZES, API } from "../../../../constants";
import { useAppSelector } from "../../../../state/App/hooks";
import { Input } from "react-native-elements";
import GenericForm, { FieldConfig } from './GenericForm'; // Assume GenericForm is in GenericForm.tsx


const labfields: FieldConfig[] = [
    { name: 'prov_firstname', label: 'Prov First Name', placeholder: 'Prov First Name', required: false, type: 'text' },
    { name: 'prov_lastname', label: 'Prov Last Name', placeholder: 'Prov Last Name', required: false, type: 'text' },
    { name: 'brief_desc', label: 'Brief Description', placeholder: 'Brief Description', required: false, type: 'text' },
    { name: 'uploaded', label: 'Date', placeholder: 'MM/DD/YYYY', required: false, type: 'text' },
    { name: 'status', label: 'Status', placeholder: 'Status', required: false, type: 'number' },
    { name: 'lab', label: 'Lab', placeholder: 'Lab (eg. PDF)', required: false, type: 'file' }
];

// const formFields: FieldConfig[] = [
//   { name: 'username', type: 'text', label: 'Username', placeholder: 'Enter your username' },
//   { name: 'age', type: 'number', label: 'Age', placeholder: 'Enter your age' },
//   { name: 'profilePicture', type: 'file', label: 'Profile Picture' },
//   // Add other fields as needed
// ];


export const Lab: React.FC<CancelProps> = ( { cancel } ) => {

    const handleFormSubmit = ( formData: any ) => {
        //console.log(formData); // Process the form data
    };

    return (
        <GenericForm fields={ labfields } onSubmit={ handleFormSubmit } cancel={ cancel } formName="Lab" />
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


