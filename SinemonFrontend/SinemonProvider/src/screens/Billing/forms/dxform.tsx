import React, { useState } from 'react';
import { FlatList, ScrollView, StyleSheet, View, Text, TouchableOpacity, TextInput } from 'react-native';
import { Icon, Input } from '@rneui/themed';
import { Button } from 'react-native-paper';
// import RNPickerSelect from 'react-native-picker-select';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import * as ACTIONS from '../../../state/App/actions';
import { useAppSelector } from '../../../state/App/hooks';
import { ScreenWidth } from 'react-native-elements/dist/helpers';


const DxForm = ( { route, navigation }: any ) => {

    const secure = false;
    const [ visible, setVisibility ] = useState( secure );

    const claim = useAppSelector( ( state ) => state.claim );
    const diagnosis = claim.diagnoses.filter( x => x.ref === route.params.pos ).length > 0 ? claim.diagnoses.filter( x => x.ref === route.params.pos )[ 0 ] : undefined;



    const toggleVisibility = () => setVisibility( !visible );

    const renderDXItem = ( { item }: any ) => (
        <View style={ styles.item }>
            <TouchableOpacity
                onPress={ () => { navigation.navigate( 'CategoryFilter', { type: 'diagnoses', pos: { serviceitemref: item.ref, ref: item.ref } } ); } }
                style={ { height: ( 40 / 375 ) * ScreenWidth, width: '100%', paddingHorizontal: 10 } }
            >
                <Text style={ { fontSize: ( 14 / 375 ) * ScreenWidth } }>{ item.code }</Text>
            </TouchableOpacity>
        </View>

    );



    return (
        <>
            <View style={ { ...styles.container, marginBottom: 10 } }>
                <FlatList
                    ListHeaderComponent={
                        <>
                            <View style={ {} }>
                                <Text style={ { ...styles.labelStyle, fontSize: ( 18 / 375 ) * ScreenWidth, color: 'grey' } }>ICD-10-CM Diagnosis Codes</Text>
                            </View>
                        </> }
                    numColumns={ 3 }
                    data={ claim.diagnoses }
                    renderItem={ renderDXItem }
                    scrollEnabled={ false }
                    style={ { height: ( 180 / 375 ) * ScreenWidth } }
                    contentContainerStyle={ { flex: 1, justifyContent: 'center' } }
                />
            </View>
            {/* <TouchableOpacity style={{marginBottom:10, backgroundColor:'red', height:40, width:'70%', alignSelf:'center'}}/> */ }
        </>
    );
};




const styles = StyleSheet.create( {
    container: {
        backgroundColor: "#fff",
        marginTop: 14,
        flex: 1
    },

    containerStyle: {
        paddingHorizontal: 0,
    },

    labelStyle: {
        fontWeight: "400",
        // marginTop:10
    },

    icon: {
        position: 'absolute',
        paddingHorizontal: 8,
        paddingVertical: 4,
        top: 25,
        right: 0
    },
    item: {
        backgroundColor: 'lightgray',
        padding: 0,
        flex: 1,
        margin: 5,
    },
    label: { color: "#86939e", fontSize: ( 16 / 375 ) * ScreenWidth, fontWeight: "400", },
    input: { height: ( 40 / 375 ) * ScreenWidth, justifyContent: "center", color: "black" },
    text: { fontSize: ( 16 / 375 ) * ScreenWidth, color: "black" },
    error: { color: "#ff190c", fontSize: ( 12 / 375 ) * ScreenWidth, },
    datecontainer: {
        backgroundColor: "#fff",
        marginTop: 0,
        marginHorizontal: 10,
        marginBottom: 0,
        borderBottomWidth: 1,
        borderColor: '#86939e',
        height: ( 60 / 375 ) * ScreenWidth,
        width: "50%"
    },
} );

export default DxForm;

