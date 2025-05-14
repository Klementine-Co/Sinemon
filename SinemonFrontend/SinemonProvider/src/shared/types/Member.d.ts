type BodyComp = {
    bf: number;
    bmi: number;
    height: number;
    id: number;
    measurement: string;
    member: string;
    updated: string;
    weight: number;
};
type InsuranceBase = {
    card: string;
    id_member: string;
    insurer: string;
    member: string;
    uploaded: string;
    rxbin?: string;
    rxgrp?: string;
    rxpcn?: string;
    benefit_plan?: string;
    group_no?: string;
    title?: string;
};

type MedInsurance = InsuranceBase & {
    benefit_plan: string;
    group_no: string;
};

type RxDiscount = InsuranceBase & {
    rxbin: string;
    rxgrp: string;
    rxpcn: string;
};

type RxInsurance = InsuranceBase & {
    benefit_plan: string;
    group_no: string;
    rxbin: string;
    rxgrp: string;
    rxpcn: string;
};

type Member = {
    icon: null | string; // Assuming 'icon' can be either null or a string (URL or similar)
    member: {
        user: {
            city: string;
            email: string;
            first_name: string;
            icon: null | string; // Assuming icon can be either a string URL or null
            last_name: string;
            middle_name: string;
            phone_number: string;
            state: string;
            street_address: string;
            street_address2: string; // Assuming this could be an apartment number or similar
            username: string;
            zipcode: string;
        };
        salutation: null | string; // Assuming 'salutation' can be either null or a string
    };
    member_id: number;
    salutation: null | string; // Assuming 'salutation' can be either null or a string
};

type Prescription = {
    expiration_date: string;
    id: number;
    lot_no: string;
    member: string;
    ndc: number;
    prescribed_date: string;
    prescriber: number;
};



type UserCustom = {
    account_number: string;
    email: string;
    first_name: string;
    id: number;
    last_name: string;
    middle_name: string;
    privilege: null;
};

type Vaccination = {
    id: number;
    member: string;
    prov: string;
    prov_firstname: string;
    prov_lastname: string;
    vaccination: string;
    vaccination_date: string;
};

type Visit = {
    approved_activity: string;
    id: number;
    member: string;
    prov: string;
    prov_firstname: string;
    prov_lastname: string;
    visit_date: string;
};

type Lab = {
    brief_desc: string;
    id: number;
    lab: string;
    member: string;
    prov: string;
    prov_firstname: string;
    prov_lastname: string;
    status: string;
    uploaded: string;
};

type MdNote = {
    assessment: string;
    chief_complaint: string;
    exam: string;
    history: string;
    id: number;
    member: string;
    note: string;
    prov: string;
    prov_firstname: string;
    prov_lastname: string;
    uploaded: string;
};

// Define the root type that includes all these types
type HealthRecord = {
    BodyComp: BodyComp;
    MedInsurance: MedInsurance[];
    Member: Member;
    Patientvisit: any[];  // Define this type if needed
    Prescription: Prescription[];
    RxDiscount: RxDiscount[];
    RxInsurance: RxInsurance[];
    Accounts: UserCustom[];
    Vaccinations: Vaccination[];
    Visits: Visit[];
    labs: Lab[];
    mdNotes: MdNote[];
};
