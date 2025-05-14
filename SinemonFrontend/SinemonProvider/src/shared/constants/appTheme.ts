import { Dimensions, PixelRatio, Platform } from 'react-native';

const { width: screenWidth, height: screenHeight } = Dimensions.get( 'window' );

// Based on iPhone X's scale
const baseWidth = 375;
const baseHeight = 812;

// Calculate scale based on current device screen size
const scaleWidth = screenWidth / baseWidth;
const scaleHeight = screenHeight / baseHeight;
const scale = Math.min( scaleWidth, scaleHeight );

export function normalize ( size: number ): number {
  const newSize = size * scale;
  if ( Platform.OS === 'ios' ) {
    return Math.round( PixelRatio.roundToNearestPixel( newSize ) );
  } else {
    return Math.round( PixelRatio.roundToNearestPixel( newSize ) ) - 2;
  }
}

export const COLORS = {
  // base colors
  // primary: "#5390ff", // Blue
  // secondary: "#cacfd9",   // Gray
  primary: '#af3100',
  secondary: '#ffbaab',
  tertiary: '#ff3d3f',
  neutral: '#998e8c',
  LOGOCOLOR: '#F6A5A5',

  // colors
  black: '#1E1F20',
  white: '#FFFFFF',
  lightGray: '#eff2f5',
  lightGrey: 'lightgrey',
  gray: '#8b9097',
  red: 'red',
  green: 'green',
  orange: 'orange',
};
export const SIZES = {
  // global sizes
  base: 14,

  font14: 14,
  font16: 16,

  radius: 12,
  padding: 24,

  // font sizes
  h: 50,
  h1: 28,
  h2: 24,
  h3: 22,
  h4: 18,

  body1: 14,
  body2: 16,
  body3: 18,
  body4: 22,

  // app dimensions
  width: screenWidth,
  height: screenHeight,
};

export const FONTS = {
  h: {
    fontFamily: Platform.OS === 'ios' ? 'Arial' : 'Roboto-Black',
    fontSize: normalize( SIZES.h ),
    lineHeight: normalize( SIZES.h ),
  },
  h1: {
    fontFamily: Platform.OS === 'ios' ? 'Arial' : 'Roboto-Black',
    fontSize: normalize( SIZES.h1 ),
    lineHeight: normalize( SIZES.h1 ),
  },
  h2: {
    fontFamily: Platform.OS === 'ios' ? 'Arial' : 'Roboto-Black',
    fontSize: normalize( SIZES.h2 ),
    lineHeight: normalize( SIZES.h2 ),
  },
  h3: {
    fontFamily: Platform.OS === 'ios' ? 'Arial' : 'Roboto-Black',
    fontSize: normalize( SIZES.h3 ),
    lineHeight: normalize( SIZES.h3 ),
  },
  h4: {
    fontFamily: Platform.OS === 'ios' ? 'Arial' : 'Roboto-Black',
    fontSize: normalize( SIZES.h4 ),
    lineHeight: normalize( SIZES.h4 ),
  },
  body1: {
    fontFamily: Platform.OS === 'ios' ? 'Arial' : 'Roboto-Black',
    fontSize: normalize( SIZES.body1 ),
    lineHeight: normalize( SIZES.body1 ),
  },
  body2: {
    fontFamily: Platform.OS === 'ios' ? 'Arial' : 'Roboto-Black',
    fontSize: normalize( SIZES.body2 ),
    lineHeight: normalize( SIZES.body2 ),
  },
  body3: {
    fontFamily: Platform.OS === 'ios' ? 'Arial' : 'Roboto-Black',
    fontSize: normalize( SIZES.body3 ),
    lineHeight: normalize( SIZES.body3 ),
  },
  body4: {
    fontFamily: Platform.OS === 'ios' ? 'Arial' : 'Roboto-Black',
    fontSize: normalize( SIZES.body4 ),
    lineHeight: normalize( SIZES.body4 ),
  },
};

const appTheme = { COLORS, SIZES, FONTS, normalize };

export default appTheme;

// {...Platform.select({
//     ios: { fontFamily: 'Arial', },
//     android: { fontFamily: 'Roboto' }
// })}
