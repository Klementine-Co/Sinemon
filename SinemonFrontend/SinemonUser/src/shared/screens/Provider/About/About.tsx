import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  useWindowDimensions,
  Platform,
} from "react-native";
import WebView from "react-native-webview";
import { COLORS, SIZES, FONTS } from "../../../constants";
import { About_styles } from "./styles";

export const About_renderItem = (props: { provider: any }) => {
  const { provider } = props;
  const { width, height } = useWindowDimensions();

  // Injected CSS for consistent styling
  const injectedStyles = `
    <style>
      body {
        font-size: ${SIZES.body2*2.5}px;
        line-height: ${SIZES.body2 * 3.5}px;
        font-family: ${Platform.OS === "ios" ? "Arial" : "Roboto-Black"};
        color: ${COLORS.black};
        padding: 10px;
      }
      a {
        color: ${COLORS.primary};
        text-decoration: none;
      }
      .tips-title {
        font-size: ${SIZES.h2*2.5}px;
        font-weight: bold;
        margin-top: 20px;
        color: ${COLORS.black};
      }
    </style>
  `;

  // Merge `about` and `tip` into a single HTML content
  const mergedHTML = `
    <html>
      <head>${injectedStyles}</head>
      <body>
        ${provider.about ? provider.about : "<p>No about info available.</p>"}
        <h2 class="tips-title">Tips:</h2>
        ${provider.tip ? provider.tip : "<p>No tips available.</p>"}
      </body>
    </html>
  `;

  return (
    <View style={{ flex: 1 }}>
       {/* showsVerticalScrollIndicator={false}> */}
      <View style={About_styles.container}>
        <WebView
          style={About_styles.webview}
          originWhitelist={["*"]}
          source={{ html: mergedHTML }}
          scalesPageToFit={false}
          nestedScrollEnabled={true} // Enables smooth scrolling within WebView
        />
      </View>
    </View>
  );
};
