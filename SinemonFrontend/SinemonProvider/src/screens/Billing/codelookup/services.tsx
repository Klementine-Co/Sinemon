import React, { useState, useEffect } from 'react';
import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  View,
  FlatList,
  TextInput,
  TouchableOpacity,
  Image,
} from 'react-native';
import { ScreenWidth } from 'react-native-elements/dist/helpers';
import { icons } from '../../../constants';

import * as ACTIONS from '../../../state/App/actions';
import { useAppDispatch, useAppSelector } from '../../../state/App/hooks';


const Services = ( { route, navigation }: homeProp ) => {

  //console.log('SERVICES', route.params);
  const dispatch = useAppDispatch();
  const { pos, type } = route.params;
  const SERVICES: {
    code: string;
    desc: string;
  }[] | undefined = route.params.SERVICES;



  //   const DATA = [{title: 'lorumn ipsum', key:1}, {title: 'lorumn ispum', key:2}];
  const [ searchText, onChangeSearch ] = useState<string | undefined>( undefined );
  const [ selectedText, SetSelected ] = useState<string | undefined>( undefined );
  const [ filteredData, setFilteredData ] = useState<{ code: string; desc: string; }[]>();

  useEffect( () => {
    const filtered = SERVICES?.filter( item =>
      ( item.desc.toLowerCase().replace( /\W+/g, '' ).includes( String( searchText?.toLowerCase().replace( /\W+/g, '' ) ) ) || item.code.toLowerCase().replace( /\W+/g, '' ).includes( String( searchText?.toLowerCase().replace( /\W+/g, '' ) ) ) ),
    );
    if ( searchText === undefined ) {
      return setFilteredData( SERVICES );
    }
    setFilteredData( filtered );
  }, [ searchText ] );

  function setCode_ ( pos: { serviceitemref: number, ref: number; }, code: string, desc: string ) {
    //console.log(pos, code, desc, type);

    if ( type === 'procedures' ) {
      dispatch( ACTIONS.setProcedure( { ref: pos.ref, code: code, desc: desc } ) );
      navigation.navigate( 'ServiceForm', { pos: pos?.serviceitemref } );
    } else if ( type === 'diagnoses' ) {
      dispatch( ACTIONS.setDiagnosis( { ref: pos.ref, code: code, desc: desc } ) );
      navigation.navigate( 'Billing' );
    } else if ( type === 'modifiers' ) {
      dispatch( ACTIONS.setModifier( { ref: pos.serviceitemref, modifier: { ref: pos.ref, code: code, desc: desc } } ) );
      navigation.navigate( 'ServiceForm', { pos: pos?.serviceitemref } );
    } else if ( type === 'placesofservice' ) {
      dispatch( ACTIONS.setPlaceofService( { ref: pos.serviceitemref, place_of_service: code } ) );
      navigation.navigate( 'ServiceForm', { pos: pos?.serviceitemref } );
    }
  };

  const Item = ( { item }: any ) => (
    //console.log(item),
    <View style={ styles.item }>
      <TouchableOpacity onPress={ () => setCode_( pos, item.code, item.desc ) }>
        <Text style={ { fontSize: ( 16 / 375 ) * ScreenWidth } }>{ item.code }</Text>
        <Text style={ styles.title }>{ item.desc }</Text>
      </TouchableOpacity>
    </View>
  );

  const renderItem = ( item: any ) => <Item { ...item } />;

  return (
    <SafeAreaView style={ styles.container }>
      <View style={ { flexDirection: "column", paddingBottom: 30 } }>
        <TouchableOpacity
          style={ { flexDirection: "row", alignItems: "center", flex: 1, marginTop: 80 } }
          onPress={ () => {
            navigation.goBack();
          } }
        >
          <Image
            source={ icons.back }
            style={ {
              width: ( 20 / 375 ) * ScreenWidth,
              height: ( 20 / 375 ) * ScreenWidth,
              // left: "10%",
            } }
          />
        </TouchableOpacity>
      </View>
      <TextInput
        style={ {
          height: ( 50 / 375 ) * ScreenWidth,
          borderColor: '#919191',
          borderWidth: 1,
          margin: 10,
          paddingLeft: 15,
          borderRadius: 10,
          fontSize: ( 16 / 375 ) * ScreenWidth
        } }
        onChangeText={ newText => onChangeSearch( newText ) }
        placeholder={ selectedText ?? "Axtaris..." }
      />
      <FlatList
        data={ filteredData }
        renderItem={ renderItem }
        keyExtractor={ ( { desc, code } ) => String( code ) }
      />

      <Text style={ { fontSize: ( 16 / 375 ) * ScreenWidth } }>
        { selectedText }
      </Text>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create( {
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
    marginBottom: 75,
  },
  item: {
    backgroundColor: '#ededed',
    padding: 20,
    marginVertical: 2,
    marginHorizontal: 10,
    borderRadius: 20,
  },
  title: {
    fontSize: ( 20 / 375 ) * ScreenWidth,
  },
} );

export default Services;