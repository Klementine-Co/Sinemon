import React, { useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { Icon, Input } from '@rneui/themed';
import { CustomInputFields, TYPES } from './CustomInputFields';

const ProfileForm = ( props: any ) => {
    const { member } = props;

    //console.log( member );

    const [ form, setForm ] = useState( {
        first_name: member.member.user.first_name,
        last_name: member.member.user.last_name,
        middle_name: member.member.user.middle_name,
        phone_number: member.member.user.phone_number,
        city: member.member.user.city,
        state: member.member.user.state,
        street_address: member.member.user.street_address,
        street_address2: member.member.user.street_address2,
        zipcode: member.member.user.zipcode,
        email: member.member.user.email,
        username: member.member.user.email,
    } );
    const inputFields = [
        {
            label: 'First Name',
            value: form.first_name,
            placeholder: 'First Name',
            secure: false,
            key: 'first_name',
            type: TYPES.name
        },
        {
            label: 'Last Name',
            value: form.last_name,
            placeholder: 'Last Name',
            secure: false,
            key: 'last_name',
            type: TYPES.name
        },
        {
            label: 'Middle Name',
            value: form.middle_name,
            placeholder: 'Middle Name',
            secure: false,
            key: 'middle_name',
            type: TYPES.name
        },
        {
            label: 'Phone Number',
            value: form.phone_number,
            placeholder: 'Phone Number',
            secure: false,
            key: 'phone_number',
            type: TYPES.phone
        },
        {
            label: 'City',
            value: form.city,
            placeholder: 'City',
            secure: false,
            key: 'city',
            type: TYPES.address
        },
        {
            label: 'State',
            value: form.state,
            placeholder: 'State',
            secure: false,
            key: 'state',
            type: TYPES.address
        },
        {
            label: 'Street Address',
            value: form.street_address,
            placeholder: 'Street Address',
            secure: false,
            key: 'street_address',
            type: TYPES.address
        },
        {
            label: 'Street Address 2',
            value: form.street_address2,
            placeholder: 'Street Address 2',
            secure: false,
            key: 'street_address2',
            type: TYPES.address
        },
        {
            label: 'Zipcode',
            value: form.zipcode,
            placeholder: 'Zipcode',
            secure: false,
            key: 'zipcode',
            type: TYPES.zipcode
        },
        {
            label: 'Email Address',
            value: form.email,
            placeholder: 'Email Address',
            secure: false,
            key: 'email',
            editable: false,
            type: TYPES.email
        },
        {
            label: 'Username',
            value: form.username,
            placeholder: 'Username',
            secure: false, // Assuming this should be secure
            key: 'username',
            editable: false,
            type: TYPES.name
        }
    ];
    const [ visible, setVisible ] = useState( false );

    const handleChange = ( key, value ) => {
        setForm( prev => ( { ...prev, [ key ]: value } ) );
    };

    const toggleVisibility = () => {
        setVisible( prev => !prev );
    };


    return (
        <CustomInputFields
            fields={ inputFields }
            onChangeText={ handleChange }
            toggleVisibility={ toggleVisibility }
            visible={ visible }
            secure={ true } // Assuming all secureTextEntry conditions are the same
        />
    );
};




const styles = StyleSheet.create( {
    container: {
        backgroundColor: "#fff",
        marginTop: 14
    },

    containerStyle: {
        paddingHorizontal: 0,
    },

    labelStyle: {
        fontWeight: "400"
    },

    icon: {
        position: 'absolute',
        paddingHorizontal: 8,
        paddingVertical: 4,
        top: 25,
        right: 0
    }
} );

export default ProfileForm;

