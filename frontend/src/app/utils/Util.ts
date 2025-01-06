import {Patient} from '../models/patient.model';

export class Util {
  static initializePatient(): Patient {
    return {
      name: '',
      age: null,
      gender: '',
      address: '',
      email: '',
      phone: '',
      occupation: '',
      emergencyContactName: '',
      emergencyContactNumber: '',
      insuranceProvider: '',
      insurancePolicyNumber: '',
      allergies: '',
      currentMedication: '',
      primaryConsent: false,
      familyMedicalHistory: '',
      pastMedicalHistory: '',
      identificationType: '',
      identificationNumber: '',
      identificationDocumentId: '',
      identificationDocumentUrl: '',
    };
  }
}
