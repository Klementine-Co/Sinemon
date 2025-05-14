
import { useState, useEffect } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  FlatList
} from 'react-native';

// import _, {  } from 'lodash';
import { images, COLORS, API } from '../../../constants';


import axios from 'axios';
import ServiceForm from './serviceform';
import DxForm from './dxform';

import { useAppSelector } from '../../../state/App/hooks';
import { Input } from '@rneui/themed';
import { ScreenWidth } from 'react-native-elements/dist/helpers';


const Claim = ( { route, navigation }: any ) => {

  const rendering = useAppSelector( ( state ) => state.user.mydata.Provider );
  const claim = useAppSelector( ( state ) => state.claim );
  const [ visible, setVisible ] = useState( true );
  //console.log(claim);




  useEffect( () => {

  }, [] );



  function PxItem ( { item }: { item: ServiceItem; } ) {


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
          <TouchableOpacity onPress={ () => { } } >
            <View style={ styles.listItem }>


              <View style={ { flexDirection: 'column', width: '35%' } }>
                {/* <View style={{position: 'absolute',top: 0,left: 85,right: 0,bottom: 15, backgroundColor:item.color, height:20, width:40, borderRadius:100, justifyContent:'center', alignItems:'center'}}><Text style={{color:"black", position:'absolute', textAlign:'center'}}>20%</Text></View> */ }
                <Text style={ { fontSize: ( 16 / 375 ) * ScreenWidth, color: COLORS.primary, textAlign: 'left', marginTop: 5 } }>Ref: { item.ref }</Text>
                <Text style={ { fontSize: ( 16 / 375 ) * ScreenWidth, color: COLORS.primary, textAlign: 'left', marginTop: 5 } }>Code: { item.service.code }</Text>
                <Text style={ { fontSize: ( 16 / 375 ) * ScreenWidth, color: COLORS.primary, textAlign: 'left', marginTop: 5 } }>Desc: { item.service.desc }</Text>
              </View>



              <View style={ { width: '65%', justifyContent: "flex-end", alignSelf: 'flex-end' } }>
                {
                  item.modifiers.map( ( x, index ) =>

                  (
                    <View style={ { flexDirection: 'column', } } key={ x.ref }>
                      <Text style={ { fontSize: ( 16 / 375 ) * ScreenWidth, color: COLORS.primary } }>
                        Modifier { x.ref }
                      </Text>
                      {/* <Text style={{color:COLORS.primary}}>
                    Code: {x.code}
                  </Text> */}
                      <Text style={ { fontSize: ( 16 / 375 ) * ScreenWidth, color: COLORS.primary, textAlign: 'left' } }>
                        Desc: { x.desc }
                      </Text>
                    </View>
                  )
                  )
                }
                <View style={ { marginTop: 10 } }>

                  <Text style={ { fontSize: ( 16 / 375 ) * ScreenWidth, color: COLORS.primary } }>From Date: { String( item.service.fromdate.toDateString() ) } </Text>
                  <Text style={ { fontSize: ( 16 / 375 ) * ScreenWidth, color: COLORS.primary } }>To Date: { String( item.service.todate.toDateString() ) } </Text>
                  <Text style={ { fontSize: ( 16 / 375 ) * ScreenWidth, color: COLORS.primary } }>Place of Service: { item.service.place_of_service }</Text>
                </View>
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

  };
  const DxItem = ( { item }: { item: Diagnosis; } ) => (

    <View style={ styles.item }>
      {/* <Text>{item.desc}</Text> */ }
      {/* <Text style={[styles.label, styles.labelStyle]}>{item.desc}</Text> */ }
      <Input
        // label={item.desc}
        disabled={ true }
        value={ item.code }
        placeholder={ item.desc }
        // errorMessage={errorMessage}
        // secureTextEntry={visible}
        // onChangeText={value => onChangeText('service', value)}
        style={ { fontSize: ( 16 / 375 ) * ScreenWidth } }
        containerStyle={ { height: ( 40 / 375 ) * ScreenWidth, width: '100%', paddingHorizontal: 10 } }
      // labelStyle={styles.labelStyle} 
      // autoCompleteType={ undefined }
      />
    </View>
  )
    ;



  const DisplayClaim = () => {

    return (
      <>
        <View style={ styles.container }>
          <View >
            {/* <View style={{flex:1, justifyContent:'center'}}> */ }

            <FlatList
              //  ListHeaderComponent={
              //   <>
              //    <View style={{width:'35%', height:55,borderRadius:10, marginTop:15, marginRight:15 , marginLeft:'60%'}}>
              //     </View>
              //   </>}
              style={ { alignSelf: 'center', width: '100%', maxHeight: '60%', minHeight: '40%' } }
              data={ claim.serviceitems }
              keyExtractor={ ( item, index ) => item.ref.toString() }
              renderItem={ ( { item } ) => <PxItem item={ item } /> }
            // onScrollEndDrag={() => infiniteScroll()}
            />
            <FlatList
              ListHeaderComponent={
                <>
                  <View style={ { marginTop: 0 } }>
                    <Text style={ { ...styles.labelStyle, fontSize: ( 18 / 375 ) * ScreenWidth, color: 'grey' } }>ICD-10-CM Diagnosis Codes</Text>
                  </View>
                </> }
              style={ { paddingTop: 40 } }
              scrollEnabled={ false }
              numColumns={ 3 }
              data={ claim.diagnoses }
              keyExtractor={ ( item, index ) => item.ref.toString() }
              renderItem={ ( { item } ) => <DxItem item={ item } /> }
            // onScrollEndDrag={() => infiniteScroll()}
            />
          </View>

        </View>

        <TouchableOpacity style={ { marginBottom: 30, backgroundColor: 'indianred', height: ( 40 / 375 ) * ScreenWidth, width: '70%', alignSelf: 'center', alignItems: 'center', justifyContent: 'center' } }>
          <Text style={ { fontSize: ( 20 / 375 ) * ScreenWidth, } }>Bill</Text>
        </TouchableOpacity>
      </>
    );
  };



  return (



    ( <DisplayClaim /> )





  );



};

const styles = StyleSheet.create( {
  container: {
    backgroundColor: "#fff",
    marginTop: 14,
    flex: 1
  },

  containerStyle: {
    paddingHorizontal: 0,
  },

  labelStyle: {
    fontWeight: "400",
    // marginTop:10
  },

  icon: {
    position: 'absolute',
    paddingHorizontal: 8,
    paddingVertical: 4,
    top: 25,
    right: 0
  },
  item: {
    backgroundColor: 'lightgray',
    padding: 0,
    flex: 1,
    margin: ( 5 / 375 ) * ScreenWidth,
  },
  label: { color: "#86939e", fontSize: ( 16 / 375 ) * ScreenWidth, fontWeight: "400", },
  input: { height: ( 40 / 375 ) * ScreenWidth, justifyContent: "center", color: "black" },
  text: { fontSize: ( 16 / 375 ) * ScreenWidth, color: "black" },
  error: { color: "#ff190c", fontSize: ( 12 / 375 ) * ScreenWidth, },
  datecontainer: {
    backgroundColor: "#fff",
    marginTop: 0,
    marginHorizontal: 10,
    marginBottom: 0,
    borderBottomWidth: 1,
    borderColor: '#86939e',
    height: ( 60 / 375 ) * ScreenWidth,
    width: "50%"
  },
  listItem: {


    flex: 1,
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
export default Claim;
