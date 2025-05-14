import { StyleSheet } from 'react-native';
import { COLORS, appTheme } from '../../constants';

export const Thread_styles = StyleSheet.create( {
    container: {
        backgroundColor: '#f5f5f5',
        flex: 1,
    },
    header_container: {
        height: '6%',
        width: '100%',
        backgroundColor: 'grey',
        justifyContent: 'space-around',
    },
    contentContainerStyle: { marginTop: 20 },
    threads_container: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
        flex: 1,
    },
    thread_container: { borderBottomWidth: 1, width: '85%' },
    listTitle: {
        fontSize: appTheme.FONTS.body4.fontSize,
    },
    listDescription: {
        fontSize: appTheme.FONTS.body2.fontSize,
    },
} );

export const Chat_styles = StyleSheet.create( {
    container: {
        flex: 1,
    },
} );
