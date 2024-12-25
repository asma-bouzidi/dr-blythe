package com.iset.drblythe.service.patient;

public class PatientServiceImpl implements PatientService {

    @Override
    public Patient createPatient(Patient patient) {
        return patientRepository.createPatient(patient);
    }

}
