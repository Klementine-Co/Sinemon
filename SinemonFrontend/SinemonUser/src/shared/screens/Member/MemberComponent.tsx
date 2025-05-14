import * as React from "react";
import {
    TouchableOpacity,
    View, Text, Image,
    StatusBar
} from "react-native";
import { COLORS, images } from "../../constants";
import Tabs from "react-native-tabs";
import { MProfile_styles } from "./styles";
//TODO make see more go to list of items and make card view of item the primary of the group



export const MemberComponent = ( { route, navigation, member, edit, queue, profile, about, labs, pharmacy, healthRecord } ) => {


    const [ cItems, setCItems ] = React.useState( "Profile" );

    // const queue = useAppSelector((state) => state.queue.queuedata)

    function _renderItem () {
        switch ( cItems ) {
            case "About":
                return about;
            case "Profile":
                return profile;
            case "Pharmacy":
                return pharmacy;
            case "Labs":
                return labs;
            default:
                break;
        }
    };

    const gettabname = ( name: string ) => {
        return (
            {
                ...{
                    name: name,
                    style: MProfile_styles.tab_style,
                    selectedIconStyle: MProfile_styles.tabs_selected_style
                    , onSelect: ( el: any ) => setCItems( name )
                }
            }
        );
    };

    return (
        <View style={ MProfile_styles.container }>

            <View style={ { position: 'absolute', height: '20%', width: '100%', backgroundColor: COLORS.primary, marginBottom: 10 } } />
            <View
                style={ MProfile_styles.card_container }
            >
                <View style={ MProfile_styles.switch_status_container }>
                    <Text style={ MProfile_styles.member_name }>{ member.member.user.first_name } { member.member.user.last_name }</Text>
                    { !!queue && <View
                        style={ MProfile_styles.queue_status_container }>
                        <Text style={ MProfile_styles.queue_status_text }>
                            { queue.mystatus }
                        </Text>
                    </View> }
                </View>
                <View style={ MProfile_styles.addr_container }>
                    <Text style={ MProfile_styles.addr_text }>
                        <Text>{ member.member.user.city }, { member.member.user.state }</Text>
                    </Text>
                </View>
                <View style={ MProfile_styles.insurance_container }>
                    <Text style={ MProfile_styles.insurance_text }>
                        Insurance Status: <Text>Active</Text>
                    </Text>
                </View>
                { edit && <TouchableOpacity style={ MProfile_styles.edit_container } onPress={ () => navigation.navigate( "Edit", { healthRecord: healthRecord } ) }>
                    <Text style={ MProfile_styles.edit_text }>Edit</Text>
                </TouchableOpacity> }
            </View>


            <View style={ MProfile_styles.tabs_container }>
                <Tabs
                    style={ MProfile_styles.tabs_style }
                    selectedStyle={ { color: COLORS.primary } }
                    selected={ cItems }
                >
                    <Text
                        { ...gettabname( 'About' ) }
                    >
                        About
                    </Text>
                    <Text
                        { ...gettabname( 'Labs' ) }
                    >
                        Labs
                    </Text>
                    <Text
                        { ...gettabname( 'Pharmacy' ) }
                    >
                        Pharmacy
                    </Text>
                    <Text
                        { ...gettabname( 'Profile' ) }
                    >
                        Profile
                    </Text>
                </Tabs>
            </View>
            <View style={ MProfile_styles.content_container }>
                { _renderItem() }
            </View>
        </View >
    );
};

