import React from 'react';
import { View, Text, Dimensions, StyleSheet, StyleProp, TextStyle } from 'react-native';
import { Arbitrations_styles } from './styles';

const { width: ScreenWidth } = Dimensions.get( 'window' );


const Arbitrations = ( item, index ) => {

  return (
    <View key={ index } style={ Arbitrations_styles.container }>
      <Text style={ Arbitrations_styles.summary_title }>Summary:</Text>
      <Text style={ Arbitrations_styles.summary_text }>{ item.amount }</Text>
      <Text style={ Arbitrations_styles.color }>color: { item.status }</Text>
      <View style={ Arbitrations_styles.date_container }>
        <Text style={ Arbitrations_styles.date }>Effective Date: { item.dateofaction }</Text>
      </View>
    </View>
  );
};


export default Arbitrations;
