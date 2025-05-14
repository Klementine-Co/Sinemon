import { useRef } from 'react';
import {
    StyleSheet,
    Dimensions,
    View,
    Image,
    TouchableOpacity
} from 'react-native';
import { WebView } from 'react-native-webview';
import { COLORS, icons } from '../../../constants';
const ScreenHeight = Dimensions.get("window").height;
const ScreenWidth = Dimensions.get("window").width;
export const RXDiscCard = ( { route, navigation }: searchProp ) => {
    const ref = useRef( navigation );
    //console.log(route.params);

    const card = route.params.item.card;
    return (
        <View style={ styles.container }>
            <TouchableOpacity style={ { height: ( 100 / 375 ) * ScreenWidth, bottom: ( 10 / 375 ) * ScreenWidth, left: ( 10 / 375 ) * ScreenWidth } }
                onPress={ () => {
                    navigation.goBack();
                } }>

                <Image
                    source={ icons.back }
                    style={ {
                        width: ( 30 / 375 ) * ScreenWidth,
                        height: ( 30 / 375 ) * ScreenWidth,
                        top: ( 60 / 375 ) * ScreenWidth,
                        marginBottom: ( 30 / 375 ) * ScreenWidth,

                    } }
                />
            </TouchableOpacity>
            <WebView
                ref={ ref }
                source={ { uri: card } as any }
                style={ { width: '100%', height: '100%', alignItems: 'center', } }
                textZoom={ 100 }
                scalesPageToFit={ true }
                startInLoadingState
                renderLoading={ () => (
                    <></>
                ) }
                allowsBackForwardNavigationGestures
                onNavigationStateChange={ ( navState ) => {
                    if ( navState.canGoBack ) {
                        navigation.setParams( {
                            headerLeftInfo: {
                                title: '',
                                onPress: () => ref.current.goBack(),
                            },
                        } );
                    } else {
                        navigation.setParams( {
                            headerLeftInfo: null,
                        } );
                    }
                } }
            />
        </View>
    );
};

const styles = StyleSheet.create( {
    container: {
        flex: 1,
        backgroundColor: COLORS.white,
        width: '100%',
        marginBottom: 50,
    },
    pdf: {
        // flex:1,
        width: '100%',
        height: '100%',
        alignItems: 'center'
        // marginTop:'0%'
    }
} );

