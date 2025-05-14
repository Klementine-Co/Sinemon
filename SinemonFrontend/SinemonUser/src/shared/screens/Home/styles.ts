import { StyleSheet , Dimensions} from "react-native";

import { COLORS} from '../../constants';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.white,
        
    },
    header_bar_top_screen:{
        height: '6%',
        width:'100%',
        backgroundColor: 'grey',
        justifyContent: 'space-around',
    },
    screen_view:{
        marginBottom:30,
    },
    header:{
        borderWidth:0, 
        borderRadius:8,
        height:90, 
        marginTop:10,
        marginLeft:10,
        marginRight:10,
        backgroundColor:COLORS.white,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.36,
        shadowRadius: 6.68,

        elevation: 11,
    },
    header_message:{
        borderWidth:0, 
        position:'absolute',
        height:'70%',
        width:'60%',
        top:10,
        left:15,
        justifyContent:'center',
    },
    header_welcome:{
        color:'grey', 
        fontWeight:'bold', 
        fontSize:16
    },
    header_user_name:{
        fontSize:28
    },
    header_image:{
        position:'absolute',
        height:'80%',
        width:'15%',
        top:8,
        marginLeft:8,
        right:15,
        borderRadius:10
    },
    home_page_video:{
        height: Dimensions.get("screen").height * .25,
        borderRadius:0, 
        marginTop:25,
        alignSelf:'center',
        width: '95%'
    },
    listItem: {
        marginTop: 10,
        backgroundColor: COLORS.white,
        borderWidth: 0.1,
        width: "85%",
        flex: 1,
        alignSelf: "center",
        justifyContent:'center',
        alignItems:'center',
        flexDirection: "row",
        borderRadius: 8,
        borderColor:COLORS.black,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 6.84,
        elevation: 5,
        marginBottom:25
    },
    
    list_header_article: {
        height: Dimensions.get("screen").height * 0.25,
        borderRadius: 0,
        marginTop: 25,
        alignSelf: "center",
        width: "80%",
    },

    list_article_image: {
        width: 80,
        height: 80,
        borderRadius: 10,
        marginRight:8,
        marginLeft:8
    },

    list_article_headline: {
        color: "black",
        fontWeight: "bold",
        fontSize: 13,
        marginTop:8,
        marginLeft:8,
        marginRight:8
        // height:80
    },
    list_article_info: {
        height:80,
        marginTop:8,
        marginLeft:8,
        marginRight:8
    },
    list_article: {
        width: "80%",
        justifyContent: "center",
        flex:1,
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
    },
    });

    const pickerSelectStyles = StyleSheet.create({
    inputIOS: {
        fontSize: 12,
        paddingVertical: 10,
        paddingHorizontal: 10,
        borderWidth: 2,
        borderColor: 'gold',
        borderRadius: 4,
        color: 'black',
        paddingRight: 30, // to ensure the text is never behind the icon
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 5
        
    },
    inputAndroid: {
        fontSize: 16,
        paddingHorizontal: 10,
        paddingVertical: 8,
        borderWidth: 0.5,
        borderColor: 'purple',
        borderRadius: 8,
        color: 'black',
        paddingRight: 30, // to ensure the text is never behind the icon
    },
    });
    const clubpickerSelectStyles = StyleSheet.create({
    inputIOS: {
        fontSize: 10,
        paddingVertical: 10,
        paddingHorizontal: 10,
        borderWidth: 2,
        borderColor: 'grey',
        borderRadius: 1,
        color: 'black',
        paddingRight: 30, // to ensure the text is never behind the icon
        justifyContent: 'center',
        alignItems: 'center',
        // marginRight: 5,
        margin:3,
        height:100
    },
    inputAndroid: {
        fontSize: 16,
        paddingHorizontal: 10,
        paddingVertical: 8,
        borderWidth: 0.5,
        borderColor: 'purple',
        borderRadius: 8,
        color: 'black',
        paddingRight: 30, // to ensure the text is never behind the icon
    },
});

export {styles,
    pickerSelectStyles,
    clubpickerSelectStyles}