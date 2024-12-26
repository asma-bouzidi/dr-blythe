package com.iset.drblythe.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;

import com.iset.drblythe.api.AppointmentApi;
import com.iset.drblythe.model.Appointment;
import com.iset.drblythe.service.appointment.AppointmentService;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Controller
@RequiredArgsConstructor
@Slf4j
public class AppointmentController implements AppointmentApi{

    private final AppointmentService appointmentService;

    @Override
    public ResponseEntity<List<Appointment>> getAllAppointments (){

     log.debug("Request: get all appointments");
    var appointments = appointmentService.getAllAppointment();
    return ResponseEntity.status(HttpStatus.OK).body(appointments);

    }
}
