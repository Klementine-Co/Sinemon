
import React from 'react';
import { Header } from '@rneui/themed';
import {
  StyleSheet,
  View,
  Text
} from 'react-native';
import { COLORS } from '../../../constants';
import { ScreenWidth } from 'react-native-elements/dist/helpers';
import Tabs from "react-native-tabs";
import { LobbyConfig } from './LobbyConfig';
import { QueueConfig } from './QueueConfig';
import { OfficeConfig_styles } from './styles';

export const OfficeConfig = ( { route, navigation }: searchProp ) => {

  // Render

  const [ cItems, setCItems ] = React.useState( "LobbyConfig" );

  function _renderItem () {
    switch ( cItems ) {
      case "LobbyConfig":
        return ( <LobbyConfig /> );
      case "QueueConfig":
        return ( <QueueConfig /> );
      default:
        break;
    }
  }

  return (
    <View style={ OfficeConfig_styles.container }>
      <Header
        containerStyle={ OfficeConfig_styles.header }
        placement="left"
      />
      <View style={ OfficeConfig_styles.tabs_container }>
        <Tabs
          style={ OfficeConfig_styles.tabs_background }
          selectedStyle={ { color: COLORS.primary } }
          selected={ cItems }
        >
          <Text
            style={ OfficeConfig_styles.tab_text_font }
            name="QueueConfig"
            selectedIconStyle={ OfficeConfig_styles.selectedIconStyle }
            onSelect={ () => setCItems( "QueueConfig" ) }
          >
            QueueConfig
          </Text>
          <Text
            style={ OfficeConfig_styles.tab_text_font }
            name="LobbyConfig"
            selectedIconStyle={ OfficeConfig_styles.selectedIconStyle }
            onSelect={ () => setCItems( "LobbyConfig" ) }
          >
            LobbyConfig
          </Text>
        </Tabs>
      </View>
      { _renderItem() }
    </View>
  );
};


