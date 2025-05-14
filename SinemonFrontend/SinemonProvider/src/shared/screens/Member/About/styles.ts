import { StyleSheet } from 'react-native';
import { COLORS, appTheme } from '../../../constants';

export const About_styles = StyleSheet.create( {
    container: {
        flex: 1,
        height: '100%',
        backgroundColor: 'white',
        borderWidth: 0.1,
        width: "95%",
        alignSelf: "center",
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: "row",
        borderRadius: 8,
        borderColor: 'black',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.25,
        shadowRadius: 1.84,
        elevation: 5,
        marginTop: 10
    },
    content: {
        fontSize: appTheme.FONTS.body2.fontSize,
        textAlign: 'left',
        paddingTop: 14,
        padding: 5,
        marginBottom: 20,
        letterSpacing: 1,
        alignSelf: 'center',
    },

} );