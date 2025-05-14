
import React, { useState, useContext, SetStateAction, Dispatch } from "react";
import {
    StyleSheet,
    View,
    Text,
} from "react-native";
import { COLORS, SIZES, API } from "../../../../constants";
import { useAppSelector } from "../../../../state/App/hooks";
import { Input } from "react-native-elements";
import GenericForm, { FieldConfig } from './GenericForm'; // Assume GenericForm is in GenericForm.tsx
import { CancelProps } from "../../../../types/Edit";



const prescriptionfields: FieldConfig[] = [
    { name: 'ndc', label: 'NDC', placeholder: 'NDC', required: true, type: 'number' },
    { name: 'lot_no', label: 'Lot No', placeholder: 'Lot No', required: true, type: 'number' },
    { name: 'prescriber', label: 'Prescriber', placeholder: 'Prescriber', required: true, type: 'number' },
    { name: 'prescribed_date', label: 'Prescribed Date', placeholder: 'MM/DD/YYYY', required: true, type: 'text' },
    { name: 'expiration_date', label: 'Expiration Date', placeholder: 'MM/DD/YYYY', required: true, type: 'text' }
];

// const formFields: FieldConfig[] = [
//   { name: 'username', type: 'text', label: 'Username', placeholder: 'Enter your username' },
//   { name: 'age', type: 'number', label: 'Age', placeholder: 'Enter your age' },
//   { name: 'profilePicture', type: 'file', label: 'Profile Picture' },
//   // Add other fields as needed
// ];


export const Prescription: React.FC<CancelProps> = ( { cancel } ) => {

    const handleFormSubmit = ( formData: any ) => {
        //console.log(formData); // Process the form data
    };

    return (
        <GenericForm fields={ prescriptionfields } onSubmit={ handleFormSubmit } cancel={ cancel } formName="Prescription" />
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


