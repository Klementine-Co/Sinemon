import { Socket } from "socket.io-client";
import React, { ReactNode } from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import { API, COLORS } from "../../constants";
import { ScreenWidth } from "react-native-elements/dist/helpers";
import { QueueHeader_styles } from "./styles";

type queueHeaderPropType = {
  socket: Socket;
  myid: number;
  queue: Queue;
  viewProv: any;
};

export class QueueHeader extends React.Component<
  any,
  {
    arrived: boolean;
    sent: boolean;
    modal: any;
  }
> {
  constructor( props: queueHeaderPropType ) {
    super( props );
    this.state = {
      arrived: false,
      sent: false,
      modal: props?.queue?.queuedata?.mystatus,
    };
  }


  componentDidMount () {
    // console.log( 'mounting in queheader' );
    if ( this.props.socket.connected === false ) {
      this.props.socket.connect();
    }

    if ( this.props.queue?.queue?.member === undefined ) {
      var data_ = { member: this.props.myid };
      this.props.socket.emit( "update", data_ );
    }
  }
  //   shouldComponentUpdate(nextProps: Readonly<{}>, nextState: any){
  //     return nextProps !== this.props || nextState !== this.state ; // equals() is your implementation
  //  }
  componentDidUpdate () {

    // console.log( 'in Queueheader js' );
    // console.log(this.props);

    if ( this.props.socket.connected === false ) {
      //console.log( 'didupdate debug' );

      this.props.socket.connect();
      var data_ = { member: this.props.myid };
      this.props.socket.emit( "update", data_ );
    }
    if ( this.state.sent === true ) {
      this.arrived();
    }
  }


  arrivedCheck () {
    this.setState( { arrived: true, sent: true } );
  }

  arrived () {
    const data = {
      ...this.props.queue.queue,
      method: "arrived",
      arrived: this.state.arrived,
    };
    this.props.socket.emit( "join_leave", data );
    this.setState( { arrived: this.state.arrived, sent: false } );
  }

  leave () {
    this.setState( { modal: undefined } );
    const data = { ...this.props.queue.queue, method: "leave" };
    this.props.socket.emit( "join_leave", data );
    this.props.navigation();
  }

  finish () {
    this.setState( { modal: undefined } );
    const data = { ...this.props.queue.queue, method: "finish" };
    this.props.socket.emit( "join_leave", data );
    this.props.navigation();
  }

  leaving () {
    this.setState( { modal: "leaving" } );
  }

  finished () {
    this.setState( { modal: "finishing" } );
  }

  notleaving () {
    this.setState( { modal: undefined } );
  }

  getPosition ( pos: number ) {
    return (
      <View style={ { flexDirection: "row", marginBottom: 0 } }>
        <Text style={ { fontSize: ( 24 / 375 ) * ScreenWidth, color: COLORS.primary } }>{ pos }</Text>
        <Text style={ { fontSize: ( 16 / 375 ) * ScreenWidth, lineHeight: 25, fontWeight: "500", color: COLORS.primary } }>
          { this.getPos( pos ) }
        </Text>
      </View>
    );
  }

  getPos ( pos: number ): ReactNode {
    if ( pos == 1 ) {
      return <Text>st</Text>;
    } else if ( pos == 2 ) {
      return <Text>nd</Text>;
    } else if ( pos == 3 ) {
      return <Text>rd</Text>;
    } else {
      return <Text>th</Text>;
    }
  }

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
    //console.log('in waiting ');
    if ( this.props.socket.connected === true ) {
      return (
        <View
          style={ {
            flex: 1,
            justifyContent: "center",
            alignSelf: "center",
            height: ( 200 / 375 ) * ScreenWidth,
            width: '35%'
          } }
        >
          <Text>
            Let your care provider know when you have arrived.
          </Text>
          <TouchableOpacity onPress={ () => this.arrivedCheck() }
            style={ {
              backgroundColor: COLORS.primary,
              borderWidth: 0.1,
              borderRadius: 10,
              width: "100%",
              alignSelf: "center",
              marginTop: 15,
              marginBottom: 0,
            } }
          >
            <Text
              style={ {
                color: 'white',
                fontSize: ( 18 / 375 ) * ScreenWidth,
                fontWeight: "bold",
                alignSelf: "center",
              } }
            >
              I've arrived
              {/* arrived? {String(this.state.arrived)} */ }
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={ () => this.leaving() }
            style={ {
              backgroundColor: COLORS.tertiary,
              borderWidth: 0.1,
              borderRadius: 10,
              width: "100%",
              alignSelf: "center",
              marginTop: 15,
              marginBottom: 50,
            } }
          >
            <Text style={ { fontSize: ( 16 / 375 ) * ScreenWidth, textAlign: "center", color: COLORS.white } }>
              Leave queue
            </Text>
          </TouchableOpacity>
        </View>
      );
    }
  }

  BeingSeen_renderItem () {
    if ( this.props.socket.connected === true ) {
      return (
        <View
          style={ {
            flex: 1,
            justifyContent: "center",
            alignSelf: "center",
            height: ( 200 / 375 ) * ScreenWidth,
            width: '35%'
          } }
        >
          <TouchableOpacity>
            <Text
              style={ {
                color: COLORS.neutral,
                fontSize: ( 18 / 375 ) * ScreenWidth,
                fontWeight: "bold",
                alignSelf: "center",
              } }
            >
              Being seen
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={ () => this.finished() }
            style={ {
              backgroundColor: COLORS.primary,
              width: "100%",
              alignSelf: "center",
              marginTop: 15,
              marginBottom: 50,
            } }
          >
            <Text style={ { fontSize: ( 26 / 375 ) * ScreenWidth, textAlign: "center", color: COLORS.white } }>Finished</Text>
          </TouchableOpacity>
        </View>
      );
    }
  }

  Inline_renderItem () {
    if ( this.props.socket.connected === true ) {
      return (
        <View
          style={ {
            flex: 1,
            justifyContent: "center",
            alignSelf: "center",
            height: ( 200 / 375 ) * ScreenWidth,
            width: '35%'
          } }
        >
          <View
            style={ {
              borderWidth: 0,
              justifyContent: "center",
              alignItems: "center",
            } }
          >
            <Text style={ { fontSize: ( 20 / 375 ) * ScreenWidth } }>Position in queue</Text>
            <View
              style={ {
                borderWidth: 3,
                borderRadius: 100,
                height: ( 70 / 375 ) * ScreenWidth,
                width: ( 70 / 375 ) * ScreenWidth,
                alignItems: "center",
                justifyContent: "center",
                borderColor: COLORS.primary
              } }
            >
              <Text style={ { fontSize: ( 24 / 375 ) * ScreenWidth } }>
                { this.getPosition( this.props.queue?.queuedata?.data?.position ) }
              </Text>
            </View>
          </View>
          <TouchableOpacity
            onPress={ () => this.leaving() }
            style={ {
              backgroundColor: COLORS.tertiary,
              borderWidth: 0.1,
              borderRadius: 10,
              width: "100%",
              alignSelf: "center",
              marginTop: 15,
              marginBottom: 50,
            } }
          >
            <Text style={ { fontSize: ( 16 / 375 ) * ScreenWidth, textAlign: "center", color: COLORS.white } }>
              Leave queue
            </Text>
          </TouchableOpacity>
        </View>
      );
    }
  }

  Left_renderItem () {
    if ( this.props.socket.connected === true ) {
      return (
        <View
          style={ {
            flex: 1,
            justifyContent: "center",
            alignSelf: "center",
            height: ( 200 / 375 ) * ScreenWidth,
            width: '85%'
          } }
        >
          <Text
            style={ {
              color: COLORS.black,
              fontSize: ( 18 / 375 ) * ScreenWidth,
              fontWeight: "bold",
              alignSelf: "center",
            } }
          >
            Are you sure you want leave the queue?
          </Text>
          <View
            style={ {
              flexDirection: "row",
              justifyContent: "space-around",
              width: '30%',
              marginTop: 10,
              alignSelf: 'center',
            } }
          >
            <TouchableOpacity onPress={ () => this.leave() }>
              <Text
                style={ {
                  color: COLORS.tertiary,
                  fontSize: ( 18 / 375 ) * ScreenWidth,
                  fontWeight: "bold",
                  alignSelf: "center",
                } }
              >
                Yes
              </Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={ () => this.notleaving() }>
              <Text
                style={ {
                  color: COLORS.neutral,
                  fontSize: ( 18 / 375 ) * ScreenWidth,
                  fontWeight: "bold",
                  alignSelf: "center",
                } }
              >
                No
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      );
    }
  }

  Finished_renderItem () {
    if ( this.props.socket.connected === true ) {
      return (
        <View
          style={ {
            flex: 1,
            justifyContent: "center",
            alignSelf: "center",
            height: ( 200 / 375 ) * ScreenWidth,
            width: '85%'
          } }
        >
          <Text
            style={ {
              color: COLORS.neutral,
              fontSize: ( 18 / 375 ) * ScreenWidth,
              fontWeight: "bold",
              alignSelf: "center",
            } }
          >
            Are you sure you are done?
          </Text>
          <View
            style={ {
              flexDirection: "row",
              justifyContent: "space-around",
              width: '30%',
              marginTop: 10,
              alignSelf: 'center',
            } }
          >
            <TouchableOpacity onPress={ () => this.finish() }>
              <Text
                style={ {
                  color: COLORS.tertiary,
                  fontSize: ( 18 / 375 ) * ScreenWidth,
                  fontWeight: "bold",
                  alignSelf: "center",
                } }
              >
                Yes
              </Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={ () => this.notleaving() }>
              <Text
                style={ {
                  color: COLORS.primary,
                  fontSize: ( 18 / 375 ) * ScreenWidth,
                  fontWeight: "bold",
                  alignSelf: "center",
                } }
              >
                No
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      );
    }
  }

  Arrived_renderItem () {
    return (
      <View
        style={ {
          flex: 1,
          justifyContent: "center",
          alignSelf: "center",
          height: ( 200 / 375 ) * ScreenWidth,
          width: '65%'
        } }
      >
        <TouchableOpacity onPress={ () => { this.props.viewProv( this.props.queue?.queuedata?.data?.prov ); } }>

          <Text
            style={ {
              color: COLORS.primary,
              fontSize: 28,
              fontWeight: "bold",
              alignSelf: "center",
            } }
          >
            Waiting for Dr.{ " " }
            {
              this.props.queue?.queuedata?.data?.prov?.provider?.user
                ?.first_name
            }{ " " }
            { this.props.queue?.queuedata?.data?.prov?.provider?.user?.last_name }{ " " }
            ...
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={ () => this.leaving() }
          style={ {
            backgroundColor: COLORS.tertiary,
            width: "45%",
            alignSelf: "center",
            marginTop: 15,
            marginBottom: 50,
          } }
        >
          <Text style={ { fontSize: ( 16 / 375 ) * ScreenWidth, textAlign: "center", color: COLORS.white } }>Leave queue</Text>
        </TouchableOpacity>
      </View>
    );
  }

  _renderItem () {
    var stat = this.state.modal ?? this.props?.queue?.queuedata?.mystatus;
    // console.log(stat);

    switch ( stat ) {
      case "inline":
        return this.Inline_renderItem();

      case "waiting":
        return this.Waiting_renderItem();

      case "arrived":
        return this.Arrived_renderItem();

      case "beingseen":
        return this.BeingSeen_renderItem();

      case "finishing":
        return this.Finished_renderItem();

      case "leaving":
        return this.Left_renderItem();

      default:
        return this.Connecting();
    }
  }

  getProviderHeader () {
    if ( this.props?.queue?.queuedata?.data !== undefined ) {
      return (
        <View style={ { borderWidth: 0, height: ( 90 / 375 ) * ScreenWidth, marginTop: 5 } }>
          <View
            style={ {
              borderWidth: 0,
              position: "absolute",
              height: "70%",
              width: "60%",
              top: 10,
              left: 15,
              justifyContent: "center",
            } }
          >
            <Text style={ { color: "black" } }>Office</Text>
            <Text style={ { fontSize: ( 28 / 375 ) * ScreenWidth } }>
              Dr.{ " " }
              { this.props.queue.queuedata.data.prov.provider.user.first_name }{ " " }
              { this.props.queue.queuedata.data.prov.provider.user.last_name }
            </Text>
          </View>
         
        </View>
      );
    } else {
      return (
        <View
          style={ {
            borderWidth: 0,
            height: ( 90 / 375 ) * ScreenWidth,
            width: ( 100 / 375 ) * ScreenWidth,
            marginTop: 5,
            left: 50,
          } }
        >
          <View
            style={ {
              borderWidth: 0,
              width: "100%",
              top: '10%',
              justifyContent: "center",
            } }
          >
            <Text style={ { color: "black" } }>DEBUG</Text>
            <Text style={ { fontSize: ( 28 / 375 ) * ScreenWidth } }>DEBUG</Text>
          </View>
        </View>
      );
    }
  }

  render () {

    // console.log('MY status in queueheader', this.props.queue.queuedata?.mystatus);

    return (
      <>
        <View style={ { flexDirection: "row" } }>
          { this.getProviderHeader() }
          <View
            style={ { flex: 1, justifyContent: "center", alignSelf: "center" } }
          >
            { this._renderItem() }
          </View>
        </View>
      </>
    );
  }
}
