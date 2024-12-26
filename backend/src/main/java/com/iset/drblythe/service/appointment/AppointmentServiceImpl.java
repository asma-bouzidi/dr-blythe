package com.iset.drblythe.service.appointment;

import java.util.List;

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
    public List<Appointment> getAllAppointment(){
        return appointmentRepository.getAllAppointment();
    }
}
