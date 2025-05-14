import React, { useState, useContext, useRef } from "react";
import
  {
    StyleSheet,
    View,
    Text,
    Image,
    TouchableOpacity,
    TouchableHighlight,
    FlatList,
    Dimensions,
    ScrollView,
    Alert,
    ActivityIndicator
  } from "react-native";

import { images, icons, COLORS, FONTS, SIZES } from "../../../constants";

const { width: ScreenWidth, height: ScreenHeight }=Dimensions.get( "window" );
import Tooltip from "react-native-walkthrough-tooltip";
import { WebView } from 'react-native-webview';

const Blog_renderItem=( props ) =>
{
  const { navigation }=props;

  const ref=useRef( null );

  return (
    <View style={ { flex: 1, justifyContent: "center", marginTop: 10 } }>
      {/* <AppleCard
        source={images.blog}
        blog={true}
        header={false}
        footnoteText="Questions You May Have About Menstruation"
        backgroundStyle={{ height: "80%", width: "100%" }}
      /> */}
      <WebView
        ref={ ref }
        source={ { url: 'https://blog.healthadvocate.com/2022/09/enjoy-the-fruits-of-fall-at-the-farmers-market/' } }
        startInLoadingState
        onMessage={ ( data ) => //console.log(data)}
          javaScriptEnabled={ false}
          // renderLoading={() => (
          //   <View style={{ flex: 1, alignItems: 'center' }}>
          //     <ActivityIndicator size="large" />
          //   </View>
          // )}
          // allowsBackForwardNavigationGestures
          // onNavigationStateChange={(navState) => {
          //   if (navState.canGoBack) {
          //     navigation.setParams({
          //       headerLeftInfo: {
          //         title: '',
          //         onPress: () => ref.current.goBack(),
          //       },
          //     });
          //   } else {
          //     navigation.setParams({
          //       headerLeftInfo: null,
          //     });
          //   }
          // }}
          />
    </View>
  );
};

export default Blog_renderItem;
