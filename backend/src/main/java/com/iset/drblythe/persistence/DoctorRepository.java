package com.iset.drblythe.persistence;

import java.util.List;
import java.util.UUID;

import org.springframework.stereotype.Repository;

import com.iset.drblythe.exception.NotFoundException;
import com.iset.drblythe.model.Doctor;
import com.iset.drblythe.persistence.entity.DoctorEntity;
import com.iset.drblythe.persistence.mappers.DoctorMapper;

import lombok.AllArgsConstructor;

@Repository
@AllArgsConstructor
public class DoctorRepository {

    public static final String DOCTOR_ID_NOT_FOUND = "Doctor with following Id is not found: ";

    private final DoctorMapper doctorMapper;
    private final DoctorJpaRepository doctorJpaRepository;

    public List<Doctor> getAllDoctor(){
  
        var doctorEntities = doctorJpaRepository.findAll();
        return doctorMapper.doctorEntitiesToDoctors(doctorEntities);
    }

    public Doctor getDoctorById (UUID doctorId) {
        var doctorEntity = doctorJpaRepository.findById(doctorId)
            .orElseThrow(() -> new NotFoundException(DOCTOR_ID_NOT_FOUND + doctorId));
        
        return doctorMapper.doctorEntityToDoctor(doctorEntity);
    }

    public Doctor updateDoctor(Doctor updatedDoctor){
        DoctorEntity updatedDoctorEntity = doctorMapper.doctorToDoctorEntity(updatedDoctor);
        updatedDoctorEntity = doctorJpaRepository.save(updatedDoctorEntity);
        return doctorMapper.doctorEntityToDoctor(updatedDoctorEntity);
    }
}
