package com.iset.drblythe.service.patient;

import java.util.UUID;

import com.iset.drblythe.model.Patient;

public interface PatientService {

    Patient createPatient(Patient patient);

    Patient getPatientById ( UUID patientId);
    

}
