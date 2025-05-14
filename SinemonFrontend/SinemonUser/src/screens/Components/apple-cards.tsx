// import * as React from "react";
// import { Text, View,Image, ImageBackground } from "react-native";
// import Androw from "react-native-androw";
// import RNBounceable from "@freakycoder/react-native-bounceable";
// import { ViewStyle, TextStyle, Dimensions, StyleSheet } from "react-native";
// const { width: ScreenWidth, height: ScreenHeight } = Dimensions.get("window");
// import { LinearGradient } 
// import { images } from "../../constants";

// import { vid } from "../../constants/videos";

// import {Video} from '-av';


// /**
//  * ? Local Imports
//  */
// // import styles, { _shadowStyle } from "./AppleCard.style";

// // interface IProps {
// //   style?: any;
// //   source: any; // ? Not Optional
// //   smallTitle?: string;
// //   largeTitle?: string;
// //   shadowColor?: string;
// //   footnoteText?: string;
// //   backgroundStyle?: any;
// //   footnoteTextStyle?: any;
// //   smallTitleTextStyle?: any;
// //   largeTitleTextStyle?: any;
// //   onPress: () => void;
// // }

// function _shadowStyle(shadowColor: any) {
//     return {
//       shadowColor,
//       shadowRadius: 6,
//       shadowOpacity: 0.2,
//       shadowOffset: {
//         width: 0,
//         height: 9,
//       },
//     };
//   };

// const styles = StyleSheet.create({
//     backgroundStyle: {
//       borderRadius: 8,
//       width: ScreenWidth * 0.9,
//       height: ScreenHeight * 0.5,
//     },
//     topHeaderContainer: {
//       margin: 1,
//       marginLeft:5,
//       width: ScreenWidth * 0.7,
//     },
//     smallTitleTextStyle: {
//       fontSize: 16,
//       opacity: 0.9,
//       color: "black",
//       fontWeight: "700",
//       fontFamily: "System",
//       marginTop: 8,
//       marginLeft:16
//     },
//     largeTitleTextStyle: {
//       fontSize: 26,
//       opacity: 0.9,
//       color: "black",
//       fontWeight: "bold",
//       fontFamily: "System",
//     },
//     headerCardTextStyle: {
//       fontSize: 26,
//       opacity: 0.9,
//       color: "white",
//       backgroundColor:'lightgrey',
//       fontWeight: "bold",
//       fontFamily: "System",
//     },
//     bottomContainer: {
//       left: 5,
//       bottom: 5,
//       width: "50%",
//       borderWidth:0,
//       position: "absolute"
//         },
//     headerCardContainer: {
//       right: -80,
//       top: 30,
//       width: "50%",
//       borderWidth:1,
//       position: "absolute",
//       transform: [{ rotate: '45deg'}]
//     },
//     footnoteTextStyle: {
//       fontSize: 12,
//       color: "white",
//       // backgroundColor:'lightgrey',
//       fontWeight:'bold',
//       fontFamily: "System",
//     },
//   });

// const AppleCard = (props:any) => {
//   const {
//     source,
//     style,
//     shadowColor,
//     footnoteText,
//     footnoteTextStyle,
//     backgroundStyle,
//     headerCardTextStyle,
//     smallTitle,
//     largeTitle,
//     smallTitleTextStyle,
//     largeTitleTextStyle,
//     HeaderCard,
//     header,
//     onPress,
//     blog
//   } = props;
// if(HeaderCard == false && blog == true){
//   return (
//     <Androw style={_shadowStyle(shadowColor)}>
//       <RNBounceable
//         bounceEffect={0.95}
//         bounceFriction={4}
//         {...props}
//         style={style}
//         onPress={onPress}
//       >
        
//         <ImageBackground
//           {...props}
//           source={source}
//         //   borderRadius={8}
//           borderTopLeftRadius={10}
//           borderTopRightRadius={10}
//           resizeMode="cover"
//           style={[styles.backgroundStyle, backgroundStyle, {backgroundColor:'black'}]}
          
