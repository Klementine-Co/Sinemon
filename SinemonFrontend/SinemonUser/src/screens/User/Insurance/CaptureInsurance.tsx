// import React from 'react'
// import {
//   StyleSheet,
//   View,
//   Image,
//   Text,
//   TouchableOpacity,
//   FlatList,
//   Dimensions,
//   ScrollView,
//   SafeAreaView,
//   Button
// } from 'react-native';
// // import { Button, Header } from '@rneui/themed';
// import { TextInput } from 'react-native-gesture-handler';
// import { images, icons, COLORS, FONTS, SIZES, vid} from '../../../../constants';
// // import PDFView from 'react-native-view-pdf';
// // import Pdf from 'react-native-pdf';
// // import DocumentScanner from "react-native-document-scanner";
// import { Camera } from camera';
// import * as FileSystem from file-system';
// import * as MediaLibrary from media-library';




// // const resources = {
// //   file: Platform.OS === 'ios' ? 'path/to/image/insur.pdf' : 'path/to/image/insur.pdf',
// //   url: 'path/to/image/insur.pdf',
// //   base64: 'JVBERi0xLjMKJcfs...',
// // };


// export default class CaptureInsurance extends React.Component {

//   constructor(props) {
//     super(props)
//     // this.onLongPress = this.onLongPress.bind(this)
//     this.state = {
//      track:0,
//      navigation:null,
//      hasPermission:false,
//      type:Camera.Constants.Type.back,
//      ready:false
     
//     }
//     //console.log(props.route.params.thread);
//   }
 
  

//   componentDidMount() {
//     // const {navigation} = this.props;
//     // if (this.props.navigation === null){
//     //   this.setState({navigation:navigation});
//     // }
//     (async () => {
//       const { status } = await Camera.requestCameraPermissionsAsync();
//       const sizes = await this.camera.getAvailablePictureSizesAsync();
//       //console.log(sizes);
//       this.setState({hasPermission: status === 'granted'});
//     })();
//   }

//   gotoQueue(){

//     queueContext.joinQueue(licenses[0].prov.provider_id,'join');
//     this.props.navigation.navigate("Queue");
//   }

 
//   render() {
// //console.log(this.state.ready);
    
//     // const resourceType = 'file';
//     // const resourceType = require('file:///path/to/image/insur.jpg');
//     return (
//       <View style={{justifyContent:'center', alignItems:'center', width:'90%', alignSelf:'center'}}>
//       {/* <Header
//       containerStyle={{
//         height: '5%',
//         width:'100%',
//         backgroundColor: 'grey',
//         justifyContent: 'space-around',
//       }}
// placement="left"
// // leftComponent={pick}

// /> */}
// {/* <View style={{borderWidth:0, height:90, backgroundColor:'grey', marginBottom:15, marginTop:-2,alignItems:'center'}}>
//       <Image source={images.soccerPlayer}  style={{width:50, height:50,borderRadius:30, marginBottom:3}} />
//       <Text style={{color:'red'}}> Dr. Bob Sarah</Text>
//       </View>  */}


//       {/* <Text style={{textAlign:'center',fontSize:22, fontWeight:'bold',marginTop:30}}>
//         Level of pain/distress
//       </Text> */}


//      <View style={{backgroundColor:'grey', marginTop:40}}>
      
//       </View> 


//       {/* <View> */}
      
      


//       <Camera ref={ref => { this.camera = ref; }} style={styles.camera} type={this.state.type} autoFocus={'on'} focusDepth={1} pictureSize={"Photo"} zoom={.0049} onCameraReady = {()=> {this.setState({ready:true})}}>
//         {/* <View style={styles.buttonContainer}>
//           <TouchableOpacity
//             style={styles.button}
//             onPress={() => {
//               this.setState(
//                 { type: this.state.type === Camera.Constants.Type.back ? Camera.Constants.Type.front:Camera.Constants.Type.back});
//             }}>
//             <Text style={styles.text}> Flip </Text>
//           </TouchableOpacity>
//         </View> */}
//       </Camera>

//       <Button 
//       // style={{ marginTop:15, borderWidth:2 , width:100, height:100}} 
//       title="Take Picture"
//       color="tan"
//       onPress={async () => {
//             if (this.state.ready)
//             {
//               const sizes = await this.camera.takePictureAsync();
//               await MediaLibrary.saveToLibraryAsync(sizes.uri);
//               //console.log(sizes);
//             }
//             }
//             }
//       />

//       {/* </View> */}

//       {/* <Image
//                  source={images.insur}
//                  style={
//                    styles.pdf
//                  }
//                 //  resizeMode="center"
//                 //  onLoadStart={() => setLoading(true)}
//                 //  onLoadEnd={() => setLoading(false)}
//                /> */}

//       {/* <PDFView
//       fadeInDuration={250.0}
//       style={{ flex: 1 }}
//       resource={resources[resourceType]}
//       resourceType={resourceType}
//       onLoad={() => //console.log(`PDF rendered from ${resourceType}`)}
//       onError={(error) => //console.log('Cannot render PDF', error)}
//       /> */}
      
//       </View>
     
//     );
//   };
// };

// const styles = StyleSheet.create({
//   container: {
//       flex: 1,
//       backgroundColor: COLORS.white,
//   },
//   listItem:{
//       // margin:10,
//       // padding:10,
//       marginTop: 25,
//       backgroundColor:"#FFF",
//       width:"80%",
//       flex:1,
//       alignSelf:"center",
//       flexDirection:"row",
//       borderRadius:5,
//       // borderWidth:3,
//       marginBottom:10
      
//     },
//      zipcode:{
//       textAlign:'left',
//       flex:1,
//       // fontSize:26,
//       // borderWidth:2,
//       // borderColor:'black',
//       // height:,
//       width:'100%',
//       fontSize:22,
//       fontWeight:'bold',
      
//       backgroundColor:'rgba(10, 10, 10, .25)'
//       // flexWrap:'wrap'
//     },
//     pdf: {
//       // flex:0,
//       width:'100%',
//       height:'50%',
//       resizeMode:"stretch"
//   }, camera: {
//     flex: 0,
//     width:'100%',
//     height:'80%'
//   },
//   buttonContainer: {
//     flex: 0,
//     backgroundColor: 'transparent',
//     flexDirection: 'row',
//     margin: 20,
//   },
//   button: {
//     flex: 0.1,
//     alignSelf: 'flex-end',
//     alignItems: 'center',
//   },
//   text: {
//     fontSize: 18,
//     color: 'white',
//   },
//   // shadow: {
//   //     shadowColor: "#000",
//   //     shadowOffset: {
//   //         width: 0,
//   //         height: 2,
//   //     },
//   //     shadowOpacity: 0.25,
//   //     shadowRadius: 3.84,

//   //     elevation: 5,
//   // }
// });