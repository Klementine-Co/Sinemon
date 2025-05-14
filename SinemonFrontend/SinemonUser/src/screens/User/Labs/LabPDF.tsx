import React, { forwardRef, useState } from 'react';
import { View, StyleSheet, ActivityIndicator } from 'react-native';
import Pdf from 'react-native-pdf';
import { COLORS } from '../../../constants';
import LabImage from './LabImage';

const [ isLoading, setIsLoading ] = useState( true ); // State to manage loading indicator
// Typing the props along with the ref type
interface LabPDFProps {
    pdfUrl: string;
}
export const LabPDF = forwardRef<Pdf, LabPDFProps>( ( { pdfUrl }, ref ) => {

    return (
        //console.log(props.labPDF);

        <View style={ styles.container }>
            { isLoading && <ActivityIndicator size="large" color={ COLORS.primary } style={ styles.loadingIndicator } /> }
            <Pdf
                ref={ ref }
                source={ { uri: pdfUrl, cache: true } }
                onLoadComplete={ ( numberOfPages, filePath ) => {
                    //console.log( `PDF loaded with ${ numberOfPages } pages from ${ filePath }` );
                    setIsLoading( false ); // Hide loading indicator when PDF is loaded
                } }
                onError={ ( error ) => {
                    console.error( error );
                    setIsLoading( false ); // Hide loading indicator on error as well
                } }
                style={ styles.pdfStyle }
            />
        </View>

    );
} );

const styles = StyleSheet.create( {
    container: {
        flex: 1,
        backgroundColor: COLORS.white,
        justifyContent: 'center', // Center the loading indicator
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
