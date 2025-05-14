
import React, { useState } from 'react';
import { Header } from '@rneui/themed';
import {
    StyleSheet,
    View,
    Text,
    TouchableOpacity,
    ScrollView,
    SafeAreaView,
    TextInput,
    Modal
} from 'react-native';
import { images, COLORS, SIZES } from '../../../constants';
import { ImageBackground } from 'react-native';
import { ScreenWidth } from 'react-native-elements/dist/helpers';
import * as APICALLS from "../../../constants/API_CALLS";
import { Picker } from '@react-native-picker/picker';
import { STATES } from '../../../constants/locations';
import Tabs from "react-native-tabs";
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import { LobbyConfig_styles } from './styles';

export const LobbyConfig = ( { route, navigation }: searchProp ) => {


    const searchParam1: RegExp = RegExp( '\\d{2}/\\d{2}' );


    // Render

    const [ localstate, setLocalstate ] = useState( {
        state: undefined,
        select: false,
        // Add more options as needed
    } );


    const [ isOpenDatePickerVisible, setOpenDatePickerVisibility ] = useState( false );
    const [ isCloseDatePickerVisible, setCloseDatePickerVisibility ] = useState( false );

    const showOpenDatePicker = () => {
        setOpenDatePickerVisibility( true );
    };
    const showCloseDatePicker = () => {
        setCloseDatePickerVisibility( true );
    };

    const hideOpenDatePicker = () => {
        setOpenDatePickerVisibility( false );
    };
    const hideCloseDatePicker = () => {
        setCloseDatePickerVisibility( false );
    };

    const [ opentime, setOpentime ] = useState( undefined );
    const [ closetime, setClosetime ] = useState( undefined );
    const handleOpenConfirm = ( time ) => {

        setOpentime( time?.toLocaleTimeString( [], { hour: "2-digit", minute: "2-digit" } ) );
        hideOpenDatePicker();
    };
    const handleCloseConfirm = ( time ) => {
        setClosetime( time?.toLocaleTimeString( [], { hour: "2-digit", minute: "2-digit" } ) );
        hideCloseDatePicker();
    };
    return (
        <View style={ { height: '85%' } }>
            <ScrollView style={ LobbyConfig_styles.scrollView }>
                <View >
                    <SafeAreaView style={ LobbyConfig_styles.inputWrapper }>
                        <Text>First Name</Text>
                        <TextInput
                            style={ LobbyConfig_styles.input }
                            keyboardType='ascii-capable'
                            maxLength={ 5 }
                            editable={ false }
                            // placeholder="XXXXX"
                            value='NAME'
                        />
                    </SafeAreaView>
                </View>
                <View >
                    <SafeAreaView style={ LobbyConfig_styles.inputWrapper }>
                        <Text>Last Name</Text>
                        <TextInput
                            style={ LobbyConfig_styles.input }
                            keyboardType='ascii-capable'
                            maxLength={ 5 }
                            editable={ false }
                            value='NAME'
                        />
                    </SafeAreaView>
                </View>
                <View >
                    <SafeAreaView style={ LobbyConfig_styles.inputWrapper }>
                        <Text>Address</Text>
                        <TextInput
                            style={ LobbyConfig_styles.input }
                            keyboardType='ascii-capable'
                            autoComplete='address-line1'
                            value="Such as ln. #123 suchas, YZ 12345  "
                            editable={ false }
                        />
                    </SafeAreaView>
                </View>
                <View >
                    <SafeAreaView style={ LobbyConfig_styles.inputWrapper }>
                        <Text>Phone</Text>
                        <TextInput
                            style={ LobbyConfig_styles.input }
                            keyboardType='ascii-capable'
                            autoComplete='tel'
                            maxLength={ 7 }
                            value="5556789"
                            editable={ false }
                        />
                    </SafeAreaView>
                </View>
                <View >
                    <SafeAreaView style={ LobbyConfig_styles.inputWrapper }>
                        <Text>Email Address</Text>
                        <TextInput
                            style={ LobbyConfig_styles.input }
                            keyboardType='ascii-capable'
                            // returnKeyType='done'
                            maxLength={ 5 }
                            placeholder="such@as.com"
                            autoComplete='email'

                            placeholderTextColor={ COLORS.neutral }
                            onChangeText={ ( value ) => {

                            }
                            }
                        />
                    </SafeAreaView>
                </View>
                <View >
                    <SafeAreaView style={ LobbyConfig_styles.inputWrapper }>
                        <Text>Preferred Name</Text>
                        <TextInput
                            style={ LobbyConfig_styles.input }
                            keyboardType='ascii-capable'
                            // returnKeyType='done'
                            autoComplete='given-name'
                            maxLength={ 5 }
                            placeholder="Dr. Such as"
                            placeholderTextColor={ COLORS.neutral }
                            onChangeText={ ( value ) => {
                                //console.log( searchParam1.test( value ) );
                            }
                            }
                        />
                    </SafeAreaView>
                </View>
                <TouchableOpacity onPress={ showOpenDatePicker }>
                    <SafeAreaView style={ LobbyConfig_styles.dateTimePickerWrapper }>
                        <Text>Lobby Open Time</Text>
                        <View
                            style={ LobbyConfig_styles.input }
                        ><Text style={ LobbyConfig_styles.dateTimeText }>{ opentime ?? 'Select Time' }</Text></View>
                        <DateTimePickerModal
                            isVisible={ isOpenDatePickerVisible }
                            mode="time"
                            onConfirm={ handleOpenConfirm }
                            onCancel={ hideOpenDatePicker }
                        />
                    </SafeAreaView>
                </TouchableOpacity>
                <TouchableOpacity onPress={ showCloseDatePicker }>
                    <SafeAreaView style={ LobbyConfig_styles.dateTimePickerWrapper }>
                        <Text>Lobby Close Time</Text>
                        <View
                            style={ LobbyConfig_styles.input }
                        ><Text style={ LobbyConfig_styles.dateTimeText }>{ closetime ?? 'Select Time' }</Text></View>
                        <DateTimePickerModal
                            isVisible={ isCloseDatePickerVisible }
                            mode="time"
                            onConfirm={ handleCloseConfirm }
                            onCancel={ hideCloseDatePicker }
                        />
                    </SafeAreaView>
                </TouchableOpacity>
                <View >
                    <SafeAreaView style={ LobbyConfig_styles.inputWrapper }>
                        <Text>Lobby Address</Text>
                        <TextInput
                            style={ LobbyConfig_styles.input }
                            keyboardType='ascii-capable'
                            autoComplete='address-line1'
                            maxLength={ 5 }
                            placeholder="Such as ln. #123"
                            placeholderTextColor={ COLORS.neutral }
                            onChangeText={ ( value ) => {

                            }
                            }
                        />
                    </SafeAreaView>
                </View>
                <View >
                    <SafeAreaView style={ LobbyConfig_styles.inputWrapper }>
                        <Text>Lobby Zipcode</Text>
                        <TextInput
                            style={ LobbyConfig_styles.input }
                            keyboardType='number-pad'
                            returnKeyType='done'
                            autoComplete='postal-code'
                            maxLength={ 5 }
                            placeholder="12345"
                            placeholderTextColor={ COLORS.neutral }
                            onChangeText={ ( value ) => {

                            }
                            }
                        />
                    </SafeAreaView>
                </View>
                { localstate.select ? ( <View >
                    <SafeAreaView style={ LobbyConfig_styles.inputWrapper }>
                        <Text>Lobby State</Text>
                        <Picker style={ LobbyConfig_styles.picker }
                            selectedValue={ localstate.state }
                            onValueChange={ ( itemValue, itemIndex ) =>
                                setLocalstate( ( prevState ) => ( {
                                    ...prevState,
                                    [ 'state' ]: itemValue,
                                    [ 'select' ]: !prevState[ 'select' ],
                                } ) )
                            }
                        >
                            { STATES.map( ( key ) => {
                                return ( <Picker.Item label={ key.key } value={ key.value } key={ key.key } /> ); //if you have a bunch of keys value pair
                            } ) }
                        </Picker>
                    </SafeAreaView>
                </View> ) : (

                    <TouchableOpacity onPress={ () => {
                        setLocalstate( ( prevState ) => ( {
                            ...prevState,
                            [ 'select' ]: !prevState[ 'select' ],
                        } ) );
                    } }>
                        <SafeAreaView style={ LobbyConfig_styles.inputWrapper }>
                            <Text>Lobby State</Text>
                            <View
                                style={ LobbyConfig_styles.input }
                            ><Text style={ LobbyConfig_styles.stateText }>{ localstate.state ?? 'Select State' }</Text></View>
                        </SafeAreaView>
                    </TouchableOpacity>
                ) }
                <View >
                    <SafeAreaView style={ LobbyConfig_styles.inputWrapper }>
                        <Text>Lobby Phone</Text>
                        <TextInput
                            style={ LobbyConfig_styles.input }
                            keyboardType='number-pad'
                            returnKeyType='done'
                            autoComplete='tel'
                            maxLength={ 7 }
                            placeholder="5556789"
                            placeholderTextColor={ COLORS.neutral }
                            onChangeText={ ( value ) => {

                            }
                            }
                        />
                    </SafeAreaView>
                </View>

                <View style={ LobbyConfig_styles.buttonWrapper }>

                    <TouchableOpacity
                        style={ LobbyConfig_styles.button }
                        onPress={ () => { } }
                    >
                        <Text style={ LobbyConfig_styles.buttonText }>
                            Submit
                        </Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </View>
    );
};

