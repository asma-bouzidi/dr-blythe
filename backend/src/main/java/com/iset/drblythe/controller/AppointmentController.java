package com.iset.drblythe.controller;

import java.util.List;
import java.util.UUID;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;

import com.iset.drblythe.api.AppointmentApi;
import com.iset.drblythe.exception.MatchingException;
import com.iset.drblythe.model.Appointment;
import com.iset.drblythe.service.appointment.AppointmentService;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Controller
@RequiredArgsConstructor
@Slf4j
public class AppointmentController implements AppointmentApi {

    public static final String APPOINTMENT_NOT_FOUND_EXCEPTION = "The id parameter and the appointment id are not matching.";

    private final AppointmentService appointmentService;

    @Override
    public ResponseEntity<Appointment> getAppointmentById(UUID appointmentId) {
        log.debug("Request: get appointment by id: {}", appointmentId);
        Appointment appointment = appointmentService.getAppointmentById(appointmentId);
        log.debug("Response: appointment with id {}", appointmentId);
        return ResponseEntity.status(HttpStatus.OK).body(appointment);
    }

    @Override
    public ResponseEntity<List<Appointment>> getAllAppointments() {
        log.debug("Request: get all appointment");
        var appointments = appointmentService.getAllAppointment();
        return ResponseEntity.status(HttpStatus.OK).body(appointments);
    }

    @Override
    public ResponseEntity<Appointment> createAppointment(Appointment appointment) {
      log.debug("Request: create a new appointment");
      Appointment createdAppointment = appointmentService.createAppointment(appointment);
      log.debug("Response: appointment created with id {}", createdAppointment.getId());
      return ResponseEntity.status(HttpStatus.CREATED).body(createdAppointment);
    }

  @Override
  public ResponseEntity<Appointment> updateAppointment(UUID appointmentId, Appointment appointment){
    log.debug("Request: update appointment with Id: {}", appointmentId);
    
    if(!appointmentId.equals(appointment.getId())) {
      throw new MatchingException(APPOINTMENT_NOT_FOUND_EXCEPTION);
    }

    Appointment updatedAppointment = appointmentService.updateAppointment(appointmentId, appointment);
    log.debug("Response: updated appointment with Id: {}", appointmentId);
    return ResponseEntity.status(HttpStatus.OK).body(updatedAppointment);
  }

  @Override
  public ResponseEntity<Appointment> deleteAppointment(UUID appointmentId){
    log.debug("Response: delete appointment with Id: {}", appointmentId);

    Appointment appointment = appointmentService.getAppointmentById(appointmentId);
    appointmentService.deleteAppointment(appointmentId);

    return ResponseEntity.status(HttpStatus.OK).body(appointment);
  }

}
