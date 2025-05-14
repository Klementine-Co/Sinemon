import {
    View,
    Text,
    Image,
    TouchableOpacity,
    FlatList
} from 'react-native';
import RNBounceable from "@freakycoder/react-native-bounceable";
import { icons, COLORS, SIZES } from '../../../constants';
import { ScreenWidth } from 'react-native-elements/dist/helpers';
import { Profile_styles } from './styles';
import Icon from 'react-native-vector-icons/FontAwesome';
import { MedicalInsuranceCard } from './MedicalInsuranceCard';
import { useAppSelector } from '../../../state/App/hooks';



const Profile_renderItem = ( { navigation }: accountProp ) => {
    const mydata = useAppSelector( ( state ) => state.user?.mydata );
    const mdnotes = mydata?.mdNotes;
    const vaccines = mydata?.Vaccinations;
    const bodycomp = mydata?.BodyComp;
    const medinsurance = mydata?.MedInsurance;
    function displayNotes ( mdnote: UserDataItem | any ) {
        return (
            <View style={ Profile_styles.listItem }>
                <TouchableOpacity
                    onPress={ () => navigation.navigate( "MDNotes", { screen: 'MDNotes', mdnote } ) }
                    style={ Profile_styles.note_content }
                >
                    <Text style={ Profile_styles.note_name }>Dr. { mdnote.prov_firstname } { mdnote.prov_lastname }</Text>
                    <Text style={ Profile_styles.note_CC }>{ mdnote.chief_complaint }</Text>
                    <Text style={ Profile_styles.note_upload_date }>{ mdnote.uploaded }</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={ () => navigation.navigate( "MDNotes", { mdnote: mdnote } ) }>
                    <Icon name='chevron-right' color={ COLORS.primary } size={ Profile_styles.icon.fontSize } />
                </TouchableOpacity>
            </View>
        );
    };

    return (
        <View style={ Profile_styles.container } >
            <FlatList
                ListHeaderComponent={
                    <MedicalInsuranceCard medinsurance={ medinsurance } navigation={ navigation } bodycomp={ bodycomp } vaccines={ vaccines } /> }
                pagingEnabled={ false }
                style={ { paddingBottom: 50 } }
                decelerationRate='fast'
                snapToAlignment={ "start" }
                { ...{ vertical: true } }
                showsVerticalScrollIndicator={ false }
                data={ mdnotes }
                keyExtractor={ item => item.uploaded.toString() }
                renderItem={ ( { item } ) => displayNotes( item ) }
            />
        </View>
    );
};

export default Profile_renderItem;