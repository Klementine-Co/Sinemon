
import React from 'react'
import { View, Text, StyleSheet, Dimensions, Image, TouchableOpacity } from "react-native";
import Carousel from '../../Components/Carousel';
import Pagination from '../../Components/Pagination';
import { COLORS } from '../../../constants';
import { ScreenWidth } from 'react-native-elements/dist/helpers';
import { List } from 'react-native-paper';
export const SLIDER_WIDTH = Dimensions.get('window').width
export const ITEM_WIDTH = Math.round(SLIDER_WIDTH*.85)

interface Review {
  id: any;
  color: string;
  rating: any;
  review: any;
}


const RatedReviews = (reviews:Review[]) => {

     
      
     //The key here is grouping the data to be in one row together
     const groupData = (items:Element[], groupLen:number) => {
        const groups = [];
        let i = 0;
    
        while (i < items.length) {
          groups.push(items.slice(i, i += groupLen));
        }
    
        return groups;
      };
    
      const groupedItems = groupData(reviews, 4)    
  const isCarousel = React.useRef(null)


  return (
      <View style={{height:"100%"}}>
    <View style={{backgroundColor:'white',  height:'100%', width:'98%'}}>
      <Carousel
      
        carouselRef={isCarousel}
        data={groupedItems}
    
      />
      
    </View>
    <Pagination
      style={{height:10, marginTop:70}}
      dotsLength={groupedItems.length}
      carouselRef={isCarousel}
      dotStyle={{
        width: 25,
        height: 12,
        borderRadius: 5,
        marginHorizontal: 0,
        backgroundColor: COLORS.primary,
      }}
      inactiveDotStyle={{
        width: 25,
        height: 12,
        borderRadius: 5,
        marginHorizontal: 0,
        backgroundColor: COLORS.neutral,
      }}
      // inactiveDotOpacity={0.4}
      // inactiveDotScale={0.6}
      // activeOpacity={1}
      // inactiveDotColor={COLORS.neutral}
      // dotColor={COLORS.primary}
      tappableDots={false}
    />
    </View>
  )
}



const styles = StyleSheet.create({
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
    left:-20,
    height:'100%'
  },
  image: {
    width: ITEM_WIDTH,
    height: 300,
  },
  header: {
    color: "#222",
    fontSize: 28,
    fontWeight: "bold",
    paddingLeft: 20,
    paddingTop: 20
  },
  body: {
    color: "#222",
    fontSize: 18,
    paddingLeft: 20,
    paddingRight: 20
  }
})

// export default CarouselCards
export default RatedReviews;
