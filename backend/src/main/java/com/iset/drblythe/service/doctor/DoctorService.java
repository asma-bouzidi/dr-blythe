package com.iset.drblythe.service.doctor;

import java.util.List;
import java.util.UUID;

import com.iset.drblythe.model.Doctor;

public interface DoctorService {

    List<Doctor> getAllDoctor();

    Doctor getDoctorById (UUID doctorId);

    Doctor updateDoctor(UUID doctorId, Doctor doctor);

    Doctor createDoctor(Doctor doctor);
}
