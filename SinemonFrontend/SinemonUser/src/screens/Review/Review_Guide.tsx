
import { useState} from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
} from "react-native";
import { COLORS } from "../../constants";




export default function Review_Guide (props:reviewprops) {
    const {pageaction, leaveComment, pageactions } = props;
    
    const LEAVECOMMENT = (arg:string) =>{
      if (leaveComment!== undefined){return(leaveComment(arg))}
    };
    const PAGEACTION = (arg:number) =>{
      if (pageaction!== undefined){return(pageaction(arg))}
    };
    const PAGEACTIONS = () =>{
      if (pageactions!== undefined){return(pageactions())}
    };
      
        return (


          <View style={styles.container}>
          <View style={{borderColor:'black', borderWidth:3, flex:1, maxHeight:500}}>

              <Text>
                Please select below to describe your visit with Dr Blank
                *This is only neccessary if it is your first time visiting, and completely voluntary later.
                </Text>


                <TouchableOpacity style={{flex: 1, borderColor:'black', borderWidth:3, height:50, flexDirection:'row', justifyContent:'center', alignItems:'center'}} onPress={()=>{LEAVECOMMENT('SATISFIED'), PAGEACTION(4)}}>
                  <Text>
                    I was satisfied with dr blank because, ___ 
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity style={{flex: 1, borderColor:'black', borderWidth:3, height:50, flexDirection:'row', justifyContent:'center', alignItems:'center'}} onPress={()=>{LEAVECOMMENT('NOT SATISFIED'), PAGEACTION(4)}}>
                  <Text>
                    I was not satisfied with dr blank because, ___ 
                  </Text>
                </TouchableOpacity>
                {/* <TouchableOpacity style={{flex: 1, borderColor:'black', borderWidth:3, height:50, flexDirection:'row', justifyContent:'center', alignItems:'center'}} onPress={()=>{LEAVECOMMENT('ECSTATIC'), PAGEACTION(4)}}>
                  <Text>
                    I am ecstatic with dr blank because, ___ 
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity style={{flex: 1, borderColor:'black', borderWidth:3, height:50, flexDirection:'row', justifyContent:'center', alignItems:'center'}} onPress={()=>{LEAVECOMMENT('DISAPPOINTED'), PAGEACTION(4)}}>
                  <Text>
                    I am disappointed with dr blank because, ___ 
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity style={{flex: 1, borderColor:'black', borderWidth:3, height:50, flexDirection:'row', justifyContent:'center', alignItems:'center'}} onPress={()=>{LEAVECOMMENT('OVER'), PAGEACTION(4)}}>
                  <Text>
                    I am over the moon with dr blank because,  ___ 
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity style={{flex: 1, borderColor:'black', borderWidth:3, height:50, flexDirection:'row', justifyContent:'center', alignItems:'center'}} onPress={()=>{LEAVECOMMENT('LIVID'), PAGEACTION(4)}}>
                  <Text>
                    I am livid with dr blank because,  ___ 
                  </Text>
                </TouchableOpacity> */}

            </View>





            {PAGEACTIONS()}
            </View>
        );
    // };
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
    marginTop: 50,
  },
  listItem: {
    // margin:10,
    // padding:10,
    marginTop: 15,
    backgroundColor: "#FFF",
    width: "90%",
    flex: 1,
    alignSelf: "center",
    flexDirection: "row",
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
  },
});