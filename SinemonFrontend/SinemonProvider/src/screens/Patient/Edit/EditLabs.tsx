
import { useState } from 'react';
import {
    StyleSheet,
    View,
    Text,
    Image,
    TouchableOpacity,
    FlatList} from 'react-native';
import { icons, COLORS } from '../../../constants';


  const EditLabs = ({ navigation, labs, lab }) => {
      
    
    
const [visible, setVisible] = useState(true);




const EditingLabs = () => {


    return(
      <View style={{ flex: 1,  height:'100%', width:'100%'}} >
         <TouchableOpacity  onPress={() => setVisible(false)} style={{}}>
              <Text style={{fontSize:20, textAlign:'left'}}>Add Lab</Text>
         </TouchableOpacity>
              <FlatList
            pagingEnabled = { false }
            style={{width:'100%'}}
            snapToAlignment={'center'}
            decelerationRate='fast'
            // snapToAlignment={"start"}
              vertical
              showsVerticalScrollIndicator={false}
              data={labs}
              keyExtractor={item => item.uploaded.toString()}
              renderItem={({ item}) =>  Item(item)}
              />
             
        </View> 
    );
}
// const AddingLab = () => {


//     return(
//       <View style={{ flex: 1,  height:'100%', width:'100%'}} >
         
//               <Text style={{fontSize:20, textAlign:'left'}}>Add Lab</Text>
//               <FlatList
//             pagingEnabled = { false }
//             style={{width:'100%'}}
//             snapToAlignment={'center'}
//             decelerationRate='fast'
//             // snapToAlignment={"start"}
//               vertical
//               showsVerticalScrollIndicator={false}
//               data={labs}
//               keyExtractor={item => item.uploaded.toString()}
//               renderItem={({ item}) =>  Item(item)}
//               />
             
//         </View> 
//     );
// }

function DisplayLab(item){
    if(item.status == 'O'){
       return (<Image source={icons.pending} style={{  right:25,height:16, width:16}}></Image>);
    }else{
        return (<TouchableOpacity  onPress={() => navigation.navigate()} style={{right:40}}><Text style={{ }}> </Text></TouchableOpacity>);
        // return (<TouchableOpacity  onPress={() => navigation.navigate()} style={{right:40}}><Text style={{ }}> Delete</Text></TouchableOpacity>);
    }
};
function Item( item ) {
    return (
  
      <View style={{...styles.listItem, width:'100%'}}>
      <View style={{height:70,width:'100%', justifyContent:"center", flexDirection:'row', alignItems:'center'}}>
        <View style={{borderBottomWidth:1, width:'100%', left:50}}>
        <Text style={{color:COLORS.primary, paddingBottom:5}}>Dr. {item.prov_firstname} {item.prov_lastname}</Text>
        <Text >{item.brief_desc}</Text>
        </View>
        {DisplayLab(item)}
      </View>
      </View>
    );
  };


    return (

        <>
        {
          
          (visible === true) ? ( <EditingLabs/>): (lab)
          
        }
        
        </> 

    );
};

const styles = StyleSheet.create({
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

export default EditLabs;