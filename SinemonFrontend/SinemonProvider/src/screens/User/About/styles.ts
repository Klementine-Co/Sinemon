import { StyleSheet } from 'react-native';
import { COLORS, appTheme } from '../../../constants';

export const hyperlinks = StyleSheet.create( {
    a: {
        textDecorationColor: COLORS.primary,
        color: COLORS.primary,
    },
} );

export const About_styles = StyleSheet.create( {
    renderhtml_baseStyle: {
        fontSize: appTheme.FONTS.body2.fontSize,
        lineHeight: appTheme.normalize( 30 ),
    },
    tips_title: {
        fontSize: appTheme.FONTS.h2.fontSize,
        textAlign: 'left',
        marginTop: appTheme.normalize( 15 ),
    },
    container: {
        flex: 1,
        flexDirection: "column",
        height: "100%",
        marginTop: appTheme.normalize( 10 ),
    },

} );