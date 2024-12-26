package com.iset.drblythe.controller;

import java.util.UUID;

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
public class AppointmentController implements AppointmentApi {

    private final AppointmentService appointmentService;

    @Override
    public ResponseEntity<Appointment> getAppointmentById (UUID appointmentId){
        log.debug("Request: get appointment by id: {}", appointmentId);
        Appointment appointment = appointmentService.getAppointmentById(appointmentId);
        log.debug("Response: appointment with id {}", appointmentId);
        return ResponseEntity.status(HttpStatus.OK).body(appointment);
}


}
