import { StyleSheet } from 'react-native';
import { COLORS, appTheme } from '../../../constants';


export const NotesInfo_styles = StyleSheet.create( {

    container: {
        paddingTop: 20,
        flexDirection: 'row',
    },
    image_style: {
        height: '100%',
        width: '5%',
    },
    title: {
        fontSize: appTheme.FONTS.body2.fontSize,
    },

} );
export const VaccineInfo_styles = StyleSheet.create( {

    container: {
        marginTop: 15,
        backgroundColor: "#FFF",
        width: '75%',
        flex: 1,
        paddingTop: 5,
        paddingBottom: 35,
        flexDirection: "row",
        alignItems: 'center',
    },
    vaccine_content: {
        borderBottomWidth: 1,
        paddingBottom: 15,
        width: '100%',
    },
    vaccine_text: {
        color: COLORS.primary,
        fontSize: appTheme.FONTS.body1.fontSize,
        paddingLeft: appTheme.normalize( 16 ),
    },
    image_style: {
        height: '60%',
        width: '5%',
        justifyContent: 'flex-start',
        paddingRight: appTheme.normalize( 16 ),
    },

} );
export const MedicalInfo_styles = StyleSheet.create( {

    container: {
        paddingTop: appTheme.normalize( 20 ),
        marginBottom: appTheme.normalize( 30 ),
        flex: 1,
    },
    info_header: {
        fontSize: appTheme.FONTS.h3.fontSize,
    },
    info_item: {
        fontSize: appTheme.FONTS.body1.fontSize,
        paddingTop: 5,
    },
    info_item_value: {
        fontSize: appTheme.FONTS.body2.fontSize,
    }

} );
export const MedicalInsuranceCard_styles = StyleSheet.create( {

    MedicalInsuranceCardTop: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingTop: 10,
    },
    MedicalInsuranceCardMemberID: {
        backgroundColor: 'cornsilk',
        width: '100%',
        borderRadius: 100,
        flex: 1,
        textAlign: 'center',
        fontSize: appTheme.FONTS.body2.fontSize,
    },
    MedicalInsuranceCardBenefitPlan: {
        backgroundColor: COLORS.secondary,
        width: '100%',
        borderRadius: 100,
        flex: 1,
        textAlign: 'center',
        fontSize: appTheme.FONTS.body2.fontSize,
    },
    MedicalInsuranceCardDate: {
        paddingTop: 10,
        justifyContent: 'flex-start',
        flex: 1,
        fontSize: appTheme.FONTS.body2.fontSize,
    },
    MedicalInsuranceCardTel: {
        paddingTop: 10,
        justifyContent: 'flex-start',
        flex: 1,
        fontSize: appTheme.FONTS.body2.fontSize,
    },
    MedicalInsuranceCardSeeMoreContainer: {
        marginTop: 30,
        flexDirection: 'row',
        justifyContent: 'flex-start',
    },
    MedicalInsuranceCardSeeMore: {
        fontSize: appTheme.FONTS.body2.fontSize,
        color: COLORS.primary,
    },
    MedicalInsuranceCardInsurer: {
        fontSize: appTheme.FONTS.body2.fontSize,
    },
    MedicalInsuranceCardContainer: {
        justifyContent: 'center',
        height: '80%',
        flex: 1,
        marginTop: 10,
        width: "85%",
        left: "5%",
        right: "5%",
        borderRadius: 15,
        padding: appTheme.SIZES.padding - 12,
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

} );
export const Profile_styles = StyleSheet.create( {
    container: {
        flex: 1,
        backgroundColor: COLORS.white,
        // width: '100%',
        // height: '100%',
        // marginTop: 0,
        paddingHorizontal: 12
    },
    listItem: {
        marginTop: 15,
        backgroundColor: "#FFF",
        width: '80%',
        flex: 1,
        paddingTop: 5,
        paddingBottom: 35,
        flexDirection: "row",
        alignItems: 'center',
    },
    note_content: {
        borderBottomWidth: 1,
        width: '100%',
    },
    note_name: {
        fontSize: appTheme.FONTS.body1.fontSize,
        color: COLORS.primary,
        paddingBottom: 5,
    },
    note_CC: {
        fontSize: appTheme.FONTS.body1.fontSize,
    },
    note_upload_date: {
        fontSize: appTheme.FONTS.body1.fontSize,
    },
    icon: {
        fontSize: appTheme.FONTS.body4.fontSize,
    },
    notes_container: {
        paddingBottom: 50,
    },
    shadow: {
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        elevation: 5,
    }
} );