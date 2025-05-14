import React from 'react';
import { View, Text, Dimensions, StyleSheet, StyleProp, TextStyle } from 'react-native';
import { Citations_styles } from './styles';
const { width: ScreenWidth } = Dimensions.get( 'window' );



const Citations = ( item, index ) => {

  return (
    <View key={ index } style={ Citations_styles.container }>
      <Text style={ Citations_styles.summary_title }>Summary:</Text>
      <Text style={ Citations_styles.summary_text }>{ item.cause }</Text>
      <Text style={ Citations_styles.resolved }>Resolved: { item.resolved }</Text>
      <View style={ Citations_styles.date_container }>
        <Text style={ Citations_styles.date }>Effective Date: { item.datecitationissued }</Text>
      </View>
    </View>
  );
};


export default Citations;
