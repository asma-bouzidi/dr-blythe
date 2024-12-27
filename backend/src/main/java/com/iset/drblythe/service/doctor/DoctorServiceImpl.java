package com.iset.drblythe.service.doctor;

import java.util.List;
import java.util.UUID;

import org.springframework.stereotype.Service;

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

    @Override
    public Doctor getDoctorById (UUID doctorId){
         return doctorRepository.getDoctorById(doctorId);
     }

     @Override
     public Doctor updateDoctor(UUID doctorId, Doctor updatedDoctor) {
        return doctorRepository.updateDoctor(updatedDoctor);
    }

    @Override
    public Doctor createDoctor(Doctor doctor) {
        return doctorRepository.createDoctor(doctor);
    }

}
