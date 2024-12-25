package com.iset.drblythe.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;

import com.iset.drblythe.api.PatientApi;
import com.iset.drblythe.model.Patient;
import com.iset.drblythe.service.patient.PatientService;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Controller
@RequiredArgsConstructor
@Slf4j
public class PatientController implements PatientApi {

  private final PatientService patientService;
    
    @Override
    public ResponseEntity<Patient> createPatient(Patient patient) {
    log.debug("Request: create a new patient");
    Patient createdPatient = patientService.createPatient(patient);
    log.debug("Response: patient created with id {}", createdPatient.getId());
    return ResponseEntity.status(HttpStatus.CREATED).body(createdPatient);
  }

}
