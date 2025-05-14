
import { useState, useEffect } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  FlatList
} from 'react-native';
import { ScreenWidth } from 'react-native-elements/dist/helpers';

// import _, {  } from 'lodash';
import { COLORS } from '../../../constants';
import { useAppSelector } from '../../../state/App/hooks';


const ServiceList = ( { startdate, navigation }: any ) => {

  const claim = useAppSelector( ( state ) => state.claim );
  var pos = 1;

  if ( claim.serviceitems.length > 0 ) {
    pos = claim.serviceitems.map( x => x.ref ).reduce( function ( x, y ) { return Math.max( x, y ); } ) + 1;
  };

  //console.log('POS', pos);
  //console.log('items', claim.serviceitems);


  const [ visible, setVisible ] = useState( true );

  useEffect( () => {

  }, [] );


  function goToForm ( serviceitem: ServiceItem | undefined, pos: number ) {
    navigation.navigate( 'ServiceForm', { serviceitem: serviceitem, pos: pos, startdate: startdate } );
  };


  function Item ( { item }: { item: ServiceItem; } ) {


    if ( item.ref != undefined ) {
      return (
        <>
          <View style={ { flexDirection: "row" } }>
            {/* <Text style={{padding:10}}>
          edit
          </Text> */}
            {/* <Text style={{padding:10}}>
          delete
          </Text> */}
          </View>
          <TouchableOpacity onPress={ () => { goToForm( item, item.ref ); } } >
            <View style={ styles.listItem }>


              <View style={ { flexDirection: 'column', alignItems: 'flex-start', width: '30%' } }>
                {/* <View style={{position: 'absolute',top: 0,left: 85,right: 0,bottom: 15, backgroundColor:item.color, height:20, width:40, borderRadius:100, justifyContent:'center', alignItems:'center'}}><Text style={{color:"black", position:'absolute', textAlign:'center'}}>20%</Text></View> */ }
                <Text style={ { fontSize: ( 16 / 375 ) * ScreenWidth, color: COLORS.primary, alignSelf: 'center', textAlign: 'left', marginTop: 5 } }>Ref: { item.ref }</Text>
                <Text style={ { fontSize: ( 16 / 375 ) * ScreenWidth, color: COLORS.primary, alignSelf: 'center', textAlign: 'left', marginTop: 5 } }>Code: { item.service.code }</Text>
                <Text style={ { fontSize: ( 16 / 375 ) * ScreenWidth, color: COLORS.primary, alignSelf: 'center', textAlign: 'left', marginTop: 5 } }>Desc: { item.service.desc }</Text>
              </View>



              <View style={ { height: ( 70 / 375 ) * ScreenWidth, width: '70%', justifyContent: "flex-end", alignSelf: 'flex-end' } }>
                <Text style={ { fontSize: ( 16 / 375 ) * ScreenWidth, color: COLORS.primary } }>From Date: { String( item.service.fromdate ) }</Text>
                <Text style={ { fontSize: ( 16 / 375 ) * ScreenWidth, color: COLORS.primary } }>To Date: { String( item.service.todate ) }</Text>
                <Text style={ { fontSize: ( 16 / 375 ) * ScreenWidth, color: COLORS.primary } }>Place of Service: { item.service.place_of_service }</Text>
              </View>

            </View>
          </TouchableOpacity>
        </>
      );
    } else {
      return (

        <TouchableOpacity  >
          <View style={ styles.listItem }>

          </View>
        </TouchableOpacity>
      );
    }

  }



  const EditingServices = () => {

    return (
      <View style={ styles.container }>
        <View style={ { flex: 0, justifyContent: 'center' } }>
          <TouchableOpacity onPress={ () => { goToForm( undefined, pos ); } } style={ {} }>
            <Text style={ { fontSize: ( 20 / 375 ) * ScreenWidth, textAlign: 'left' } }>Add Service</Text>
          </TouchableOpacity>
          <FlatList
            ListHeaderComponent={
              <>
                <View style={ { width: '35%', height: ( 55 / 375 ) * ScreenWidth, borderRadius: 10, marginTop: 15, marginRight: 15, marginLeft: '60%' } }>

                </View>
              </> }
            style={ { alignSelf: 'center', width: '100%' } }
            data={ claim.serviceitems }
            keyExtractor={ ( item, index ) => item.ref.toString() }
            renderItem={ ( { item } ) => <Item item={ item } /> }
          // onScrollEndDrag={() => infiniteScroll()}
          />
        </View>
      </View>
    );
  };



  return (

    <>
      {

        (
          <EditingServices />
        )

      }

    </>

  );



};

const styles = StyleSheet.create( {
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
    width: '100%'
  },
  listItem: {



    marginTop: 15,
    backgroundColor: "#FFF",

    alignSelf: "center",
    flexDirection: "row",
    borderRadius: 5,
    borderBottomWidth: 1,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center'

  }










} );

const pickerSelectStyles = StyleSheet.create( {
  inputIOS: {
    fontSize: 12,
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderWidth: 2,
    borderColor: 'gold',
    borderRadius: 4,
    color: 'black',
    paddingRight: 30,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 5

  },
  inputAndroid: {
    fontSize: 16,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderWidth: 0.5,
    borderColor: 'purple',
    borderRadius: 8,
    color: 'black',
    paddingRight: 30,
  },
} );
const clubpickerSelectStyles = StyleSheet.create( {
  inputIOS: {
    fontSize: 15,
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderWidth: 2,
    borderColor: 'grey',
    borderRadius: 100,
    color: 'black',
    paddingRight: 30,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 5

  },
  inputAndroid: {
    fontSize: 16,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderWidth: 0.5,
    borderColor: 'purple',
    borderRadius: 8,
    color: 'black',
    paddingRight: 30,
  },
} );
export default ServiceList;
