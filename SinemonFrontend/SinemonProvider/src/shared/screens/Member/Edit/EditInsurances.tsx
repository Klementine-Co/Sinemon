
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


const EditInsurances = ( { navigation, route, insurances, Insurance } ) => {




  const [ page, setPage ] = useState( { next: null, previous: null, current: null } );
  const [ providers, setProviders ] = useState( [] );
  const [ fproviders, setFProviders ] = useState( [] );
  const [ zipcodes, setZipcodes ] = useState( [] );
  const [ distances, setDistances ] = useState( [ {} ] );
  const [ city, setCity ] = useState( 'sort' );
  const [ medinsurances, setPrescriptions ] = useState( insurances );
  const [ visible, setVisible ] = useState<string | undefined>( undefined );
  const [ insur, setInsurance ] = useState( undefined );




  useEffect( () => {




  }, [] );



  function Item ( item ) {

    //console.log( item, 'IN ITEM' );

    if ( item?.id_member != undefined ) {
      return (
        <>
          <View style={ { flexDirection: "row" } }>
            <Text style={ { padding: 10 } }>
              delete
            </Text>
          </View>
          <TouchableOpacity onPress={ () => { } } >
            <View style={ styles.listItem }>
              <View style={ { flexDirection: 'column', alignItems: 'flex-start', width: '30%' } }>
                <View  >
                  <View  >
                    <View  >
                      <View  >
                        <Text  >{ item.title }</Text>
                        <Text  >
                          { item.insurer }
                        </Text>
                      </View>
                      <View  >
                        <View  >
                          <Text  >
                            Member ID: { item.id_member }
                          </Text>
                          { item?.benefit_plan && (
                            <Text  >
                              { item.benefit_plan }
                            </Text>
                          ) }
                        </View>

                        { item?.group_no && ( <Text  >
                          Grp No: { item.group_no }
                        </Text> ) }
                      </View>
                    </View>

                    <View  >
                      { item?.rxbin && ( <Text  >
                        RXBIN: { item.rxbin }
                      </Text> ) }
                      { item?.rxgrp && ( <Text  >
                        RXGRP: { item.rxgrp }
                      </Text> ) }
                    </View>

                    <View  >
                      { item?.rxpcn && ( <Text  >
                        RXPCN: { item.rxpcn }
                      </Text> ) }

                    </View>


                  </View>
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



  const EditingInsurance = () => {


    return (
      <View style={ { flex: 1, height: '100%', width: '100%' } } >
        <TouchableOpacity onPress={ () => setVisible( 'medical' ) } style={ {} }>
          <Text style={ { fontSize: 20, textAlign: 'left' } }>Add Med Insurance</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={ () => setVisible( 'rx' ) } style={ {} }>
          <Text style={ { fontSize: 20, textAlign: 'left' } }>Add RX Insurance</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={ () => setVisible( 'rx discount' ) } style={ {} }>
          <Text style={ { fontSize: 20, textAlign: 'left' } }>Add RX Discount Insurance</Text>
        </TouchableOpacity>
        <FlatList
          pagingEnabled={ false }
          style={ { width: '100%' } }
          snapToAlignment={ 'center' }
          decelerationRate='fast'
          // snapToAlignment={"start"}
          // vertical
          showsVerticalScrollIndicator={ false }
          data={ insurances }
          keyExtractor={ item => item.uploaded.toString() }
          renderItem={ ( { item } ) => Item( item ) }
        />

      </View>
    );
  };



  return (

    <>
      {

        ( visible === undefined ) ? ( <EditingInsurance /> ) : ( <Insurance title={ visible } /> )

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
export default EditInsurances;
