import React from 'react';
import { View, Text, Dimensions, StyleSheet, StyleProp, TextStyle } from 'react-native';
import { Probations_styles } from './styles';
const { width: ScreenWidth } = Dimensions.get( 'window' );

// Ensure probStatus function is defined or imported
const probStatus = ( status ) => {
  switch ( status ) {
    case '11': return 'Active';
    case '10': return 'Completed';
    case '21': return 'Active - Extended/Out of State';
    default: return 'NA';
  }
};

const Probations = ( item, index ) => {
  // Helper function for conditional rendering of text
  const renderConditionalText = ( condition, text ) => (
    condition ? <Text style={ Probations_styles.age_of_prob_casenumber_end_date }>{ text }</Text> : null
  );

  return (
    <View key={ index } style={ Probations_styles.container }>
      <Text style={ Probations_styles.summary_title }>Summary:</Text>
      <Text style={ Probations_styles.summary_text }>{ item.summary }</Text>
      <Text style={ Probations_styles.status }>Status: { probStatus( item.pstatus ) }</Text>
      { renderConditionalText( item.age_of_probation !== 'None', `Age of Probation: ${ item.age_of_probation }` ) }
      { renderConditionalText( item.casenumber != null, `Casenumber: ${ item.casenumber }` ) }
      <View style={ Probations_styles.date_container }>
        <Text style={ Probations_styles.date }>Effective Date: { item.effective_date }</Text>
        { renderConditionalText( item.end_date !== undefined, `End Date: ${ item.end_date }` ) }
      </View>
    </View>
  );
};


export default Probations;
