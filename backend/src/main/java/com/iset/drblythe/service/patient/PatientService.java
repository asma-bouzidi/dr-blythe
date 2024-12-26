package com.iset.drblythe.service.patient;

import java.util.List;
import java.util.UUID;

import com.iset.drblythe.model.Patient;

public interface PatientService {

    Patient createPatient(Patient patient);

    Patient getPatientById ( UUID patientId);

    List<Patient> getAllPatients();

    Patient updatePatient(UUID patientId, Patient patient);

}
