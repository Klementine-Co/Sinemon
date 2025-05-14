

// import { Animated } from 'react-native'
// import React, {useContext} from 'react'
// import {
//   View,
//   Text,
//   TouchableOpacity,
//   Image,
// } from 'react-native';
// import {API, images, icons, COLORS, FONTS, SIZES, vid} from '../../../constants';



// export default class Insurance2 extends React.Component {




//   static defaultProps = {
//   queueitem : []
// }

//   constructor(props) {
//     super(props)
//     //console.log(props, 'props');
//     // this.onLongPress = this.onLongPress.bind(this)
//     this.state = {
  

//     };

//     // this.state.id = useContext(QueueContext).myid;
//     //console.log(this.context);
    

//     //console.log('constructor');


//   }
 


//   getCon(){

//       //console.log('get connection');

//   };

   

//   componentDidMount() {
  
//console.log(this.props.route.params);
    

//    };
//   componentWillUnmount() {

//     //console.log('unmounted');
//    };

//   componentDidUpdate(prevProps, prevState) {



//console.log(this.props.route.params);
    
//       //console.log(prevProps, this.props);
//console.log("didupdate in insurance");

//   };

  





// getProviderHeader(){

// //console.log(this.context[0].queuedata)
  
//       return(
//           <View style={{flex:1, alignItems:'center', justifyContent:'center'}}>
//         <View>
//           <Text style={{color:'black', fontSize:34}}>
//           Insurer Name
//           </Text>
//         </View>
//         <View>
//           <Text style={{color:'black', fontSize:22}}>
//           Member ID
//           </Text>
//         </View>
//         <View>
//           <Text style={{color:'black', fontSize:22}}>
//           Group No
//           </Text>
//         </View>
//         <View>
//           <Text style={{color:'black', fontSize:20}}>
//           Benefit Plan
//           </Text>
//         </View>
//         <View>
//           <Text style={{color:'black', fontSize:16}}>
//           Date Uploaded
//           </Text>
//         </View>
//         <View>
//           <Text style={{color:'black', fontSize:16}}>
//           1 800 No
//           </Text>
//         </View>
//         <View>
//           <Text style={{color:'black'}}>
//           DEBUG
//           </Text>
//         </View>
//         <View>
//           <Text style={{color:'black'}}>
//           DEBUG
//           </Text>
//         </View>
       
//           </View>
//       );
// };

// render() { 
//   // this.getid();
//   // this.getCon();
//   // if(this.context[0].socket?.connected){
//     //console.log('render stat', this.context[0].queuedata.myStatus);
//   //console.log(this.context[0].queuedata.myStatus);
//   //   // this.events();
//   // }

//   //console.log('in render before return');
//   //console.log(this.context[0].socket.connected);
//   // this.initContext()
//      return (
//       //   <>
//       //   <View style={{flex:1, justifyContent:'center', alignSelf:'center'}}>
//       // <Text>
//       //   {this.state.queueContext}
//       // </Text>
//       // </View>
//       // </>
//         <>
//       {this.getProviderHeader()}
//         </>
     
//     )
    
//   }
// }