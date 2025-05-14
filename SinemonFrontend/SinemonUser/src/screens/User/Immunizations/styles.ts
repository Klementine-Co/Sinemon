import { StyleSheet } from 'react-native';
import { COLORS } from '../../../constants';

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.white,
        width: '100%'
    },
    listItem: {
        marginTop: 20,
        backgroundColor: "#FFF",
        alignSelf: "center",
        flexDirection: "row",
        borderRadius: 5,
        borderBottomWidth: 0.7,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center'

    }
});