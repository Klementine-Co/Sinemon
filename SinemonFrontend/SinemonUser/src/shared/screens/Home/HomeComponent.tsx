import * as style from './styles';
import React, { } from 'react';
import {
    View,
    Image,
    Text,
    TouchableOpacity,
    FlatList,
    StatusBar
} from 'react-native';
import { Header } from 'react-native-elements/dist/header/Header';
import { State } from 'react-native-gesture-handler';
import Dialog from "react-native-dialog";
import { useAppDispatch } from '../../../state/App/hooks';
import * as actions from "../../../state/App/actions";

export const HomeComponent = ( { articles, salutation, preferred_name, show } ) => {



    const dispatch = useAppDispatch();


    function RenderNews ( items: any, index: Number ) {
        return (
            <View >
                <FlatList
                    data={ items.item.filter(
                        ( x: { HeaderCard: boolean; } ) => x.HeaderCard == false ) }
                    keyExtractor={ item => item.id.toString() }
                    renderItem={ ( { item } ) => <Item item={ item } /> }
                />
            </View>
        );
    };

    function Item ( { item }: any ) {
        return (
            <View style={ style.styles.listItem }>
                <View style={ style.styles.list_article }>
                    <TouchableOpacity>
                        <Text numberOfLines={ 3 } style={ style.styles.list_article_headline }>
                            { item.headline }
                        </Text>
                        <Text numberOfLines={ 4 } style={ style.styles.list_article_info }>
                            { item.info }
                        </Text>
                    </TouchableOpacity>
                </View>
                <Image source={ item.media } style={ style.styles.list_article_image } />
            </View>
        );
    };

    const logoutconfirmed = () => {
        dispatch( actions.logout() );
    };

    const cancellogout = () => {
        dispatch( actions.setShow( Boolean( false ) ) );
    };

    // const onLongPress = ( event: { nativeEvent: { state: number; }; } ) => {
    //     if ( event.nativeEvent.state === State.ACTIVE ) {
    //         Haptics.notificationAsync( Haptics.NotificationFeedbackType.Success );
    //         dispatch( actions.setShow( Boolean( true ) ) );
    //     }
    // };

    return (
        <View style={ style.styles.container }>
            <Header
                containerStyle={ style.styles.header_bar_top_screen }
                placement="left"
            />
            <StatusBar barStyle={ 'dark-content' } />
            <View style={ style.styles.screen_view }>
                <FlatList
                    ListHeaderComponent={
                        <>
                            <View style={ style.styles.header }>
                                <View style={ style.styles.header_message }>
                                    <Text style={ style.styles.header_welcome }>
                                        Welcome
                                    </Text>
                                    <Text style={ style.styles.header_user_name }>
                                        { salutation } { preferred_name }
                                    </Text>
                                    <Dialog.Container visible={ ( show ) }>
                                        <Dialog.Title>
                                            Account logout
                                        </Dialog.Title>
                                        <Dialog.Description>
                                            Do you want to logout?
                                        </Dialog.Description>
                                        <Dialog.Button onPress={ () => { logoutconfirmed(); } } label="Yes" />
                                        <Dialog.Button onPress={ () => { cancellogout(); } } label="No" />
                                    </Dialog.Container>
                                </View>
                                {/* <LongPressGestureHandler
                                onHandlerStateChange={onLongPress}
                                minDurationMs={800}
                            >
                                <Image
                                    source={images.wmember}
                                    resizeMode="cover"
                                    style={style.styles.header_image}
                                />
                            </LongPressGestureHandler> */}
                            </View>
                            <View style={ style.styles.listItem }></View>
                        </> }
                    data={ articles }
                    keyExtractor={ item => item[ 0 ].id.toString() }
                    renderItem={ ( { item, index } ) => <RenderNews item={ item } index={ index } /> }
                />
            </View>
        </View>
    );
};



