import React, { useState } from "react";
import { About_renderItem } from "../../screens";
import { Review_renderItem } from "../../screens";
import {Lobby_renderItem} from "./Lobby/Lobby";
import { ProviderComponent } from "../../screens";
import { useAppSelector } from "../../state/App/hooks";


export const Account = ( { route, navigation }: accountProp ) => {

  // const [queueContext, setQueueContext] = useContext(QueueContext);



  let mydata = useAppSelector( ( state ) => state.user.mydata );

  let drrating: Rate = { type: 'doctor', rating: 216 };
  let staffrating: Rate = { type: 'staff', rating: 73 };
  let officerating: Rate = { type: 'office', rating: 66 };
  let bedsiderating: Rate = { type: 'bedisde', rating: 60 };

  mydata = {
    ...mydata,
    Ratings: [ drrating, staffrating, officerating, bedsiderating ]
  };
  let {
    Provider: provider,
    QueueConfig: queueConfig,
    License: licenses,
    Actions: actions,
    Probations: probations,
    Convictions: convictions,
    Accusations: accusations,
    Malpractices: malpractices,
    Arbitrations: arbitrations,
    Citations: citations,
    Number_negatives_v: number_negatives_v,
    Number_of_negatives: number_of_negatives,
    Ratings: ratings,
  } = mydata;



  // provider = {
  //   ...provider,
  //   about: "Dummy",
  //   tip: "Dummy",
  // };



  const myd = {
    Provider: provider,
    QueueConfig: queueConfig,
    License: licenses,
    Actions: actions,
    Probations: probations,
    Convictions: convictions,
    Accusations: accusations,
    Malpractices: malpractices,
    Arbitrations: arbitrations,
    Citations: citations,
    Number_negatives_v: number_negatives_v,
    Number_of_negatives: number_of_negatives,
    Ratings: ratings
  };
  // console.log( myd.Provider.provider.user, 'XX' );

  return (
    <ProviderComponent
      ratings={ ratings }
      provider={ provider }
      about={ <About_renderItem provider={ provider } /> }
      review={ <Review_renderItem
        actions={ actions }
        probations={ probations }
        convictions={ convictions }
        accusations={ accusations }
        malpractices={ malpractices }
        arbitrations={ arbitrations }
        citations={ citations }
        number_negatives_v={ number_negatives_v }
        navigation={ navigation }
      /> }
      lobby={ <Lobby_renderItem queueConfig={ queueConfig } navigation={ navigation } /> } />
  );
};
