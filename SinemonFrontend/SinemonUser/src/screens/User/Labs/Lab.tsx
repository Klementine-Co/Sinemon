import React, { useEffect, useRef, useState } from 'react';
import { View, StyleSheet, ActivityIndicator, TouchableOpacity, Image } from 'react-native';
import Pdf from 'react-native-pdf';
import { COLORS, icons } from '../../../constants';
import LabImage from './LabImage';
import { LabPDF } from './LabPDF';
import { ScreenWidth } from 'react-native-elements/dist/helpers';

export const Lab = ( { route, navigation }: accountProp ) => {
    const [ isLoading, setIsLoading ] = useState( true ); // State to manage loading indicator
    //console.log(route.params.lab.lab);
    const labRef = useRef( null );

    // Helper to determine if the lab URL points to a PDF
    const isPDF = route.params.lab.lab.split( '.' ).pop().toLowerCase() === 'pdf';

    const goBack = () => {

        navigation.goBack();

    };




    useEffect( () => {
        //console.log( isLoading );

    }, [ isLoading, labRef ] );

    return (
        <View style={ styles.container }>
            <TouchableOpacity
                style={ styles.touchableOpacityStyle }
                onPress={ goBack }>
                <Image
                    source={ icons.back }
                    style={ styles.imageStyle }
                />
            </TouchableOpacity>
            {
                !route.params.lab.lab ? (
                    <ActivityIndicator size="large" color={ COLORS.primary } />
                ) : isPDF ? (
                    <LabPDF pdfUrl={ route.params.lab.lab } ref={ labRef } />
                ) : (
                    <LabImage imageUrl={ route.params.lab.lab } ref={ labRef } />
                )
            }
        </View>
    );
};

const styles = StyleSheet.create( {
    container: {
        flex: 1,
        backgroundColor: COLORS.white,
        justifyContent: 'center', // Center the loading indicator
    },
    touchableOpacityStyle: {
        height: 100 / 375 * ScreenWidth,
        bottom: 10 / 375 * ScreenWidth,
        left: 10 / 375 * ScreenWidth,
    },
    imageStyle: {
        width: 30 / 375 * ScreenWidth,
        height: 30 / 375 * ScreenWidth,
        top: 60 / 375 * ScreenWidth,
        marginBottom: 30 / 375 * ScreenWidth,
    },
    pdfStyle: {
        flex: 1,
        width: '100%',
    },
    loadingIndicator: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        alignItems: 'center',
        justifyContent: 'center',
    },
} );
