import React, { useEffect } from 'react';
import { Header } from '@rneui/themed';
import {
    StyleSheet,
    View,
    Image,
    Text,
    TouchableOpacity,
    FlatList
} from 'react-native';
import { images, icons, COLORS } from '../../constants';
import { QueueHeader } from './QueueHeader';
import { useAppDispatch, useAppSelector } from '../../state/App/hooks';
import { ScreenWidth } from 'react-native-elements/dist/helpers';
import { ProgressBar } from './Progress';
import Icon from 'react-native-vector-icons/FontAwesome';
import * as APICALLS from "../../constants/API_CALLS";

export const Queue = ( { route, navigation }: queueProp ) => {
    type Appointment = {
        id: number;
        name: string;
        img: any;
        loc: string;
        desc: any;
        queue: number;
        sc: number;
        color: string;
        appType: string;
        time: string;
        when: string;
    };

    const queue = useAppSelector( ( state ) => state.queue );
    const myid = useAppSelector( ( state ) => state.user.myid );
    const socket = useAppSelector( ( state ) => state.socket );

    const getProfile = async ( item: any ) => {
        const response = await APICALLS.getProvider( item.provider_id as number );
        // console.log(response?.data, "RESP");

        navigation.navigate( "PProfile", { provider: response?.data } );
    };

    useEffect( () => {

        // console.log( 'in queue js useeffect' );
        // console.log( queue.queuedata?.data );



    }, [ queue?.queuedata?.mystatus ] );

    const [ providers, setProviders ] = React.useState( [
        {
            id: 0,
            name: "Dr. Sandra Janus",
            img: images.wdoctor1,
            loc: '5146 ANTON DR #202',
            desc: icons.roofer,
            queue: 11,
            sc: 12,
            color: 'gold',
            appType: 'Sonogram',
            time: '9:30 am',
            when: 'tomorrow'
        },
        {
            id: 1,
            name: "Dr. John Cover",
            img: images.mdoctor2,
            loc: '5146 ANTON DR #202',
            desc: icons.painter,
            queue: 5,
            sc: 14,
            color: '#cd7f32',
            appType: 'Dental',
            time: '11 am',
            when: 'Jul 07 2050'
        },
        {
            id: 2,
            name: "Dr. Don Drummond",
            img: images.mdoctor1,
            loc: '5146 ANTON DR #202',
            desc: icons.electrician,
            queue: 0,
            sc: 34,
            color: 'silver',
            appType: 'Microneedling',
            time: '8 am',
            when: 'Aug 12 2030'
        },
        {
            id: 3,
            name: "Dr. Paula Travis",
            img: images.wdoctor3,
            loc: '5146 ANTON DR #202',
            desc: icons.plumber,
            queue: 10,
            sc: 23,
            color: 'gold',
            appType: 'Physical',
            time: '10:45 am',
            when: 'Jan 17 2022'
        },
        {
            id: 4,
            name: "Dr. Sandra Janus",
            img: images.wdoctor1,
            loc: '5146 ANTON DR #202',
            desc: icons.roofer,
            queue: 11,
            sc: 12,
            color: 'gold',
            appType: 'Follow-up',
            time: '9:30 am',
            when: 'Sept 03 2021'
        }
    ] as Appointment[] );

    function Item ( item: Appointment ) {
        return (
            <View style={ {
                ...styles.listItem,
                width: '95%',
                flexDirection: 'row',
                paddingHorizontal: 10,
                paddingVertical: 20,
                borderWidth: 0.1,
                shadowColor: "#000",
                shadowOffset: {
                    width: 0,
                    height: 5,
                },
                shadowOpacity: 0.34,
                shadowRadius: 6.27,
                elevation: 10,
            } }>
                <View style={ {
                    height: ( 90 / 375 ) * ScreenWidth,
                    width: '70%',
                    justifyContent: "center",
                } }>
                    <TouchableOpacity onPress={ () => navigation.navigate( "Club" ) }>
                        <Text style={ {
                            color: "black",
                            fontSize: 18
                        } }>
                            { item.appType } <Text style={ { fontSize: ( 16 / 375 ) * ScreenWidth } }>
                                appointment at
                            </Text> { item.time } on { item.when } </Text>
                    </TouchableOpacity>
                    <View style={ {
                        flexDirection: 'row',
                        alignItems: 'center',
                        marginTop: 15
                    } }>
                        <Text style={ { textAlign: 'center' } }>
                            Request reschedule
                        </Text>
                        <Image
                            source={ icons.schedule }
                            style={ {
                                width: ( 20 / 375 ) * ScreenWidth,
                                height: ( 20 / 375 ) * ScreenWidth,
                                borderRadius: 30,
                                marginLeft: 2
                            } }
                        />
                        <Text style={ { fontSize: ( 14 / 375 ) * ScreenWidth, textAlign: 'center', marginLeft: 20 } }>
                            Cancel
                        </Text>
                        <Icon name='ban' color={ COLORS.primary } size={ ( 20 / 375 ) * ScreenWidth } style={ { justifyContent: 'center', alignSelf: 'center', marginLeft: 2 } } />
                    </View>
                </View>
                <View style={ { alignItems: 'flex-start', marginRight: 20 } }>
                    {/* <Image source={item.img} style={{ width: 60, height: 60, borderRadius: 30, borderColor: item.color, borderWidth: 3 }} /> */ }
                    <Text style={ { fontSize: ( 14 / 375 ) * ScreenWidth, right: '50%', bottom: '15%' } }>
                        { item.name }
                    </Text>
                </View>
            </View>
        );
    };

    function gototabs () {
        navigation.navigate( 'Home' );
    };

    return (
        <View style={ styles.container }>
            <Header
                containerStyle={ {
                    height: '6%',
                    width: '100%',
                    backgroundColor: 'grey',
                    justifyContent: 'space-around',
                } }
                placement="left"
            />

            <View style={ { marginTop: 60 } }>

                <View >
                    <QueueHeader { ...{ queue: queue, socket: socket, myid: myid, navigation: gototabs, viewProv: getProfile } } />
                    <ProgressBar progress={ queue } />
                </View>
                {/* <View style={{ marginBottom: 60 }}> */ }

                <FlatList
                    ListHeaderComponent={
                        <>
                            <View style={ { marginTop: 20 } }>
                                <Text style={ { fontSize: ( 28 / 375 ) * ScreenWidth, fontWeight: 'bold', alignSelf: 'center' } }>Appointments</Text>
                            </View>
                        </>
                    }
                    style={ { paddingBottom: 0, height: '65%' } }
                    data={ providers }
                    keyExtractor={ item => item.id.toString() }
                    renderItem={ ( { item } ) => Item( item ) }
                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create( {
    container: {
        flex: 1,
        backgroundColor: COLORS.white,
    },
    listItem: {
        marginTop: 25,
        backgroundColor: "#FFF",
        width: "95%",
        flex: 1,
        alignSelf: "center",
        flexDirection: "row",
        borderRadius: 5,
        marginBottom: 30
    }
} );
