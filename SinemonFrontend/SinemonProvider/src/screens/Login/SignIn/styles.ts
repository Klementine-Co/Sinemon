import { StyleSheet } from "react-native";
import { COLORS } from '../../../constants';

export const styles = StyleSheet.create({
    textInput: {
        height: '100%',
        borderRadius: 5,
        paddingHorizontal: 5,
        width: "100%",
        fontSize: 20,
       
 

    },
    contain: {
        alignItems: "flex-start",
        alignSelf:"center",
        padding: 20,
        marginTop: 80,
        width: "85%",
        backgroundColor: "white",
        borderWidth: .3,
        borderRadius:12,
        borderColor:COLORS.primary,
        height:'75%'
    },
    welcome: {
        marginTop: 25,
        fontSize: 25, 
        alignSelf:"center"
    },
    input: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: COLORS.white,
        marginTop: 10,
        paddingVertical: 10,
        width: '70%', 
        borderColor: COLORS.primary ,
        borderWidth: 0.5,
        borderRadius:12,
        height:'15%',
       
    },
    searchIcon: {
        padding: 10,
    },
    checkboxContainer: {
        flexDirection: "row",
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20,
        marginTop: 10,
    },
    checkbox: {
        alignSelf: "center",
        height: 15,
        width: 15
    },
    label: {
        margin: 8,
    },
});
