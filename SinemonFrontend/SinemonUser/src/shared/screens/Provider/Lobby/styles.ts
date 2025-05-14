import { StyleSheet } from 'react-native';
import { COLORS, appTheme } from '../../../constants';

export const Lobby_styles = StyleSheet.create( {
    button: {
        borderWidth: appTheme.normalize( 0.1 ),
        height: '15%',
        width: '70%',
        backgroundColor: COLORS.primary,
        justifyContent: 'center',
        borderRadius: appTheme.normalize( 13 ),
    },
    get pause_button () {
        return {
            ...this.button,
        };
    },
    pause_button_text: {
        fontSize: appTheme.FONTS.body3.fontSize,
        textAlign: 'center',
        color: COLORS.white,
    },
    get config_button () {
        return {
            ...this.button,
            flexDirection: 'row',
            marginTop: appTheme.normalize( 30 ),
        };
    },
    config_button_text: {
        fontSize: appTheme.FONTS.body3.fontSize,
        textAlign: 'center',
        color: COLORS.white,
        justifyContent: 'center',
        alignSelf: 'center',
        flex: 1,
    },
    config_icon: {
        justifyContent: 'center', alignSelf: 'center',
        fontSize: appTheme.normalize( 30 ),
    },
    butons_container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    queue_title: {
        fontSize: appTheme.FONTS.h2.fontSize,
        textAlign: 'left',
        // marginTop: appTheme.normalize( 15 ),
    },
    one_person_line_queue: {
        fontSize: appTheme.FONTS.body4.fontSize,
        color: COLORS.tertiary,
    },
    queue_line_status: {
        fontSize: appTheme.FONTS.body3.fontSize,
        textAlign: 'left',
        paddingTop: appTheme.normalize( 10 ),
        color: COLORS.neutral,
    },
    wait_time: {
        fontSize: appTheme.FONTS.body2.fontSize,
        textAlign: 'left',
        paddingTop: appTheme.normalize( 10 ),
        marginBottom: appTheme.normalize( 20 ),
    },
    get wait_time_h_gt_0 () {
        return {
            ...this.wait_time,
            left: '15%',
        };
    },
    get wait_time_m_gt_0 () {
        return {
            ...this.wait_time,
        };
    },
    get no_wait () {
        return {
            ...this.wait_time,
            color: COLORS.black,
        };
    },
    container: {
        flex: 1,
        flexDirection: 'column',
        height: '100%',
        marginTop: appTheme.normalize( 10 ),
    },
} );
