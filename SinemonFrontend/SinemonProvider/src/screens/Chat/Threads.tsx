import {
  View,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
  Text,
} from "react-native";
import { List, Divider } from "react-native-paper";
import { Header } from "react-native-elements";
import { useAppSelector } from "../../state/App/hooks";
import { ScreenWidth } from "react-native-elements/dist/helpers";
import { Thread_styles } from "./styles";

export const Threads = ( { route, navigation }: threadsProp ) => {
  const notifications = useAppSelector( ( state ) => state.notifications );
  const user = useAppSelector( ( state ) => state.user );

  function pending ( notification_type: String, id: Number, text?: String ) {
    if ( notification_type === 'R' && id === 2 ) {
      return 'Pending';
    } else {
      return text;
    }
  }
  return (
    <View style={ Thread_styles.container }>
      <Header
        containerStyle={ Thread_styles.header_container }
        placement="left"
      />
      { notifications.length < 1 ? (
        <>
          <View>
            <Text>in threads js</Text>
          </View>
        </>
      ) : (
        <FlatList
          data={ notifications }
          contentContainerStyle={ Thread_styles.contentContainerStyle }
          keyExtractor={ ( item ) => item.thread.thread_id.toString() }
          ItemSeparatorComponent={ () => <Divider /> }
          renderItem={ ( { item } ) => ( //console.log( item ),

            <TouchableOpacity
              onPress={ () =>


                navigation.navigate( "Chat", {
                  threadid: item.thread.thread_id,
                } )
              }
            >
              <View style={ Thread_styles.threads_container }>

                <View style={ Thread_styles.thread_container }>
                  <List.Item
                    title={ item.receiverName }
                    description={ pending( item?.thread?.notification_type, item?.thread?.msg?.user?._id, ( item?.thread?.msg as any )?.text ) }
                    titleNumberOfLines={ 1 }
                    titleStyle={ Thread_styles.listTitle }
                    descriptionStyle={ Thread_styles.listDescription }
                    descriptionNumberOfLines={ 3 }
                  />
                </View>
              </View>
            </TouchableOpacity>
          ) }
        />
      ) }
    </View>
  );
};

