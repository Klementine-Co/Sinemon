import React from 'react';
import { View, Text, Dimensions, StyleSheet, StyleProp, TextStyle } from 'react-native';
import { Accusations_styles } from './styles';
const { width: ScreenWidth } = Dimensions.get( 'window' );



const Accusations = ( item, index ) => {

  // Helper function for conditional rendering of text
  const renderConditionalText = ( condition, text ) => (
    condition ? <Text style={ Accusations_styles.end_date }>{ text }</Text> : null
  );

  return (
    <View key={ index } style={ Accusations_styles.container }>
      <Text style={ Accusations_styles.summary_title }>Summary:</Text>
      <Text style={ Accusations_styles.summary_text }>{ item.description }</Text>
      <View style={ Accusations_styles.date_container }>
        <Text style={ Accusations_styles.date }>Effective Date: { item.effective_date }</Text>
        { renderConditionalText( item.end_date !== undefined, `End Date: ${ item.end_date }` ) }
      </View>
    </View>
  );
};

export default Accusations;
