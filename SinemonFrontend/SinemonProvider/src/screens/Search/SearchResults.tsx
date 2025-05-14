
import { useState, useEffect, ReactNode } from 'react';
import {
  StyleSheet,
  View,
  Image,
  Text,
  TouchableOpacity,
  FlatList,
  Dimensions
} from 'react-native';
// import _, {  } from 'lodash';
import { images, icons, COLORS, API } from '../../constants';

// import RNPickerSelect, {Item} from 'react-native-picker-select';
// import {Picker} from '@react-native-picker/picker';

import { ImageBackground } from 'react-native';
import axios, { AxiosResponse } from 'axios';
// import http from 'axios/lib/adapters/http';
import * as APICALLS from './../../constants/API_CALLS';

import { useAppSelector } from '../../state/App/hooks';
import { ScreenWidth } from 'react-native-elements/dist/helpers';



export const SearchResults = ( { route, navigation }: searchProp ) => {

  //console.log(route.params);

  const myid = useAppSelector( ( state ) => state.user.myid );




  const [ page, setPage ] = useState( { next: null, previous: null, current: null } as object );
  const [ members, setMembers ] = useState( [] as object[] );
  const [ run, setRun ] = useState( 0 );

  const [ fmembers, setFMembers ] = useState( [] as object[] );
  const [ zipcodes, setZipcodes ] = useState( [] as object[] );
  const [ distances, setDistances ] = useState( [ {} ] );

  // const [date, setDate] = useState(route.params.date);

  //console.log('THE DATE', `${API.MDSENSEBASE_URI}members/?date=${date}`);


  const infiniteScroll = async () => {
    // End of the document reached?
    // setRefresh(true);
    if ( !isRefreshing ) {
      setTimeout( async () => {
        if ( page.next != null ) { await getMembers(); }
      }, 1000 );
      setRefresh( true );
    }
  };

  async function getUrl () {

    if ( page.current == null ) {

      return `${ API.MDSENSEBASE_URI }members/?date=${ undefined }`;

    } else if ( page.next != null ) {
      return page.next;
    } else if ( page.next == null && page.current != null ) {
      return 'no more members';
    }
  }

  const getMembers = async function () {
    const url = await getUrl();
    if ( url != 'no more members' ) {
      var arrayUniqueByKey = [];
      const k = 'zipcode';
      await axios( {
        method: 'get',
        url: url,//`&page=2`,
        headers: {
          'Content-Type': 'application/json;charset=UTF-8;application/x-www-form-urlencoded',
          "Access-Control-Allow-Origin": "*",
          'Accept': 'application/json',
          // 'Origin':'http://localhost:19002/'
        },
      } ).then( ( response ) => {
        if ( response.status == 200 ) {
          setRun( 1 );

          if ( members.length != undefined && members.length > 0 ) {
            const nmembers = response.data.results;
            nmembers.map( ( item: object ) => {
              members.push( item );
            } );
            setMembers( members );
            setFMembers( members );
            arrayUniqueByKey = [ ...new Map( members.map( ( item: object ) =>
              [ item.member.member.user[ k ], { label: item.member.member.user.zipcode, value: item.member.member.user.zipcode } ] ) ).values() ].filter( ( value ) => value.value != 'NA' ) as object[];
            setZipcodes( arrayUniqueByKey );
          } else {
            setMembers( response.data.results );
            setFMembers( response.data.results );
            const arrayUniqueByKey = [ ...new Map( response.data.results.map( ( item: object ) =>
              [ item.member.member.user[ k ], { label: item.member.member.user.zipcode, value: item.member.member.user.zipcode } ] ) ).values() ].filter( ( value ) => value.value != 'NA' ) as object[];
            setZipcodes( arrayUniqueByKey );
          }
          //console.log(response.data);

          // setDate(response.data.results[0].member.member.user.date);
          setPage( { next: response.data.next, previous: response.data.previous, current: url } as object );
          setRefresh( false );
        }
      } ).catch( ( error ) => {
        // Error
        if ( error.response ) {
          // The request was made and the server responded with a status code
          // that falls out of the range of 2xx
          //console.log( error.response.data );
          //console.log( error.response.status );
          //console.log( error.response.headers );
        } else if ( error.request ) {

          //console.log( error.request );
        } else {
          // Something happened in setting up the request that triggered an Error
          //console.log( 'Error', error.message );
        }
        //console.log( error.config );
      } );
    }
    else {
      return 'no more members';
    }

  };

  useEffect( () => {

    getMembers();



  }, [] );




  const getProfile = async ( item: object ) => {
    //console.log(item.member_id);
    var response = undefined;
    try {

      response = await APICALLS.getMember( item.member.member_id, myid );

      //console.log(response, 'RESP');
      // navigation.navigate("MProfile",{member: response?.data})
      // if (response === 'rqa') {
      //console.log(response, 'rqa');
      //   fmembers.filter(x=> x.member_id === item.member_id)[0].access='rqa';
      //   const fms = fmembers;
      //   setFMembers(fms);
      //   //console.log(fmembers.filter(x=> x.access === 'rqa')[0])
      // }
    } catch ( error ) {

      //console.log( error );

    };
    if ( response !== undefined && response !== 'rqa' ) {
      navigation.navigate( "MProfile", { member: response?.data } );
      return 'success';
    };
    return response;
  };

  function getIcon ( item: boolean ) {

    if ( item === false ) {
      return (
        <>
          <ImageBackground source={ icons.locktransp } style={ { width: ( 40 / 375 ) * ScreenWidth, height: ( 40 / 375 ) * ScreenWidth, borderRadius: 30 } } />
          <Text style={ { fontSize: ( 14 / 375 ) * ScreenWidth, color: COLORS.primary } }>Request</Text>
          <Text style={ { fontSize: ( 14 / 375 ) * ScreenWidth, color: COLORS.primary } }>Access</Text>
        </>
      );
    } else {
      return (
        <ImageBackground source={ icons.unlocktransp } style={ { width: ( 20 / 375 ) * ScreenWidth, height: ( 20 / 375 ) * ScreenWidth, borderRadius: 30 } } />
      );
    }
  }
  // Render
  function Item ( { item }: any ) {

    //console.log(item);
    if ( item?.member?.member?.user !== undefined ) {
      return (
        <View>

          <View style={ styles.listItem }>
            <TouchableOpacity onPress={ () => getProfile( item ) }></TouchableOpacity>
            <TouchableOpacity onPress={ () => getProfile( item ) } >
              <View style={ { flexDirection: 'column', alignItems: 'center', marginLeft: -10, width: ( 175 / 375 ) * ScreenWidth } }>
                {/* <ImageBackground source={getPic(item.member.user.icon)}  style={{width:70, height:70,borderRadius:30,  borderColor:setBadgeColor(item.badge), borderWidth:5, backgroundColor:setBadgeColor(item.badge)}} borderRadius={30}  /> */ }
                {/* <View style={{position: 'absolute',top: 0,left: 85,right: 0,bottom: 15, backgroundColor:item.color, height:20, width:40, borderRadius:100, justifyContent:'center', alignItems:'center'}}><Text style={{color:"black", position:'absolute', textAlign:'center'}}>20%</Text></View> */ }
                <Text style={ { fontSize: ( 14 / 375 ) * ScreenWidth, color: COLORS.primary, alignSelf: 'center', textAlign: 'left', marginTop: 5 } }>{ item.member.member.user.last_name }, { item.member.member.user.first_name.substring( 0, 1 ) }.</Text>
              </View>

              {/* <View style={{height:70,width:'30%', justifyContent:"center",alignSelf:'center', paddingTop:35, marginLeft:-25}}>
            <Text style={{color:COLORS.primary}}>Queue: {3}</Text>
            <Text style={{color:COLORS.primary}}>In network</Text>
          </View>
        */}
            </TouchableOpacity>
            <TouchableOpacity >
              {/* <Text style={{color:COLORS.primary}}>{String(item?.viewable)}</Text> */ }
              { getIcon( item?.viewable ) }
            </TouchableOpacity>
          </View>
        </View>
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

  // const [key, setKey] = useState({value:date, key:'All'});
  const [ isRefreshing, setRefresh ] = useState( false );

  function filter ( value: string ) {
    //console.log(members)
    setKey( { value: value, key: value } );
    if ( value != date ) {
      const a = members.map( ( obj: object ) => {
        if ( obj.member.user.zipcode == value ) {
          return obj;
        }
      } ).filter( ( val ) => val != undefined ) as object[];
      setFMembers( a );
    } else {

      const a = members.map( ( obj: object ) => {
        if ( obj.member.user.date == value ) {
          return obj;
        }
      } ).filter( ( val ) => val != undefined ) as object[];
      setFMembers( a );
    }
  };


  //console.log(fmembers.filter(x=> x.access === 'rqa')[0])
  return (


    <View style={ { ...styles.container } }>
      <View style={ { flex: 1, justifyContent: 'center' } }>
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
          //  ListHeaderComponent={
          //   <>
          //    {/* <View style={{width:'35%', height:55,borderRadius:10, marginTop:15, marginRight:15 , marginLeft:'60%'}}></View> */}
          //   </>}
          style={ { alignSelf: 'center', width: '100%', paddingBottom: 10, marginBottom: 10 } }
          data={ fmembers }
          keyExtractor={ ( item, index ) => index.toString() }
          renderItem={ ( { item } ) => <Item item={ item } /> }
          // onRefresh={() => infiniteScroll()}
          // refreshing={isRefreshing}
          onScrollEndDrag={ () => infiniteScroll() }
        // snapToEnd={true}
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
    width: "88%",
    height: `${ ( 40 / 375 ) * ScreenWidth }%`,
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
    borderColor: 'gold',
    borderRadius: 4,
    color: 'black',
    paddingRight: 30, // to ensure the text is never behind the icon
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
    paddingRight: 30, // to ensure the text is never behind the icon
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
    paddingRight: 30, // to ensure the text is never behind the icon
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
    paddingRight: 30, // to ensure the text is never behind the icon
  },
} );
