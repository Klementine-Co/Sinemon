import React from 'react';
import { ScrollView, View, Text, TextInput, TouchableOpacity, StyleSheet, KeyboardAvoidingView, Platform } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons'; // Assuming you're using MaterialIcons
import { COLORS, appTheme } from '../../../../constants';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import RNPickerSelect from 'react-native-picker-select';
export const TYPES = {
    address: {
        inputMode: 'text',
        returnKeyType: 'done'
    },
    zipcode: {
        inputMode: 'numeric',
        returnKeyType: 'done'
    },
    name: {
        inputMode: 'text',
        returnKeyType: 'done'
    },
    text: {
        inputMode: 'text',
        returnKeyType: 'done'
    },
    email: {
        inputMode: 'email',
        returnKeyType: 'done'
    },
    phone: {
        inputMode: 'tel',
        returnKeyType: 'done'
    },
};
export const CustomInputFields = ( { fields, onChangeText, toggleVisibility, visible, secure } ) => {

    const [ isPickerVisible, setPickerVisible ] = React.useState( false );
    const [ currentDateField, setCurrentDateField ] = React.useState( null );

    const handleConfirmDate = ( date ) => {
        if ( currentDateField ) {
            onChangeText( currentDateField, date );
        }
        hideDatePicker();
    };

    const showDatePicker = ( key ) => {
        setCurrentDateField( key );
        setPickerVisible( true );
    };

    const hideDatePicker = () => {
        setPickerVisible( false );
    };

    const renderInputField = ( field, index ) => {
        //console.log( field.type );

        if ( field.inputtype === 'datetime' ) {
            return (
                <>
                    <TouchableOpacity onPress={ () => showDatePicker( field.key ) } style={ styles.inputStyle }>
                        <Text>{ field.value ? field.value.toLocaleString() : field.placeholder }</Text>
                    </TouchableOpacity>
                    <DateTimePickerModal
                        isVisible={ isPickerVisible && currentDateField === field.key }
                        mode={ field.mode }
                        onConfirm={ handleConfirmDate }
                        onCancel={ hideDatePicker }
                    />
                </>
            );
        }
        else if ( field.inputtype === 'picker' ) {
            return (
                <RNPickerSelect
                    onValueChange={ ( value ) => onChangeText( field.key, value ) }
                    items={ field.options } // Assuming 'options' is an array of { label: '', value: '' }
                    placeholder={ { label: field.placeholder, value: field.placeholder } }
                    style={ pickerSelectStyles }
                />
            );
        } else {
            return (
                <>
                    <TextInput
                        value={ field.value }
                        onChangeText={ ( value ) => onChangeText( field.key, value ) }
                        placeholder={ field.placeholder }
                        secureTextEntry={ field.secure && visible }
                        style={ styles.inputStyle }
                        inputMode={ field.type.inputMode }
                        returnKeyType={ field.type.returnKeyType }
                        editable={ field?.editable }
                    />
                    {
                        field.secure && (
                            <TouchableOpacity onPress={ toggleVisibility } style={ styles.iconContainer }>
                                <Icon
                                    name={ visible ? "visibility" : "visibility-off" }
                                    size={ 23 }
                                    color={ "#222222" }
                                />
                            </TouchableOpacity>
                        )
                    }
                </>
            );
        }
    };


    return (
        <KeyboardAvoidingView
            behavior={ Platform.OS === "ios" ? "padding" : "height" }
            style={ styles.container }
            keyboardVerticalOffset={ Platform.OS === "ios" ? appTheme.normalize( 200 ) : 0 }
        >
            <ScrollView>
                { fields.map( ( field, index ) => (
                    <View key={ index } style={ styles.inputcontainer }>
                        <Text style={ styles.labelStyle }>{ field.label }</Text>
                        { renderInputField( field, index ) }
                    </View>
                ) ) }
                <TouchableOpacity style={ { backgroundColor: COLORS.primary, height: 40, justifyContent: 'center', marginVertical: '10%' } }>
                    <Text style={ { color: 'white', textAlign: 'center' } }>Save</Text>
                </TouchableOpacity>
            </ScrollView>
        </KeyboardAvoidingView>
    );
};

const styles = StyleSheet.create( {
    container: {
        flex: 1,
    },
    inputcontainer: {
        padding: 10,
        borderBottomWidth: 1,
        borderColor: '#ccc',
    },
    labelStyle: {
        fontSize: 16,
        marginBottom: 5,
    },
    inputStyle: {
        fontSize: 16,
        padding: 8,
        backgroundColor: '#f9f9f9',
    },
    iconContainer: {
        position: 'absolute',
        right: 10,
        top: 35,
    },
    input: {
        padding: 10,
        margin: 10,
        borderWidth: 1,
    },
} );
const pickerSelectStyles = StyleSheet.create( {
    inputIOS: {
        fontSize: 16,
        paddingVertical: 12,
        paddingHorizontal: 10,
        borderWidth: 0,
        borderColor: 'gray',
        borderRadius: 4,
        color: 'black',
        paddingRight: 30, // to ensure the text is never behind the icon
    },
    inputAndroid: {
        fontSize: 16,
        paddingHorizontal: 10,
        paddingVertical: 8,
        borderWidth: 0.5,
        borderColor: 'purple',
        borderRadius: 8,
        color: 'black',
        paddingRight: 30, // to ensure the text is never behind the icon
    },
} );
