import React from 'react';
import { View, Text, Dimensions, StyleSheet, StyleProp, TextStyle } from 'react-native';
import { Actions_styles } from './styles';
const { width: ScreenWidth } = Dimensions.get( 'window' );

// Ensure probStatus function is defined or imported


const Actions = ( item, index ) => {

  return (
    <View key={ index } style={ Actions_styles.container }>
      <Text style={ Actions_styles.summary_title }>Summary:</Text>
      <Text style={ Actions_styles.summary_text }>{ item.summary }</Text>
      <Text style={ Actions_styles.action_col_val }>{ item.col }: { item.col_value }</Text>
      <View style={ Actions_styles.date_container }>
        <Text style={ Actions_styles.date }>Effective Date: { item.effective_date }</Text>
      </View>
    </View>
  );
};

// Stylesheet to manage the layout and prevent overflow
const styles = StyleSheet.create( {
  container: {
    padding: 10, // Padding to ensure content doesn't touch the edges
  },
  baseText: {
    flexShrink: 1, // Allow text to shrink to prevent overflow
  },
  summaryText: {
    // Ensure text breaks correctly and doesn't overflow
    flexWrap: 'wrap',
  },
  datesContainer: {
    flexDirection: 'row',
    marginBottom: 15,
    justifyContent: 'space-between',
    paddingTop: 10,
  },
} );

export default Actions;
