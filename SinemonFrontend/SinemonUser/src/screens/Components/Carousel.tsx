import { COLORS } from './../../constants';
import React, { useEffect, useRef } from 'react';
import { View, Dimensions, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { List } from 'react-native-paper';
import Animated, { useAnimatedScrollHandler, useAnimatedStyle, useSharedValue, interpolate, Extrapolation } from 'react-native-reanimated';
import ReviewComponent from './ReviewComponent';

const { width: screenWidth } = Dimensions.get( 'window' );
const SLIDER_WIDTH = screenWidth;
const ITEM_WIDTH = screenWidth * 0.8; // Change as per your design


// const ReviewItem = (review: Review[]) => {
//console.log(review[0]);
//   var review1:Review = review[0];
//   var review2:Review = review[1];
//   var review3:Review = review[2];
//   var review4:Review = review[3];

//   return (
//     {ReviewComponent(review)}
//   );
// };

const CarouselItem = ( { item, index, scrollX } ) => {


  const inputRange = [
    ( index - 1 ) * ITEM_WIDTH,
    index * ITEM_WIDTH,
    ( index + 1 ) * ITEM_WIDTH,
  ];


  const animatedStyle = useAnimatedStyle( () => {
    const scale = interpolate(
      scrollX.value,
      inputRange,
      [ 0.8, 1, 0.8 ],
      Extrapolation.CLAMP
    );
    // If you've adjusted item spacing and want a simpler centering without lateral movement:
    return {
      transform: [ { scale } ],
    };
  } );
  // const animatedStyle = useAnimatedStyle(() => {
  //   const scale = interpolate(
  //     scrollX.value,
  //     inputRange,
  //     [0.8, 1, 0.8],
  //     Extrapolation.CLAMP
  //   );
  //   const translateX = interpolate(
  //     scrollX.value,
  //     inputRange,
  //     [70, 70, -10], // Adjust the amount of horizontal translation
  //     Extrapolation.CLAMP
  //   );

  //   return {
  //     transform: [{ scale }, { translateX }],
  //   };
  // });

  return (
    <Animated.View style={ [ styles.itemContainer, animatedStyle ] }>
      {/* Render your item content here */ }
      { ReviewComponent( item ) }
    </Animated.View>
  );
};

const Carousel = ( { data, carouselRef } ) => {
  const scrollX = useSharedValue( 0 );
  const scrollViewRef = useRef( null );
  const onScroll = useAnimatedScrollHandler( ( event ) => {
    scrollX.value = event.contentOffset.x;
  } );

  useEffect( () => {
    carouselRef.current = {
      getCurrentIndex: () => {
        return Math.round( scrollX.value / ITEM_WIDTH );
      },
    };
  }, [ scrollX.value, carouselRef ] );

  // Adjust the paddingHorizontal to center items
  const scrollViewPaddingHorizontal = ( screenWidth - ITEM_WIDTH ) / 2;

  return (
    <Animated.ScrollView
      ref={ scrollViewRef }
      horizontal
      pagingEnabled
      scrollEventThrottle={ 16 }
      onScroll={ onScroll }
      showsHorizontalScrollIndicator={ false }
      contentContainerStyle={ { paddingHorizontal: scrollViewPaddingHorizontal } } // Center items
    >
      { data.map( ( item, index ) => (
        <CarouselItem
          key={ index }
          item={ item }
          index={ index }
          scrollX={ scrollX }
        />
      ) ) }
    </Animated.ScrollView>
  );
};

const styles = StyleSheet.create( {
  container: {
    backgroundColor: 'white',
    borderRadius: 8,
    width: '100%',
    paddingBottom: 40,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.29,
    shadowRadius: 4.65,
    elevation: 7,
    left: -20,
    height: '100%'
  },
  itemContainer: {
    width: ITEM_WIDTH,
    alignItems: 'center',
    justifyContent: 'center',
    // Additional styling if needed
    // paddingVertical: 150
    // height: '100%'
  },
} );

export default Carousel;
