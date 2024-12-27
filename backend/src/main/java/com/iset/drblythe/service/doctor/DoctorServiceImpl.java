package com.iset.drblythe.service.doctor;

import java.util.List;

import org.springframework.stereotype.Service;

import com.iset.drblythe.model.Appointment;
import com.iset.drblythe.model.Doctor;
import com.iset.drblythe.persistence.DoctorRepository;

import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service
@AllArgsConstructor
@Slf4j
public class DoctorServiceImpl implements DoctorService{

    private DoctorRepository doctorRepository;
    
    @Override
    public List<Doctor> getAllDoctor() {
        return doctorRepository.getAllDoctor();
    }

}
