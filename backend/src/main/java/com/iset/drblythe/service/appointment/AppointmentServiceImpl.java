package com.iset.drblythe.service.appointment;

import java.util.List;
import java.util.UUID;

import org.springframework.stereotype.Service;

import com.iset.drblythe.model.Appointment;  
import com.iset.drblythe.persistence.AppointmentRepository;

import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service
@AllArgsConstructor
@Slf4j
public class AppointmentServiceImpl implements AppointmentService{

    private AppointmentRepository appointmentRepository;

    @Override
    public List<Appointment> getAllAppointment() {
        return appointmentRepository.getAllAppointment();
    }

    @Override
    public Appointment getAppointmentById (UUID appointmentId){
        return appointmentRepository.getAppointmentById(appointmentId);
    }

    @Override
    public Appointment createAppointment(Appointment appointment) {
        return appointmentRepository.createAppointment(appointment);
    }

    @Override
    public Appointment updateAppointment(UUID appointmentId, Appointment updatedAppointment) {
        return appointmentRepository.updateAppointment(updatedAppointment);
    }
}
