import React, { useState } from 'react'
import {
    View
} from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import { COLORS, icons } from '../../constants';

export const ProgressBar =  ({progress}:{progress: Queue;})=> {
var inline, arrived, waiting, withDoc, done = undefined;

const getProgress = () => {

    switch (progress?.queuedata?.mystatus) {

        case 'inline':
            inline  = COLORS.primary;
            waiting = 'lightgrey';
            arrived = 'lightgrey';
            withDoc = 'lightgrey';
            return;
            
        case 'waiting':
            inline  = COLORS.primary;
            waiting = COLORS.primary;
            arrived = 'lightgrey';
            withDoc = 'lightgrey';
            return;
        
        case 'arrived':
            inline  = COLORS.primary;
            waiting = COLORS.primary;
            arrived = COLORS.primary;
            withDoc = 'lightgrey';
            return;
            
        case 'beingseen':
            inline  = COLORS.primary;
            waiting = COLORS.primary;
            arrived = COLORS.primary;
            withDoc = COLORS.primary;
            return;
                
        
        }
};

getProgress();
console.log(progress?.queuedata?.mystatus,inline, waiting, arrived, withDoc);


    return (
      <View style={{ flexDirection:'row', height:'15%', justifyContent:'space-evenly'}}>
        <View style={{position:'relative', height:'15%', width:'23%', backgroundColor:'lightgrey', alignSelf:'center'}}>
            <View style={{position:'absolute', height:'100%', width:`${100}%`, backgroundColor:inline}}/>
        </View>
        <></>
        <View style={{position:'relative', height:'15%', width:'23%', backgroundColor:'lightgrey', alignSelf:'center'}}>
            <View style={{position:'absolute', height:'100%', width:`${100}%`, backgroundColor:waiting}}/>
        </View>
        <View style={{position:'relative', height:'15%', width:'23%', backgroundColor:'lightgrey', alignSelf:'center'}}>
            <View style={{position:'absolute', height:'100%', width:`${100}%`, backgroundColor:arrived}}/>
        </View>
        <View style={{position:'relative', height:'15%', width:'23%', backgroundColor:'lightgrey', alignSelf:'center'}}>
            <View style={{position:'absolute', height:'100%', width:`${100}%`, backgroundColor:withDoc}}/>
        </View>
        {/* <View style={{position:'relative', height:'15%', width:'15%', backgroundColor:'lightgrey', alignSelf:'center'}}>
            <View style={{position:'absolute', height:'100%', width:`${100}%`, backgroundColor:'red'??arrived}}/>
        </View> */}
      </View>
    );
};

