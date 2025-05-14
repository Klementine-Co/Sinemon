
import {
    View,
    Text,
    ScrollView
} from 'react-native';
import { ScreenWidth } from 'react-native-elements/dist/helpers';
import { About_styles } from './styles';


const About_renderItem = ( { navigation, queue }: accountProp ) => {

    return (
        <ScrollView style={ { flex: 1 } } showsVerticalScrollIndicator={ false } >
            <View style={ About_styles.container } >
                <Text style={ About_styles.content }>
                    I am a photographer with 6 years experience in photography and photo editing.
                    I exercise regularly, I am vegan, and I am pregnant, yayy!
                    I'm excited, happy, and keeping in good health.
                </Text>
            </View>
        </ScrollView>
    )
};

export default About_renderItem;