//       blurRadius={0}
//       imageStyle={{opacity:.45}}
//         >
//          <View style={styles.bottomContainer}>
//             <Text style={[styles.footnoteTextStyle, footnoteTextStyle, { color:'white'} ]}>
//               {footnoteText}<Text style={{color:'cornsilk'}}>  Read more ...</Text>
//             </Text>
//           </View>
//         </ImageBackground>   
//         {/* <Image
//             source={source}
//             resizeMode="cover"
//             borderRadius={0}
//             style={[styles.backgroundStyle, backgroundStyle, {height:10, marginTop:-1, marginBottom:-1}]}>
//                 </Image> */}
//         <LinearGradient colors={['grey', '#B79A6F', 'silver']} start={{ x: 0, y: 1}} end={{x: 1, y: 0}}   style={[styles.backgroundStyle, backgroundStyle, {height:10, marginTop:-1, marginBottom:0, borderRadius:0}]}/>
//         {/* <View
//            borderRadius={0}
//            borderWidth={2}
//            borderBottomLeftRadius={10}
//            borderBottomRightRadius={10}
//            style={[styles.backgroundStyle, backgroundStyle, {height:Dimensions.get("screen").height * .17, marginTop:0,}]}>
//             <View 
//             borderBottomLeftRadius={10}
//             borderBottomRightRadius={10}
//             style = {{
//                 position: 'absolute',
//                 top: 0,
//                 left: 0,
//                 right: 0,
//                 bottom: 0,
//                 backgroundColor:'black'
//                 }}>
//             </View>
//                   <View style={styles.topHeaderContainer}>
           
//             <Text style={[styles.largeTitleTextStyle, largeTitleTextStyle, {color:'white'}]}>

//               {largeTitle}
//               </Text>
//             <Text style={[styles.smallTitleTextStyle, smallTitleTextStyle, {color:'white'}]}>
//               {smallTitle.length}
//               {smallTitle}
//             </Text>
           
//           </View>
         

//             </View> */}

//       </RNBounceable>
//     </Androw>
//   );
// }else{
//   return (
//     <Androw style={_shadowStyle(shadowColor)}>
//       <RNBounceable
//         bounceEffect={0.95}
//         bounceFriction={4}
//         {...props}
//         style={style}
//         onPress={onPress}
//       >
        
//         <ImageBackground
//           {...props}
//           source={source}
//         //   borderRadius={8}
//           borderTopLeftRadius={10}
//           borderTopRightRadius={10}
//           resizeMode="cover"
//           style={[styles.backgroundStyle, backgroundStyle, {}]}
//         >
//            <View style={styles.headerCardContainer}>
//           <Text style={[styles.headerCardTextStyle, headerCardTextStyle]}>
//             {/* {largeTitle.length} */}
//               {header}
//               </Text>
//               </View>
//          <View style={styles.bottomContainer}>
//             <Text style={[styles.footnoteTextStyle, footnoteTextStyle]}>
//               {footnoteText}
//             </Text>
//           </View>
//         </ImageBackground>   
//         {/* <Image
//             source={source}
//             resizeMode="cover"
//             borderRadius={0}
//             style={[styles.backgroundStyle, backgroundStyle, {height:10, marginTop:-1, marginBottom:-1}]}>
//                 </Image> */}
//         <LinearGradient colors={['grey', '#B79A6F', 'silver']} start={{ x: 0, y: 1}} end={{x: 1, y: 0}}   style={[styles.backgroundStyle, backgroundStyle, {height:10, marginTop:-1, marginBottom:-1}]}/>
//         <View
//            borderRadius={0}
//            borderWidth={2}
//            borderBottomLeftRadius={10}
//            borderBottomRightRadius={10}
//            style={[styles.backgroundStyle, backgroundStyle, {height:Dimensions.get("screen").height * .17, marginTop:0,}]}>
//             <View 
//             borderBottomLeftRadius={5}
//             borderBottomRightRadius={5}
//             style = {{
//                 position: 'absolute',
//                 top: 0,
//                 left: 0,
//                 right: 0,
//                 bottom: 0,
//                 backgroundColor:'black'
//                 }}>
//             </View>
//                   <View style={styles.topHeaderContainer}>

//             {/* <Textfit mode= 'multi'  */}
           
//             <Text style={[styles.largeTitleTextStyle, largeTitleTextStyle, {color:'white'}]}>
//             {/* {largeTitle.length} */}
//               {largeTitle}
//               </Text>
//             {/* </Textfit> */}
//             <Text style={[styles.smallTitleTextStyle, smallTitleTextStyle, {color:'white'}]}>
//               {/* {smallTitle.length} */}
//               {smallTitle}
//             </Text>
           
//           </View>
         

//             </View>

//       </RNBounceable>
//     </Androw>
//   );
// }

  
// };

// AppleCard.defaultProps = {
//   HeaderCard:false,
//   header:'Header',
//   shadowColor: "#000",
//   smallTitle: "",
//   largeTitle: "",
//   footnoteText:
//     "",
// };

// export default AppleCard;