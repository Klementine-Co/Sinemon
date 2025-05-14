import {
    View,
    Text,
    ScrollView
} from 'react-native';
import { ScreenWidth } from 'react-native-elements/dist/helpers';
import { About_styles } from './styles';
import { AboutComponent } from '../../../screens';

const About_renderItem = ( { navigation }: accountProp ) => {
    const about = ` I am a photographer with 6 years experience in photography and photo editing.
                    I exercise regularly, I am vegan, and I am pregnant, yayy!
                    I'm excited, happy, and keeping in good health.`;
    return (
        <AboutComponent about={ about } />
    );
};

export default About_renderItem;