import React from 'react';
import { View, Text, Dimensions, StyleSheet, StyleProp, TextStyle } from 'react-native';
import { Malpractices_styles } from './styles';
const { width: ScreenWidth } = Dimensions.get( 'window' );


const Malpractices = ( item, index ) => {

  return (
    <View key={ index } style={ Malpractices_styles.container }>
      <Text style={ Malpractices_styles.summary_title }>Summary:</Text>
      <Text style={ Malpractices_styles.summary_text }>{ ( () => {
        if ( item.classs != "settlement" ) {
          return <Text style={ {} }>{ item.amount }</Text>;
        } else {
          return <Text style={ {} }>Settled</Text>;
        }
      } )() }</Text>
      <Text style={ Malpractices_styles.class }>Class: { item.classs } color: { item.status }</Text>
      <View style={ Malpractices_styles.date_container }>
        <Text style={ Malpractices_styles.date }>Effective Date: { item.effective_date }</Text>
      </View>
    </View>
  );
};


export default Malpractices;
