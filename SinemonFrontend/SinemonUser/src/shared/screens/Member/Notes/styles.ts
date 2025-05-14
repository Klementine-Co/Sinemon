import {StyleSheet} from 'react-native';
import { COLORS } from '../../../constants';

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.white,
        marginTop:-75
    },
    listItem:{
        // margin:10,
        // padding:10,
        marginTop: 15,
        backgroundColor:"#FFF",
        width:"90%",
        flex:1,
        alignSelf:"center",
        flexDirection:"row",
        // borderRadius:5,
        // borderBottomWidth:1
        
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
  });