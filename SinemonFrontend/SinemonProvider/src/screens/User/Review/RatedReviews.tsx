
import React from 'react';
import { View, Text, StyleSheet, Dimensions, Image, TouchableOpacity } from "react-native";
import Carousel from '../../Components/Carousel';
import Pagination from '../../Components/Pagination';
import { COLORS } from '../../../constants';
import { ScreenWidth } from 'react-native-elements/dist/helpers';
import { List } from 'react-native-paper';
export const SLIDER_WIDTH = Dimensions.get( 'window' ).width;
export const ITEM_WIDTH = Math.round( SLIDER_WIDTH * .85 );
import { RatedReviews_styles } from './styles';




const RatedReviews = ( reviews: Review_Rating[] ) => {



  //The key here is grouping the data to be in one row together
  const groupData = ( items: Element[], groupLen: number ) => {
    const groups = [];
    let i = 0;

    while ( i < items.length ) {
      groups.push( items.slice( i, i += groupLen ) );
    }

    return groups;
  };

  const groupedItems = groupData( reviews, 4 );
  const isCarousel = React.useRef( null );


  return (
    <View style={ { height: "100%" } }>
      <View style={ RatedReviews_styles.carousel_container }>
        <Carousel

          carouselRef={ isCarousel }
          data={ groupedItems }

        />

      </View>
      <Pagination
        style={ RatedReviews_styles.pagination_container }
        dotsLength={ groupedItems.length }
        carouselRef={ isCarousel }
        dotStyle={ RatedReviews_styles.dotStyle }
        inactiveDotStyle={ RatedReviews_styles.inactiveDotStyle }
        // inactiveDotOpacity={0.4}
        // inactiveDotScale={0.6}
        // activeOpacity={1}
        // inactiveDotColor={COLORS.neutral}
        // dotColor={COLORS.primary}
        tappableDots={ false }
      />
    </View>
  );
};

// export default CarouselCards
export default RatedReviews;
