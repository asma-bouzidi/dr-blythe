package com.iset.drblythe.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;

import com.iset.drblythe.api.DoctorApi;
import com.iset.drblythe.model.Doctor;
import com.iset.drblythe.service.doctor.DoctorService;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Controller
@RequiredArgsConstructor
@Slf4j
public class DoctorController implements DoctorApi{

    private final DoctorService doctorService;

    @Override
    public ResponseEntity<List<Doctor>> getAllDoctors() {
        log.debug("Request: get all doctors");
        var doctors = doctorService.getAllDoctor();
        return ResponseEntity.status(HttpStatus.OK).body(doctors);
    }


}
