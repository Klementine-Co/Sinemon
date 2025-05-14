import { StyleSheet } from 'react-native';
import { COLORS, appTheme } from '../../../constants';



export const Presecriptions_styles = StyleSheet.create( {
    container: {
        marginTop: 15,
        backgroundColor: "#FFF",
        width: '80%',
        flex: 1,
        paddingTop: 15,
        paddingBottom: 35,
        flexDirection: "row",
        alignItems: 'center',
    },
    prescriptions_content: {
        borderBottomWidth: 1,
        paddingBottom: 15,
        width: '100%',
    },
    prescriptions_text: {
        color: COLORS.primary,
        fontSize: appTheme.FONTS.body2.fontSize,
        paddingLeft: appTheme.normalize( 16 ),
    },
    image_style: {
        height: '80%',
        width: '5%',
        justifyContent: 'flex-start',
        paddingRight: appTheme.normalize( 16 ),
    },

} );
export const Pharmacy_styles = StyleSheet.create( {

    container: {
        flex: 1, marginBottom: 20
    },
    cardContainer: {
        height: appTheme.normalize( 200 ),
        marginBottom: '5%',
    },
    card: {
        justifyContent: 'center',
        height: appTheme.normalize( 200 ),
        flex: 1,
        position: 'absolute',
        marginTop: 10,
        width: '90%',
        left: "5%",
        right: "5%",
        borderRadius: 15,
        padding: appTheme.SIZES.padding - 5,
        backgroundColor: COLORS.white,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    card_top: {
        justifyContent: 'flex-start',
        flex: 1,
    },
    card_header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'baseline',
        width: '95%',
        paddingTop: 0,
    },
    card_header_text: {
        fontSize: appTheme.FONTS.body2.fontSize,
    },
    card_id_plan: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingTop: 10,
    },
    member_id: {
        backgroundColor: 'cornsilk',
        width: '50%',
        borderRadius: 100,
        textAlign: 'center',
        fontSize: appTheme.FONTS.body2.fontSize,
    },
    benefit_plan: {
        backgroundColor: COLORS.secondary,
        width: '50%',
        borderRadius: 100,
        marginLeft: 5,
        textAlign: 'center',
        fontSize: appTheme.FONTS.body2.fontSize,
    },
    content_container: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingTop: 10,
    },
    rx_text: {
        fontSize: appTheme.FONTS.body2.fontSize,
    },
    SeeMore: {
        fontSize: appTheme.FONTS.body2.fontSize,
        color: COLORS.primary,
    },
    see_more_container: {
        flexDirection: 'row',
    },
    icon: {
        fontSize: appTheme.normalize( 25 ),
    },
} );