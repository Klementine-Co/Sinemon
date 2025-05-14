import * as React from 'react';
import {
  Easing,
  TextInput,
  Animated,
  Text,
  View,
  StyleSheet,
} from 'react-native';
import Svg, { G, Circle, Rect, NumberProp } from 'react-native-svg';
import { Dimensions } from "react-native";
const ScreenHeight = Dimensions.get("window").height;
const ScreenWidth = Dimensions.get("window").width;
const AnimatedCircle = Animated.createAnimatedComponent( Circle );
const AnimatedTextInput = Animated.createAnimatedComponent( TextInput );

type Donut = {
  percentage: number;
  radius: number;
  strokeWidth: number;
  duration: number;
  color: string;
  delay: number;
  textColor: string;
  max: number;
  label: string;
};
export function Donut ( {
  percentage = 75,
  radius = 40,
  strokeWidth = 10,
  duration = 500,
  color = "tomato",
  delay = 0,
  textColor,
  max = 216,
  label = 'Bedside Rating'
}: Donut & homeProp ) {


  const array = [ 0, 72, 144, 216 ];
  const asc = ( arr: number[] ) => arr.sort( ( a: number, b: number ) => a - b );


  const quantile = ( arr: any, q: number ) => {
    const sorted = asc( arr );
    const pos = ( sorted.length - 1 ) * q;
    const base = Math.floor( pos );
    const rest = pos - base;
    if ( sorted[ base + 1 ] !== undefined ) {
      return sorted[ base ] + rest * ( sorted[ base + 1 ] - sorted[ base ] );
    } else {
      return sorted[ base ];
    }
  };

  function getRating ( value: number ) {
    //console.log(value);

    if ( value < quantile( array, 1 / 3 ) ) {
      return 'POOR';
    }
    else if ( value < quantile( array, 2 / 3 ) ) {

      return 'FAIR';
    }
    else if ( value >= quantile( array, 2 / 3 ) ) {

      return 'EXCELLENT';
    }

  };


  const animated = React.useRef( new Animated.Value( 0 ) ).current;
  const circleRef = React.createRef<any>();
  const inputRef = React.createRef<Text>();
  const circumference = 2 * Math.PI * radius;
  const halfCircle = radius + strokeWidth;

  const animation = ( toValue: number ) => {
    return Animated.timing( animated, {
      delay: 1000,
      toValue,
      duration,
      useNativeDriver: true,
      easing: Easing.out( Easing.ease ),
    } ).start();
  };

  React.useEffect( () => {
    animation( percentage );
    animated.addListener( ( v ) => {
      const maxPerc = 100 * ( v.value / ( max * 2 ) );
      const strokeDashoffset: NumberProp = circumference - ( circumference * maxPerc ) / 100;
      //console.log(maxPerc, strokeDashoffset, circumference, (circumference * maxPerc));

      if ( inputRef?.current ) {
        inputRef.current.setNativeProps( {
          text: `${ getRating( v.value ) }`,
        } );
      }
      if ( circleRef?.current ) {
        circleRef.current.setNativeProps( {
          strokeDashoffset: strokeDashoffset as NumberProp,
        } );
      }
    }, [ max, percentage ] );

    return () => {
      animated.removeAllListeners();
    };
  } );

  return (
    <View style={ { width: radius * 2, height: radius * 2 } }>
      <Svg
        height={ radius * 2 }
        width={ radius * 2 }
        viewBox={ `0 0 ${ halfCircle * 2 } ${ halfCircle * 2 }` }>
        <G
          rotation="180"
          origin={ `${ halfCircle }, ${ halfCircle }` }>
          <Circle
            ref={ circleRef }
            cx="50%"
            cy="50%"
            r={ radius }
            fill="transparent"
            stroke={ color }
            strokeWidth={ strokeWidth }
            strokeLinecap="round"
            strokeDashoffset={ circumference }
            strokeDasharray={ circumference }
          />
          <Circle
            cx="50%"
            cy="50%"
            r={ radius }
            fill="transparent"
            stroke={ 'white' }
            strokeWidth={ strokeWidth }
            strokeLinejoin="round"
            strokeOpacity=".1"
          />
        </G>
      </Svg>

      {/* <View style={{}}> */ }

      <AnimatedTextInput
        ref={ inputRef }
        underlineColorAndroid="transparent"
        editable={ false }
        defaultValue="0"
        style={ [
          StyleSheet.absoluteFillObject,
          { fontSize: Math.round( ( 8 / 375 ) * ScreenWidth ), color: textColor ?? color, },
          styles.text,
        ] }
      >


      </AnimatedTextInput>
      <Text style={ [ ,
        { fontSize: Math.round( ( 14 / 375 ) * ScreenWidth ), color: textColor ?? color, position: 'absolute', right: '55%', bottom: '-15%' },

      ] } >
        { label }
      </Text>
    </View>
    // </View>
  );
}

const styles = StyleSheet.create( {
  text: { fontWeight: '900', textAlign: 'center' },
} );
