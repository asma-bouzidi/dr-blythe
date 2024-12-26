package com.iset.drblythe.service.appointment;

import java.util.UUID;
import java.util.List;

import com.iset.drblythe.model.Appointment;

public interface AppointmentService {

    Appointment getAppointmentById (UUID appointmentId);

    List<Appointment> getAllAppointment();

    Appointment createAppointment(Appointment appointment);

}
