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
import { About_styles, hyperlinks } from "./styles";

export const About_renderItem = (props: { provider: any }) => {
  const { provider } = props;
  const { width, height } = useWindowDimensions();

  // Inject CSS styles into HTML content
  const injectedStyles = `
    <style>
      body {
        font-size: ${SIZES.body2}px;
        line-height: ${SIZES.body2 * 1.5}px;
        font-family: ${Platform.OS === "ios" ? "Arial" : "Roboto-Black"};
        color: ${COLORS.black};
        padding: 10px;
      }
      a {
        color: ${COLORS.primary};
        text-decoration: none;
      }
    </style>
  `;

  // Ensure safe HTML defaults
  const aboutHTML = provider.about
    ? `<html><head>${injectedStyles}</head><body>${provider.about}</body></html>`
    : `<html><head>${injectedStyles}</head><body><p>No about info available</p></body></html>`;

  const tipHTML = provider.tip
    ? `<html><head>${injectedStyles}</head><body>${provider.tip}</body></html>`
    : `<html><head>${injectedStyles}</head><body><p>No tips available</p></body></html>`;

  return (
    <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
      <View style={About_styles.container}>
        <WebView
          style={About_styles.webview}
          originWhitelist={["*"]}
          source={{ html: aboutHTML }}
          scalesPageToFit={false}
        />

        <Text style={About_styles.tips_title}>Tips:</Text>

        <WebView
          style={About_styles.webview}
          originWhitelist={["*"]}
          source={{ html: tipHTML }}
          scalesPageToFit={false}
        />
      </View>
    </ScrollView>
  );
};
