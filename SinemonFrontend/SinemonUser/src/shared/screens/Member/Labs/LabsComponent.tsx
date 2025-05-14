
import {
    View,
    Text,
    Image,
    TouchableOpacity,
    FlatList
} from 'react-native';
import { ScreenWidth } from 'react-native-elements/dist/helpers';
import { COLORS, icons } from '../../../constants';
import { useAppSelector } from '../../../../state/App/hooks';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Labs_styles } from "./styles";

export const LabsComponent = ( { navigation, labs } ) => {

    // const labs = useAppSelector((state) => state.user.mydata.labs)

    function DisplayLab ( item: UserDataItem | any ) {
        if ( item.status == 'O' ) {
            return ( <Image source={ icons.pending } style={ Labs_styles.labs_image_style }></Image> );
        } else {
            return ( <TouchableOpacity onPress={ () => navigation.navigate( "Lab", { item: item } ) }><Icon name='chevron-right' color={ COLORS.primary } size={ Labs_styles.labs_icon_style.fontSize } /></TouchableOpacity> );
        }
    };

    function Item ( item: UserDataItem | any ) {
        return (
            <View style={ Labs_styles.listItem }>

                <TouchableOpacity
                    style={ Labs_styles.labs_content }>
                    <Text style={ Labs_styles.lab_prescriber }>Dr. { item.prov_firstname } { item.prov_lastname }</Text>
                    <Text style={ Labs_styles.labs_desc }>{ item.brief_desc }</Text>
                </TouchableOpacity>
                { DisplayLab( item ) }

            </View>
        );
    };

    return (
        <View style={ Labs_styles.container } >
            <FlatList
                pagingEnabled={ false }
                style={ { width: '100%' } }
                snapToAlignment={ 'center' }
                decelerationRate='fast'
                // vertical={ true }
                showsVerticalScrollIndicator={ false }
                data={ labs }
                keyExtractor={ item => item.uploaded.toString() }
                renderItem={ ( { item } ) => Item( item ) }
            />
        </View>
    );
};
