import React, { useState } from 'react';
import { FlatList, ScrollView, StyleSheet, View, Text, TouchableOpacity, TextInput } from 'react-native';
import { Icon, Input } from '@rneui/themed';
import { Button } from 'react-native-paper';
// import RNPickerSelect from 'react-native-picker-select';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import * as ACTIONS from '../../../state/App/actions';
import { useAppSelector, useAppDispatch } from '../../../state/App/hooks';
import { ScreenWidth } from 'react-native-elements/dist/helpers';

const ServiceForm = ( { route, navigation }: any ) => {
    const MX_DATA = [
        {
            ref: 1,
            desc: 'mx1',
            code: 'mx1',
        },
        {
            ref: 2,
            desc: 'mx2',
            code: 'mx2',
        },
        {
            ref: 3,
            desc: 'mx3',
            code: 'mx3',
        },
        {
            ref: 4,
            desc: 'mx4',
            code: 'mx4',
        },
    ] as Modifier[];

    const dispatch = useAppDispatch();
    const [ service, setservice ] = useState<string>( '' );
    const [ fromdate, setfromdate ] = useState<string>( '' );
    const [ todate, settodate ] = useState<string>( '' );
    // const [ mx, setmx] = useState<Modifier[]>(MX_DATA)
    const [ status, setstatus ] = useState<string>( '' );

    const claim = useAppSelector( ( state ) => state.claim );
    const serviceItem = claim.serviceitems.filter( x => x.ref === route.params.pos ).length > 0 ? claim.serviceitems.filter( x => x.ref === route.params.pos )[ 0 ] : undefined;


    const mx = serviceItem !== undefined ? serviceItem.modifiers : MX_DATA;
    // let {label, value, errorMessage, placeholder, secure} = props;

    var startdate: Date | undefined = route.params?.startdate;

    //console.log(String(startdate?.getDate()) === 'NaN');
    //console.log(startdate?.getDate());


    const secure = false;
    const [ visible, setVisibility ] = useState( secure );
    const [ from, setFrom ] = useState( false );
    const [ to, setTo ] = useState( false );
    //console.log(route.params.serviceitem, 'service item');

    const serviceitem: ServiceItem = serviceItem ?? {
        service: {
            code: ''
            , desc: ''
            , fromdate: new Date()
            , todate: new Date()
            , units: 0
            , mintues: 0
            , place_of_service: ''
        },
        modifiers: mx,
        dx_pointer: '',
        ref: route.params.pos
    } as ServiceItem;


    //console.log(serviceitem, 'DEBUG serviceitem');






    function onChangeText ( type: string, value: string | Modifier ) {

        switch ( type ) {
            case 'service':
                setservice( value );
                break;
            case 'fromdate':
                setfromdate( value );
                break;
            case 'todate':
                settodate( value );
                break;
            case 'mx':
                setmx( [ ...mx, value ] as Modifier[] );
                break;
            case 'status':
                setstatus( value );
                break;
            case 'POS':
                dispatch( ACTIONS.setPlaceofService( { ref: serviceitem.ref, place_of_service: value as string } ) );
                break;
            case 'units':
                dispatch( ACTIONS.setUnits( { ref: serviceitem.ref, units: Number( value ) } ) );
                // setUnits(Number(value));
                break;
            default:
                break;
        }

    }


    const toggleVisibility = () => setVisibility( !visible );


    const renderItem = ( { item }: any ) => (
        <TouchableOpacity style={ styles.item } onPress={ () => {
            navigation.navigate( 'CategoryFilter', { type: 'modifiers', pos: { serviceitemref: serviceitem.ref, ref: item.ref } } );
        } }>
            {/* <Text>{item.desc}</Text> */ }
            {/* <Text style={[styles.label, styles.labelStyle]}>{item.desc}</Text> */ }
            <Input
                // label={item.desc}
                value={ service }
                placeholder={ item.desc }
                // errorMessage={errorMessage}
                // secureTextEntry={visible}
                disabled={ true }
                // onChangeText={value => onChangeText('service', value)}
                containerStyle={ { height: ( 40 / 375 ) * ScreenWidth, width: '100%', paddingHorizontal: 10 } }
                // labelStyle={styles.labelStyle} 
                autoCompleteType={ undefined } />

        </TouchableOpacity>

    );

    const confirmDate = ( ref: number, type: string, date: Date ) => {
        //console.log( type, ref, date );
        dispatch( ACTIONS.setDate( { ref: ref, date: date }, type ) );
        if ( type === 'from' ) {
            setFrom( false );
        } else {
            setTo( false );
        }
    };

    function greytext ( arg: any ) {
        if ( arg === '' ) {
            return ( <Text style={ { minHeight: 0, flex: 1, fontSize: ( 16 / 375 ) * ScreenWidth, color: 'lightgrey' } }>{ 'Select Code' }</Text> );
        } else {
            return ( <Text style={ { minHeight: 0, flex: 1, fontSize: ( 16 / 375 ) * ScreenWidth } }>{ serviceitem.service.desc }</Text> );
        }
    }
    function getlabel ( arg: any ) {
        if ( arg === '' ) {
            return ( 'Service Code' );
        } else {
            return ( arg );
        }
    }
    function getFrom () {
        if ( String( startdate?.getDate() ) === 'NaN' || startdate === undefined ) {
            startdate = undefined;
            return ( <Text style={ styles.text }>{ String( serviceitem.service.fromdate.toDateString() ) } { String( serviceitem.service.fromdate.toLocaleTimeString() ) }</Text> );
        } else {
            return ( <Text style={ styles.text }>{ String( startdate?.toDateString() ) } { String( startdate?.toLocaleTimeString() ) }</Text> );
        }
    }
    function getFromval () {
        //console.log( startdate );

        if ( String( startdate?.getDate() ) === 'NaN' || startdate === undefined ) {
            startdate = undefined;
            return serviceitem.service.fromdate;
        } else {
            return startdate;
        }
    }

    return (
        <>
            {/* <ScrollView style={{}} scrollEnabled={false}> */ }
            <ScrollView scrollEnabled={ false } style={ { flex: 1, paddingBottom: 0, minHeight: ( 200 / 375 ) * ScreenWidth, maxHeight: ( 350 / 375 ) * ScreenWidth } }>
                <View style={ { flex: 1, marginTop: 50 } }>
                    {/* <View style={{...styles.container}}> */ }
                    <TouchableOpacity style={ { ...styles.datecontainer, width: '100%', height: ( 80 / 375 ) * ScreenWidth } } onPress={ () => { navigation.navigate( 'CategoryFilter', { type: 'procedures', pos: { serviceitemref: serviceitem.ref, ref: serviceitem.ref } } ); } }>

                        <Text style={ styles.label }>{ getlabel( serviceitem.service.code ) }</Text>
                        { greytext( serviceitem.service.code ) }
                    </TouchableOpacity>
                    <View style={ { flex: 1, flexDirection: 'row', alignItems: 'center', paddingVertical: 0, height: ( 60 / 375 ) * ScreenWidth } }>


                        <View style={ { ...styles.datecontainer, width: "100%" } }>
                            <Text style={ styles.label }>{ 'Units' }</Text>
                            <TouchableOpacity onPress={ () => { setVisibility( true ); } } >
                                <View style={ styles.input }>
                                    <TextInput
                                        // label={'Units'}
                                        value={ String( serviceitem.service.units ) }
                                        placeholder={ 'Units' }
                                        placeholderTextColor={ 'lightgray' }
                                        // errorMessage={errorMessage}
                                        // secureTextEntry={visible}
                                        onChangeText={ value => onChangeText( 'units', value ) }
                                        style={ { flex: 1, fontSize: ( 16 / 375 ) * ScreenWidth } }
                                        keyboardType={ 'number-pad' }
                                        returnKeyType={ 'done' }
                                    // containerStyle={styles.containerStyle}
                                    // labelStyle={styles.labelStyle} 
                                    // autoCompleteType={undefined}            
                                    />

                                </View>
                            </TouchableOpacity>
                            {/* {(props.errorMessage !== null) ? <Text style={styles.error}>{props.errorMessage}</Text> : null} */ }
                        </View>

                        {/* <View style={styles.datecontainer}>
                            <Text style={styles.label}>{'Minutes'}</Text>
                            <TouchableOpacity onPress={()=>{setVisibility(true)}} >
                                <View style={styles.input}>
                                <TextInput
                // label={'Minutes'}
                value={String(serviceitem.service.minutes)}
                placeholder={'Minutes'}
                placeholderTextColor={'lightgray'}
                // errorMessage={errorMessage}
                secureTextEntry={visible}
                onChangeText={value => onChangeText('units', value)}
                // style={{flex:1, paddingHorizontal: 0, paddingRight:15}}
                keyboardType={'number-pad'}
                returnKeyType={'done'}
                // containerStyle={styles.containerStyle}
                // labelStyle={styles.labelStyle} 
                // autoCompleteType={undefined}            
                /> */}

                        {/* </View>
                            </TouchableOpacity> */}
                        {/* {(props.errorMessage !== null) ? <Text style={styles.error}>{props.errorMessage}</Text> : null} */ }
                        {/* </View> */ }

                    </View>
                    <View style={ { flex: 1, flexDirection: 'row', alignItems: 'center', paddingVertical: 0, maxHeight: ( 60 / 375 ) * ScreenWidth } }>

                        <View style={ styles.datecontainer }>
                            <Text style={ styles.label }>{ 'From' }</Text>
                            <TouchableOpacity style={ {} } onPress={ () => { setFrom( true ); } } >
                                <View style={ styles.input }>
                                    { getFrom() }
                                    <DateTimePickerModal
                                        date={ getFromval() ?? new Date() }
                                        isVisible={ from }
                                        onConfirm={ ( value ) => { confirmDate( serviceitem.ref, 'from', value ); } }
                                        mode='datetime'
                                        // display="inline"
                                        style={ { height: ( 200 / 375 ) * ScreenWidth, width: '100%' } }

                                        // pickerStyleIOS={{height:200}}
                                        // minimumDate={new Date()}
                                        // maximumDate={new Date()}
                                        // isDarkModeEnabled={Appearance.getColorScheme() === 'dark'}
                                        onCancel={ () => setFrom( false ) }
                                    />
                                </View>
                            </TouchableOpacity>
                            {/* {(props.errorMessage !== null) ? <Text style={styles.error}>{props.errorMessage}</Text> : null} */ }
                        </View>

                        <View style={ styles.datecontainer }>
                            <Text style={ styles.label }>{ 'To' }</Text>
                            <TouchableOpacity style={ {} } onPress={ () => { setTo( true ); } } >
                                <View style={ styles.input }>
                                    <Text style={ styles.text }>{ String( serviceitem.service.todate.toDateString() ) } { String( serviceitem.service.todate.toLocaleTimeString() ) }</Text>
                                    <DateTimePickerModal
                                        date={ serviceitem.service.todate }
                                        isVisible={ to }
                                        onConfirm={ ( value ) => { confirmDate( serviceitem.ref, 'to', value ); } }
                                        mode='datetime'
                                        // display="inline"
                                        style={ { height: ( 200 / 375 ) * ScreenWidth, width: '100%' } }


                                        // pickerStyleIOS={{height:200}}
                                        // minimumDate={new Date()}
                                        minimumDate={ startdate ?? serviceitem.service.fromdate }

                                        maximumDate={ startdate ? new Date() : undefined }
                                        // isDarkModeEnabled={Appearance.getColorScheme() === 'dark'}
                                        onCancel={ () => setTo( false ) }
                                    />
                                </View>
                            </TouchableOpacity>
                            {/* {(props.errorMessage !== null) ? <Text style={styles.error}>{props.errorMessage}</Text> : null} */ }
                        </View>
                    </View>
                    {/* <View style={{...styles.container, margin:0}}> */ }

                    <TouchableOpacity style={ {
                        backgroundColor: "#fff",
                        marginTop: 0,
                        marginHorizontal: 10,
                        marginBottom: 0,
                        borderBottomWidth: 1,
                        borderColor: '#86939e',
                        height: ( 60 / 375 ) * ScreenWidth,
                        width: "100%",
                        flex: 1
                    } }
                        onPress={ () => {
                            navigation.navigate( 'CategoryFilter', { type: 'placesofservice', pos: { serviceitemref: serviceitem.ref, ref: serviceitem.ref } } );
                        } }
                    >
                        <Text style={ styles.label }>{ 'Place of Service' }</Text>
                        {/* <TouchableOpacity onPress={()=>{setVisibility(true)}} > */ }
                        <View style={ styles.input }>
                            <TextInput
                                // label={'Place of Service'}
                                value={ serviceitem.service.place_of_service }
                                placeholder={ 'Place of Service' }
                                placeholderTextColor={ 'lightgray' }
                                // errorMessage={errorMessage}
                                // secureTextEntry={visible}
                                editable={ false }
                                // onChangeText={value => onChangeText('POS', value)}
                                style={ { flex: 1, fontSize: ( 16 / 375 ) * ScreenWidth } }
                                keyboardType={ 'number-pad' }
                                returnKeyType={ 'done' }
                            // containerStyle={styles.containerStyle}
                            // labelStyle={styles.labelStyle} 
                            // autoCompleteType={undefined}            
                            />

                        </View>
                        {/* </TouchableOpacity> */ }
                    </TouchableOpacity>
                </View>
            </ScrollView>
            {/* <View style={{marginTop:10}}> */ }
            <FlatList
                ListHeaderComponent={
                    <>
                        <View style={ { marginTop: 0 } }>
                            <Text style={ { ...styles.labelStyle, fontSize: ( 18 / 375 ) * ScreenWidth, color: 'grey' } }> Modifier Codes</Text>
                        </View>
                    </> }
                numColumns={ 4 }
                data={ serviceitem.modifiers }
                renderItem={ renderItem }
                scrollEnabled={ false }
            // style={{minHeight:80}}
            />
            {/* </View> */ }

            <TouchableOpacity style={ { marginBottom: 10, backgroundColor: 'darkseagreen', width: '70%', height: '5%', justifyContent: 'center', alignItems: 'center', alignSelf: 'center' } } onPress={ () => { navigation.goBack(); } } >
                <Text style={ { fontSize: ( 18 / 375 ) * ScreenWidth, color: "indianred", textAlign: 'center' } }>Add</Text>
            </TouchableOpacity>
        </>
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
        margin: ( 5 / 375 ) * ScreenWidth,
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
        width: "50%",
        flex: 1
    },
} );

export default ServiceForm;

