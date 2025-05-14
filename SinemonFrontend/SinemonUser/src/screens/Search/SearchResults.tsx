import { useState, useEffect, ReactNode } from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  FlatList,
  Image,
} from "react-native";
import { images, COLORS, API, icons } from "../../constants";
import axios from "axios";
import * as APICALLS from "../../constants/API_CALLS";
import { ScreenWidth } from "react-native-elements/dist/helpers";
import Icon from 'react-native-vector-icons/MaterialIcons';
import SinemonDirectionsAPI from "./SinemonDirectionsAPI";
export const SearchResults = ( { route, navigation }: searchProp ) => {
  const [ page, setPage ] = useState( {
    next: null,
    previous: null,
    current: null,
  } as any );
  const [ providers, setProviders ] = useState( [] as any[] );
  const [ fproviders, setFProviders ] = useState( [] as any[] );
  const [ zipcodes, setZipcodes ] = useState( [] as any[] );
  const [ distances, setDistances ] = useState( [ {} ] );
  const [ city, setCity ] = useState( route.params.location.city as string );
  console.log(route.params.location.city as string);

  const { openDirections, handleCalculateDistance } = SinemonDirectionsAPI();

  const infiniteScroll = async () => {
    if ( !isRefreshing ) {
      setTimeout( async () => {
        if ( page.next != null ) {
          await getProvs();
        }
      }, 1000 );
      setRefresh( true );
    }
  };

  async function getUrl () {
    if ( page.current == null ) {
      return `${ API.MDSENSEBASE_URI }listproviders/?city=${ city }`;
    } else if ( page.next != null ) {
      return page.next;
    } else if ( page.next == null && page.current != null ) {
      return "no more providers";
    }
  }

  const getProvs = async function () {
    const url = await getUrl();
    if ( url != "no more providers" ) {
      var arrayUniqueByKey = [];
      const k = "zipcode";
      await axios( {
        method: "get",
        url: url, //`&page=2`,
        headers: {
          "Content-Type":
            "application/json;charset=UTF-8;application/x-www-form-urlencoded",
          "Access-Control-Allow-Origin": "*",
          Accept: "application/json",
          // 'Origin':'http://localhost:19002/'
        },
      } )
        .then( ( response ) => {
          if ( response.status == 200 ) {
            if ( providers.length != undefined && providers.length > 0 ) {
              const nproviders = response.data.results;
              nproviders.map( ( item: object ) => {
                providers.push( item );
              } );
              setProviders( providers );
              setFProviders( providers );
              arrayUniqueByKey = [
                ...new Map(
                  providers.map( ( item: any ) => [
                    item[ k ],
                    {
                      label: item.lobby_zipcode,
                      value: item.lobby_zipcode,
                    },
                  ] )
                ).values(),
              ].filter( ( value ) => value.value != "NA" ) as object[];
              setZipcodes( arrayUniqueByKey );
            } else {
              // console.log( response.data.results );
              setProviders( response.data.results );
              setFProviders( response.data.results );
              const arrayUniqueByKey = [
                ...new Map(
                  response.data.results.map( ( item: any ) => [
                    item[ k ],
                    {
                      label: item.lobby_zipcode,
                      value: item.lobby_zipcode,
                    },
                  ] )
                ).values(),
              ].filter( ( value: any ) => value.value != "NA" ) as object[];
              setZipcodes( arrayUniqueByKey );
            }

            setCity( response.data.results[ 0 ].lobby_city );
            setPage( {
              next: response.data.next,
              previous: response.data.previous,
              current: url,
            } as object );
            setRefresh( false );
          }
        } )
        .catch( ( error ) => {
          // Error
          if ( error.response ) {
            // The request was made and the server responded with a status code
            // that falls out of the range of 2xx
            console.log( error.response.data );
            console.log( error.response.status );
            console.log( error.response.headers );
          } else if ( error.request ) {
            //console.log( error.request );
          } else {
            // Something happened in setting up the request that triggered an Error
            //console.log( "Error", error.message );
          }
          //console.log( error.config );
        } );
    } else {
      return "no more providers";
    }
  };

  useEffect( () => {
    getProvs();
  }, [] );

  // NOT USING
  // function setBadgeColor(badge: object) {
  // 	if (badge != undefined || badge != 'NA' || badge != null) {
  // 		switch (badge.badge.toUpperCase()) {
  // 			case 'BRONZE': return '#cd7f32';
  // 			case 'SILVER': return 'silver';
  // 			case 'GOLD': return 'gold';
  // 			default: return 'black';
  // 		}
  // 	}
  // 	else {
  // 		return 'black';
  // 	}
  // }
  function getPic ( pic: string ) {
    if ( pic == undefined || pic == null ) {
      return images.wdoctor1;
    } else {
      return { uri: pic };
    }
  }

  const getProfile = async ( item: any ) => {
    const response = await APICALLS.getProvider( item.prov as number );
    // console.log(response?.data, "RESP");
    const provData: ProviderHealthRecord = {
      Provider: response?.data?.Provider === undefined ? undefined : response?.data?.Provider[ 0 ] ?? {}
      , RenderingProvider: response?.data?.RenderingProvider === undefined ? undefined : response?.data?.RenderingProvider[ 0 ] ?? {}
      , QueueConfig: response?.data?.QueueConfig === undefined ? undefined : response?.data?.QueueConfig[ 0 ] ?? {}
      , License: response?.data?.License ?? []
      , Actions: response?.data?.Actions ?? []
      , Probations: response?.data?.Probations ?? []
      , Convictions: response?.data?.Convictions ?? []
      , Accusations: response?.data?.Accusations ?? []
      , Malpractices: response?.data?.Malpractices ?? []
      , Arbitrations: response?.data?.Arbitrations ?? []
      , Citations: response?.data?.Citations ?? []
      , Patientvisit: response?.data?.Patientvisit ?? []
      , Number_negatives_v: response?.data?.Number_negatives_v ?? []
      , Number_of_negatives: response?.data?.Number_of_negatives ?? []
    };
    navigation.navigate( "PProfile", { provider: provData } );
  };

  function returnEmpty ( num: number ) {

    if ( num === 0 ) {
      return <Text style={ { fontSize: ( 12 / 375 ) * ScreenWidth } }> Empty</Text>;
    }
    return <Text style={ { fontSize: ( 12 / 375 ) * ScreenWidth } }>: { num }</Text>;
  };

  function returnTime ( num: number ) {
    if ( num < 60 ) {
      return num + ' minutes';
    }
    else {
      var hrs = Math.floor( num / 60 );
      var mins = ( ( num / 60 ) - hrs ) * 60;
      if ( hrs <= 1 ) {
        var hr = hrs + ' hour';
      }
      else {
        var hr = hrs + ' hours';
      }
      if ( mins <= 1 ) {
        var min = hrs + ' min';
      }
      else {
        var min = hrs + ' mins';
      }
      return hr + ' ' + min;
    }
  }
  function Item ( { item }: any ) {
    //console.log(item);

    if ( item?.prov !== undefined ) {
      //console.log(providers);

      return (
        <View>
          <TouchableOpacity onPress={ () => getProfile( item ) }>
            <View style={ { ...styles.listItem } }>
              <View
                style={ {
                  flexDirection: "column",
                  alignItems: "center",
                  // marginLeft: -10,
                  width: '35%',
                } }
              >
                <Text
                  style={ {
                    fontSize: ( 14 / 375 ) * ScreenWidth,
                    color: COLORS.primary,
                    alignSelf: "center",
                    textAlign: "left",
                    marginTop: 5,
                  } }
                >
                  { item.salutation } { item.preferred_name ?? item.prov_firstname + ' ' + item.prov_lastname }
                </Text>
              </View>

              <View
                style={ {
                  height: 70,
                  width: "25%",
                  justifyContent: "center",
                  alignSelf: "center",
                  paddingTop: 10,
                  marginHorizontal: 10

                } }
              >
                {
                  ( item.status === 'A' ) ?
                    <><Text style={ { width: '100%', fontSize: ( 14 / 375 ) * ScreenWidth, color: COLORS.primary, backgroundColor: 'lightgreen' } }>Queue{ returnEmpty( item.inqueue as number ) }</Text>
                      <Text style={ { width: '100%', fontSize: ( 12 / 375 ) * ScreenWidth, color: COLORS.primary, backgroundColor: 'lightgreen' } }>Est. Wait: { returnTime( item.est_wait_time as number ) }</Text></>
                    :
                    <Text style={ { width: '100%', fontSize: ( 14 / 375 ) * ScreenWidth, color: COLORS.primary, backgroundColor: 'lightgreen' } }>Queue: Closed</Text>
                }

                <Text style={ { width: '100%', fontSize: ( 14 / 375 ) * ScreenWidth, color: COLORS.primary, backgroundColor: 'cornsilk' } }>In network</Text>
              </View>
              <View
                style={ {
                  height: 70,
                  width: "40%",
                  justifyContent: "center",
                  alignSelf: "center",
                  marginRight: 10,
                  paddingLeft: 0,
                  paddingTop: 10,
                } }
              >
                <Text style={ { fontSize: ( 12 / 375 ) * ScreenWidth, color: COLORS.primary } }>{ item.specialty_code }</Text>
                <Text style={ { fontSize: ( 14 / 375 ) * ScreenWidth, color: COLORS.primary } }>{ item.prov_taxonomy_code }</Text>
                {/* <Text style={{ fontSize:(12/375)*ScreenWidth,color:COLORS.primary }}>Allergy & Immunology</Text> */ }
                <Icon name='place' color={ COLORS.neutral } size={ ( 25 / 375 ) * ScreenWidth } style={ { justifyContent: 'flex-end', alignSelf: 'flex-end', marginLeft: 2 } } onPress={ openDirections } />
                <Text onPress={ handleCalculateDistance } style={ { fontSize: ( 10 / 375 ) * ScreenWidth, color: COLORS.primary, justifyContent: 'flex-end', alignSelf: 'flex-end', marginLeft: 2 } }>23 mi</Text>
              </View>
            </View>
          </TouchableOpacity>
        </View>
      );
    } else {
      return (
        <TouchableOpacity>
          <View style={ styles.listItem }></View>
        </TouchableOpacity>
      );
    }
  }

  const [ key, setKey ] = useState( { value: city, key: "All" } );
  const [ isRefreshing, setRefresh ] = useState( false );

  function filter ( value: string ) {
    setKey( { value: value, key: value } );
    if ( value != city ) {
      const a = providers
        .map( ( obj: any ) => {
          if ( obj.lobby_zipcode == value ) {
            return obj;
          }
        } )
        .filter( ( val ) => val != undefined ) as object[];
      setFProviders( a );
    } else {
      const a = providers
        .map( ( obj: any ) => {
          if ( obj.provider.user.city == value ) {
            return obj;
          }
        } )
        .filter( ( val ) => val != undefined ) as object[];
      setFProviders( a );
    }
  }

  return (
    <View style={ styles.container }>
      <View style={ { flex: 1, justifyContent: "center" } }>
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
          // ListHeaderComponent={
          //   <>
          //     <View
          //       style={{
          //         width: "35%",
          //         height: 55,
          //         borderRadius: 10,
          //         marginTop: 15,
          //         marginRight: 15,
          //         marginLeft: "60%",
          //       }}
          //     ></View>
          //   </>
          // }
          style={ { alignSelf: "center", width: "100%" } }
          data={ fproviders }
          keyExtractor={ ( item, index ) => index.toString() }
          renderItem={ ( { item } ) => <Item item={ item } /> }
          onScrollEndDrag={ () => infiniteScroll() }
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create( {
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
    width: "100%",
  },
  listItem: {
    marginBottom: 20,
    marginTop: 10,
    backgroundColor: COLORS.white,
    alignSelf: "center",
    flexDirection: "row",
    borderRadius: 5,
    width: "95%",
    height: ( 100 / 375 ) * ScreenWidth,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 0.1,
    shadowColor: "#000",
    shadowOffset: {
      width: 1,
      height: 1,
    },
    shadowOpacity: 0.34,
    shadowRadius: 3.27,
    elevation: 10,
    paddingHorizontal: 10,
    paddingVertical: 20,
  },
} );

const pickerSelectStyles = StyleSheet.create( {
  inputIOS: {
    fontSize: 12,
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderWidth: 2,
    borderColor: "gold",
    borderRadius: 4,
    color: "black",
    paddingRight: 30,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 5,
  },
  inputAndroid: {
    fontSize: 16,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderWidth: 0.5,
    borderColor: "purple",
    borderRadius: 8,
    color: "black",
    paddingRight: 30,
  },
} );
const clubpickerSelectStyles = StyleSheet.create( {
  inputIOS: {
    fontSize: 15,
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderWidth: 2,
    borderColor: "grey",
    borderRadius: 100,
    color: "black",
    paddingRight: 30,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 5,
  },
  inputAndroid: {
    fontSize: 16,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderWidth: 0.5,
    borderColor: "purple",
    borderRadius: 8,
    color: "black",
    paddingRight: 30,
  },
} );
