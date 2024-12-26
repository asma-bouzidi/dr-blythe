package com.iset.drblythe.service.appointment;

import java.util.UUID;

import org.springframework.stereotype.Service;

import com.iset.drblythe.model.Appointment;
import com.iset.drblythe.persistence.AppointmentRepository;

import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service
@AllArgsConstructor
@Slf4j
public class ApointmentServiceImpl implements AppointmentService{
    
    private final AppointmentRepository appointmentRepository;
    
    @Override
    public Appointment getAppointmentById (UUID appointmentId){
        return appointmentRepository.getAppointmentById(appointmentId);
    }

}
