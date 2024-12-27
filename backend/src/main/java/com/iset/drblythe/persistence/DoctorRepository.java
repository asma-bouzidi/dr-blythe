package com.iset.drblythe.persistence;

import java.util.List;

import org.springframework.stereotype.Repository;

import com.iset.drblythe.model.Doctor;
import com.iset.drblythe.persistence.mappers.DoctorMapper;

import lombok.AllArgsConstructor;

@Repository
@AllArgsConstructor
public class DoctorRepository {

    private final DoctorMapper doctorMapper;
    private final DoctorJpaRepository doctorJpaRepository;

    public List<Doctor> getAllDoctor(){
  
        var doctorEntities = doctorJpaRepository.findAll();
        return doctorMapper.doctorEntitiesToDoctors(doctorEntities);
    }
}
