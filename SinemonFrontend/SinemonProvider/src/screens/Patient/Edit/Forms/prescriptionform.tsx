import React, { useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { Icon, Input } from '@rneui/themed';
import { CustomInputFields, TYPES } from './CustomInputFields';

const PrescriptionForm = ( props: any ) => {

    // const prescriptionfields = [
    //     [{name: 'ndc', label: 'NDC', required: true, type: TYPES.Number}],
    //     {name: 'lot_no', label: 'Lot No', required: true, type: TYPES.Number},
    //     {name: 'prescriber', label: 'Prescriber', required: true, type: TYPES.Number},
    //     {name: 'prescribed_date', label: 'Prescribed Date', required: true, type: TYPES.Date},
    //     {name: 'expiration_date', label: 'Expiration Date', required: true, type: TYPES.Date}
    // ];


    const [ form, setForm ] = useState( {
        ndc: '',
        lot_no: '',
        prescriber: '',
        prescribed_date: '',
        expiration_date: '',
    } );


    const inputFields = [
        {
            label: 'NDC',
            placeholder: 'NDC',
            value: form.ndc,
            secure: false,
            key: 'ndc',
            type: TYPES.text,
            inputtype: 'input'
        },
        {
            label: 'Lot No',
            placeholder: 'Lot No',
            value: form.lot_no,
            secure: false,
            key: 'lot_no',
            type: TYPES.text,
            inputtype: 'input'
        },
        {
            label: 'Prescriber',
            placeholder: 'Prescriber',
            value: form.prescriber,
            secure: false,
            key: 'prescriber',
            type: TYPES.name,
            inputtype: 'input'
        },
        {
            label: 'Prescribed Date',
            placeholder: 'Prescribed Date',
            value: form.prescribed_date,
            secure: false,
            key: 'prescribed_date',
            type: TYPES.text,
            inputtype: 'datetime'
        },
        {
            label: 'Expiration Date',
            placeholder: 'Expiration Date',
            value: form.expiration_date,
            secure: false,
            key: 'expiration_date',
            type: TYPES.text,
            inputtype: 'datetime'
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

export default PrescriptionForm;

