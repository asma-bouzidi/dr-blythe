export interface Patient {
  id: string;
  name: string;
  age: number | null;
  gender: string;
  address: string;
  email: string;
  phone: string;
  occupation: string;
  emergencyContactName: string;
  emergencyContactNumber: string;
  insuranceProvider: string;
  insurancePolicyNumber: string;
  allergies: string;
  currentMedication: string;
  primaryConsent: boolean;
  familyMedicalHistory: string;
  pastMedicalHistory: string;
  identificationType: string;
  identificationNumber: string;
  identificationDocumentId: string;
  identificationDocumentUrl: string;
}
