package com.iset.drblythe.persistence;

import java.util.List;
import java.util.UUID;

import org.springframework.stereotype.Repository;

import com.iset.drblythe.exception.NotFoundException;
import com.iset.drblythe.model.Patient;
import com.iset.drblythe.persistence.entity.PatientEntity;
import com.iset.drblythe.persistence.mappers.PatientMapper;

import lombok.AllArgsConstructor;

@Repository
@AllArgsConstructor
public class PatientRepository {

    public static final String PATIENT_ID_NOT_FOUND = "Patient with following Id is not found: ";

    private final PatientMapper patientMapper;
    private final PatientJpaRepository patientJpaRepository;

    public Patient createPatient(Patient patient){
        var patientEntity = patientMapper.patientToPatientEntity(patient);
        PatientEntity newPatientEntity = patientJpaRepository.save(patientEntity);
        return patientMapper.patientEntityToPatient(newPatientEntity);
    }

    public Patient getPatientById(UUID patientId) {
        
        var patientEntity = patientJpaRepository.findById(patientId)
            .orElseThrow(() -> new NotFoundException(PATIENT_ID_NOT_FOUND + patientId));
        
        return patientMapper.patientEntityToPatient(patientEntity);

    }

    public List<Patient> getAllPatients(){
        var patientEntities = patientJpaRepository.findAll();
        return patientMapper.patientEntitiesToPatients(patientEntities);
    }

    public Patient updatePatient(Patient updatedPatient){
        PatientEntity updatedPatientEntity = patientMapper.patientToPatientEntity(updatedPatient);
        updatedPatientEntity = patientJpaRepository.save(updatedPatientEntity);
        return patientMapper.patientEntityToPatient(updatedPatientEntity);
    }
}
