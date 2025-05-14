
import { useEffect } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    Image,
    FlatList
} from 'react-native';
import { ScreenWidth } from 'react-native-elements/dist/helpers';
import { COLORS, icons } from '../../../constants';
import { styles } from './styles';

export const Immunizations = ( { route, navigation }: searchProp ) => {


    const vaccines = route.params.vaccines;
    function Item ( { item }: UserDataItem | any ) {
        if ( item.vaccination != undefined ) {
            return (
                <TouchableOpacity style={ { flexDirection: "row", alignItems: "center", flex: 1 } }
                    onPress={ () => {
                        navigation.goBack();
                    } }>
                    <View style={ { flexDirection: 'column' } }>
                        <Image
                            source={ icons.back }
                            style={ {
                                width: ( 20 / 375 ) * ScreenWidth,
                                height: ( 20 / 375 ) * ScreenWidth,
                            } }
                        />
                        <View style={ styles.listItem }>
                            <View style={ { flexDirection: 'column', alignItems: 'flex-start', width: '30%' } }>
                                <Text style={ { fontSize: ( 14 / 375 ) * ScreenWidth, color: COLORS.primary, marginTop: 5 } }>Dr. { item.prov_lastname }, { item.prov_firstname }</Text>
                                <Text style={ { fontSize: ( 14 / 375 ) * ScreenWidth, color: COLORS.primary, marginTop: 20 } }>Immunization Date: { item.vaccination_date }</Text>
                            </View>
                            <View style={ { height: ( 70 / 375 ) * ScreenWidth, width: '70%', justifyContent: "flex-end", alignSelf: 'flex-end' } }>
                                <Text style={ { fontSize: ( 14 / 375 ) * ScreenWidth, color: COLORS.primary } }>Immunization: { item.vaccination }</Text>
                            </View>
                        </View>
                    </View>
                </TouchableOpacity>
            );
        } else {
            return (
                <TouchableOpacity  >
                    <View style={ styles.listItem }>
                    </View>
                </TouchableOpacity>
            );
        }
    };

    return (
        <View style={ styles.container }>
            <View style={ { flex: 0, justifyContent: 'center', right: '5%', left: '5%', width: '95%' } }>
                <FlatList
                    ListHeaderComponent={
                        <>
                            <View style={ { width: '35%', height: 55, borderRadius: 10, marginTop: 15, marginRight: 15, marginLeft: '60%' } }>
                            </View>
                        </> }
                    style={ { alignSelf: 'center', width: '100%' } }
                    data={ vaccines }
                    keyExtractor={ ( item, index ) => index.toString() }
                    renderItem={ ( { item } ) => <Item item={ item } /> }
                />
            </View>
        </View>
    );
};