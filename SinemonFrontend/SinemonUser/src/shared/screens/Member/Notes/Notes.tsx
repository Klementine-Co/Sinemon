
import { useNavigation } from '@react-navigation/native';
import {
    Text,
    ScrollView,
    Image,
    TouchableOpacity
} from 'react-native';
import { ScreenWidth } from 'react-native-elements/dist/helpers';
import { icons } from '../../../constants';


export const MDNotes = ( { route, navigation }: searchProp ) => {
    return (
        <ScrollView style={ {
            flex: 1,
            flexDirection: 'column',
            height: '80%',
            marginTop: ( 60 / 375 ) * ScreenWidth,
            marginBottom: ( 10 / 375 ) * ScreenWidth,
            width: '90%',
            left: '5%',
            right: '5%'
        } } >
            <TouchableOpacity
                style={ { flexDirection: "row", alignItems: "center", flex: 1 } }
                onPress={ () => {
                    navigation.goBack();
                } }
            >
                <Image
                    source={ icons.back }
                    style={ {
                        width: ( 20 / 375 ) * ScreenWidth,
                        height: ( 20 / 375 ) * ScreenWidth,
                        left: '10%'
                    } }
                />
            </TouchableOpacity>
            <Text style={ { fontSize: ( 18 / 375 ) * ScreenWidth, textAlign: 'left', marginTop: 50 } }>
                { route.params.mdnote.chief_complaint }
            </Text>
            <Text style={ { fontSize: ( 18 / 375 ) * ScreenWidth, textAlign: 'left', marginTop: 50 } }>
                { route.params.mdnote.history }
            </Text>
            <Text style={ { fontSize: ( 18 / 375 ) * ScreenWidth, textAlign: 'left', marginTop: 50 } }>
                { route.params.mdnote.exam }
            </Text>
            <Text style={ { fontSize: ( 18 / 375 ) * ScreenWidth, textAlign: 'left', marginTop: 50 } }>
                { route.params.mdnote.assessment }
            </Text>
        </ScrollView>
    );
};
