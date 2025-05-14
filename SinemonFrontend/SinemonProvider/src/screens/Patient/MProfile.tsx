import * as React from "react";
import { AboutComponent, LabsComponent, MemberComponent, PharmacyComponent, ProfileComponent } from "../../screens";
//TODO make see more go to list of items and make card view of item the primary of the group



export const MProfile = ( { route, navigation }: searchProp ) => {



    const queue = undefined;
    const edit = true;

    //console.log( navigation );
    //console.log( navigation.getState() );

    const {
        Member: [ member ] = [],
        mdNotes: mdnotes,
        Vaccinations: vaccines,
        BodyComp: [ bodycomp ] = [],
        MedInsurance: medinsurance,
        labs: labs,
        RxDiscount: rxdiscounts,
        RxInsurance: rxinsurances,
        Prescription: prescriptions,
    } = route.params.member as HealthRecord;






    const healthRecord = {
        Member: member,
        mdNotes: mdnotes,
        Vaccinations: vaccines,
        BodyComp: bodycomp,
        MedInsurance: medinsurance,
        labs: labs,
        RxDiscount: rxdiscounts,
        RxInsurance: rxinsurances,
        Prescription: prescriptions,
    };
    // console.log( healthRecord );
    return (
        <MemberComponent
            route={ route }
            navigation={ navigation }
            healthRecord={ healthRecord }
            member={ member }
            edit={ edit }
            queue={ queue }
            profile={ <ProfileComponent
                navigation={ navigation }
                mdnotes={ mdnotes }
                vaccines={ vaccines }
                bodycomp={ bodycomp }
                medinsurance={ medinsurance }
            /> }
            about={ <AboutComponent navigation={ navigation } /> }
            labs={ <LabsComponent navigation={ navigation } labs={ labs } /> }
            pharmacy={ <PharmacyComponent navigation={ navigation } rxdiscounts={ rxdiscounts } rxinsurances={ rxinsurances } prescriptions={ prescriptions } /> }


        />
    );
};
