import { Lab } from "./LabForm";
import { DRXInsurance } from "./DRXInsuranceForm";
import { RXInsurance } from "./RXInsuranceForm";
import { Insurance } from "./InsuranceForm";
import { Prescription } from "./PrescriptionForm";
import { Profile } from "./ProfileForm";

export { Lab, DRXInsurance, RXInsurance, Insurance, Prescription, Profile };
// export { API };
export function getDate(date_: string){

    var date:Date = new Date(date_)
    if (date_ === null) {
      return ''; 
    }
  return `${date.getMonth() }/${date.getDate()}/${date.getFullYear()} ${date.getHours() % 12 || 12}:${date.getMinutes()} ${date.getHours()>= 12? 'PM':'AM'}`;
  
  };