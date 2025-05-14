import React, { useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { Icon, Input } from '@rneui/themed';
import { CustomInputFields, TYPES } from './CustomInputFields';

const LabForm = ( props: any ) => {
    const [ form, setForm ] = useState( {
        prov_firstname: '',
        prov_lastname: '',
        brief_desc: '',
        uploaded: '',
        status: '',
    } );

    const STATUSES = [
        {
            label: 'ordered',
            value: 'ordered'
        },
        {
            label: 'uploaded',
            value: 'uploaded',
        }
    ];

    const inputFields = [
        {
            label: 'Prov First Name',
            value: form.prov_firstname,
            placeholder: 'Prov First Name',
            secure: false,
            key: 'prov_firstname',
            type: TYPES.name,
            inputtype: 'input'
        },
        {
            label: 'Prov Last Name',
            value: form.prov_lastname,
            placeholder: 'Prov Last Name',
            secure: false,
            key: 'prov_lastname',
            type: TYPES.name,
            inputtype: 'input'
        },
        {
            label: 'Brief Description',
            value: form.brief_desc,
            placeholder: 'Brief Description',
            secure: false,
            key: 'brief_desc',
            type: TYPES.text,
            inputtype: 'input'
        },
        {
            label: 'Date',
            value: form.uploaded,
            placeholder: 'Date',
            secure: false,
            key: 'uploaded',
            type: TYPES.text,
            inputtype: 'datetime'
        },
        {
            label: 'Status',
            value: form.status,
            placeholder: 'None',
            secure: false,
            key: 'status',
            type: TYPES.text,
            options: STATUSES,
            inputtype: 'picker'
        },
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


export default LabForm;
