package com.iset.drblythe.service.patient;

import com.iset.drblythe.model.Patient;
import java.util.List;
import java.util.UUID;

public interface PatientService {

  Patient createPatient(Patient patient);

  Patient getPatientById(UUID patientId);

  List<Patient> getAllPatients();

  Patient updatePatient(UUID patientId, Patient patient);

  String deletePatient(UUID patientId);
}
