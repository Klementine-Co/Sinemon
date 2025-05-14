import { StyleSheet } from 'react-native';
import { COLORS, appTheme } from '../../constants';


export const QueueHeader_styles = StyleSheet.create( {
    container: {
        flex: 1,
        justifyContent: 'center',
        alignSelf: 'center',
        flexDirection: 'row',
    },
    status_container: {
        justifyContent: 'center',
        alignSelf: 'center',
        height: '100%',
        width: '45%',
        // marginTop: '2%',
        paddingVertical: 10,
        // flex: 1
    },
    status_body: {
        color: COLORS.black,
        fontSize: appTheme.FONTS.body3.fontSize,
        fontWeight: 'bold',
        alignSelf: 'center',
    },
    status_action_button: {
        backgroundColor: COLORS.primary,
        borderWidth: 0.1,
        borderRadius: 100,
        width: '100%',
        alignSelf: 'center',
        marginVertical: '3%',
        flex: 1,
        height: '50%',
    },
    status_action_button_text: {
        fontSize: appTheme.FONTS.body2.fontSize,
        textAlign: 'center',
        color: COLORS.white,
    },
} );
export const Queue_styles = StyleSheet.create( {
    container: {
        flex: 1,
        backgroundColor: COLORS.white,
    },
    sectionHeader: {
        fontSize: appTheme.FONTS.h1.fontSize,
        fontWeight: 'bold',
        marginVertical: 20,
        marginLeft: 10,
    },
    section_contentContainerStyle: {
        // marginTop: 60,
        paddingBottom: '20%',
    },
    header_containerStyle: {
        height: '6%',
        width: '100%',
        backgroundColor: 'grey',
        justifyContent: 'space-around',
    },
    list: {
        paddingBottom: 0,
        height: '65%',
    },
    listItem_name: {
        fontSize: appTheme.FONTS.body2.fontSize,
        textAlign: 'left',
        marginLeft: '5%',
    },
    listItem_est_wait: {
        fontSize: appTheme.FONTS.body1.fontSize,
        textAlign: 'left',
        marginLeft: '5%',
    },
    listItem_date: {
        fontSize: appTheme.FONTS.body1.fontSize,
        textAlign: 'left',
        marginLeft: '5%',
    },
} );
