package com.iset.drblythe.persistence.mappers;

import org.mapstruct.InjectionStrategy;
import org.mapstruct.Mapper;

import com.iset.drblythe.model.Patient;
import com.iset.drblythe.persistence.entity.PatientEntity;

@Mapper(componentModel = "spring", injectionStrategy = InjectionStrategy.CONSTRUCTOR)
public interface PatientMapper {

    PatientEntity patientToPatientEntity(Patient patient);
    
    Patient patientEntityToPatient(PatientEntity patientEntity);
}
