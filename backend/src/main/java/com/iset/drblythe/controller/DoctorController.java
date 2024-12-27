package com.iset.drblythe.controller;

import java.util.List;
import java.util.UUID;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;

import com.iset.drblythe.api.DoctorApi;
import com.iset.drblythe.exception.MatchingException;
import com.iset.drblythe.model.Doctor;
import com.iset.drblythe.service.doctor.DoctorService;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Controller
@RequiredArgsConstructor
@Slf4j
public class DoctorController implements DoctorApi{

    public static final String DOCTOR_NOT_FOUND_EXCEPTION = "The id parameter and the doctor id are not matching.";

    private final DoctorService doctorService;

    @Override
    public ResponseEntity<List<Doctor>> getAllDoctors() {
        log.debug("Request: get all doctors");
        var doctors = doctorService.getAllDoctor();
        return ResponseEntity.status(HttpStatus.OK).body(doctors);
    }

    @Override
    public ResponseEntity<Doctor> getDoctorById(UUID doctorId) {
        log.debug("Request: get doctor by id: {}", doctorId);
        Doctor doctor = doctorService.getDoctorById(doctorId);
        log.debug("Response: doctor with id {}", doctorId);
        return ResponseEntity.status(HttpStatus.OK).body(doctor);
    }

    @Override
    public ResponseEntity<Doctor> updateDoctor(UUID doctorId, Doctor doctor){
    log.debug("Request: update patient with Id: {}", doctorId);
    
    if(!doctorId.equals(doctor.getId())) {
      throw new MatchingException(DOCTOR_NOT_FOUND_EXCEPTION);
    }

    Doctor updatedDoctor = doctorService.updateDoctor(doctorId, doctor);
    log.debug("Response: updated patient with Id: {}", doctorId);
    return ResponseEntity.status(HttpStatus.OK).body(updatedDoctor);
  }


}