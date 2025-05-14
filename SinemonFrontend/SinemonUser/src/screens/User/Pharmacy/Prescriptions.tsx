import {
    StyleSheet,
    View,
    Text,
    TouchableOpacity,
    FlatList,
    Image
} from 'react-native';
import { Header } from '@rneui/themed';
import { ScreenWidth } from 'react-native-elements/dist/helpers';
import { COLORS, icons } from '../../../constants';

export const Prescriptions = ( { route, navigation }: accountProp ) => {

    const prescriptions = route.params.prescriptions;

    function Item ( { item }: UserDataItem | any ) {
        const prescribed_date = new Date( item.prescribed_date ).toLocaleString().split( ',' )[ 0 ];
        const expiration_date = new Date( item.expiration_date ).toLocaleString().split( ',' )[ 0 ];
        //console.log(expiration_date);
        if ( item.ndc !== undefined ) {
            return (
                <View>

                    <View>
                        <TouchableOpacity onPress={ () => { } } >
                            <View style={ styles.listItem }>
                                <View style={ { flexDirection: 'column', alignItems: 'flex-start', width: '50%' } }>
                                    <Text style={ {
                                        fontSize: ( 14 / 375 ) * ScreenWidth, color: COLORS.primary, alignSelf: 'flex-start', textAlign: 'left', marginTop: 5
                                    } }>NDC: </Text>
                                    <Text style={ { fontSize: ( 14 / 375 ) * ScreenWidth, } }>{ item.ndc }</Text>
                                    <Text style={ {
                                        fontSize: ( 14 / 375 ) * ScreenWidth, color: COLORS.primary, alignSelf: 'flex-start', textAlign: 'left', marginTop: 5
                                    } }>Lot no: </Text>
                                    <Text style={ { fontSize: ( 14 / 375 ) * ScreenWidth, } }>{ item.lot_no }</Text>
                                </View>
                                <View style={ { flexDirection: 'column', alignItems: 'flex-end', width: '50%' } }>
                                    <Text style={ {
                                        fontSize: ( 14 / 375 ) * ScreenWidth, color: COLORS.primary, alignSelf: 'flex-end'
                                    } }>Prescription Date: </Text>
                                    <Text style={ { fontSize: ( 14 / 375 ) * ScreenWidth, } }>{ prescribed_date }</Text>
                                    <Text style={ {
                                        fontSize: ( 14 / 375 ) * ScreenWidth, color: COLORS.primary, alignSelf: 'flex-end'
                                    } }>Exp Date: </Text>
                                    <Text style={ { fontSize: ( 14 / 375 ) * ScreenWidth, } }>{ expiration_date }</Text>
                                </View>
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>
            );
        } else {
            return (
                <TouchableOpacity  >
                    <View style={ styles.listItem }></View>
                </TouchableOpacity>
            );
        }
    };

    return (
        <View style={ styles.container }>
            <Header
                containerStyle={ {
                    height: ( 50 / 375 ) * ScreenWidth,
                    width: '100%',
                    backgroundColor: 'grey',
                    justifyContent: 'space-around',
                } }
                placement="left" />
            <View style={ { flex: 0, justifyContent: 'center' } }>
                <View style={ { marginTop: 35 } }>
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
                                left: '40%'
                            } }
                        />
                    </TouchableOpacity>
                </View>
                <FlatList
                    ListHeaderComponent={
                        <>
                            <View style={ { width: '35%', height: ( 55 / 375 ) * ScreenWidth, borderRadius: 10, marginRight: 15, marginLeft: '60%' } }>
                            </View>
                        </> }
                    style={ { alignSelf: 'center', width: '100%' } }
                    data={ prescriptions }
                    keyExtractor={ ( item ) => item.id.toString() }
                    renderItem={ ( { item } ) => <Item item={ item } /> }
                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create( {
    container: {
        flex: 1,
        backgroundColor: COLORS.white,
        width: '100%'
    },
    listItem: {
        marginTop: 15,
        paddingBottom: 10,
        backgroundColor: "#FFF",
        alignSelf: "center",
        flexDirection: "row",
        borderRadius: 5,
        borderBottomWidth: 1,
        width: '80%',
        alignItems: 'center',
        justifyContent: 'center'

    }
} );

