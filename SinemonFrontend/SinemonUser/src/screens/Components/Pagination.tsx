import { appTheme } from '../../constants';
import React, { useEffect, useState } from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';

const Pagination = ({ style, dotsLength, dotStyle, inactiveDotStyle, carouselRef, tappableDots = true  }) => {
  // Function to handle dot press
  const handleDotPress = (index) => {
    if (tappableDots && carouselRef?.current) {
      carouselRef.current.scrollToIndex({ index });
    }
  };
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    if (carouselRef && carouselRef.current) {
      const interval = setInterval(() => {
        const index = carouselRef.current.getCurrentIndex();
        setActiveIndex(index);
      }, 100); // Adjust the interval as needed for performance considerations
      return () => clearInterval(interval);
    }
  }, [carouselRef]);

  return (
    <View style={{...styles.paginationContainer, ...style}}>
      {Array.from({ length: dotsLength }).map((_, index) => (
        <TouchableOpacity key={index} onPress={() => handleDotPress(index)}
        disabled={!tappableDots} // Disable TouchableOpacity if tappableDots is false
        >
          <View
            style={[
              styles.dot,
              activeIndex === index ? 
                { ...styles.activeDot, ...dotStyle } : // Merges default with custom styles for active dot
                { ...styles.inactiveDot, ...inactiveDotStyle }, // Merges default with custom styles for inactive dot
            ]}
          />
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  paginationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: appTheme.normalize( 10 ),
  },
  dot: {
    width: appTheme.normalize( 25 ),
    height: appTheme.normalize( 10 ),
    borderRadius: appTheme.normalize( 5 ),
    marginHorizontal: appTheme.normalize( 2 ), // Adjusted for spacing between dots
  },
  activeDot: {
    // Default active dot styles
    backgroundColor: 'blue', // This color can be adjusted or removed if custom styles are always provided
  },
  inactiveDot: {
    // Default inactive dot styles
    backgroundColor: 'grey', // This color can be adjusted or removed if custom styles are always provided
    opacity: 0.4,
    transform: [{ scale: 0.6 }],
  },
});

export default Pagination;
