import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  useWindowDimensions,
} from "react-native";
import { ScreenWidth } from "react-native-elements/dist/helpers";
// import RenderHtml from "react-native-render-html";
import { COLORS } from "../../../constants";
import { About_styles, hyperlinks } from "./styles";
import { WebView } from "react-native-webview"; // ✅ Correct import

const About_renderItem = (props: { provider: any }) => {
  const { provider } = props;
  const about = { html: provider.about };
  const tip = { html: provider.tip };
  const { width, height } = useWindowDimensions();

  return (
    <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
      <View style={About_styles.container}>
        <WebView
          style={{ ...About_styles.renderhtml_baseStyle, height: height }}
          source={{ html: provider.about }}
        />

        <Text style={About_styles.tips_title}>Tips:</Text>

        <WebView
          originWhitelist={["*"]}
          source={{ html: provider.tip }}
          style={{ ...About_styles.renderhtml_baseStyle, height: height }} // Adjust height dynamically if needed
        />
      </View>
    </ScrollView>
  );
};

export default About_renderItem;
