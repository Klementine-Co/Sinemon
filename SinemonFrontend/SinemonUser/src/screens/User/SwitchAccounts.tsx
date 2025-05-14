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
import { COLORS, icons } from '../../constants';
import { useAppDispatch, useAppSelector } from '../../state/App/hooks';
import * as actions from "../../state/App/actions";
import Icon from 'react-native-vector-icons/MaterialIcons';
export const SwitchAccounts = ( { route, navigation }: accountProp ) => {

    const dispatch = useAppDispatch();
    const accounts = useAppSelector( ( state ) => state.user.mydata.Accounts );
    const myid = useAppSelector( ( state ) => state.user.myid );

    function switchAccnt ( id: Number, account_number: Number ) {
        if ( myid !== id ) {
            dispatch( actions.switchaccount( Number( id ), Number( account_number ) ) );
        } else {
            return null;
        }
    };

    function activeStatus ( id: number ) {
        if ( myid === id ) {
            return <Icon name='check-circle-outline' color={ COLORS.primary } size={ ( 25 / 375 ) * ScreenWidth } />;
        } else {
            return <Icon name='radio-button-unchecked' color={ COLORS.primary } size={ ( 25 / 375 ) * ScreenWidth } />;
        }
    }

    function Privilege ( priv: string ) {
        if ( priv !== null ) {
            return ( <>
                <Text style={ {
                    fontSize: ( 14 / 375 ) * ScreenWidth, color: COLORS.primary, alignSelf: 'flex-start', textAlign: 'left', marginTop: 5
                } }>Authority: </Text>
                <Text style={ { fontSize: ( 14 / 375 ) * ScreenWidth, } }>{ priv }</Text>
            </> );
        } else {
            return ( <>
                <Text style={ {
                    fontSize: ( 14 / 375 ) * ScreenWidth, color: COLORS.primary, alignSelf: 'flex-start', textAlign: 'left', marginTop: 5
                } }></Text>
                <Text style={ { fontSize: ( 14 / 375 ) * ScreenWidth, } }>Main Account</Text>
            </> );
        }
    }

    function Item ( { item }: UserDataItem | any ) {

        //console.log(item.privilege);

        if ( item.id !== undefined ) {
            return (
                <View>

                    <View>
                        <TouchableOpacity onPress={ () => { switchAccnt( Number( item.id ), Number( item.account_number ) ); } }>
                            <View style={ styles.listItem }>
                                <View style={ { flexDirection: 'column', alignItems: 'flex-start', width: '50%' } }>
                                    <Text style={ {
                                        fontSize: ( 14 / 375 ) * ScreenWidth, color: COLORS.primary, alignSelf: 'flex-start', textAlign: 'left', marginTop: 5
                                    } }>Account Number: </Text>
                                    <Text style={ { fontSize: ( 14 / 375 ) * ScreenWidth, } }>{ item.account_number }</Text>
                                    <Text style={ {
                                        fontSize: ( 14 / 375 ) * ScreenWidth, color: COLORS.primary, alignSelf: 'flex-start', textAlign: 'left', marginTop: 5
                                    } }>Name: </Text>
                                    <Text style={ { fontSize: ( 14 / 375 ) * ScreenWidth, } }>{ item.first_name } { item.middle_name } { item.last_name }</Text>
                                    { Privilege( item.privilege ) }
                                </View>
                                <View>
                                    { activeStatus( item.id ) }
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
                    <Text style={ { alignSelf: 'center' } }> Switch Account</Text>
                </View>
                <FlatList
                    ListHeaderComponent={
                        <>
                            <View style={ { width: '35%', height: ( 55 / 375 ) * ScreenWidth, borderRadius: 10, marginRight: 15, marginLeft: '60%' } }>
                            </View>
                        </> }
                    style={ { alignSelf: 'center', width: '100%' } }
                    data={ accounts }
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

