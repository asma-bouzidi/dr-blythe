import { Patient } from "./patient.model";

export interface Doctor {
  id: string;
  name: string;
  image: string;
  email: string;
  contactNumber: string;
  address: string;
  experienceYears: string;
  specialization: string;
  patients: Patient[]
}
