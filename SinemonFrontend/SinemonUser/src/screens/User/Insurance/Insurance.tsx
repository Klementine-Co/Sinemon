import { useRef } from 'react'
import {
    StyleSheet,
    View,
    Dimensions,
    Image,
    TouchableOpacity,
    ActivityIndicator,
} from 'react-native';
import { ScreenWidth } from 'react-native-elements/dist/helpers';
import { WebView } from 'react-native-webview';
import { icons } from '../../../constants';
import { useAppSelector } from '../../../state/App/hooks';

export const Insurance = ({ navigation, route }: accountProp) => {
    const ref = useRef(navigation);
    const crsf = useAppSelector((state) => state.user.crsf);
    const url: any = {
        uri: route.params.item.card,
        // uri: 'http://192.168.1.56:8003/media/medical_insurance/2022/07/21/insurance_card.pdf',
        headers: {
            "X-CSRFToken": crsf,
        },
    };
    return (
        <View style={{ flex: 1 }}>
            <TouchableOpacity style={{ height:(100/375)*ScreenWidth, bottom:(10/375)*ScreenWidth, left:(10/375)*ScreenWidth}}
          onPress={() => {
              navigation.goBack()
          }}>

                <Image
                                source={icons.back}
                                style={{
                                    width: (30/375)*ScreenWidth,
                                    height: (30/375)*ScreenWidth,
                                    top:(60/375)*ScreenWidth,
                                    marginBottom: (30/375)*ScreenWidth,
                                    
                                }}
                            />            
            </TouchableOpacity>
            <WebView
            // ref={ref}
            source={url}
            renderLoading={() => (
                <View style={{ flex: 1, alignItems: 'center' }}>
                    <ActivityIndicator size="large" />
                </View>
                )}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        marginTop: 25,
    },
    pdf: {
        flex: 1,
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
        marginTop: '10%'
    }
});
