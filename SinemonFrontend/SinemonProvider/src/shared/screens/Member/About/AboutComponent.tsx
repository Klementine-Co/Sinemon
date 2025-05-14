
import {
    View,
    Text,
    ScrollView
} from 'react-native';
import { About_styles } from './styles';


export const AboutComponent = ( { navigation, about }: accountProp ) => {

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
    );
};
