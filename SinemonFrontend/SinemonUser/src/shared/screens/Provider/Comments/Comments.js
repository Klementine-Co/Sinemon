import React from 'react'
import
  {
    StyleSheet,
    View,
    Text,
    TouchableOpacity,
    Dimensions,
    FlatList,
  } from 'react-native';
import { Header } from '@rneui/themed';
import PropTypes from 'prop-types'
import emojiUtils from 'emoji-utils'
import { images, icons, COLORS, FONTS, SIZES } from '../../../constants';
const { width: ScreenWidth, height: ScreenHeight }=Dimensions.get( "window" );

export default class Comments extends React.Component
{

  constructor( props )
  {
    super( props )
    // this.onLongPress = this.onLongPress.bind(this)
    this.state={
      comments: props.route.params.comments,

    }
    //console.log(props.route.params.comments);
  }



  componentDidMount ()
  {
    //console.log(this.state);
  }

  toggleViewResponse=( id ) =>
  {
    // const response = this.state;
    //console.log(response);

    this.state.showResponse=!this.state.showResponse;
    this.state.comments.filter( x => x.id==id )[ 0 ].showResponse=!this.state.comments.filter( x => x.id==id )[ 0 ].showResponse;


    this.setState( this.state );
  };
  showResponse=( comment ) =>
  {
    if ( comment.response==undefined )
    {
      return ( null );
    }
    else
    {
      return (
        <View style={ { marginLeft: 50 } }>
          <View style={ { flexDirection: 'row', marginBottom: 15, justifyContent: 'space-between', paddingTop: 10 } }>
            <Text style={ { alignSelf: 'flex-start' } }>
              { comment.provider }
            </Text>
            <Text style={ { alignSelf: 'flex-end' } }>
              Date: { comment.responsedate }
            </Text>
          </View>
          <Text>
            { comment.response }
          </Text>
          <View style={ { flexDirection: 'row', marginBottom: 15, justifyContent: 'space-between', paddingTop: 10 } }>
            <Text style={ { alignSelf: 'flex-start' } }>
              remove
            </Text>
            <Text style={ { alignSelf: 'flex-end' } }>

            </Text>
          </View>
        </View>
      )
    }
  };
  ShowComment=( comment ) =>
  {
    //console.log(comment);
    const sResponse=this.state.comments.filter( x => x.id==comment.id )[ 0 ].showResponse;
    return (
      <View>
        <View>
          <View style={ { flexDirection: 'row', marginBottom: 15, justifyContent: 'space-between', paddingTop: 10 } }>
            <Text style={ { alignSelf: 'flex-start' } }>
              { comment.name }
            </Text>
            <Text style={ { alignSelf: 'flex-end' } }>
              Date: { comment.commentdate }
            </Text>
          </View>
          <Text>
            { comment.comment }
          </Text>
          <View style={ { flexDirection: 'row', marginBottom: 15, justifyContent: 'space-between', paddingTop: 10 } }>
            <Text style={ { alignSelf: 'flex-start' } }>
              remove
            </Text>
            <TouchableOpacity onPress={ ( index ) => { this.toggleViewResponse( comment.id ) } }>
              { comment.response!=undefined? (
                <Text style={ { alignSelf: 'flex-end' } }>
                  View Response
                </Text>
              ):null }
            </TouchableOpacity>
          </View>
        </View>
        { sResponse? (
          this.showResponse( comment )
        ):null }
      </View>
    );
  };


  render ()
  {
    //console.log(this.state);



    return (
      <View style={ { height: '100%', flex: 1, alignItems: 'center', marginTop: 30, width: '100%', justifyContent: 'center' } }>
        <View style={ { borderWidth: 0, height: '100%', width: '100%', paddingHorizontal: 15, marginTop: 10 } }>
          <FlatList
            //  ListHeaderComponent={
            //      <>
            //      <Text style= {{fontSize:22, letterSpacing:1, padddingVertical:5, marginBottom:15, alignSelf:'center', flex:1}}>
            //              Comments
            //      </Text>
            //      </>}
            //   style={{paddingBottom:0}}
            data={ this.state.comments }
            keyExtractor={ item => item.id.toString() }
            renderItem={ ( { item } ) => this.ShowComment( item ) }
          />

        </View>
      </View>

    )
  }
}