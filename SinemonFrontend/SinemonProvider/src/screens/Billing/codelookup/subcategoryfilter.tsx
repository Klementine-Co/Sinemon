import React, { useState, useEffect } from 'react';
import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  View,
  FlatList,
  TextInput,
  Image,
  TouchableOpacity,
} from 'react-native';
import { ScreenWidth } from 'react-native-elements/dist/helpers';
import { icons } from '../../../constants';
import * as API from '../../../constants/API_CALLS';
import * as ACTIONS from '../../../state/App/actions';

const SubCategoryFilter = ( { route, navigation }: homeProp ) => {

  const CATEGORIES: {
    cat_desc: string;
    cat: string;
  }[] | {
    cat: string;
  }[] | undefined = route.params.filterdata;

  const { pos, type } = route.params;




  //console.log('SUB CATS', CATEGORIES?.map(x=> x.cat));
  const DATA = [ ...new Set( CATEGORIES?.map( x => x.cat ) ) ];
  // const DATA = CATEGORIES?.map(x=> x.cat);
  //   //console.log(DATA);

  // //   const DATA = [{title: 'lorumn ipsum', key:1}, {title: 'lorumn ispum', key:2}];
  //   const [searchText, onChangeSearch] = useState<string | undefined>(undefined);
  const [ selectedText, SetSelected ] = useState<any>( undefined );
  //   const [filteredData, setFilteredData] = useState<{
  //     cat_desc: string;
  //     cat: string;
  // }[]>();

  // useEffect(() => {

  //   if (selectedText !== undefined) {
  //console.log(selectedText, 'Selected');

  //     SetSelected(undefined);
  //   }

  // }, [selectedText]);


  const getCodes = async ( item: string ) => {

    // SetSelected(item);
    if ( type === 'procedures' ) {
      var response = await API.getPcodes( item );
    } else if ( type === 'diagnoses' ) {
      var response = await API.getDcodes( item );
    }
    // else if (type === 'modifiers'){
    //   var response = await API.getMcodes(item);
    // }else if (type === 'placesofservice'){
    //   var response = await API.getPOScodes(item);
    // }

    navigation.navigate( "Services", { SERVICES: response?.data, pos: pos, type: type } );
    //console.log(response?.data);
    //  SetSelected(response?.data);


  };

  const Item = ( item: string ) => {
    return ( <View style={ styles.item }>
      <TouchableOpacity onPress={ () => getCodes( item ) }>
        {/* <Text style={{fontSize: 16}}>{item.code}</Text> */ }
        <Text style={ styles.title }>{ item }</Text>
      </TouchableOpacity>
    </View> );
  };

  const renderItem = ( { item } ) => Item( item );

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

      <FlatList

        data={ DATA }
        renderItem={ renderItem }
        keyExtractor={ ( item, index ) => String( index ) }
      />

      <Text>
        {/* {selectedText} */ }
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

export default SubCategoryFilter;