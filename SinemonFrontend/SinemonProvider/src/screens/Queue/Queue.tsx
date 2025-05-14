
import React, { useEffect, useState } from 'react';
import { Header } from '@rneui/themed';
import {
  StyleSheet,
  View,
  Image,
  Text,
  TouchableOpacity,
  FlatList,
  ScrollView,
  SectionList
} from 'react-native';
// import _ from 'lodash';
import { images, icons, COLORS } from '../../constants';
// import {Picker} from '@react-native-picker/picker';
import { QueueHeader } from './QueueHeader';
import { useAppDispatch, useAppSelector } from '../../state/App/hooks';
import { ScreenWidth } from 'react-native-elements/dist/helpers';
import { ProgressBar } from './Progress';
import { Queue_styles } from './styles';

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
  const user = useAppSelector( ( state ) => state.user );
  const socket = useAppSelector( ( state ) => state.socket );
  const dispatch = useAppDispatch();

  const [ refresh, setRefresh ] = useState( true );

  useEffect( () => {

    //console.log( 'in queue js useeffect' );


  }, [ queue?.queuedata?.status ] );




  function getDate ( date_: string | null ) {

    if ( date_ === null ) {
      return '';
    }
    var date: Date = new Date( date_ );
    return `${ date.getMonth() }/${ date.getDate() }/${ date.getFullYear() } ${ date.getHours() % 12 || 12 }:${ date.getMinutes() }:${ date.getSeconds() } ${ date.getHours() >= 12 ? 'PM' : 'AM' }`;

  }
  // Render
  const Item = ( { item }: { item: QueueItem; } ) => {
    return (


      // <View style={ Queue_styles.listItem }>
      <>
        <Text style={ Queue_styles.listItem_name }>{ `${ item.member.member.user.first_name } ${ item.member.member.user.last_name }` }</Text>
        <Text style={ Queue_styles.listItem_est_wait }>Estimated Wait: { item.est_wait_time }</Text>
        <Text style={ Queue_styles.listItem_date }>Entered: { getDate( item.join_date ) }</Text>
        <Text style={ Queue_styles.listItem_date }>Left: { getDate( item.leave_date ) }</Text>
      </>
      // </View>ß
    );
  };


  type SectionData = {
    title: string;
    data: QueueItem[];
  };
  const sections: SectionData[] = [
    { title: 'Inline', data: queue?.queuedata?.queueI as QueueItem[] || [] },
    { title: 'Seen', data: queue?.queuedata?.queueS as QueueItem[] || [] }
  ];
  //console.log( queue?.queuedata?.queueB?.[ 0 ]?.member );

  return (


    <View style={ Queue_styles.container }>
      <Header
        containerStyle={ Queue_styles.header_containerStyle }
        placement="left"
      />

      <SectionList
        sections={ sections }
        keyExtractor={ ( item ) => item.join_date.toString().replaceAll( ' ', '' ) }
        renderItem={ Item }
        ItemSeparatorComponent={ () => ( <View style={ { borderWidth: 20, borderColor: 'white' } } /> ) }
        renderSectionHeader={ ( { section: { title } } ) => (
          <Text style={ Queue_styles.sectionHeader }>{ title }</Text>
        ) }


        ListHeaderComponent={
          <>
            <QueueHeader { ...{ queue: queue, socket: socket, user: user, navigation: navigation, dispatch: dispatch } } />
            <View style={ { borderWidth: 20, borderColor: 'white' } } />
            <ProgressBar progress={ queue } size={ 20 } />
          </>
        }
        contentContainerStyle={ Queue_styles.section_contentContainerStyle }
      />
    </View>
  );
};

