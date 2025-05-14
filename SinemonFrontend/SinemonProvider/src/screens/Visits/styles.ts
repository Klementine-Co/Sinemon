import { StyleSheet } from 'react-native';
import { COLORS, appTheme } from '../../constants';



export const FilterModal_styles = StyleSheet.create( {
    modalStyle: {
        flex: 1,
        padding: 10,
        justifyContent: 'center',
        alignItems: 'flex-start',
        backgroundColor: 'white', // Assuming your modal background is white
    },
    closeButton: {
        marginBottom: '10%',
        alignSelf: 'flex-end', // Adjust based on your design
    },
    sortByText: {
        fontSize: appTheme.FONTS.h3.fontSize,
        marginBottom: 10,
    },
    pickerStyle: {
        width: '100%',
    },
    divider: {
        borderWidth: 1,
        borderColor: COLORS.neutral,
        width: '100%',
        marginVertical: 10,
    },
    filterText: {
        fontSize: appTheme.FONTS.h2.fontSize,
        marginBottom: 10,
    },
    input: {
        fontSize: appTheme.FONTS.body3.fontSize,
        borderColor: COLORS.neutral,
        borderWidth: 1,
        borderRadius: 5,
        padding: 10,
        marginBottom: 10,
        width: '100%',
        minWidth: '50%'
    },
    applyButton: {
        marginTop: '10%',
        alignSelf: 'center',
    },
    applyText: {
        fontSize: appTheme.FONTS.h2.fontSize,
    },
} );

export const VisitList_styles = StyleSheet.create( {
    container: {
        flex: 1,
        backgroundColor: COLORS.white,
        width: '100%',
    },
    buttons_container: {
        height: appTheme.normalize( 70 ),
        width: '100%',
        alignItems: 'flex-end',
        alignSelf: 'flex-end',
    },
    bill_button_container_claim_present: {
        flex: 1,
        backgroundColor: COLORS.neutral,
        width: '45%',
        height: '50%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    bill_button_container_claim_not_present: {
        flex: 1,
        backgroundColor: COLORS.primary,
        width: '45%',
        height: '50%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    bill_button_text_claim_present: {
        fontSize: appTheme.FONTS.body2.fontSize,
        color: COLORS.primary,
        textAlign: 'center',
    },
    bill_button_text_claim_not_present: {
        fontSize: appTheme.FONTS.body2.fontSize,
        color: COLORS.white,
        textAlign: 'center',
    },
    view_button_container: {
        flexDirection: 'row',
        backgroundColor: COLORS.primary,
        width: '45%',
        height: '50%',
        justifyContent: 'center',
        alignItems: 'center',
        borderBottomWidth: 1,
        marginBottom: 5,
    },
    view_button_icon: {
        fontSize: appTheme.FONTS.body4.fontSize,
        marginLeft: 5,
        color: COLORS.white,
    },
    view_button_text: {
        fontSize: appTheme.FONTS.body1.fontSize,
        color: COLORS.white,
        textAlign: 'center',
        flex: 1,
        flexWrap: 'wrap',
    },
    listItemContainer: {
        margin: appTheme.normalize( 10 ),
        backgroundColor: COLORS.lightGray,
        borderRadius: appTheme.normalize( 5 ),
        shadowOpacity: appTheme.normalize( .5 ),
        shadowRadius: appTheme.normalize( 3.5 ),
        elevation: appTheme.normalize( 10 ),
        paddingHorizontal: appTheme.normalize( 10 ),
        paddingVertical: appTheme.normalize( 20 ),
        borderWidth: appTheme.normalize( 0.1 ),
        shadowColor: '#000',
        shadowOffset: {
            width: appTheme.normalize( 2 ),
            height: appTheme.normalize( 2 ),
        },
        borderBottomWidth: appTheme.normalize( 1 ),
    },
    listItem: {
        alignSelf: 'center',
        // flexDirection: 'row',
        // width: '100%',
        height: appTheme.normalize( 70 ),
        // alignItems: 'center',
        // justifyContent: 'center',
        flexDirection: 'column',
        alignItems: 'flex-start',
        width: '100%',
        justifyContent: 'center',
    },
    listItem_text: {
        fontSize: appTheme.FONTS.body1.fontSize,
        color: COLORS.black,
        fontWeight: 'bold',
        alignSelf: 'flex-start',
        textAlign: 'left',
        marginTop: 5,
    },
    VisitList_header_container: {
        alignSelf: 'center',
        justifyContent: 'center',
        height: appTheme.normalize( 40 ),
        width: '100%',
    },
    VisitList_header_text: {
        fontSize: appTheme.normalize( 20 ),
        textAlign: 'center',
    },
    refresh_button: {
        alignSelf: 'center',
        fontSize: appTheme.FONTS.body4.fontSize,
        color: COLORS.primary,
    },
    sort_container: {
        //borderWidth:2, borderColor:'red',
        backgroundColor: COLORS.gray,
        height: '10%',
        // justifyContent: 'flex-start',
        // alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: '100%',
        //borderWidth:1, borderColor:'pink',
        // height: '100%',
        flex: 1,
        alignItems: 'center',
    },
    sort_text: {
        color: COLORS.white,
        fontWeight: 'bold'
    },
    sort_icons: {
        color: COLORS.black,
        fontSize: appTheme.normalize( 30 ),
    },
    visits_contentContainerStyle: {
        paddingBottom: '10%',
    },
    visitsContainer: {
        alignSelf: 'center',
        width: '100%',
        marginTop: 1,
        flex: 1,
    },
    filterButtonContainer: {
        height: '2.5%',
        justifyContent: 'flex-start',
        alignItems: 'flex-end',
    },
    filterButton: {
        color: COLORS.primary,
        fontSize: appTheme.normalize( 30 ),
    },
} );
