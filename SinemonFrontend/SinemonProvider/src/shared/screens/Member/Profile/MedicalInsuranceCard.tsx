import {
    View,
    Text,
    Image,
    TouchableOpacity
} from 'react-native';
import { icons, COLORS } from '../../../constants';
import { MedicalInfo_styles, NotesInfo_styles, Profile_styles, VaccineInfo_styles } from './styles';
import Icon from 'react-native-vector-icons/FontAwesome';
import { InsuranceCard } from '../../Components/InsuranceCard';
export const MedicalInsuranceCard = ( { medinsurance, navigation, bodycomp, vaccines } ) => {


    return (
        <>
            <InsuranceCard data={ medinsurance } title={ 'Health Insurance' } onPress={ () => navigation.navigate( "InsuranceList", { screen: 'InsuranceList', medinsurance } ) } />

            <View style={ MedicalInfo_styles.container }>
                <Text style={ MedicalInfo_styles.info_header }>Info </Text>
                <Text style={ MedicalInfo_styles.info_item }>Weight: <Text style={ MedicalInfo_styles.info_item_value }>{ bodycomp.weight } lbs</Text></Text>
                <Text style={ MedicalInfo_styles.info_item }>Height: <Text style={ MedicalInfo_styles.info_item_value }>{ bodycomp.height } in</Text></Text>
                <Text style={ MedicalInfo_styles.info_item }>BF: <Text style={ MedicalInfo_styles.info_item_value }>{ bodycomp.bf }%</Text></Text>
                <Text style={ MedicalInfo_styles.info_item }>BMI: <Text style={ MedicalInfo_styles.info_item_value }>{ bodycomp.bmi }</Text></Text>
            </View>


            <View style={ VaccineInfo_styles.container }>
                <Image
                    source={ icons.vaccine }
                    style={ VaccineInfo_styles.image_style }
                />

                <TouchableOpacity
                    style={ VaccineInfo_styles.vaccine_content }
                    onPress={ () => navigation.navigate( "Immunizations", { vaccines: vaccines } ) }>
                    <Text style={ VaccineInfo_styles.vaccine_text }>
                        Vaccines
                    </Text>

                </TouchableOpacity>
                <TouchableOpacity>
                    <Icon name='chevron-right' color={ COLORS.primary } size={ Profile_styles.icon.fontSize } />
                </TouchableOpacity>
            </View>


            <View style={ NotesInfo_styles.container }>
                <Image source={ icons.hcheckup } style={ NotesInfo_styles.image_style }></Image>
                <Text style={ NotesInfo_styles.title }>Doctors' Notes </Text>
            </View>
        </>
    );
};
