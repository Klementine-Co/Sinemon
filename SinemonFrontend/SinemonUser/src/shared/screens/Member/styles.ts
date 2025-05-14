import { StyleSheet } from 'react-native';
import { COLORS, appTheme } from '../../constants';
import { ScreenHeight } from 'react-native-elements/dist/helpers';

export const MProfile_styles = StyleSheet.create( {
    container: {
        flex: 1,
        backgroundColor: COLORS.white,
    },
    content_container: {
        flex: 1,
        paddingHorizontal: appTheme.normalize( appTheme.SIZES.padding - 12 ),
        marginTop: "2%",
        height: "100%",
    },
    tabs_container: {
        height: appTheme.normalize( .05 * appTheme.SIZES.height ),
        // width: '100%',
        // backgroundColor: 'red'
        // marginBottom: 5,
    },
    tabs_style: {
        backgroundColor: COLORS.lightGrey,
    },
    tab_style: {
        fontSize: appTheme.FONTS.body1.fontSize,
    },
    tabs_selected_style: {
        borderWidth: 0.1,
        height: appTheme.FONTS.h1.fontSize,
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
    },
    card_container: {
        height: '25%',//appTheme.normalize( .25 * ScreenHeight ),
        width: '90%',//appTheme.normalize( .80 * ScreenWidth ),
        position: "relative",
        top: appTheme.normalize( .02 * ScreenHeight ),
        // left: "5%",
        // right: "5%",
        borderRadius: 15,
        marginHorizontal: appTheme.SIZES.padding + 5,
        marginVertical: appTheme.SIZES.padding + 15,
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
    switch_status_container: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "flex-start",
        flex: 1
    },
    member_name: {
        fontSize: appTheme.FONTS.h2.fontSize,
        marginRight: 10
    },
    status_container: {
        backgroundColor: "cornsilk",
        width: appTheme.normalize( 90 ),
        borderRadius: 100,
    },
    status_text: {
        textAlign: "center",
        fontSize: appTheme.FONTS.body2.fontSize,
    },
    switch_acc_container: {
        backgroundColor: "lightblue",
        width: appTheme.normalize( 90 ),
        borderRadius: 100,

    },
    switch_acc_text: {
        textAlign: "center",
        fontSize: appTheme.FONTS.body1.fontSize,
    },
    addr_container: {
        flexDirection: "row",
        alignItems: "center",
    },
    addr_text: {
        fontSize: appTheme.FONTS.body2.fontSize,
    },
    insurance_container: {
        paddingTop: 15,
        flexDirection: "row",
        justifyContent: "flex-start",
    },
    insurance_text: {
        fontSize: appTheme.FONTS.body1.fontSize,
    },
    edit_container: {
        marginTop: 15
    },
    edit_text: {
        fontSize: appTheme.FONTS.body1.fontSize,
        color: COLORS.primary,
    },
    queue_status_container: {
        backgroundColor: "cornsilk",
        width: appTheme.normalize( 90 ),
        borderRadius: 100,
    },
    queue_status_text: {
        textAlign: "center",
        fontSize: appTheme.FONTS.body2.fontSize,
    },


} );
