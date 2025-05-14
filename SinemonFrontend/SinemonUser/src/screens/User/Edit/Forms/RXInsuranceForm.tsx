
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
import { CancelProps } from "../../../../types/Edit";


const rxfields: FieldConfig[] = [
    { name: 'insurer', label: 'Insurer', placeholder: 'Insurer', required: true, type: 'text' },
    { name: 'id_member', label: 'RX Member ID', placeholder: 'RX Member ID', required: true, type: 'text' },
    { name: 'group_no', label: 'RX Group No.', placeholder: 'RX Group No.', required: true, type: 'text' },
    { name: 'rxbin', label: 'RXBIN', placeholder: 'RXBIN', required: true, type: 'text' },
    { name: 'rxgrp', label: 'RXGRP', placeholder: 'RXGRP', required: true, type: 'text' },
    { name: 'rxpcn', label: 'RXPCN', placeholder: 'RXPCN', required: true, type: 'text' },
    { name: 'benefit_plan', label: 'Benefit Plan', placeholder: 'Benefit Plan', required: true, type: 'text' },
    { name: 'contact', label: 'Contact Number', placeholder: 'xxx-xxxx', required: true, type: 'number' },  //TODO ADD PHONE NUMBER FIELD
    { name: 'card', label: 'Card', placeholder: 'Insurance Card', required: false, type: 'file' },
];
// const formFields: FieldConfig[] = [
//   { name: 'username', type: 'text', label: 'Username', placeholder: 'Enter your username' },
//   { name: 'age', type: 'number', label: 'Age', placeholder: 'Enter your age' },
//   { name: 'profilePicture', type: 'file', label: 'Profile Picture' },
//   // Add other fields as needed
// ];

export const RXInsurance: React.FC<CancelProps> = ( { cancel } ) => {

    const handleFormSubmit = ( formData: any ) => {
        //console.log(formData); // Process the form data
    };

    return (
        <GenericForm fields={ rxfields } onSubmit={ handleFormSubmit } cancel={ cancel } formName="RXInsurance" />
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


