import React, { ReactNode } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
} from 'react-native';
import Dialog from "react-native-dialog";
import { ScreenWidth } from 'react-native-elements/dist/helpers';
import { COLORS } from '../../constants';
import * as APICALLS from '../../constants/API_CALLS';
import * as ACTIONS from '../../state/App/actions';
import { useAppDispatch } from '../../state/App/hooks';
import { AppDispatch } from '@/state/store';
import { QueueHeader_styles } from './styles';
type queueHeaderPropType = {
  socket: any,
  user: User,
  queue: Queue,
  navigation: any,
  dispatch: AppDispatch;
};
interface QueueHeaderState {
  dialog_text?: string;
  dialogVisible: boolean;
  needrqa: boolean;
  modal?: string;
  confirmation: boolean;

};


export class QueueHeader extends React.Component<queueHeaderPropType, QueueHeaderState> {

  constructor( props: queueHeaderPropType ) {
    super( props );
    //console.log(props, 'props');
    // this.onLongPress = this.onLongPress.bind(this)
    this.state = {

      dialog_text: undefined,
      dialogVisible: false,
      needrqa: false,
      modal: undefined,
      confirmation: false,
      // queueContext:QueueContext

    };

    // this.state.id = useContext(QueueContext).myid;
    //console.log(this.context);




  }



  requestAccess ( member_id: number ) {
    //console.log( member_id );
    const myid = this.props.user.myid;
    const myname = `${ this.props.user.mydata.Provider.provider.user.first_name } ${ this.props.user.mydata.Provider.provider.user.last_name }`;
    const msg = [ { "_id": 1, "createdAt": new Date(), "text": 'I\'m requesting access to your medical records.', "user": { "_id": 1, "name": myname } } ];


    let data = { msg: msg[ 0 ], sender: myid, notification_type: 'R', receiver: member_id };

    var threadid = Number( member_id ) + Number( myid );
    let newmessage: Message = { msg: msg[ 0 ], _id: Number( myid ), notification_type: 'R', thread_id: String( threadid ), read_msg: 'true', time: new Date() };

    //console.log( 'DEBUG request access to medical records', newmessage );


    this.props.dispatch( ACTIONS.sendMessage( { newmessage: newmessage, data: data } ) );
  }


  componentDidMount () {


    if ( this.props.socket.connected === false ) {
      this.props.socket.connect();
    }


    if ( this.props.queue?.queue?.provider === undefined ) {

      //console.log('updating');

      var data_ = { 'provider': this.props.user.myid };
      this.props.socket.emit( 'notify_provider', data_ );
    }
  };
  componentWillUnmount () {

    //console.log('unmounted');
  };

  componentDidUpdate () {
    // this.initContext();



  };



  confirm_arrival ( arrived: boolean ) {
    var data = { 'provider': this.props.user.myid, 'member': this.props.queue.queuedata.queueA?.[ 0 ]?.member?.member_id, 'method': 'member_confirm', 'arrived': arrived };
    //console.log(data,' in confirm_arrival()');
    this.setState( { dialogVisible: false } );
    this.props.socket.emit( 'lobby', data );
  };
  done_w_patient () {
    var data = { 'provider': this.props.user.myid, 'member': this.props.queue.queuedata.queueB?.[ 0 ]?.member?.member_id, 'method': 'member_confirm_done', 'done': true };
    //console.log( data, ' in done_w_patient()' );
    this.setState( { dialogVisible: false } );
    this.props.socket.emit( 'lobby', data );
  };



  getProfile = async ( id: number | undefined ) => {
    //console.log( id, 'IN GET PROFILE FOR MEMBER' );

    const response = await APICALLS.getMember( id as number );
    //console.log( response, "RESP" );
    if ( response !== undefined && response !== 'rqa' ) {
      this.props.navigation.navigate( "MProfile", { member: response?.data } );
      return 'success';
    };
    if ( response === 'rqa' ) {
      this.setState( { needrqa: true } );
    }
  };



  Connecting () {
    if ( this.props.socket.connected === false ) {
      return (
        <View
          style={ QueueHeader_styles.status_container }
        >
          <TouchableOpacity>
            <Text
              style={ QueueHeader_styles.status_body }
            >
              { String( this.props.socket.connected ) } debug
            </Text>
          </TouchableOpacity>
        </View>
      );
    } else if ( this.props.socket.connected === true ) {
      return (
        <View style={ QueueHeader_styles.status_container }>
          {/* <Pulse color={'orange'} numPulses={1} diameter={400} speed={10} duration={500}/> */ }
          <TouchableOpacity
            onPress={ () => { } }
          >
            <Text style={ QueueHeader_styles.status_body }>
              { String( this.props.socket.connected ) }
            </Text>
          </TouchableOpacity>
        </View>
      );
    } else if ( this.props.socket === undefined ) {
      return (
        <View style={ QueueHeader_styles.status_container }>
          {/* <Pulse 
     color='beige' numPulses={3} diameter={400} speed={20} duration={20}></Pulse> */}
          <TouchableOpacity>
            <Text style={ QueueHeader_styles.status_body }>
              Undefined
            </Text>
          </TouchableOpacity>
        </View>
      );
    }
  };

