import { Patient } from '../models/patient.model';
import { Doctor } from '../models/doctor.model';
import { Appointment } from '../models/appointment.model';

export class Util {
  static initializePatient(): Patient {
    return {
      id: '',
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
      identificationDocumentId: '',
      identificationDocumentUrl: '',
      appointments: [],
    };
  }

  static initializeDoctor(): Doctor {
    return {
      id: '',
      name: '',
      image: '',
      email: '',
      contactNumber: '',
      address: '',
      experienceYears: '',
      specialization: '',
      patients: [],
    };
  }

  static initializeAppointment(): Appointment {
    return {
      id: '',
      primaryPhysician: '',
      reason: '',
      note: '',
      cancellationReason: '',
      schedule: '',
      status: '',
    };
  }
}
