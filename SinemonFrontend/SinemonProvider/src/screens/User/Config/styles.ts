import { StyleSheet } from 'react-native';
import { COLORS, appTheme } from '../../../constants';

export const OfficeConfig_styles = StyleSheet.create( {
    container: {
        flex: 1,
        backgroundColor: COLORS.white,
    },
    selectedIconStyle: {
        borderBottomWidth: appTheme.normalize( 2 ),
        borderBottomColor: COLORS.primary,
        borderTopWidth: appTheme.normalize( 2 ),
        borderTopColor: COLORS.primary,
        height: appTheme.normalize( 25 ),
        backgroundColor: "lightgrey",
        borderRadius: appTheme.normalize( 50 ),
    },
    tab_text_font: {
        fontSize: appTheme.FONTS.body2.fontSize,
    },
    tabs_background: {
        backgroundColor: COLORS.white,
    },
    tabs_container: {
        height: '15%', flex: 1,
    },
    header: {
        height: '6%',
        width: '100%',
        backgroundColor: 'grey',
        justifyContent: 'space-around',
    },

} );
export const QueueConfig_styles = StyleSheet.create( {
    container: {
        flex: 1,
        backgroundColor: COLORS.white,
    },
    scrollView: {
        marginHorizontal: appTheme.normalize( 8 ),
        marginTop: appTheme.normalize( 20 ),
        marginBottom: appTheme.normalize( 20 ),
        borderWidth: appTheme.normalize( 1 ),
        borderRadius: appTheme.normalize( 25 ),
        backgroundColor: COLORS.white,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 5 },
        shadowOpacity: appTheme.normalize( 0.34 ),
        shadowRadius: appTheme.normalize( 6.27 ),
        elevation: appTheme.normalize( 10 ),
        borderColor: COLORS.primary,
        paddingVertical: appTheme.normalize( 10 ),
    },
    inputWrapper: {
        marginLeft: appTheme.normalize( 10 ),
        marginVertical: appTheme.normalize( 10 ),
    },
    input: {
        textAlign: 'center',
        marginHorizontal: appTheme.normalize( 10 ),
        paddingVertical: appTheme.normalize( 10 ),
        paddingHorizontal: appTheme.normalize( 10 ),
        height: appTheme.normalize( 40 ),
        borderWidth: appTheme.normalize( 0.5 ),
        borderRadius: appTheme.normalize( 15 ),
        borderColor: COLORS.primary,
        fontSize: appTheme.FONTS.body2.fontSize,
        backgroundColor: 'white',
    },
    dateTimePickerWrapper: {
        marginHorizontal: appTheme.normalize( 10 ),
        marginTop: appTheme.normalize( 10 ),
    },
    dateTimeText: {
        textAlign: 'center',
        color: COLORS.black,
        fontSize: appTheme.FONTS.body2.fontSize,
    },
    stateText: {
        alignSelf: 'center',
        color: COLORS.black,
        fontSize: appTheme.FONTS.body2.fontSize,
    },
    picker: {
        width: '100%',
    },
    buttonWrapper: { flex: 1, alignItems: 'center', justifyContent: 'flex-end' },
    button: {
        backgroundColor: COLORS.primary,
        width: '45%',
        alignSelf: 'center',
        borderRadius: appTheme.normalize( 25 ),
        margin: appTheme.normalize( 20 ),
    },
    buttonText: {
        fontSize: appTheme.FONTS.h2.fontSize,
        textAlign: 'center',
        marginVertical: appTheme.normalize( 5 ),
        color: 'white',
    },
} );
export const LobbyConfig_styles = StyleSheet.create( {
    container: {
        flex: 1,
        backgroundColor: COLORS.white,
    },
    scrollView: {
        marginHorizontal: appTheme.normalize( 8 ),
        marginTop: appTheme.normalize( 20 ),
        marginBottom: appTheme.normalize( 20 ),
        borderWidth: appTheme.normalize( 1 ),
        borderRadius: appTheme.normalize( 25 ),
        backgroundColor: COLORS.white,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 5 },
        shadowOpacity: appTheme.normalize( 0.34 ),
        shadowRadius: appTheme.normalize( 6.27 ),
        elevation: appTheme.normalize( 10 ),
        borderColor: COLORS.primary,
        paddingVertical: appTheme.normalize( 10 ),
    },
    inputWrapper: {
        marginLeft: appTheme.normalize( 10 ),
        marginVertical: appTheme.normalize( 10 ),
    },
    input: {
        textAlign: 'center',
        marginHorizontal: appTheme.normalize( 10 ),
        paddingVertical: appTheme.normalize( 10 ),
        paddingHorizontal: appTheme.normalize( 10 ),
        height: appTheme.normalize( 40 ),
        borderWidth: appTheme.normalize( 0.5 ),
        borderRadius: appTheme.normalize( 15 ),
        borderColor: COLORS.primary,
        fontSize: appTheme.FONTS.body2.fontSize,
        backgroundColor: 'white',
    },
    dateTimePickerWrapper: {
        marginHorizontal: appTheme.normalize( 10 ),
        marginTop: appTheme.normalize( 10 ),
    },
    dateTimeText: {
        textAlign: 'center',
        color: COLORS.black,
        fontSize: appTheme.FONTS.body2.fontSize,
    },
    stateText: {
        alignSelf: 'center',
        color: COLORS.black,
        fontSize: appTheme.FONTS.body2.fontSize,
    },
    picker: {
        width: '100%',
    },
    button: {
        backgroundColor: COLORS.primary,
        width: '45%',
        alignSelf: 'center',
        borderRadius: appTheme.normalize( 25 ),
        margin: appTheme.normalize( 20 ),
    },
    buttonWrapper: { flex: 1, alignItems: 'center', justifyContent: 'flex-end' },
    buttonText: {
        fontSize: appTheme.FONTS.h2.fontSize,
        textAlign: 'center',
        marginVertical: appTheme.normalize( 5 ),
        color: 'white',
    },
} );
