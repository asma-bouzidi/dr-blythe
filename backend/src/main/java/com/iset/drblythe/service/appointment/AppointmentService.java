package com.iset.drblythe.service.appointment;

import java.util.UUID;

import com.iset.drblythe.model.Appointment;

public interface AppointmentService {

    Appointment getAppointmentById (UUID appointmentId);


}
