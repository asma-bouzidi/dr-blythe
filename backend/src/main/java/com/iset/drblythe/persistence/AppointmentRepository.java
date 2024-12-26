package com.iset.drblythe.persistence;

import java.util.List;

import org.springframework.stereotype.Repository;

import com.iset.drblythe.model.Appointment;
import com.iset.drblythe.persistence.mappers.AppointmentMapper;
import com.iset.drblythe.persistence.mappers.PatientMapper;

import lombok.AllArgsConstructor;

@Repository
@AllArgsConstructor
public class AppointmentRepository {

    private final AppointmentMapper appointmentMapper;
    private final AppointmentJpaRepository appointmentJpaRepository;


    public List<Appointment> getAllAppointment(){
        var appointmentEntities = appointmentJpaRepository.findAll();
        return appointmentMapper.appointmentEntitiesToAppointments(appointmentEntities);

    } 
}
