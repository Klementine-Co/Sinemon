import React, { useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { Icon, Input } from '@rneui/themed';
import { CustomInputFields, TYPES } from './CustomInputFields';

const InsuranceForm = ( { title }: { title: string; } ) => {

    type InputField = {
        label: string;
        value: string;
        placeholder: string;
        secure: boolean;
        key: string;
        type: {
            inputMode: string;
            returnKeyType: string;
        };
        inputtype: string;
    };

    const [ form, setForm ] = useState( {
        insurer: '',
        id_member: '',
        group_no: '',
        effective_date: '',
        end_date: '',
        rxbin: '',
        rxgrp: '',
        rxpcn: '',
        benefit_plan: '',
        contact: '',
        card: '',
    } );


    let inputFields: InputField[] = [
        {
            label: 'Insurer',
            value: form.insurer,
            placeholder: 'Insurer',
            secure: false,
            key: 'insurer',
            type: TYPES.name,
            inputtype: 'input'
        },
        {
            label: 'Member ID',
            value: form.id_member,
            placeholder: 'Member ID',
            secure: false,
            key: 'id_member',
            type: TYPES.name,
            inputtype: 'input'
        },
        {
            label: 'Group No.',
            value: form.group_no,
            placeholder: 'Group No.',
            secure: false,
            key: 'group_no',
            type: TYPES.name,
            inputtype: 'input'
        },
        {
            label: 'Effective Date',
            value: form.effective_date,
            placeholder: 'Effective Date',
            secure: false,
            key: 'effective_date',
            type: TYPES.name,
            inputtype: 'input'
        },
        {
            label: 'End Date',
            value: form.end_date,
            placeholder: 'End Date',
            secure: false,
            key: 'end_date',
            type: TYPES.name,
            inputtype: 'input'
        },
        {
            label: 'Contact Number',
            value: form.contact,
            placeholder: 'Contact Number',
            secure: false,
            key: 'contact',
            type: TYPES.text,
            inputtype: 'datetime'
        },
        {
            label: 'Card',
            value: form.card,
            placeholder: 'Card',
            secure: false,
            key: 'card',
            type: TYPES.text,
            inputtype: 'name'
        },
    ];
    const rxFields: InputField[] = [
        {
            label: 'RXBIN',
            value: form.rxbin,
            placeholder: 'RXBIN',
            secure: false,
            key: 'rxbin',
            type: TYPES.name,
            inputtype: 'input'
        },
        {
            label: 'RXGRP',
            value: form.rxgrp,
            placeholder: 'RXGRP',
            secure: false,
            key: 'rxgrp',
            type: TYPES.name,
            inputtype: 'input'
        },
        {
            label: 'RXPCN',
            value: form.rxpcn,
            placeholder: 'RXPCN',
            secure: false,
            key: 'rxpcn',
            type: TYPES.name,
            inputtype: 'input'
        },
        {
            label: 'Benefit Plan',
            value: form.benefit_plan,
            placeholder: 'Benefit Plan',
            secure: false,
            key: 'benefit_plan',
            type: TYPES.text,
            inputtype: 'input'
        },
    ];

    if ( title.includes( 'rx' ) ) {
        inputFields = [ ...inputFields, ...rxFields ];
    }
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


export default InsuranceForm;
