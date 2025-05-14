import React, { useState } from 'react';
import { FlatList, ScrollView, StyleSheet, View, Text, TouchableOpacity, TextInput } from 'react-native';
import { Icon, Input } from '@rneui/themed';
import { Button } from 'react-native-paper';
// import RNPickerSelect from 'react-native-picker-select';
import DateTimePickerModal from "react-native-modal-datetime-picker";

const ServiceForm = ( { navigation }: any ) => {


    const [ service, setservice ] = useState<string>( '' );
    const [ fromdate, setfromdate ] = useState<string>( '' );
    const [ todate, settodate ] = useState<string>( '' );
    const [ dx, setdx ] = useState<string>( '' );
    const [ status, setstatus ] = useState<string>( '' );

    const [ lineitem, setLineItem ] = useState( {
        service: { code: undefined, desc: undefined }
        , todate: new Date()
        , fromdate: new Date()
        , place_of_service: ''
        , units: ''
        , minutes: ''
        , MX_DATA: [
            { mx1: { code: '', desc: '' } }
            , { mx2: { code: '', desc: '' } }
            , { mx3: { code: '', desc: '' } }
            , { mx4: { code: '', desc: '' } }
        ]
        , DX_DATA: [
            { id: 1, code: '', desc: '' }
            , { id: 2, code: '', desc: '' }
            , { id: 3, code: '', desc: '' }
            , { id: 4, code: '', desc: '' }
            , { id: 5, code: '', desc: '' }
            , { id: 6, code: '', desc: '' }
            , { id: 7, code: '', desc: '' }
            , { id: 8, code: '', desc: '' }
            , { id: 9, code: '', desc: '' }
        ]
    } );

    // let {label, value, errorMessage, placeholder, secure} = props;


    const secure = false;
    const [ visible, setVisibility ] = useState( secure );



    function setPCode ( code: string, desc: string ) {
        setLineItem( { ...lineitem, service: { code: code, desc: desc } } );
    };
    function setDate ( type: string, date: Date ) {

        if ( type === 'from' ) {
            setLineItem( { ...lineitem, fromdate: date } );
        } else {
            setLineItem( { ...lineitem, todate: date } );
        }
    };
    function setMCode ( pos: number, code: string, desc: string ) {

        switch ( pos ) {
            case 1:
                setLineItem( { ...lineitem, mx1: { code: code, desc: desc } } );
                break;
            case 2:
                setLineItem( { ...lineitem, mx2: { code: code, desc: desc } } );
                break;
            case 3:
                setLineItem( { ...lineitem, mx3: { code: code, desc: desc } } );
                break;
            case 4:
                setLineItem( { ...lineitem, mx4: { code: code, desc: desc } } );
                break;
            default:
                break;
        };
    };
    function setDCode ( pos: number, code: string, desc: string ) {

        switch ( pos ) {
            case 1:
                lineitem.DX_DATA.filter( x => x.id === 1 )[ 0 ].code = code;
                lineitem.DX_DATA.filter( x => x.id === 1 )[ 0 ].desc = desc;
                const dxdata = lineitem.DX_DATA;

                setLineItem( { ...lineitem, DX_DATA: dxdata } );
                break;
            case 2:
                setLineItem( { ...lineitem, dx2: { code: code, desc: desc } } );
                break;
            case 3:
                setLineItem( { ...lineitem, dx3: { code: code, desc: desc } } );
                break;
            case 4:
                setLineItem( { ...lineitem, dx4: { code: code, desc: desc } } );
                break;
            case 5:
                setLineItem( { ...lineitem, dx5: { code: code, desc: desc } } );
                break;
            case 6:
                setLineItem( { ...lineitem, dx6: { code: code, desc: desc } } );
                break;
            case 7:
                setLineItem( { ...lineitem, dx7: { code: code, desc: desc } } );
                break;
            case 8:
                setLineItem( { ...lineitem, dx8: { code: code, desc: desc } } );
                break;
            case 9:
                setLineItem( { ...lineitem, dx9: { code: code, desc: desc } } );
                break;
            default:
                break;
        };
    };


    const MX_DATA = [
        {
            id: '1',
            desc: 'mx1',
        },
        {
            id: '2',
            desc: 'mx2',
        },
        {
            id: '3',
            desc: 'mx3',
        },
        {
            id: '4',
            desc: 'mx4',
        },
    ];

    const DX_DATA = [
        {
            id: '1',
            desc: 'dx1',
        },
        {
            id: '2',
            desc: 'dx2',
        },
        {
            id: '3',
            desc: 'dx3',
        },
        {
            id: '4',
            desc: 'dx4',
        },
        {
            id: '5',
            desc: 'dx5',
        },
        {
            id: '6',
            desc: 'dx6',
        },
        {
            id: '7',
            desc: 'dx7',
        },
        {
            id: '8',
            desc: 'dx8',
        },
        {
            id: '9',
            desc: 'dx9',
        },
    ];




    function onChangeText ( type: string, value: string ) {

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
            case 'dx':
                setdx( value );
                break;
            case 'status':
                setstatus( value );
                break;
            default:
                break;
        }

    }


    const toggleVisibility = () => setVisibility( !visible );

    const renderItem = ( { item }: any ) => (
        <View style={ styles.item }>
            {/* <Text>{item.desc}</Text> */ }
            {/* <Text style={[styles.label, styles.labelStyle]}>{item.desc}</Text> */ }
            <Input
                // label={item.desc}
                value={ service }
                placeholder={ item.desc }
                // errorMessage={errorMessage}
                secureTextEntry={ visible }
                onChangeText={ value => onChangeText( 'service', value ) }
                containerStyle={ { height: 40, width: '100%', paddingHorizontal: 10 } }
                // labelStyle={styles.labelStyle} 
                autoCompleteType={ undefined } />
            {/* <RNPickerSelect  items={CODES} 
                 onValueChange={value => {
                    if(value == 0){
                    // setClubs(soccer.filter(x => x.country === country).map( obj=> obj.club));
                    } 
                    else{
                    // setLeague(getLeagues(leagues, value)[0]);
                    }
                    }}
                value={0}
                //  onValueChange={onValueChange}
                 /> */}
        </View>

    );
    const renderDXItem = ( { item }: any ) => (
        <View style={ styles.item }>
            {/* <Text>{item.desc}</Text> */ }
            {/* <Text style={[styles.label, styles.labelStyle]}>{item.desc}</Text> */ }
            <Input
                // label={item.desc}
                value={ service }
                placeholder={ item.desc }
                // errorMessage={errorMessage}
                secureTextEntry={ visible }
                onChangeText={ value => onChangeText( 'service', value ) }
                containerStyle={ { height: 40, width: '100%', paddingHorizontal: 10 } }
                // labelStyle={styles.labelStyle} 
                autoCompleteType={ undefined } />
            {/* <RNPickerSelect  items={CODES} 
                 onValueChange={value => {
                    if(value == 0){
                    // setClubs(soccer.filter(x => x.country === country).map( obj=> obj.club));
                    } 
                    else{
                    // setLeague(getLeagues(leagues, value)[0]);
                    }
                    }}
                value={0}
                //  onValueChange={onValueChange}
                 /> */}
        </View>

    );

    const confirmDate = ( type: string, date: Date ) => {
        //console.log(date);

        setDate( type, date );
        setVisibility( false );
    };

    function greytext ( arg: any ) {
        if ( arg === undefined ) {
            return ( <Text style={ { minHeight: 0, flex: 1, fontSize: 16, color: 'lightgrey' } }>{ 'Select Code' }</Text> );
        } else {
            return ( <Text style={ { minHeight: 0, flex: 1, fontSize: 16 } }>{ lineitem.service.desc }</Text> );
        }
    }

    return (
        <>
            {/* <ScrollView style={{}} scrollEnabled={false}> */ }
            <ScrollView scrollEnabled={ false }>
                <View style={ { flex: 1 } }>
                    {/* <View style={{...styles.container}}> */ }
                    <TouchableOpacity style={ { ...styles.datecontainer, width: '100%', height: 80 } } onPress={ () => { navigation.navigate( 'CategoryFilter', setPCode, { type: 'procedure' } ); } }>

                        <Text style={ styles.label }>{ lineitem.service.code ?? 'Service Code' }</Text>
                        { greytext( lineitem.service.code ) }
                    </TouchableOpacity>
                    {/* <Input
                label={'Service'}
                value={service}
                placeholder={'Service Code'}
                // errorMessage={errorMessage}
                secureTextEntry={visible}
                onChangeText={value => onChangeText('service', value)}
                containerStyle={styles.containerStyle}
                labelStyle={styles.labelStyle} 
                autoCompleteType={undefined}            />
            {
                secure &&
                <Icon containerStyle={styles.icon}
                name={visible ? "visibility" : "visibility-off"}
                size={23}
                color={"grey"}
                onPress={toggleVisibility} tvParallaxProperties={undefined}                />
            } */}

                    {/* </View> */ }
                    <View style={ { flex: 1, flexDirection: 'row', alignItems: 'center', paddingVertical: 0, height: 60 } }>


                        <View style={ styles.datecontainer }>
                            <Text style={ styles.label }>{ 'Units' }</Text>
                            <TouchableOpacity onPress={ () => { setVisibility( true ); } } >
                                <View style={ styles.input }>
                                    <TextInput
                                        // label={'Units'}
                                        value={ service }
                                        placeholder={ 'Units' }
                                        placeholderTextColor={ 'lightgray' }
                                        // errorMessage={errorMessage}
                                        secureTextEntry={ visible }
                                        onChangeText={ value => onChangeText( 'service', value ) }
                                        // style={{flex:1, paddingHorizontal: 0, paddingRight:15}}
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

                        <View style={ styles.datecontainer }>
                            <Text style={ styles.label }>{ 'Minutes' }</Text>
                            <TouchableOpacity onPress={ () => { setVisibility( true ); } } >
                                <View style={ styles.input }>
                                    <TextInput
                                        // label={'Minutes'}
                                        value={ service }
                                        placeholder={ 'Minutes' }
                                        placeholderTextColor={ 'lightgray' }
                                        // errorMessage={errorMessage}
                                        secureTextEntry={ visible }
                                        onChangeText={ value => onChangeText( 'service', value ) }
                                        // style={{flex:1, paddingHorizontal: 0, paddingRight:15}}
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

                    </View>
                    <View style={ { flex: 1, flexDirection: 'row', alignItems: 'center', paddingVertical: 0, minHeight: 60 } }>

                        <View style={ styles.datecontainer }>
                            <Text style={ styles.label }>{ 'From' }</Text>
                            <TouchableOpacity onPress={ () => { setVisibility( true ); } } >
                                <View style={ styles.input }>
                                    <Text style={ styles.text }>{ String( lineitem.fromdate.toDateString() ) } { String( lineitem.fromdate.toLocaleTimeString() ) }</Text>
                                    <DateTimePickerModal
                                        date={ lineitem.fromdate }
                                        isVisible={ visible }
                                        onConfirm={ ( value ) => { confirmDate( 'from', value ); } }
                                        mode='datetime'
                                        // display="inline"
                                        style={ { height: 200, width: '100%' } }

                                        // pickerStyleIOS={{height:200}}
                                        // minimumDate={new Date()}
                                        // maximumDate={new Date()}
                                        // isDarkModeEnabled={Appearance.getColorScheme() === 'dark'}
                                        onCancel={ () => setVisibility( false ) }
                                    />
                                </View>
                            </TouchableOpacity>
                            {/* {(props.errorMessage !== null) ? <Text style={styles.error}>{props.errorMessage}</Text> : null} */ }
                        </View>

                        <View style={ styles.datecontainer }>
                            <Text style={ styles.label }>{ 'To' }</Text>
                            <TouchableOpacity onPress={ () => { setVisibility( true ); } } >
                                <View style={ styles.input }>
                                    <Text style={ styles.text }>{ String( lineitem.todate.toDateString() ) } { String( lineitem.todate.toLocaleTimeString() ) }</Text>
                                    <DateTimePickerModal
                                        date={ lineitem.todate }
                                        isVisible={ visible }
                                        onConfirm={ ( value ) => { confirmDate( 'to', value ); } }
                                        mode='datetime'
                                        // display="inline"
                                        style={ { height: 200, width: '100%' } }

                                        // pickerStyleIOS={{height:200}}
                                        minimumDate={ new Date() }
                                        // maximumDate={new Date()}
                                        // isDarkModeEnabled={Appearance.getColorScheme() === 'dark'}
                                        onCancel={ () => setVisibility( false ) }
                                    />
                                </View>
                            </TouchableOpacity>
                            {/* {(props.errorMessage !== null) ? <Text style={styles.error}>{props.errorMessage}</Text> : null} */ }
                        </View>
                    </View>
                    {/* <View style={{...styles.container, margin:0}}> */ }

                    <View style={ {
                        backgroundColor: "#fff",
                        marginTop: 0,
                        marginHorizontal: 10,
                        marginBottom: 0,
                        borderBottomWidth: 1,
                        borderColor: '#86939e',
                        height: 60,
                        width: "100%"
                    } }>
                        <Text style={ styles.label }>{ 'Place of Service' }</Text>
                        <TouchableOpacity onPress={ () => { setVisibility( true ); } } >
                            <View style={ styles.input }>
                                <TextInput
                                    // label={'Place of Service'}
                                    value={ service }
                                    placeholder={ 'Place of Service' }
                                    placeholderTextColor={ 'lightgray' }
                                    // errorMessage={errorMessage}
                                    secureTextEntry={ visible }
                                    onChangeText={ value => onChangeText( 'service', value ) }
                                    // style={{flex:1, paddingHorizontal: 0, paddingRight:15}}
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
                    {/* <Input
                label={'Place of Service'}
                value={service}
                placeholder={'Place of Service Code'}
                // errorMessage={errorMessage}
                secureTextEntry={visible}
                onChangeText={value => onChangeText('service', value)}
                containerStyle={styles.containerStyle}
                labelStyle={styles.labelStyle} 
                autoCompleteType={undefined}            />
            {
                secure &&
                <Icon containerStyle={styles.icon}
                name={visible ? "visibility" : "visibility-off"}
                size={23}
                color={"grey"}
                onPress={toggleVisibility} tvParallaxProperties={undefined}                />
            } */}

                    {/* </View> */ }

                </View>
            </ScrollView>
            <View style={ { ...styles.container, marginBottom: 10 } }>
                <FlatList
                    ListHeaderComponent={
                        <>
                            <View style={ { marginTop: 0 } }>
                                <Text style={ { ...styles.labelStyle, fontSize: 18, color: 'grey' } }> Modifier Codes</Text>
                            </View>
                        </> }
                    numColumns={ 4 }
                    data={ MX_DATA }
                    renderItem={ renderItem }
                    scrollEnabled={ false }
                    style={ { height: 80 } }
                />
                {/* </View>
        <View style={styles.container}> */}
                <FlatList
                    ListHeaderComponent={
                        <>
                            <View style={ { marginTop: 0 } }>
                                <Text style={ { ...styles.labelStyle, fontSize: 18, color: 'grey' } }>ICD-10-CM Diagnosis Codes</Text>
                            </View>
                        </> }
                    numColumns={ 3 }
                    data={ DX_DATA }
                    renderItem={ renderDXItem }
                    scrollEnabled={ false }
                    style={ { height: 180 } }
                />
            </View>
            <TouchableOpacity style={ { marginBottom: 10, backgroundColor: 'red', height: 40, width: '70%', alignSelf: 'center' } } />
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
        margin: 5,
    },
    label: { color: "#86939e", fontSize: 16, fontWeight: "400", },
    input: { height: 40, justifyContent: "center", color: "black" },
    text: { fontSize: 16, color: "black" },
    error: { color: "#ff190c", fontSize: 12, },
    datecontainer: {
        backgroundColor: "#fff",
        marginTop: 0,
        marginHorizontal: 10,
        marginBottom: 0,
        borderBottomWidth: 1,
        borderColor: '#86939e',
        height: 60,
        width: "50%"
    },
} );

export default ServiceForm;

