import { useRef } from 'react';
import {
  StyleSheet,
  Dimensions
} from 'react-native';


import { WebView } from 'react-native-webview';

export const RXCard = ( { route, navigation }: searchProp ) => {

  const ref = useRef( navigation );

  return (
    <>
      <WebView
        style={ styles.pdf }
        bounces={ false }
        ref={ ref }
        source={ { url: route.params.item.card } }
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
      <WebView
        style={ styles.pdf }
        bounces={ false }
        source={ { url: route.params.item.card } }
      />
    </>
  );
};

const styles = StyleSheet.create( {
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginTop: 25,
  },
  pdf: {
    flex: 1,
    width: Dimensions.get( 'window' ).width,
    height: Dimensions.get( 'window' ).height,
    // marginTop:'0%'
  }
} );
