
import React, { useState, useContext, SetStateAction } from "react";
import {
    StyleSheet,
    View,
    Text,
} from "react-native";
import { COLORS, SIZES, API } from "../../../../constants";
import { useAppSelector } from "../../../../state/App/hooks";
import { Input } from "react-native-elements";
import GenericForm, { FieldConfig } from './GenericForm'; // Assume GenericForm is in GenericForm.tsx


const userfields: FieldConfig[] = [
    { name: 'first_name', label: 'First Name', placeholder: 'First Name', required: true, type: 'text' },
    { name: 'last_name', label: 'Last Name', placeholder: 'Last Name', required: true, type: 'text' },
    { name: 'middle_name', label: 'Middle Name', placeholder: 'Middle Name', required: true, type: 'text' },
    { name: 'phone_number', label: 'Phone Number', placeholder: 'xxx-xxxx', required: true, type: 'text' },
    { name: 'city', label: 'City', placeholder: 'City', required: true, type: 'text' },
    { name: 'state', label: 'State', placeholder: 'State', required: true, type: 'text' },
    { name: 'street_address', label: 'Street Address', placeholder: 'Street Address', required: true, type: 'text' },
    { name: 'street_address2', label: 'Street Address 2', placeholder: 'Street Address 2', required: true, type: 'text' },
    { name: 'zipcode', label: 'Zipcode', placeholder: 'xxxxx', required: true, type: 'text' },
    { name: 'email', label: 'Email Address', placeholder: 'email@domain.com', required: true, type: 'text' },
    { name: 'username', label: 'Username', placeholder: 'Username', required: true, autoCapitalize: "none", autoCorrect: false, type: 'text' },
    // {name: 'icon', label: 'Profile Image', placeholder: 'First Name', required: false, type: 'file'},
];
// const formFields: FieldConfig[] = [
//   { name: 'username', type: 'text', label: 'Username', placeholder: 'Enter your username' },
//   { name: 'age', type: 'number', label: 'Age', placeholder: 'Enter your age' },
//   { name: 'profilePicture', type: 'file', label: 'Profile Picture' },
//   // Add other fields as needed
// ];


export const Profile = () => {

    const handleFormSubmit = ( formData: any ) => {
        //console.log( formData ); // Process the form data
    };

    function cancel ( value: SetStateAction<boolean> ): void {
    }

    return (
        <GenericForm fields={ userfields } onSubmit={ handleFormSubmit } cancel={ cancel } formName="Profile" />
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


