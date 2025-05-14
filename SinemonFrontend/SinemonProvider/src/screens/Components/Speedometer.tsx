/**
 * Inspiration: https://dribbble.com/shots/6971340-Anthill-Real-Estate-Home-Animated
 */

import * as React from 'react';
import { Text, StatusBar, View, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Donut } from './Donut';
import { Dimensions } from "react-native";
import { COLORS } from '../../constants';

const ScreenHeight = Dimensions.get("window").height;
const ScreenWidth = Dimensions.get("window").width;
//console.log(ScreenHeight, ScreenWidth);

const insets = useSafeAreaInsets();
const data = [ {
  percentage: 8,
  color: 'tomato',
  max: 10
}, {
  percentage: 14,
  color: 'skyblue',
  max: 20
}, {
  percentage: 92,
  color: 'gold',
  max: 100
}, {
  percentage: 240,
  color: '#222',
  max: 500
} ];

export function Speedometer () {

  React.useEffect( () => {

    //console.log( 'in speedometer' );
    return () => {

    };
  }, [ 1 ] );



  return (
    <View style={ styles.container }>
      <StatusBar hidden />
      {/* <View style={{flexDirection: 'row', justifyContent: 'space-evenly', flexWrap: 'wrap', alignItems: 'center'}}>
        {data.map((p, i) => {
          return <Donut key={i} percentage={p.percentage} color={p.color} delay={500 + 100 * i} max={p.max}/>
        })}
      </View> */}
      {/* <View style={{position:'absolute', right:0, left:0, bottom:0, top:0}}>

      <View style={{right:`${ScreenWidth}%`, top:`${ScreenHeight*3}%`}}>
        <Donut label = {'Doctor Rating'} key={1} percentage={216} color={'gold'} delay={1000} max={216} radius={Math.round( (40 / 375) * ScreenWidth)} strokeWidth={5} duration={500} textColor={'grey'}/>
        </View>
        <View style={{left:`${ScreenWidth-(ScreenWidth*3)}%`, top:`${ScreenHeight*2}%`}}>
        <Donut label = {'Bedside Rating'} key={2} percentage={66} color={'gold'} delay={1000} max={216} radius={Math.round( (35 / 375) * ScreenWidth)} strokeWidth={5} duration={500} textColor={'grey'}/>
        </View>
        <View style={{left:`${ScreenWidth-(ScreenWidth*2.7)}%`, top:ScreenHeight*(50/800)*(Math.ceil(ScreenHeight/800))*((.3+Math.round(ScreenHeight/800))*(Math.round(ScreenHeight/800)))}}>
        <Donut label = {'Staff Rating'} key={3} percentage={216} color={'gold'} delay={1000} max={216} radius={Math.round( (35 / 375) * ScreenWidth)} strokeWidth={5} duration={500} textColor={'grey'}/>
        </View>
        <View style={{left:`${ScreenWidth-(ScreenWidth*1.7)}%`, top:ScreenHeight*(30/800)*(Math.ceil(ScreenHeight/800))*((.3+Math.round(ScreenHeight/800))*(Math.round(ScreenHeight/800)))}}>
        <Donut label = {'Office Rating'} key={4} percentage={102} color={'gold'} delay={1000} max={216} radius={Math.round( (35 / 375) * ScreenWidth)} strokeWidth={5} duration={500} textColor={'grey'}/>
        </View>
      </View> */}
      <View style={ { position: 'relative' } }>
        <View style={ { position: 'absolute', right: 0, left: 0, bottom: 0, top: ScreenWidth * .94 } }>

          <View style={ { right: ScreenWidth * .20 } }>

            <View style={ { flex: 1, flexDirection: 'column', maxHeight: '50%' } }>
              <View style={ { flex: 1, marginBottom: 30 * ( Math.floor( ScreenWidth / 375 ) ), alignItems: 'flex-start' } }>

                <Donut label={ 'Doctor Rating' } key={ 1 } percentage={ 216 } color={ COLORS.primary } delay={ 1000 } max={ 216 } radius={ Math.round( ( 40 / 375 ) * ScreenWidth ) } strokeWidth={ 5 } duration={ 500 } textColor={ COLORS.black } />
              </View>
              <View style={ { flex: 1, marginTop: 30 * ( 1 + Math.floor( ScreenHeight / 800 ) * ( Math.round( ScreenHeight / 800 ) ) ), alignItems: 'flex-start' } }>
                <Donut label={ 'Staff Rating' } key={ 3 } percentage={ 73 } color={ COLORS.primary } delay={ 1000 } max={ 216 } radius={ Math.round( ( 35 / 375 ) * ScreenWidth ) } strokeWidth={ 5 } duration={ 500 } textColor={ COLORS.black } />
              </View>
            </View>
            <View style={ { flex: 1, flexDirection: 'column', maxHeight: '50%', } }>
              <View style={ { flex: 1, marginBottom: 30 * ( Math.floor( ScreenWidth / 375 ) ), alignItems: 'flex-end' } }>


                <Donut label={ 'Bedside Rating' } key={ 2 } percentage={ 66 } color={ COLORS.primary } delay={ 1000 } max={ 216 } radius={ Math.round( ( 35 / 375 ) * ScreenWidth ) } strokeWidth={ 5 } duration={ 500 } textColor={ COLORS.black } />
              </View>
              <View style={ { flex: 1, marginTop: 30 * ( 1 + Math.floor( ScreenHeight / 800 ) * ( Math.round( ScreenHeight / 800 ) ) ), alignItems: 'flex-end' } }>

                <Donut label={ 'Office Rating' } key={ 4 } percentage={ 60 } color={ COLORS.primary } delay={ 1000 } max={ 216 } radius={ Math.round( ( 35 / 375 ) * ScreenWidth ) } strokeWidth={ 5 } duration={ 500 } textColor={ COLORS.black } />
              </View>
            </View>
          </View>


        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create( {
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingTop: insets.top,
    backgroundColor: '#fff',
    padding: 8,
  },
  paragraph: {
    margin: 24,
    fontSize: Math.round( ( 16 / 375 ) * ScreenWidth ),
    fontWeight: 'bold',
    textAlign: 'center',
  },
} );
