import { StyleSheet } from 'react-native';
import { COLORS, appTheme } from '../../constants';
import { Dimensions } from "react-native";

const ScreenHeight = Dimensions.get("window").height;
const ScreenWidth = Dimensions.get("window").width;
export const Account_styles = StyleSheet.create( {
    container: {
        flex: 1,
        backgroundColor: COLORS.white,
        // marginTop: -75,
    },
    card: {
        height: '30%',//appTheme.normalize( .25 * ScreenHeight ),
        width: '80%',//appTheme.normalize( .80 * ScreenWidth ),
        position: "relative",
        top: appTheme.normalize( .05 * ScreenHeight ),
        // left: "5%",
        // right: "5%",
        borderRadius: 15,
        margin: appTheme.SIZES.padding + 5,
        paddingLeft: appTheme.SIZES.padding - 18,
        backgroundColor: COLORS.white,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,

    },
    renderItems_container: {
        flex: 1,
        paddingHorizontal: appTheme.SIZES.padding - 12,
        // marginTop: `${ ( 5 / 375 ) * appTheme.SIZES.width }%`,
        height: '100%',
        paddingBottom: 10,
        marginTop: 0
        //backgroundColor: 'red',
    },
    tabs_container: {
        height: appTheme.normalize( .05 * appTheme.SIZES.height ),
        // marginBottom: ( 20 / 375 ) * appTheme.SIZES.width,
    },
    tabs_style: {
        backgroundColor: COLORS.lightGrey,
    },
    tabs_background: {
        backgroundColor: COLORS.white,
    },
    selectedStyle: {
        color: COLORS.primary, fontWeight: 'bold'
    },
    selectedIconStyle: {
        borderWidth: 0.9,
        height: appTheme.normalize( 25 ),
        backgroundColor: "white",
        borderRadius: 50,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.34,
        shadowRadius: 3.27,
        elevation: 10,
        borderColor: COLORS.primary,
    },
    tabname_style: {
        fontSize: appTheme.FONTS.body1.fontSize
    },
    class_spec_container: {
        flexDirection: "column",
        borderWidth: 0,
        position: "relative",
        // flex: 1,
        margin: appTheme.normalize( 20 ),
        // top: appTheme.normalize( .35 * appTheme.SIZES.height ),
        // left: "10%",
        top: appTheme.normalize( 10 ),
        height: appTheme.normalize( 45 )
    },
    speedometer_container: {
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        // justifyContent: "flex-end",
        flex: 1,
        alignItems: "flex-end",
        position: 'relative',
        // bottom: appTheme.normalize( .45 * appTheme.SIZES.height ),
        right: '0%',
        // top: '10%',
    },

    license_addr_copy_font: {
        fontSize: appTheme.FONTS.body1.fontSize,
    },
    license_status_container_wrapper: {
        flexDirection: "row",
        paddingTop: 5,
        bottom: '20%',
    },
    license_status_container: {
        justifyContent: "flex-start", flex: 0,
    },
    addr_container: {
        flexDirection: "row", alignItems: "center", bottom: '20%',
    },
    badge_font: {
        textAlign: "center",
        fontSize: appTheme.FONTS.body2.fontSize,
    },
    name_font: {
        fontSize: appTheme.FONTS.body4.fontSize,
    },
    network: {
        fontSize: appTheme.normalize( 12 ),
    },
    class_spec_title_font: {
        fontSize: appTheme.FONTS.body2.fontSize,
    },
    class_spec_font: {
        fontStyle: "italic",
        textDecorationColor: "black",
        textDecorationStyle: "solid",
        textDecorationLine: "underline",
    },
} );