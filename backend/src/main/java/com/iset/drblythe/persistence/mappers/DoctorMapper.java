package com.iset.drblythe.persistence.mappers;

import java.util.List;

import org.mapstruct.InjectionStrategy;
import org.mapstruct.Mapper;

import com.iset.drblythe.model.Doctor;
import com.iset.drblythe.persistence.entity.DoctorEntity;


@Mapper(componentModel = "spring", injectionStrategy = InjectionStrategy.CONSTRUCTOR)
public interface DoctorMapper {

    Doctor doctorEntityToDoctor(DoctorEntity doctorEntity);

    List<Doctor> doctorEntitiesToDoctors(List<DoctorEntity> doctorEntities);

    DoctorEntity doctorToDoctorEntity(Doctor doctor);
}
