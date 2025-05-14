import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Dimensions,
  ScrollView,
  FlatList,
  StyleProp,
  TextStyle,
} from 'react-native';
import { Overlay } from '@rneui/themed';
import RatedReviews from './RatedReviews';
import { COLORS, icons } from '../../../constants';
import Probations from './Probations';
import Accusations from './Accusations';
import Arbitrations from './Arbitrations';
import Malpractices from './Malpractices';
import Actions from './Actions';
import Convictions from './Convictions';
import Citations from './Citations';
import { Review_styles } from './styles';
import { reviews } from '../../../dummy';

const { width: ScreenWidth, height: ScreenHeight } = Dimensions.get( 'window' );


const SectionButton = ( { title, onPress }: { title: string, onPress: () => void; } ) => (
  <View style={ Review_styles.section_button_container }>
    <TouchableOpacity
      style={ Review_styles.section_button }
      onPress={ onPress }>
      <Text
        style={ Review_styles.section_button_title }>
        { title }
      </Text>
      <Image
        source={ icons.info }
        resizeMode="cover"
        style={ Review_styles.section_button_icon }
      />
    </TouchableOpacity>
  </View>
);

function getType ( title: string ) {
  const dummy = ( item: any, index: any ) => {
    return <></>;
  };
  switch ( title ) {
    case 'Actions':
      return Actions;
    case 'Probations':
      return Probations;
    case 'Convictions':
      return Convictions;
    case 'Accusations':
      return Accusations;
    case 'Malpractices':
      return Malpractices;
    case 'Arbitrations':
      return Arbitrations;
    case 'Citations':
      return Citations;
    default:
      return dummy;
  }
}

type SectionData =
  { data: Action[], title: string; } |
  { data: Probation[], title: string; } |
  { data: Conviction[], title: string; } |
  { data: Accusation[], title: string; } |
  { data: Malpractice[], title: string; } |
  { data: Arbitration[], title: string; } |
  { data: Citation[], title: string; } |
  { data: Number_negatives_v[], title: string; };

const InfoSection = ( section: SectionData ) => {
  const [ visible, setVisible ] = useState( false );
  let data = section.data;
  let title = section.title;
  //console.log( data, title );

  const function_ = getType( title );

  const toggleOverlay = () => {
    setVisible( !visible );
  };

  if ( data.length === 0 ) return null;

  return (
    <>
      <SectionButton title={ title } onPress={ toggleOverlay } />
      <Overlay
        isVisible={ visible }
        onBackdropPress={ toggleOverlay }
        overlayStyle={ Review_styles.overlay_container }>
        <ScrollView>
          { data.map( ( item, index ) => function_( item, index ) ) }
        </ScrollView>
      </Overlay>
    </>
  );
};



const Review_renderItem = ( {
  actions,
  probations,
  convictions,
  accusations,
  malpractices,
  arbitrations,
  citations,
  number_negatives_v,
  navigation
}: {
  actions: Action[];
  probations: Probation[];
  convictions: Conviction[];
  accusations: Accusation[];
  malpractices: Malpractice[];
  arbitrations: Arbitration[];
  citations: Citation[];
  number_negatives_v: Number_negatives_v[];
  navigation: any;
} ) => {
  return (
    <View style={ Review_styles.container }>
      <ScrollView style={ { height: '100%' } }>
        <View style={ Review_styles.RatedReviews_Container_height }>{ RatedReviews( reviews ) }</View>
        <View style={ Review_styles.negatives_container }>
          <View>
            <View style={ Review_styles.negatives_text_header_container }>
              <Text style={ Review_styles.negatives_text_header }>Negatives</Text>
            </View>
            <InfoSection data={ actions } title="Actions" />
            <InfoSection data={ probations } title="Probations" />
            <InfoSection data={ convictions } title="Convictions" />
            <InfoSection data={ accusations } title="Accusations" />
            <InfoSection data={ malpractices } title="Malpractices" />
            <InfoSection data={ arbitrations } title="Arbitrations" />
            <InfoSection data={ citations } title="Citations" />
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default Review_renderItem;
