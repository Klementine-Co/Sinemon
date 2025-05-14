import { View, Text, TouchableOpacity } from "react-native";
import { COLORS } from "../../../constants";
import Icon from 'react-native-vector-icons/FontAwesome';
import { Lobby_styles } from "./styles";


export const LobbyComponent = ( props: any ) => {
  const { queueConfig, goTo, goToText, callTo, callToText, callToIcon } = props;

  // function gotoReception() {
  //   navigation.navigate("Reception", { queueConfig: queueConfig });
  // }

  function getTime ( t: number ) {

    //console.log(t, 'EST WAIT TIME');

    var time = t / 60;
    //console.log(time, ' TIME');
    var hours = Math.floor( time );
    //console.log(hours < 0, ' HOURS');
    var minutes = ( time - hours ) * 60;
    //console.log(minutes, ' MINUTES');

    if ( hours > 0 ) {
      return (
        <Text
          style={ Lobby_styles.wait_time_h_gt_0 }
        >
          Estimated wait time:{ " " }
          <Text style={ { color: COLORS.tertiary } }>
            { hours } hrs { minutes } minutes
          </Text>
        </Text>
      );
    } else if ( hours <= 0 && minutes > 0 ) {
      return (
        <Text
          style={ Lobby_styles.wait_time_m_gt_0 }
        >
          Estimated wait time:{ " " }
          <Text style={ { color: COLORS.tertiary } }>{ minutes } minutes</Text>
        </Text>
      );
    } else {
      return (
        <Text
          style={ Lobby_styles.no_wait }
        >
          Estimated wait time: <Text style={ { color: COLORS.tertiary } }>No wait</Text>
        </Text>
      );
    }
  }

  function getLine ( t: number ) {
    if ( t === 1 ) {
      return (
        <Text
          style={ Lobby_styles.queue_line_status }
        >
          There is <Text style={ Lobby_styles.one_person_line_queue }>{ t }</Text> person waiting in the queue
        </Text>
      );
    } else if ( t > 1 ) {
      return (
        <Text
          style={ Lobby_styles.queue_line_status }
        >
          There are { t } people waiting in the queue
        </Text>
      );
    } else {
      return (
        <Text
          style={ Lobby_styles.queue_line_status }
        ></Text>
      );
    }
  }
  return (
    <View
      style={ Lobby_styles.container }
    >
      <Text style={ Lobby_styles.queue_title }>Queue</Text>
      { getLine( queueConfig.inqueue ) }
      { getTime( queueConfig.est_wait_time ) }

      <View style={ Lobby_styles.butons_container }>
        <TouchableOpacity
          onPress={ goTo }
          style={ Lobby_styles.pause_button }
        >
          <Text style={ Lobby_styles.pause_button_text }>
            { goToText }
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={ callTo }
          style={ Lobby_styles.config_button }
        >
          <Icon name={ callToIcon } color={ COLORS.white } size={ Lobby_styles.config_icon.fontSize } style={ Lobby_styles.config_icon } />
          <Text style={ Lobby_styles.config_button_text }>{ callToText }</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
