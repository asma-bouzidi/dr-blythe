package com.iset.drblythe.persistence.mappers;

import org.mapstruct.InjectionStrategy;
import org.mapstruct.Mapper;

import com.iset.drblythe.model.Appointment;
import com.iset.drblythe.persistence.entity.AppointmentEntity;

@Mapper (componentModel = "spring", injectionStrategy = InjectionStrategy.CONSTRUCTOR)
public interface AppointmentMapper {

    Appointment appointmentEntityToAppointment(AppointmentEntity appointmentEntity);

}
