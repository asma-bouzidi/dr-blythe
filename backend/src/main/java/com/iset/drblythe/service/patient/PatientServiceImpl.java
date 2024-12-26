package com.iset.drblythe.service.patient;

import java.util.List;
import java.util.UUID;

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

    @Override
    public Patient getPatientById (UUID patientId){
        return patientRepository.getPatientById(patientId);
    }

    @Override
    public List<Patient> getAllPatients(){
        return patientRepository.getAllPatients();
    }

    @Override
    public Patient updatePatient(UUID patientId, Patient updatedPatient) {
        return patientRepository.updatePatient(updatedPatient);
    }

}
