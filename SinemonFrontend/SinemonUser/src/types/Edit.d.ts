
type MedInsurance = {
    benefit_plan: string;
    card: string;
    group_no: string;
    id_member: string;
    insurer: string;
    member: string;
    uploaded: string;
}[];
type Prescription = {
    expiration_date: string;
    id: number;
    lot_no: string;
    member: string;
    ndc: number;
    prescribed_date: string;
    prescriber: null;
}[];
type RxDiscount = {
    card: string;
    id_member: string;
    insurer: string;
    member: string;
    rxbin: string;
    rxgrp: string;
    rxpcn: string;
    uploaded: string;
}[];
type RxInsurance = {
    benefit_plan: string;
    card: string;
    group_no: string;
    id_member: string;
    insurer: string;
    member: string;
    rxbin: string;
    rxgrp: string;
    rxpcn: string;
    uploaded: string;
}[];
type labs = {
    brief_desc: string;
    id: number;
    lab: string;
    member: string;
    prov: string;
    prov_firstname: string;
    prov_lastname: string;
    status: string;
    uploaded: string;
}[];
type editlabsProps = {
    labs:labs
    
};

type editmedinsurProps = {
    medinsurancess: MedInsurance
    
};

type editdrxinsuranceProps = {
    drxinsurances: RxDiscount
    
};

type editprescriptionsprops = {
    prescriptionss: Prescription
   
};

type editrxinsurProps = {
    rxinsurancess: RxInsurance
   
};


interface CancelProps {
    cancel: Dispatch<SetStateAction<boolean>>;
  };
