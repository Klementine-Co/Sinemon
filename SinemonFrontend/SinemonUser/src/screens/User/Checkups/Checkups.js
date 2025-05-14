import React from 'react'
import {
  StyleSheet,
  View,
  Image,
  Text,
  TouchableOpacity,
  FlatList,
  Dimensions,
  ScrollView,
  SafeAreaView,
  Button
} from 'react-native';
// import { Button, Header } from '@rneui/themed';
import { TextInput } from 'react-native-gesture-handler';
import { images, icons, COLORS, FONTS, SIZES, vid} from '../../../constants';
// import PDFView from 'react-native-view-pdf';
// import Pdf from 'react-native-pdf';
// import DocumentScanner from "react-native-document-scanner";
// import { Camera } 
// import * as FileSystem 
// import * as MediaLibrary 




// const resources = {
//   file: Platform.OS === 'ios' ? 'path/to/image/insur.pdf' : 'path/to/image/insur.pdf',
//   url: 'path/to/image/insur.pdf',
//   base64: 'JVBERi0xLjMKJcfs...',
// };


// import React from 'react';
// import { StyleSheet, Dimensions, View } from 'react-native';
// import Pdf from 'react-native-pdf';
import { WebView } from 'react-native-webview';

export default class Threads extends React.Component {
    render() {
        const source = { uri: 'http://samples.leanpub.com/thereactnativebook-sample.pdf', cache: true };
        //const source = require('./test.pdf');  // ios only
        //const source = {uri:'bundle-assets://test.pdf' };
        //const source = {uri:'file:///sdcard/test.pdf'};
        //const source = {uri:"data:application/pdf;base64,JVBERi0xLjcKJc..."};
        //const source = {uri:"content://com.example.blobs/xxxxxxxx-...?offset=0&size=xxx"};
        //const source = {uri:"blob:xxxxxxxx-...?offset=0&size=xxx"};

        return (
            <View style={styles.container}>
                {/* <Pdf
                    source={source}
                    onLoadComplete={(numberOfPages,filePath) => {
 //console.log(`Number of pages: ${numberOfPages}`);
                    }}
                    onPageChanged={(page,numberOfPages) => {
 //console.log(`Current page: ${page}`);
                    }}
                    onError={(error) => {
 //console.log(error);
                    }}
                    onPressLink={(uri) => {
 //console.log(`Link pressed: ${uri}`);
                    }}
                    style={styles.pdf}/> */}
                   
                    <TouchableOpacity onPress={()=> {}} style={{ alignSelf:'flex-start', height:30, width:30, marginTop:'5%', paddingLeft:15}}>
                    <Image source={icons.back} style={{ height:25, width:25}}></Image>

                    </TouchableOpacity>
                     <WebView 
                            style={styles.pdf}
                            source={source}
                            />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        marginTop: 25,
    },
    pdf: {
        flex:1,
        width:Dimensions.get('window').width,
        height:Dimensions.get('window').height,
        marginTop:'10%'
    }
});

// export default class Threads extends React.Component {

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
//console.log(sizes);
//       this.setState({hasPermission: status === 'granted'});
//     })();
//   }

//   gotoQueue(){

//     queueContext.joinQueue(licenses[0].prov.provider_id,'join');
//     this.props.navigation.navigate("Queue");
//   }

//   Item(item){

//     //console.log(item);
//     return (
//     <View style={{ }}>
//       <Text style={{textAlign:'center'}}>
//         {String(item)}
//       </Text>

//     <Image
//     source={item}
//     style={
//        {height:Dimensions.get("screen").height, width:Dimensions.get("screen").width-35, margin:15}
//     }
//      resizeMode="stretch"
//     //  onLoadStart={() => setLoading(true)}
//     //  onLoadEnd={() => setLoading(false)}
//     />
//      </View>
//     );

//   }

 
//   render() {
    
//     const imgs = [
//       images._0001,
//       images._0002,
//       images._0003,
//       images._0004,
//       images._0005,
//       images._0006,
//       images._0007,
//       images._0008,
//       images._0009,
//       images._0010,
//       images._0011,
//       images._0012,
//       images._0013,
//       images._0014,
//       images._0015
//     ];
//console.log(images._0012);
    
//     // const resourceType = 'file';
//     // const resourceType = require('file:///path/to/image/insur.jpg');
//     return (
//       <View style={{justifyContent:'center', alignItems:'center', width:'100%', alignSelf:'center'}}>
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


//      {/* <View style={{backgroundColor:'grey', marginTop:'auto'}}>
      
//       </View>  */}


//       {/* <View> */}
      
      


      

     

//       {/* </View> */}

//       <FlatList
//       // pagingEnabled = { false }
//       style={{width:'100%', height:'100%', marginTop:'10%'}}
//       snapToAlignment={'center'}
//       decelerationRate='fast'
//       snapToAlignment={"start"}
//         vertical
//         showsVerticalScrollIndicator={false}
//         data={imgs}
//         keyExtractor={item => item.toString()}
//         renderItem={({item}) =>  this.Item(item)}
//         />

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
//       // width:'85%',
//       // height:'100%',
//       resizeMode:"cover",
//       margin:10
//   }, 
  
//   camera: {
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