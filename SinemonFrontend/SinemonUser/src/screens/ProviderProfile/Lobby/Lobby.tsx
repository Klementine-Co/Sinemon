import { LobbyComponent } from "../../../screens";

const Lobby_renderItem = ( props: any ) => {
  const { navigation, queueConfig } = props;


  const callToText = 'Call for an appointment';
  const callTo = () => { };
  const callToIcon = 'phone';

  function gotoReception () {
    navigation.navigate( "Reception", { queueConfig: queueConfig } );
  }
  function getgoTo ( status: string ) {
    if ( status == 'A' ) {
      return gotoReception;
    } else {
      return (
        () => { }
      );
    }
  };
  function getgoToText ( status: string ) {
    if ( status == 'A' ) {
      return (
        'Join Queue'
      );
    } else {
      return (
        'Not Available'
      );
    }
  };



  return (
    <LobbyComponent queueConfig={ queueConfig } goTo={ getgoTo( queueConfig.status ) } goToText={ getgoToText( queueConfig.status ) } callTo={ callTo } callToText={ callToText } callToIcon={ callToIcon } />
  );
};

export default Lobby_renderItem;
