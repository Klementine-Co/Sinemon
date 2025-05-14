import React from 'react';
import { View, Text, Dimensions, StyleSheet, StyleProp, TextStyle } from 'react-native';
import { Convictions_styles } from './styles';
const { width: ScreenWidth } = Dimensions.get( 'window' );



const Convictions = ( item, index ) => {

  // Helper function for conditional rendering of text
  const renderConditionalText = ( condition, text ) => (
    condition ? <Text style={ Convictions_styles.casenumber }>{ text }</Text> : null
  );

  return (
    <View key={ index } style={ Convictions_styles.container }>
      <Text style={ Convictions_styles.summary_title }>Summary:</Text>
      <Text style={ Convictions_styles.summary_text }>{ item.summary }</Text>
      <Text style={ Convictions_styles.class_court }>Class: { item.classs }</Text>
      <Text style={ Convictions_styles.class_court }>Court: { item.court }</Text>
      { renderConditionalText( item?.casenumber != null, `Casenumber: ${ item?.casenumber }` ) }
      <View style={ Convictions_styles.date_container }>
        <Text style={ Convictions_styles.date }>Effective Date: { item.effective_date }</Text>
      </View>
    </View>
  );
};


export default Convictions;
