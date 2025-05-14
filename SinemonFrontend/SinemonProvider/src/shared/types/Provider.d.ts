type Badge = {
    badge: string;
    badge_type: string;
    icon: string;
    tier: string;
};

type Provider = {
    about: string;
    badge: Badge;
    icon: string;
    npi: number | null;
    preferred_name: string | null;
    prov_taxonomy_code: string | null;
    provider: {
        user: {
            city: string;
            email: string;
            first_name: string;
            icon: null;
            last_name: string;
            middle_name: string;
            phone_number: string;
            state: string;
            street_address: string;
            street_address2: string;
            username: string;
            zipcode: string;
        };
    };  // Define this further if you have details of what this object contains
    provider_id: number;
    salutation: string | null;
    specialty_code: string | null;
    tip: string;
    votee: number;
};

type Citation = {
    amount: number;
    cause: string;
    datecitationissued: string;
    dateresolved: string;
    prov: number;
    prov_firstname: string;
    prov_lastname: string;
    resolved: string;
};

type Conviction = {
    classs: string;
    court: string;
    effective_date: string;
    prov: number;
    prov_firstname: string;
    prov_lastname: string;
    sentence: string;
    summary: string;
};

type License = {
    licensenumber: string;
    licensetype: string;
    no_practice_permitted: string;
    prov: number;
    prov_firstname: string;
    prov_lastname: string;
    shortdescription: string;
};

type PatientVisit = {
    billed: boolean;
    claim: any;  // Specify further if the structure is known
    counter: number;
    id: number;
    member: string;
    member_firstname: string;
    member_lastname: string;
    prov: number;
    released: boolean;
    visit_date: string;
    release_expiration_date?: string;
};

type Probation = {
    age_of_probation: string;
    casenumber: string;
    effective_date: string;
    end_date: string;
    prov: number;
    prov_firstname: string;
    prov_lastname: string;
    pstatus: string;
    status: string;
    summary: string;
};

type Number_of_negatives = {
    prov: string;
    prov_firstname: string;
    prov_lastname: string;
    sum: number;
};

type QueueConfig = {
    capacity: number;
    close_time: string;
    end_before_close: number;
    est_wait_time: number;
    inqueue: number;
    open_time: string;
    pause_time: number;
    prov: number;
    prov_firstname: string;
    prov_lastname: string;
    status: string;
    time_before_noshow: number;
    time_between_patients: number;
};
type Accusation = {
};
type Action = {
};
type Arbitration = {
};
type Malpractice = {
};
type Number_negatives_v = {
};

type ProviderHealthRecord = {
    Billing?: {
        billing_prov: Provider;
    };
    RenderingProvider?: {
        billing_prov: Provider;
    };
    Citations: Citation[];
    Convictions: Conviction[];
    License: License[];
    Number_of_negatives: Number_of_negatives[];
    Patientvisit: PatientVisit[];
    Probations: Probation[];
    Provider: Provider;
    QueueConfig: QueueConfig;
    Accusations: any[];
    Actions: any[];
    Arbitrations: any[];
    Malpractices: any[];
    Number_negatives_v: any[];
    Ratings?: Rate[];
};