/**
 * Inspiration: https://dribbble.com/shots/6971340-Anthill-Real-Estate-Home-Animated
 */

import * as React from 'react';
import { Text, StatusBar, View, StyleSheet } from 'react-native';
import { Donut } from './Donut';
import { Dimensions } from "react-native";
import { COLORS } from '../../constants';

const ScreenHeight = Dimensions.get("window").height;
const ScreenWidth = Dimensions.get("window").width;
//console.log(ScreenHeight, ScreenWidth);


let drrating: Rate = { type: 'doctor', rating: 216 };
let staffrating: Rate = { type: 'staff', rating: 73 };
let officerating: Rate = { type: 'office', rating: 66 };
let bedsiderating: Rate = { type: 'bedisde', rating: 60 };

export function Speedometer ( { ratings = [ drrating, staffrating, officerating, bedsiderating ] }: { ratings: Rate[]; } ) {


  const doctor_rating = ratings.filter( x => x.type === 'doctor' )[ 0 ]?.rating;
  const staff_rating = ratings.filter( x => x.type === 'staff' )[ 0 ]?.rating;
  const office_rating = ratings.filter( x => x.type === 'office' )[ 0 ]?.rating;
  const bedside_rating = ratings.filter( x => x.type === 'bedside' )[ 0 ]?.rating;

  React.useEffect( () => {

    //console.log( 'in speedometer' );
    return () => {

    };
  }, [ 1 ] );




  return (
    <View style={ styles.container }>
      {/* <StatusBar hidden /> */ }
      <View style={ styles.doctor_staff }>
        <View style={ styles.doctor_rating }>

          <Donut label={ 'Doctor Rating' } key={ 1 } percentage={ doctor_rating } color={ COLORS.primary } delay={ 1000 } max={ 216 } radius={ Math.round( ( 40 / 375 ) * ScreenWidth ) } strokeWidth={ 5 } duration={ 500 } textColor={ COLORS.black } />
        </View>
        <View style={ styles.staff_rating }>
          <Donut label={ 'Staff Rating' } key={ 3 } percentage={ staff_rating } color={ COLORS.primary } delay={ 1000 } max={ 216 } radius={ Math.round( ( 35 / 375 ) * ScreenWidth ) } strokeWidth={ 5 } duration={ 500 } textColor={ COLORS.black } />
        </View>
      </View>
      <View style={ styles.bedside_office }>
        <View style={ styles.bedside_rating }>


          <Donut label={ 'Bedside Rating' } key={ 2 } percentage={ bedside_rating } color={ COLORS.primary } delay={ 1000 } max={ 216 } radius={ Math.round( ( 35 / 375 ) * ScreenWidth ) } strokeWidth={ 5 } duration={ 500 } textColor={ COLORS.black } />
        </View>
        <View style={ styles.office_rating }>

          <Donut label={ 'Office Rating' } key={ 4 } percentage={ office_rating } color={ COLORS.primary } delay={ 1000 } max={ 216 } radius={ Math.round( ( 35 / 375 ) * ScreenWidth ) } strokeWidth={ 5 } duration={ 500 } textColor={ COLORS.black } />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create( {
  container: {
    // flex: 1,
    //justifyContent: 'center',
    // paddingTop: Constants.statusBarHeight,
    // backgroundColor: '#fff',
    // backgroundColor: 'red',
    // padding: 8,
    // width: 100,
  },
  paragraph: {
    margin: 24,
    fontSize: Math.round( ( 16 / 375 ) * ScreenWidth ),
    fontWeight: 'bold',
    textAlign: 'center',
  },
  doctor_staff: {
    flexDirection: 'row',
    maxHeight: '50%',
    marginBottom: 12 * ( Math.floor( ScreenWidth / 375 ) ),
    justifyContent: 'center',
    alignItems: 'center'

  },
  doctor_rating: {
    // marginBottom: 30 * ( Math.floor( ScreenWidth / 375 ) ),
    // alignItems: 'flex-start'
  },
  staff_rating: {
    // marginTop: 35 * ( 1 + Math.floor( ScreenHeight / 800 ) * ( Math.round( ScreenHeight / 800 ) ) ),
    // alignItems: 'flex-start'
  },
  bedside_office: {
    flexDirection: 'row',
    maxHeight: '50%',
    marginBottom: 12 * ( Math.floor( ScreenWidth / 375 ) ),
    justifyContent: 'center',
    alignItems: 'center'
  },
  bedside_rating: {
    // marginBottom: 30 * ( Math.floor( ScreenWidth / 375 ) ),
    //alignItems: 'flex-end'
  },
  office_rating: {
    // marginTop: 35 * ( 1 + Math.floor( ScreenHeight / 800 ) * ( Math.round( ScreenHeight / 800 ) ) ),
    //alignItems: 'flex-end'
  },
} );
