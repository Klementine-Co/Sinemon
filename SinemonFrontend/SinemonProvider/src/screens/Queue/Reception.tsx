import React, { useState } from 'react';
import {
    StyleSheet,
    View,
    Text,
    Button,
    TouchableOpacity,
    Image
} from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import { COLORS, icons } from '../../constants';
import Slider from '@react-native-community/slider';
import { useAppDispatch, useAppSelector } from '../../state/App/hooks';
import * as actions from '../../state/App/actions';

export const Reception = ( { route, navigation }: searchProp ) => {

    //console.log(route.params?.queueConfig);

    const [ track, setTrack ] = useState( 0 );

    const queue = { method: 'join', provider: route.params?.queueConfig?.prov, from: 'member', member: useAppSelector( ( state ) => state.user ).myid };

    const socket = useAppSelector( ( state ) => state.socket );
    const dispatch = useAppDispatch();
    function join () {

        navigation.navigate( "QueueStackScreen" );
    };

    return (
        <View style={ { justifyContent: 'center', alignItems: 'center', width: '90%', alignSelf: 'center', top: 20 } }>
            <TouchableOpacity
                style={ { flexDirection: "row", alignSelf: "flex-start", flex: 1 } }
                onPress={ () => {
                    navigation.goBack();
                } }
            >
                <Image
                    source={ icons.back }
                    style={ {
                        width: 20,
                        height: 20,
                        left: '1%',
                        top: '10%'
                    } }
                />
            </TouchableOpacity>
            <View style={ { height: "40%", width: '100%', borderWidth: 0.1, marginTop: 'auto' } }>
                <TextInput
                    style={ styles.zipcode }
                    keyboardType='default'
                    maxLength={ 600 }
                    placeholder="Reason for visiting"
                    multiline={ true }
                    returnKeyType={ 'done' }
                    blurOnSubmit={ true }

                />
            </View>
            <View style={ { height: "20%", width: '100%', borderWidth: 0.1, marginTop: 15 } }>
                <TextInput
                    style={ styles.zipcode }
                    keyboardType='default'
                    maxLength={ 64 }
                    placeholder="Type in mental health or part of body"
                    multiline={ true }
                    returnKeyType={ 'done' }
                    blurOnSubmit={ true }
                />
            </View>
            <Text style={ { textAlign: 'center', fontSize: 22, fontWeight: 'bold', marginTop: 30 } }>
                Level of pain/distress
            </Text>

            <Slider
                style={ { width: '75%', height: 50 } }
                minimumValue={ 0 }
                maximumValue={ 10 }
                thumbTintColor={ 'tan' }
                step={ 1 }
                onValueChange={ ( value: number ) => setTrack( value ) }
            />
            <Text style={ { textAlign: 'center' } }>
                { track }
            </Text>
            <View style={ { backgroundColor: 'grey', marginTop: 40, borderRadius: 12 } }>
                <Button
                    title="Join queue"
                    color="white"
                    onPress={ () => join() }
                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create( {
    container: {
        flex: 1,
        backgroundColor: COLORS.white,
    },
    listItem: {
        marginTop: 25,
        backgroundColor: "#FFF",
        width: "80%",
        flex: 1,
        alignSelf: "center",
        flexDirection: "row",
        borderRadius: 5,
        marginBottom: 10

    },
    zipcode: {
        textAlign: 'auto',
        paddingLeft: 10,
        flex: 1,
        width: '100%',
        fontSize: 16,
        fontWeight: 'bold',
        borderRadius: 15,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.34,
        shadowRadius: 3.27,
        elevation: 10,
        backgroundColor: 'white',
    },
} );