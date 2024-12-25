package com.iset.drblythe.persistence;

import org.springframework.stereotype.Repository;

import com.iset.drblythe.model.Patient;
import com.iset.drblythe.persistence.entity.PatientEntity;
import com.iset.drblythe.persistence.mappers.PatientMapper;

import lombok.AllArgsConstructor;

@Repository
@AllArgsConstructor
public class PatientRepository {

    private final PatientMapper patientMapper;
    private final PatientJpaRepository patientJpaRepository;

    public Patient createPatient(Patient patient){
        var patientEntity = patientMapper.patientToPatientEntity(patient);
        PatientEntity newPatientEntity = patientJpaRepository.save(patientEntity);
        return patientMapper.patientEntityToPatient(newPatientEntity);
    }
}
