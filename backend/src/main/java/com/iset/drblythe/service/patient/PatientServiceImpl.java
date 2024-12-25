package com.iset.drblythe.service.patient;

import org.springframework.stereotype.Service;

import com.iset.drblythe.model.Patient;
import com.iset.drblythe.persistence.PatientRepository;

import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service
@AllArgsConstructor
@Slf4j
public class PatientServiceImpl implements PatientService {
 
    private PatientRepository patientRepository;
     
    @Override
    public Patient createPatient(Patient patient) {
        return patientRepository.createPatient(patient);
    }

}
