import * as React from "react";
import { useAppSelector } from "../../state/App/hooks";

//TODO make see more go to list of items and make card view of item the primary of the group
import { AboutComponent, LabsComponent, MemberComponent, PharmacyComponent, ProfileComponent } from "../../screens";

export const Account = ( { route, navigation }: accountProp ) => {

    const queue = useAppSelector( ( state ) => state.queue.queuedata );
    const edit = true;
    const mydata = useAppSelector( ( state ) => state.user?.mydata );

    const {
        Member: member,
        mdNotes: mdnotes,
        Vaccinations: vaccines,
        BodyComp: bodycomp,
        MedInsurance: medinsurance,
        labs: labs,
        RxDiscount: rxdiscounts,
        RxInsurance: rxinsurances,
        Prescription: prescriptions,
    } = mydata as HealthRecord;

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



    return (
        <MemberComponent
            healthRecord={ healthRecord }
            route={ route }
            navigation={ navigation }
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

