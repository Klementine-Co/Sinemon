
import React, {useState} from 'react';
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
import { images, COLORS, SIZES} from '../../constants';
import { ImageBackground } from 'react-native';
import { ScreenWidth } from 'react-native-elements/dist/helpers';
import * as APICALLS from "./../../constants/API_CALLS";
import { Picker } from '@react-native-picker/picker';
import { STATES } from '../../constants/locations';
import Tabs from "react-native-tabs";


export const Search = ({route,  navigation }:searchProp) => {
    

    // Render
      
  
      





      return (
        <View style={styles.container}>
            <Header
            containerStyle = {{
                height: '6%',
                width:'100%',
                backgroundColor: 'grey',
                justifyContent: 'space-around',
            }}
            placement="left"
            />   
         
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.white,
    },
    listItem:{
        marginTop: 25,
        backgroundColor:"#FFF",
        width:"80%",
        flex:1,
        alignSelf:"center",
        flexDirection:"row",
        borderRadius:5,
        marginBottom:10
        
    },
    zipcode:{
        textAlign:'center',
        // flex:1,
        margin: 10,
        padding: 0,
        height: (60/375)*ScreenWidth,
        borderWidth: 0.5,
        borderRadius: 15,
        fontSize: (22/375)*ScreenWidth,
        backgroundColor: 'white',
        borderColor:COLORS.primary,
        // marginTop:10,
    },
    zipcode1:{
        textAlign:'center',
        // flex:1,
        margin: 10,
        padding: 20,
        height: (60/375)*ScreenWidth,
        borderWidth: 0.5,
        borderRadius: 15,
        fontSize: (22/375)*ScreenWidth,
        backgroundColor: 'white',
        // marginTop:'20%',
        borderColor:COLORS.primary
    },
    button:{
        backgroundColor:COLORS.primary, 
        width:'40%', 
        alignSelf:'center', 
        // marginTop:'20%', 
        borderRadius:25,
        // marginBottom:15,
        // top:'15%'
        margin:20
        
    },
    buttonText:{
        fontSize:(24/375)*ScreenWidth, 
        textAlign:'center', 
        marginVertical:5,
        color: 'white'
    },
    view1:{
        position:'absolute', 
        height:'70%', 
        width:'70%', 
        top:10, 
        left:15, 
        justifyContent:'center' 
    },
    name:{
        textAlign:'center',
        // flex:1,
        // marginVertical: 10,
        padding: 10,
        width:'100%',
        height: (48/375)*ScreenWidth,
        borderWidth: 0.5,
        borderRadius: 15,
        fontSize: (14/375)*ScreenWidth,
        backgroundColor: 'white',
        borderColor:COLORS.primary
    },
    name1:{
        textAlign:'center',
        // flex:1,
        // marginBottom: 10,
        padding: 10,
        width:'100%',
        height: (48/375)*ScreenWidth,
        borderWidth: 0.5,
        borderRadius: 15,
        fontSize: (14/375)*ScreenWidth,
        backgroundColor: 'white',
        borderColor:COLORS.primary
    },
});

