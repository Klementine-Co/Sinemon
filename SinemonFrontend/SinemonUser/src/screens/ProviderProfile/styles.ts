import { StyleSheet } from 'react-native';
import { COLORS, appTheme } from '../../constants';


export const Account_styles = StyleSheet.create( {
    container: {
        flex: 1,
        backgroundColor: COLORS.white,
        marginTop: -75,
    },
    card: {
        height: .21 * appTheme.SIZES.height,
        position: "absolute",
        bottom: .08 * appTheme.SIZES.height,
        left: "5%",
        right: "5%",
        borderRadius: 15,
        padding: appTheme.SIZES.padding - 5,
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
        marginTop: `${ ( 5 / 375 ) * appTheme.SIZES.width }%`,
        height: "100%",
        paddingBottom: 10,
    },
    tabs_container: {
        top: .05 * appTheme.SIZES.height * Math.round( appTheme.SIZES.width / 375 ), marginBottom: ( 20 / 375 ) * appTheme.SIZES.width,
    },
    tabs_background: {
        backgroundColor: COLORS.white,
    },
    selectedStyle: {
        color: COLORS.primary, fontWeight: 'bold'
    },
    selectedIconStyle: {
        borderWidth: 0.9,
        height: ( 25 / 375 ) * appTheme.SIZES.width,
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
        fontSize: ( 14 / 375 ) * appTheme.SIZES.width
    },
    class_spec_container: {
        flexDirection: "column",
        borderWidth: 0,
        position: "absolute",
        top: appTheme.normalize( .35 * appTheme.SIZES.height ),
        left: "10%"
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
        justifyContent: "flex-end", flex: 1, alignItems: "flex-end",
        position: 'absolute',
        bottom: appTheme.normalize( .45 * appTheme.SIZES.height ),
        right: '-5%',
    },

    license_addr_copy_font: {
        fontSize: appTheme.FONTS.body1.fontSize,
    },
    license_status_container_wrapper: {
        flexDirection: "row",
        paddingTop: 5,
        bottom: '5%',
    },
    license_status_container: {
        justifyContent: "flex-start", flex: 0,
    },
    addr_container: {
        flexDirection: "row", alignItems: "center", bottom: '5%',
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