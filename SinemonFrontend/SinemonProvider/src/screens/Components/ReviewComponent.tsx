import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Dimensions } from 'react-native';
import { List } from 'react-native-paper'; // Assuming you're using react-native-paper for List.Item
import { COLORS, appTheme } from './../../constants'; // Adjust the import path as necessary


const ReviewComponent = ( reviews_: Review_Rating[] ) => {
  // Array of reviews for easier mapping
  const reviews = reviews_.filter( Boolean ); // Filter out undefined reviews

  return (
    <View style={ styles.container }>
      { reviews.map( ( review, index ) => (
        <View key={ review.id } style={ styles.reviewContainer }>
          <TouchableOpacity style={ styles.touchable }>
            <View style={ [ styles.ratingContainer, { backgroundColor: review.color } ] }>
              <Text style={ styles.ratingText }>{ review.rating }</Text>
            </View>
            <List.Item
              style={ styles.listItem }
              title={ undefined }
              description={ review.review }
              descriptionStyle={ styles.description }
              descriptionNumberOfLines={ 6 }
            />
          </TouchableOpacity>
        </View>
      ) ) }
    </View>
  );
};

const styles = StyleSheet.create( {
  container: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap', // Wrap reviews into the next row if necessary
    justifyContent: 'space-between', // Adjust as necessary to match your layout needs
  },
  reviewContainer: {
    width: '50%', // Adjust if you want more or fewer items per row
    alignItems: 'center',
    marginTop: appTheme.normalize( 10 ),
  },
  touchable: {
    flexDirection: 'column',
    paddingVertical: 0,
    alignItems: 'center',
  },
  ratingContainer: {
    borderWidth: 0.1,
    height: appTheme.normalize( 25 ),
    borderRadius: appTheme.normalize( 50 ),
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.34,
    shadowRadius: 3.27,
    elevation: appTheme.normalize( 10 ),
    width: appTheme.normalize( 100 ),
    justifyContent: 'center',
    marginBottom: appTheme.normalize( 10 ),

  },
  ratingText: {
    fontSize: appTheme.FONTS.body1.fontSize,
    textAlign: 'center',
    color: COLORS.white,
  },
  listItem: {
    marginTop: appTheme.normalize( 10 ),
  },
  description: {
    fontSize: appTheme.FONTS.body1.fontSize,
    width: appTheme.normalize( 135 ),
  },
} );

export default ReviewComponent;
