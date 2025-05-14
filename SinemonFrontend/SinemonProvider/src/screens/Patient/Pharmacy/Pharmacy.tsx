import {
    StyleSheet,
    View,
    Text,
    Image,
    TouchableOpacity,
    ScrollView,
} from 'react-native';
import RNBounceable from '@freakycoder/react-native-bounceable';
import { icons, COLORS, SIZES, appTheme } from '../../../constants';
import { ScreenWidth } from 'react-native-elements/dist/helpers';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Pharmacy_styles, Presecriptions_styles } from './styles';
import { InsuranceCard } from '../../Components/InsuranceCard';
const Pharmacy_renderItem = ( { route, navigation }: searchProp ) => {
    //console.log(rxdiscounts);
    // const mydata = useAppSelector((state) => state.user?.mydata);
    // const pharmacy = mydata?.Prescription
    const rxdiscounts = route.params.member.RxDiscount;
    const rxinsurances = route.params.member.RxInsurance;
    const prescriptions = route.params.member.Prescription;

    const renderCard = ( data, title, onPress ) => {
        return (
            <InsuranceCard data={ data } title={ title } onPress={ onPress } />
        );
    };

    return (
        <ScrollView style={ Pharmacy_styles.container }>
            { renderCard( rxinsurances, 'RX', () =>
                navigation.navigate( 'RXInsurList', { rxinsurances: rxinsurances } ),
            ) }
            { renderCard( rxdiscounts, 'RX Discount', () =>
                navigation.navigate( 'RXInsurList', { rxdiscounts: rxdiscounts } ),
            ) }
            <View style={ Presecriptions_styles.container }>
                <Image
                    source={ icons.prescription }
                    style={ Presecriptions_styles.image_style }
                />
                <TouchableOpacity
                    style={ Presecriptions_styles.prescriptions_content }
                    onPress={ () =>
                        navigation.navigate( 'Prescriptions', { prescriptions: prescriptions } )
                    }>
                    <Text style={ Presecriptions_styles.prescriptions_text }>
                        Prescriptions
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={ () =>
                        navigation.navigate( 'Prescriptions', { prescriptions: prescriptions } )
                    }>
                    <Icon
                        name="chevron-right"
                        color={ COLORS.primary }
                        size={ Pharmacy_styles.icon.fontSize }
                    />
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
};

export default Pharmacy_renderItem;
