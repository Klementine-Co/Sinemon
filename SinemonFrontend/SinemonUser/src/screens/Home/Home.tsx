import * as style from './styles';
import React, {} from 'react';
import {
    View,
    Image,
    Text,
    TouchableOpacity,
    FlatList,
    StatusBar  
} from 'react-native';
import { COLORS, images} from '../../constants';
import { Header } from 'react-native-elements/dist/header/Header';
import { LongPressGestureHandler, State } from 'react-native-gesture-handler';
// import ReactNativeHapticFeedback from 'react-native-haptic-feedback';
import Dialog from "react-native-dialog";
import { useAppDispatch, useAppSelector } from '../../state/App/hooks';
import * as actions from "../../state/App/actions";

export const Home = ( ) => {
    // const options = {
    //     enableVibrateFallback: true,
    //     ignoreAndroidSystemSettings: false,
    //   };

    const user = useAppSelector((state) => state.user);
    const dispatch = useAppDispatch();
    const [destinations, setDestinations] = React.useState([
        [{  
            id: 1,
            name: "Medical Daily",
            media: images.coffee,
            headline: "Is Coffee Good For You? 8 Surprising Health Benefits Of Caffeine",
            info: "",
            footnote: "Mon, 19 Jul 2021",
            sc: 23,
            tag:'article',
            HeaderCard:true,
            header:'Lifestyle',
            category: 'lifestyle',
        },
        {   
            id: 2,
            name: "Medical Daily",
            media: images.wine,
            headline: "Is Wine Good For You? 11 Surprising Healthy Benefits Of Vino",
            info: "More than just a celebratory drink or something to cap off a long day, wine can also give a lot of great health benefits so you have more reasons to enjoy your vino. Here's a list of wines health benefits along with the best wine brands you can get online.",
            footnote: "Fri, 23 Jul 2021",
            sc: 23,
            tag:'article',
            HeaderCard:false,
            header:null,
            category: 'lifestyle',
        },
        {   
            id: 3,
            name: "Medical Daily",
            media: images.earbuds,
            headline: "Are Wireless Earbuds Bad For Your Brain And Hearing?",
            info: "While wireless earbuds make taking calls, watching videos and listening to music on the go more convenient, can these earbuds be bad for your hearing? Here’s what you need to know.",
            footnote: "Tue, 20 Jul 2021",
            sc: 23,
            tag:'article',
            HeaderCard:false,
            header:null,
            category: 'lifestyle',
        },
        {   
            id: 4,
            name: "Medical Daily",
            media: images.outdoor,
            headline: "12 Best Healthy Outdoor Activities For Kids This Summer 2021",
            info: "It's summer 2021, are your kids already bored at home? Here are the best outdoor activities that you and your little ones can enjoy to stay healthy and active.",
            footnote: "Fri, 16 Jul 2021",
            sc: 23,
            tag:'article',
            HeaderCard:false,
            header:null,
            category: 'lifestyle',
        }],
        [{  
            id: 5,
            name: "Medical Daily",
            media: images.research,
            headline: "Novel therapeutic agent could be effective for treating cancers with certain gene mutations",
            info: "",
            footnote: "Fri, 23 Jul 2021",
            sc: 23,
            tag:'article',
            HeaderCard:true,
            header:'Research',
            category: 'research',
        },
        {   
            id: 6,
            name: "Medical Daily",
            media: images.mhresearch,
            headline: "Study finds unacceptable mental health service shortfalls for children in high-income countries",
            info: "Most children with a mental health disorder are not receiving services to address their needs--according to a new study from researchers at Simon Fraser University's Children's Health Policy Centre.",
            footnote: "Fri, 23 Jul 2021",
            sc: 23,
            tag:'article',
            HeaderCard:false,
            header:null,
            category: 'research',
        },
        {   
            id: 7,
            name: "Medical Daily",
            media: images.gresearch,
            headline: "Gene therapy protects optic nerve cells and preserves vision in glaucoma mouse models",
            info: "A form of gene therapy protects optic nerve cells and preserves vision in mouse models of glaucoma, according to research supported by NIH's National Eye Institute.",
            footnote: "Fri, 23 Jul 2021",
            sc: 23,
            tag:'article',
            HeaderCard:false,
            header:null,
            category: 'research',
        }]
    ]);

    function RenderNews(items:any, index:Number){
        return(  
            <View >
                <FlatList
                    data={items.item.filter(
                        (x: { HeaderCard: boolean; }) => x.HeaderCard == false)}
                    keyExtractor={item => item.id.toString()}
                    renderItem={({ item }) => <Item item={item}/>}
                />   
            </View>
        );
    };

    function Item({ item }:any) {
        return (
            <View style={style.styles.listItem}>
                <View style={style.styles.list_article}>
                    <TouchableOpacity>
                        <Text numberOfLines={3} style={style.styles.list_article_headline}>
                            {item.headline}
                        </Text>
                        <Text numberOfLines={4} style={style.styles.list_article_info}>
                            {item.info}
                        </Text>
                    </TouchableOpacity>
                </View>
                <Image source={item.media} style={style.styles.list_article_image} />
            </View>
        );
    };
    
    const logoutconfirmed = () => {
        dispatch(actions.logout())
    };
      
    const cancellogout = () => {
        dispatch(actions.setShow(Boolean(false)))
    };

    //CONVERT TO
    //synchronous ReactNativeHapticFeedback.trigger('notificationSuccess', options);
    // function triggerHapticFeedback(type) {
    //     return new Promise((resolve) => {
    //       ReactNativeHapticFeedback.trigger(type, {
    //         enableVibrateFallback: true,
    //         ignoreAndroidSystemSettings: false,
    //       });
    //       resolve(); // Ensures async-like behavior
    //     });
    //   }
      
    //   // Usage inside an async function
    //   async function handleSuccess() {
    //     console.log("Starting haptic feedback...");
    //     await triggerHapticFeedback("notificationSuccess");
    //     console.log("Haptic feedback finished.");
    //   }
      

    // const onLongPress = (event: { nativeEvent: { state: number; }; }) => {
    //     if (event.nativeEvent.state === State.ACTIVE) {
    //         Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    //         dispatch(actions.setShow(Boolean(true)))
    //     }
    // };

    return (
        <View style={style.styles.container}>
            <Header
                containerStyle={style.styles.header_bar_top_screen}
                placement="left"
            />    
            <StatusBar barStyle={'dark-content'}/>
            <View style={style.styles.screen_view}>
                <FlatList
                    ListHeaderComponent = {
                    <>
                        <View style = { style.styles.header }>
                            <View style = { style.styles.header_message }>
                                <Text style ={style.styles.header_welcome }>
                                    Welcome
                                </Text>
                                <Text style = {style.styles.header_user_name }>
                                {user.mydata.Member.member.user.first_name} {user.mydata.Member.member.user.last_name}
                                </Text>
                                <Dialog.Container visible = {( user.show )}>
                                    <Dialog.Title>
                                        Account logout
                                    </Dialog.Title>
                                    <Dialog.Description>
                                        Do you want to logout?
                                    </Dialog.Description>
                                    <Dialog.Button onPress={() => {logoutconfirmed()}} label="Yes" />
                                    <Dialog.Button onPress={() => {cancellogout()}} label="No" />
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
                        <View style = { style.styles.listItem }></View>
                    </>}
                    data={destinations}
                    keyExtractor={item => item[0].id.toString()}
                    renderItem={({ item , index}) => <RenderNews item={item} index={index}/>}
                />
            </View>
        </View>
    );
};



