import { StyleSheet } from 'react-native';
import { COLORS, appTheme } from '../../../constants';

export const Labs_styles = StyleSheet.create( {
    container: {
        flex: 1,
        flexDirection: 'column',
        height: '100%',
        width: '100%',
    },
    listItem: {
        // margin:10,
        // padding:10,
        marginTop: 15,
        backgroundColor: "#FFF",
        width: "80%",
        // flex: 1,
        // alignSelf: "center",
        flexDirection: "row",
        alignItems: 'center',
        // borderRadius:5,
        // borderBottomWidth:1

    },
    labs_content: {
        borderBottomWidth: 1,
        width: '100%',
    },
    lab_prescriber: {
        fontSize: appTheme.FONTS.body1.fontSize,
        color: COLORS.primary,
        paddingBottom: 5
    },
    labs_desc: {
        fontSize: appTheme.FONTS.body2.fontSize,
    },
    labs_icon_style: {
        fontSize: appTheme.normalize( 25 ),
    },
    labs_image_style: {
        height: '40%',
        width: '5%',
    },

} );