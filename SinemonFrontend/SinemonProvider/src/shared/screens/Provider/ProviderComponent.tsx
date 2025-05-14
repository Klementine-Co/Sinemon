import React, { useState } from "react";
import {
  View,
  Text,
  TouchableHighlight,
  Alert,
} from "react-native";
import Tabs from "react-native-tabs";
import Tooltip from "react-native-walkthrough-tooltip";
import Clipboard from '@react-native-clipboard/clipboard';
import { Speedometer } from "../Components/Speedometer";
import { ScreenWidth } from "react-native-elements/dist/helpers";
import { Account_styles } from "./styles";

export const ProviderComponent = ( { ratings, provider, about, review, lobby } ) => {


  const [ toolTipVisible, settoolTipVisible ] = useState( false );
  const [ cItems, setCItems ] = React.useState( "About" );

  function _renderItem () {
    switch ( cItems ) {
      case "About":
        return about;
      case "Review":
        return review;
      case "Lobby":
        return lobby;
      default:
        break;
    }
  }

  const copyToClipboard = () => {
    // Clipboard.setString(
    //   provider.provider.user.street_address +
    //   " " +
    //   provider.provider.user.zipcode
    // );
    // Alert.alert(
    //   "Copied",
    //   provider.provider.user.street_address +
    //   " " +
    //   provider.provider.user.zipcode
    // );
    Clipboard.setString(
      `${provider.provider.user.street_address} ${provider.provider.user.zipcode}`
    );
  };
  const getClipboard = async () => {
    // const text = await Clipboard.getStringAsync();
    // return text;
    const text = await Clipboard.getString();
  return text;
  };

  const gettabname = ( name: string ) => {
    return {
      ...{
        name: name,
        style: Account_styles.tabname_style,
        selectedIconStyle: Account_styles.selectedIconStyle,
        onSelect: ( el: any ) => setCItems( name ),
      },
    };
  };

  return (
    <View style={ Account_styles.container }>
      <View
        style={ Account_styles.card }
      >

        <View style={ { flexDirection: "row", alignItems: "center" } }>
          <View style={ { justifyContent: "flex-start", flex: 1, bottom: '5%' } }>
            <Text style={ Account_styles.name_font }>
              Dr. { provider.provider.user.last_name },{ " " }
              { provider.provider.user.first_name.substring( 0, 1 ) }.
            </Text>
            <Text style={ Account_styles.network }>In network</Text>
            <View
              style={ {
                backgroundColor: "gold",
                width: ( 75 / 375 ) * ScreenWidth,
                borderRadius: 100,
              } }
            >
              <Text style={ Account_styles.badge_font }>
                { provider.badge.badge }
              </Text>
            </View>
          </View>

          <View
            style={ Account_styles.speedometer_container }
          >

            <Speedometer ratings={ratings}/>

          </View>
        </View>
        <View style={ Account_styles.addr_container }>
          <Tooltip
            isVisible={ toolTipVisible }
            content={
              <>
                <Text>
                  <Text>{ provider.provider.user.street_address } </Text>
                </Text>
                <Text>
                  <Text>
                    { provider.provider.user.city },{ " " }
                    { provider.provider.user.state },{ " " }
                    { provider.provider.user.zipcode }
                  </Text>
                </Text>
              </>
            }
            placement="top"
            onClose={ () => settoolTipVisible( false ) }
          >
            <TouchableHighlight
              // style={styles.touchable}
              onPress={ () => settoolTipVisible( true ) }
            >
              <Text style={ Account_styles.license_addr_copy_font }>address</Text>
            </TouchableHighlight>
          </Tooltip>
          <TouchableHighlight
            style={ { marginLeft: 10 } }
            onPress={ copyToClipboard }
          >
            <Text style={ Account_styles.license_addr_copy_font }>copy</Text>
          </TouchableHighlight>
        </View>

        <View style={ Account_styles.license_status_container_wrapper }>
          <View style={ Account_styles.license_status_container }>
            <Text style={ Account_styles.license_addr_copy_font }>
              License Status
            </Text>
            <Text style={ { backgroundColor: 'lightgreen' } }>Active</Text>
          </View>


        </View>
      </View>
      <View style={ Account_styles.class_spec_container }>
        <Text style={ Account_styles.class_spec_title_font }>
          Classification:{ " " }
          <Text
            style={ Account_styles.class_spec_font }
          >
            Obstetrics & Gynecology
          </Text>
        </Text>
        <Text style={ Account_styles.class_spec_title_font }>
          Specialization:{ " " }
          <Text
            style={ Account_styles.class_spec_font }
          >
            Obstetrics
          </Text>
        </Text>
      </View>
      <View style={ Account_styles.tabs_container }>
        <Tabs
          style={ Account_styles.tabs_style }
          selected={ cItems }
          selectedStyle={ Account_styles.selectedStyle }
        >
          <Text { ...gettabname( "About" ) }>About</Text>
          <Text { ...gettabname( "Review" ) }>Review</Text>
          <Text { ...gettabname( "Lobby" ) }>Lobby</Text>
          {/* <Text {...gettabname("Blog")}>Blog</Text> */ }
        </Tabs>
      </View>
      <View
        style={ Account_styles.renderItems_container }
      >
        { _renderItem() }
        {/* {negative_info()} */ }
      </View>
    </View>
  );
};
