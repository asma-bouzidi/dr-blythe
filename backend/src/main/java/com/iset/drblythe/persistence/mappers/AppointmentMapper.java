package com.iset.drblythe.persistence.mappers;

import java.util.List;

import org.mapstruct.InjectionStrategy;
import org.mapstruct.Mapper;

import com.iset.drblythe.model.Appointment;
import com.iset.drblythe.persistence.entity.AppointmentEntity;

@Mapper (componentModel = "spring", injectionStrategy = InjectionStrategy.CONSTRUCTOR)
public interface AppointmentMapper {

    Appointment appointmentEntityToAppointment(AppointmentEntity appointmentEntity);

    List<Appointment> appointmentEntitiesToAppointments(List<AppointmentEntity> appointmentEntities);
}
 
