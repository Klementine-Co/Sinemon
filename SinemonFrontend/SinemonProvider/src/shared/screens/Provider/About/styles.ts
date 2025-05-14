import { StyleSheet, useWindowDimensions } from 'react-native';
import { COLORS, SIZES, appTheme } from '../../../constants';
import { Dimensions } from "react-native";

const ScreenHeight = Dimensions.get("window").height;
const ScreenWidth = Dimensions.get("window").width;

export const hyperlinks = StyleSheet.create( {
    a: {
        textDecorationColor: COLORS.primary,
        color: COLORS.primary,
    },
} );

export const About_styles = StyleSheet.create({
    renderhtml_baseStyle: {
      fontSize: SIZES.body2,
      lineHeight: SIZES.body2 * 1.5,
    },
    tips_title: {
      fontSize: SIZES.body2*2.5,
      textAlign: "left",
      marginTop: 15,
      color: COLORS.black,
    },
    container: {
      flex: 1,
      flexDirection: "column",
      height: "100%",
      marginTop: 10,
    },
    webview: {
      width: ScreenWidth*.95,
      height: ScreenHeight*.90, // Adjust height dynamically if needed
      backgroundColor: "transparent",
    },
  });
  