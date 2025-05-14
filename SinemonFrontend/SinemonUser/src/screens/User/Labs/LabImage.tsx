import React, { forwardRef } from 'react';
import { View, Image, StyleSheet, Dimensions } from 'react-native';

// Adjust these values according to your needs
const { width: screenWidth } = Dimensions.get('window');
const imageHeight = screenWidth * (3 / 4); // Example height calculation
// Typing the props along with the ref type
interface LabImageProps {
  imageUrl: string;

}
const LabImage = forwardRef<Image, LabImageProps>(({ imageUrl }, ref) => {


return (
  <View style={styles.container}>
    <Image 
      ref={ref}
      source={{ uri: imageUrl }} 
      style={{ width: screenWidth, height: imageHeight }}
      resizeMode="contain" // or "cover", depending on your needs
    />
  </View>
)});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default LabImage;
