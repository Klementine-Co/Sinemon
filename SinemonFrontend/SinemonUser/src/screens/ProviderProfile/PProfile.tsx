import React, { useState } from "react";
import { About_renderItem } from "../../screens";
import { Review_renderItem } from "../../screens";
import Lobby_renderItem from "./Lobby/Lobby";
import { ProviderComponent } from "../../screens";



export const PProfile = ( { route, navigation }: searchProp ) => {
  const {
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
    Number_of_negatives: number_of_negatives
  } = route.params.provider as ProviderHealthRecord;

  let drrating: Rate = { type: 'doctor', rating: 216 };
  let staffrating: Rate = { type: 'staff', rating: 73 };
  let officerating: Rate = { type: 'office', rating: 66 };
  let bedsiderating: Rate = { type: 'bedisde', rating: 60 };

  let ratings = [ drrating, staffrating, officerating, bedsiderating ];

  return (
    <ProviderComponent
    ratings={ratings}
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