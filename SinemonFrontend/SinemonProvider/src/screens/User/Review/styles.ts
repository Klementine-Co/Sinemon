import { StyleSheet } from 'react-native';
import { COLORS, appTheme } from '../../../constants';

export const Malpractices_styles = StyleSheet.create( {
  summary_title: {
    flexShrink: 1, // Allow text to shrink to prevent overflow
    fontSize: appTheme.FONTS.body2.fontSize,
    alignSelf: 'flex-start',
    letterSpacing: 1,
  },
  summary_text: {
    flexShrink: 1, // Allow text to shrink to prevent overflow
    // Ensure text breaks correctly and doesn't overflow
    flexWrap: 'wrap',
    fontSize: appTheme.FONTS.body1.fontSize,
    lineHeight: appTheme.normalize( 25 ),
    alignSelf: 'flex-start',
    letterSpacing: 1,
    marginVertical: 5,
  },
  class: {
    flexShrink: 1, // Allow text to shrink to prevent overflow
    fontSize: appTheme.FONTS.body1.fontSize,
    alignSelf: 'flex-start',
    letterSpacing: 1,
  },
  date_container: {
    flexShrink: 1, // Allow text to shrink to prevent overflow
    flexDirection: 'row',
    marginBottom: 15,
    justifyContent: 'space-between',
    paddingTop: 10,
  },
  date: {
    flexShrink: 1, // Allow text to shrink to prevent overflow
    fontSize: appTheme.normalize( 12 ),
    alignSelf: 'flex-start',
    letterSpacing: 1,
  },
  container: {
    padding: 10,
  },

} );
export const Accusations_styles = StyleSheet.create( {
  summary_title: {
    flexShrink: 1, // Allow text to shrink to prevent overflow
    fontSize: appTheme.FONTS.body2.fontSize,
    alignSelf: 'flex-start',
    letterSpacing: 1,
  },
  summary_text: {
    flexShrink: 1, // Allow text to shrink to prevent overflow
    // Ensure text breaks correctly and doesn't overflow
    flexWrap: 'wrap',
    fontSize: appTheme.FONTS.body1.fontSize,
    lineHeight: appTheme.normalize( 25 ),
    alignSelf: 'flex-start',
    letterSpacing: 1,
    marginVertical: 5,
  },
  end_date: {
    flexShrink: 1, // Allow text to shrink to prevent overflow
    fontSize: appTheme.normalize( 12 ),
    alignSelf: 'flex-start',
    letterSpacing: 1,
  },
  date_container: {
    flexShrink: 1, // Allow text to shrink to prevent overflow
    flexDirection: 'row',
    marginBottom: 15,
    justifyContent: 'space-between',
    paddingTop: 10,
  },
  date: {
    flexShrink: 1, // Allow text to shrink to prevent overflow
    fontSize: appTheme.normalize( 12 ),
    alignSelf: 'flex-start',
    letterSpacing: 1,
  },
  container: {
    padding: 10,
  },

} );
export const Arbitrations_styles = StyleSheet.create( {
  summary_title: {
    flexShrink: 1, // Allow text to shrink to prevent overflow
    fontSize: appTheme.FONTS.body2.fontSize,
    alignSelf: 'flex-start',
    letterSpacing: 1,
  },
  summary_text: {
    flexShrink: 1, // Allow text to shrink to prevent overflow
    // Ensure text breaks correctly and doesn't overflow
    flexWrap: 'wrap',
    fontSize: appTheme.FONTS.body1.fontSize,
    lineHeight: appTheme.normalize( 25 ),
    alignSelf: 'flex-start',
    letterSpacing: 1,
    marginVertical: 5,
  },
  color: {
    flexShrink: 1, // Allow text to shrink to prevent overflow
    fontSize: appTheme.FONTS.body1.fontSize,
    alignSelf: 'flex-start',
    letterSpacing: 1,
  },
  date_container: {
    flexShrink: 1, // Allow text to shrink to prevent overflow
    flexDirection: 'row',
    marginBottom: 15,
    justifyContent: 'space-between',
    paddingTop: 10,
  },
  date: {
    flexShrink: 1, // Allow text to shrink to prevent overflow
    fontSize: appTheme.normalize( 12 ),
    alignSelf: 'flex-start',
    letterSpacing: 1,
  },
  container: {
    padding: 10,
  },

} );
export const Citations_styles = StyleSheet.create( {
  summary_title: {
    flexShrink: 1, // Allow text to shrink to prevent overflow
    fontSize: appTheme.FONTS.body2.fontSize,
    alignSelf: 'flex-start',
    letterSpacing: 1,
  },
  summary_text: {
    flexShrink: 1, // Allow text to shrink to prevent overflow
    // Ensure text breaks correctly and doesn't overflow
    flexWrap: 'wrap',
    fontSize: appTheme.FONTS.body1.fontSize,
    lineHeight: appTheme.normalize( 25 ),
    alignSelf: 'flex-start',
    letterSpacing: 1,
    marginVertical: 5,
  },
  resolved: {
    flexShrink: 1, // Allow text to shrink to prevent overflow
    fontSize: appTheme.FONTS.body1.fontSize,
    alignSelf: 'flex-start',
    letterSpacing: 1,
  },
  date_container: {
    flexShrink: 1, // Allow text to shrink to prevent overflow
    flexDirection: 'row',
    marginBottom: 15,
    justifyContent: 'space-between',
    paddingTop: 10,
  },
  date: {
    flexShrink: 1, // Allow text to shrink to prevent overflow
    fontSize: appTheme.normalize( 12 ),
    alignSelf: 'flex-start',
    letterSpacing: 1,
  },
  container: {
    padding: 10,
  },

} );
export const Convictions_styles = StyleSheet.create( {
  summary_title: {
    flexShrink: 1, // Allow text to shrink to prevent overflow
    fontSize: appTheme.FONTS.body2.fontSize,
    alignSelf: 'flex-start',
    letterSpacing: 1,
  },
  summary_text: {
    flexShrink: 1, // Allow text to shrink to prevent overflow
    // Ensure text breaks correctly and doesn't overflow
    flexWrap: 'wrap',
    fontSize: appTheme.FONTS.body1.fontSize,
    lineHeight: appTheme.normalize( 25 ),
    alignSelf: 'flex-start',
    letterSpacing: 1,
    marginVertical: 5,
  },
  class_court: {
    flexShrink: 1, // Allow text to shrink to prevent overflow
    fontSize: appTheme.FONTS.body1.fontSize,
    alignSelf: 'flex-start',
    letterSpacing: 1,
  },
  casenumber: {
    flexShrink: 1, // Allow text to shrink to prevent overflow
    fontSize: appTheme.normalize( 12 ),
    alignSelf: 'flex-start',
    letterSpacing: 1,
  },
  date_container: {
    flexShrink: 1, // Allow text to shrink to prevent overflow
    flexDirection: 'row',
    marginBottom: 15,
    justifyContent: 'space-between',
    paddingTop: 10,
  },
  date: {
    flexShrink: 1, // Allow text to shrink to prevent overflow
    fontSize: appTheme.normalize( 12 ),
    alignSelf: 'flex-start',
    letterSpacing: 1,
  },
  container: {
    padding: 10,
  },

} );
export const Probations_styles = StyleSheet.create( {
  summary_title: {
    flexShrink: 1, // Allow text to shrink to prevent overflow
    fontSize: appTheme.FONTS.body2.fontSize,
    alignSelf: 'flex-start',
    letterSpacing: 1,
  },
  summary_text: {
    flexShrink: 1, // Allow text to shrink to prevent overflow
    // Ensure text breaks correctly and doesn't overflow
    flexWrap: 'wrap',
    fontSize: appTheme.FONTS.body1.fontSize,
    lineHeight: appTheme.normalize( 25 ),
    alignSelf: 'flex-start',
    letterSpacing: 1,
    marginVertical: 5,
  },
  status: {
    flexShrink: 1, // Allow text to shrink to prevent overflow
    fontSize: appTheme.FONTS.body1.fontSize,
    alignSelf: 'flex-start',
    letterSpacing: 1,
  },
  age_of_prob_casenumber_end_date: {
    flexShrink: 1, // Allow text to shrink to prevent overflow
    fontSize: appTheme.normalize( 12 ),
    alignSelf: 'flex-start',
    letterSpacing: 1,
  },
  date_container: {
    flexShrink: 1, // Allow text to shrink to prevent overflow
    flexDirection: 'row',
    marginBottom: 15,
    justifyContent: 'space-between',
    paddingTop: 10,
  },
  date: {
    flexShrink: 1, // Allow text to shrink to prevent overflow
    fontSize: appTheme.normalize( 12 ),
    alignSelf: 'flex-start',
    letterSpacing: 1,
  },
  container: {
    padding: 10,
  },

} );
export const Actions_styles = StyleSheet.create( {
  summary_title: {
    flexShrink: 1, // Allow text to shrink to prevent overflow
    fontSize: appTheme.FONTS.body2.fontSize,
    alignSelf: 'flex-start',
    letterSpacing: 1,
  },
  summary_text: {
    flexShrink: 1, // Allow text to shrink to prevent overflow
    // Ensure text breaks correctly and doesn't overflow
    flexWrap: 'wrap',
    fontSize: appTheme.FONTS.body1.fontSize,
    lineHeight: appTheme.normalize( 25 ),
    alignSelf: 'flex-start',
    letterSpacing: 1,
    marginVertical: 5,
  },
  action_col_val: {
    flexShrink: 1, // Allow text to shrink to prevent overflow
    fontSize: appTheme.FONTS.body1.fontSize,
    alignSelf: 'flex-start',
    letterSpacing: 1,
  },
  date_container: {
    flexShrink: 1, // Allow text to shrink to prevent overflow
    flexDirection: 'row',
    marginBottom: 15,
    justifyContent: 'space-between',
    paddingTop: 10,
  },
  date: {
    flexShrink: 1, // Allow text to shrink to prevent overflow
    fontSize: appTheme.normalize( 12 ),
    alignSelf: 'flex-start',
    letterSpacing: 1,
  },
  container: {
    padding: 10,
  },

} );
export const RatedReviews_styles = StyleSheet.create( {
  carousel_container: {
    backgroundColor: COLORS.white, height: '100%', width: '98%'
  },
  pagination_container: {
    backgroundColor: COLORS.white, height: '10%', width: '98%'
  },
  dotStyle: {
    width: appTheme.normalize( 25 ),
    height: appTheme.normalize( 12 ),
    borderRadius: appTheme.normalize( 5 ),
    marginHorizontal: 0,
    backgroundColor: COLORS.primary,
  },
  get inactiveDotStyle () {
    return {
      ...this.dotStyle,
      backgroundColor: COLORS.neutral,
    };
  },

} );


export const Review_styles = StyleSheet.create( {
  negatives_container: {
    width: '90%',
    justifyContent: 'center',
    paddingBottom: 10,
    height: '40%',
  },
  negatives_text_header_container: {
    borderBottomWidth: appTheme.normalize( 2 ),
    paddingTop: appTheme.normalize( 10 ),
  },
  negatives_text_header: {
    letterSpacing: 1,
    ...appTheme.FONTS.body4,
    color: COLORS.neutral,
  },
  RatedReviews_Container_height: {
    height: '60%',
  },
  section_button_title: {
    ...appTheme.FONTS.h4,
    letterSpacing: 1,
    color: COLORS.primary,
  },
  section_button: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  section_button_icon: {
    width: appTheme.FONTS.body1.fontSize,
    height: appTheme.FONTS.body1.fontSize,
  },
  section_button_container: {
    flex: 1,
    marginTop: appTheme.normalize( 15 ),
  },
  overlay_container: {
    width: '90%',
    maxHeight: '80%',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    marginTop: appTheme.normalize( 10 ),
  },
} );
