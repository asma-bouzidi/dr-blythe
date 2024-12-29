package com.iset.drblythe.controller;

import com.iset.drblythe.api.PatientApi;
import com.iset.drblythe.exception.MatchingException;
import com.iset.drblythe.model.Patient;
import com.iset.drblythe.service.patient.PatientService;
import java.util.List;
import java.util.UUID;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;

@Controller
@RequiredArgsConstructor
@Slf4j
public class PatientController implements PatientApi {

  public static final String PATIENT_NOT_FOUND_EXCEPTION = "The id parameter and the patient id are not matching.";


  private final PatientService patientService;

  @Override
  public ResponseEntity<Patient> createPatient(Patient patient) {
    log.debug("Request: create a new patient");
    Patient createdPatient = patientService.createPatient(patient);
    log.debug("Response: patient created with id {}", createdPatient.getId());
    return ResponseEntity.status(HttpStatus.CREATED).body(createdPatient);
  }

  @Override
  public ResponseEntity<Patient> getPatientById(UUID patientId) {

    log.debug("Request: get patient by id: {}", patientId);
    Patient patient = patientService.getPatientById(patientId);
    log.debug("Response: patient with id {}", patientId);
    return ResponseEntity.status(HttpStatus.OK).body(patient);

  }

  @Override
  public ResponseEntity<List<Patient>> getAllPatients() {

    log.debug("Request: get all patients");
    var patients = patientService.getAllPatients();
    return ResponseEntity.status(HttpStatus.OK).body(patients);
  }


  @Override
  public ResponseEntity<Patient> updatePatient(UUID patientId, Patient patient) {
    log.debug("Request: update patient with Id: {}", patientId);

    if (!patientId.equals(patient.getId())) {
      throw new MatchingException(PATIENT_NOT_FOUND_EXCEPTION);
    }

    Patient updatedPatient = patientService.updatePatient(patientId, patient);
    log.debug("Response: updated patient with Id: {}", patientId);
    return ResponseEntity.status(HttpStatus.OK).body(updatedPatient);
  }

  @Override
  public ResponseEntity<String> deletePatient(UUID patientId) {
    log.debug("Response: updated patient with Id: {}", patientId);
    String deletePatientResponse = patientService.deletePatient(patientId);
    return ResponseEntity.status(HttpStatus.OK).body((deletePatientResponse));
  }

}