  Waiting_renderItem () {
    return (
      <View style={ QueueHeader_styles.status_container }>
        <TouchableOpacity onPress={ () => { } }>
          <Text style={ QueueHeader_styles.status_body }>
            Reviewing period for patient { this.props.queue.queuedata.queueW?.[ 0 ]?.member?.member?.user.first_name } { this.props.queue.queuedata.queueW?.[ 0 ]?.member?.member?.user.last_name }'s health records
          </Text>
        </TouchableOpacity>

        {
          this.state.needrqa === false ? (
            <>
              <TouchableOpacity onPress={ () => this.getProfile( this.props.queue.queuedata.queueW?.[ 0 ]?.member?.member_id as number ) } style={ QueueHeader_styles.status_action_button } >
                <Text style={ QueueHeader_styles.status_action_button_text }>
                  View Patient
                </Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={ () => { } } style={ QueueHeader_styles.status_action_button } >
                <Text style={ QueueHeader_styles.status_action_button_text }>
                  Done with review?
                </Text>
              </TouchableOpacity>
            </>
          ) : ( <><TouchableOpacity onPress={ () => this.requestAccess( this.props.queue.queue.member as number ) }
            style={ QueueHeader_styles.status_action_button }>
            <Text style={ { textAlign: 'center', color: COLORS.red } }>Access Denied. Request access to records here.</Text>
          </TouchableOpacity></> )
        }
      </View>
    );
  };

  dialog2 () {

    return ( <Dialog.Container visible={ this.state.dialogVisible }>
      <Dialog.Title>Visit Status</Dialog.Title>
      <Dialog.Description>
        { this.state.dialog_text }
      </Dialog.Description>
      <Dialog.Button onPress={ () => { this.done_w_patient(); } } label="Yes" />
      <Dialog.Button onPress={ () => { this.setState( { dialogVisible: false } ); } } label="No" />
    </Dialog.Container> );


  };


  SeeingPatient_renderItem () {
    return (
      <View style={ QueueHeader_styles.status_container }>
        { this.dialog2() }
        <TouchableOpacity onPress={ () => this.getProfile( this.props.queue.queuedata.queueB?.[ 0 ]?.member?.member_id ) }>
          <Text style={ QueueHeader_styles.status_body }>
            With patient { this.props.queue.queuedata.queueB?.[ 0 ]?.member?.member?.user.first_name } { this.props.queue.queuedata.queueB?.[ 0 ]?.member?.member?.user.last_name }
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={ () => this.setState( { dialogVisible: true, dialog_text: 'Are you sure you\'re done with the patient?' } ) } style={ QueueHeader_styles.status_action_button } >
          <Text style={ QueueHeader_styles.status_action_button_text }>
            Done with patient?
          </Text>
        </TouchableOpacity>
      </View>
    );
  };



  dialog () {
    //console.log('confirmation',this.state.confirmation);
    return ( <Dialog.Container visible={ this.state.dialogVisible }>
      <Dialog.Title>Visit Status</Dialog.Title>
      <Dialog.Description>
        { this.state.dialog_text }
      </Dialog.Description>
      <Dialog.Button onPress={ () => { this.confirm_arrival( this.state.confirmation ); } } label="Yes" />
      <Dialog.Button onPress={ () => { this.setState( { dialogVisible: false } ); } } label="No" />
    </Dialog.Container> );
  };

  Arrived_renderItem () {
    return (
      <View style={ QueueHeader_styles.status_container }>
        { this.dialog() }
        <TouchableOpacity
        >
          <Text style={ QueueHeader_styles.status_body }>
            { this.props.queue.queuedata.queueA?.[ 0 ]?.member?.member?.user.first_name } { this.props.queue.queuedata.queueA?.[ 0 ]?.member?.member?.user.last_name } has arrived...
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={ () => this.setState( { dialogVisible: true, dialog_text: 'Are you sure you\'re ready to see the patient?', confirmation: true } ) }
          style={ QueueHeader_styles.status_action_button } >
          <Text style={ QueueHeader_styles.status_action_button_text }>
            Ready to see patient?
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={ () => this.setState( { dialogVisible: true, dialog_text: 'Did the patient not show?', confirmation: false } ) } style={ QueueHeader_styles.status_action_button } >
          <Text style={ QueueHeader_styles.status_action_button_text }>
            Patient not there?
          </Text>
        </TouchableOpacity>
      </View>
    );
  }




  _renderItem () {

    if ( this.props.socket.connected === false ) {
      this.props.socket.connect();
      var data_ = { 'provider': this.props.user.myid };
      this.props.socket.emit( 'notify_provider', data_ );
    };

    var stat = this.state.modal ?? this.props?.queue?.queuedata?.status;
    //console.log('Status stat: ', stat);
    switch ( stat ) {

      case 'W':
        return this.Waiting_renderItem();

      case 'B':
        return this.SeeingPatient_renderItem();

      case 'A':
        return this.Arrived_renderItem();

      default:
        return this.Connecting();
    }
  };


  render () {
    let content = this._renderItem();


    return (
      <View style={ QueueHeader_styles.container }>
        { content }
      </View>
    );
  }
}


