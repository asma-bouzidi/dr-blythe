package com.iset.drblythe.persistence;

import java.util.List;
import java.util.UUID;

import org.springframework.stereotype.Repository;

import com.iset.drblythe.exception.NotFoundException;
import com.iset.drblythe.model.Appointment;
import com.iset.drblythe.persistence.entity.AppointmentEntity;
import com.iset.drblythe.persistence.mappers.AppointmentMapper;

import lombok.AllArgsConstructor;

@Repository
@AllArgsConstructor
public class AppointmentRepository {

    public static final String APPOINTMENT_ID_NOT_FOUND = "Appointment with following Id is not found: ";

    private final AppointmentMapper appointmentMapper;
    private final AppointmentJpaRepository appointmentJpaRepository;

    public List<Appointment> getAllAppointment(){
        var appointmentEntities = appointmentJpaRepository.findAll();
        return appointmentMapper.appointmentEntitiesToAppointments(appointmentEntities);

    } 

    public Appointment getAppointmentById (UUID appointmentId) {
        var appointmentEntity = appointmentJpaRepository.findById(appointmentId)
            .orElseThrow(() -> new NotFoundException(APPOINTMENT_ID_NOT_FOUND + appointmentId));
        
        return appointmentMapper.appointmentEntityToAppointment(appointmentEntity);
    }

    public Appointment createAppointment(Appointment appointment){
        var appointmentEntity = appointmentMapper.appointmentToAppointmentEntity(appointment);
        AppointmentEntity newPatientEntity = appointmentJpaRepository.save(appointmentEntity);
        return appointmentMapper.appointmentEntityToAppointment(newPatientEntity);
    }

    public Appointment updateAppointment(Appointment updatedAppointment){
        AppointmentEntity updatedAppointmentEntity = appointmentMapper.appointmentToAppointmentEntity(updatedAppointment);
        updatedAppointmentEntity = appointmentJpaRepository.save(updatedAppointmentEntity);
        return appointmentMapper.appointmentEntityToAppointment(updatedAppointmentEntity);
    }

}
