import React from 'react';
import {
    View
} from 'react-native';
import { COLORS } from '../../constants';

export const ProgressBar = ( { progress, size }: { progress: Queue; size: number; } ) => {
    var arrived, waiting, withPatient, done = undefined;

    const getProgress = () => {

        switch ( progress?.queuedata?.status ) {

            case 'A':
                arrived = COLORS.primary;
                waiting = 'lightgrey';
                withPatient = 'lightgrey';
                return;

            case 'W':
                waiting = COLORS.primary;
                arrived = COLORS.primary;
                withPatient = 'lightgrey';
                return;

            case 'B':
                withPatient = COLORS.primary;
                arrived = COLORS.primary;
                waiting = COLORS.primary;
                return;


        }
    };

    getProgress();
    //console.log( progress?.queuedata?.status, arrived, withPatient, waiting );


    return (
        <View style={ { flexDirection: 'row', height: size, justifyContent: 'space-evenly' } }>
            <View style={ { position: 'relative', height: '100%', width: '30%', backgroundColor: 'lightgrey', alignSelf: 'center' } }>
                <View style={ { position: 'absolute', height: '100%', width: `${ 100 }%`, backgroundColor: arrived } } />
            </View>
            <></>
            <View style={ { position: 'relative', height: '100%', width: '30%', backgroundColor: 'lightgrey', alignSelf: 'center' } }>
                <View style={ { position: 'absolute', height: '100%', width: `${ 100 }%`, backgroundColor: waiting } } />
            </View>
            <View style={ { position: 'relative', height: '100%', width: '30%', backgroundColor: 'lightgrey', alignSelf: 'center' } }>
                <View style={ { position: 'absolute', height: '100%', width: `${ 100 }%`, backgroundColor: withPatient } } />
            </View>
            {/* <View style={{position:'relative', height:'15%', width:'20%', backgroundColor:'lightgrey', alignSelf:'center'}}>
            <View style={{position:'absolute', height:'100%', width:`${100}%`, backgroundColor:'red'??done}}/>
        </View> */}
            {/* <View style={{position:'relative', height:'15%', width:'15%', backgroundColor:'lightgrey', alignSelf:'center'}}>
            <View style={{position:'absolute', height:'100%', width:`${100}%`, backgroundColor:'red'??arrived}}/>
        </View> */}
        </View>
    );
};

