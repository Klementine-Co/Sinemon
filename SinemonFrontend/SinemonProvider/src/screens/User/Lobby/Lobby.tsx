import { LobbyComponent } from "../../../screens";

const Lobby_renderItem = ( props: any ) => {
  const { navigation, queueConfig } = props;

  //console.log( queueConfig );

  const callToText = 'Config';
  const callTo = goToConfig;
  const callToIcon = 'gear';


  function goToConfig () {
    navigation.navigate( 'OfficeConfig' );
  };

  function getgoTo ( status: string ) {
    if ( status == 'A' ) {
      return () => { };
    } else {
      return (
        () => { }
      );
    }
  };
  function getgoToText ( status: string ) {
    if ( status == 'A' ) {
      return (
        'Pause'
      );
    } else {
      return (
        'Start'
      );
    }
  };



  return (
    <LobbyComponent queueConfig={ queueConfig } goTo={ getgoTo( queueConfig.status ) } goToText={ getgoToText( queueConfig.status ) } callTo={ callTo } callToText={ callToText } callToIcon={ callToIcon } />
  );
};

export { Lobby_renderItem};