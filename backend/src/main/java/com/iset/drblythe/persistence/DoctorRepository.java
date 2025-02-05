package com.iset.drblythe.persistence;

import com.iset.drblythe.model.Patient;
import com.iset.drblythe.persistence.mappers.PatientMapper;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

import org.springframework.stereotype.Repository;

import com.iset.drblythe.exception.NotFoundException;
import com.iset.drblythe.model.Doctor;
import com.iset.drblythe.persistence.entity.DoctorEntity;
import com.iset.drblythe.persistence.entity.PatientEntity;
import com.iset.drblythe.persistence.mappers.DoctorMapper;

import lombok.AllArgsConstructor;
import org.springframework.transaction.annotation.Transactional;

@Repository
@AllArgsConstructor
public class DoctorRepository {

    public static final String DOCTOR_ID_NOT_FOUND = "Doctor with following Id is not found: ";

    private final DoctorMapper doctorMapper;
    private final PatientMapper patientMapper;
    private final DoctorJpaRepository doctorJpaRepository;
    private final PatientJpaRepository patientJpaRepository;

    public List<Doctor> getAllDoctor() {

        var doctorEntities = doctorJpaRepository.findAll();
        return doctorMapper.doctorEntitiesToDoctors(doctorEntities);
    }

    public Doctor getDoctorById(UUID doctorId) {
        var doctorEntity = doctorJpaRepository.findById(doctorId)
                .orElseThrow(() -> new NotFoundException(DOCTOR_ID_NOT_FOUND + doctorId));

        return doctorMapper.doctorEntityToDoctor(doctorEntity);
    }

    public Doctor updateDoctor(Doctor updatedDoctor) {
        DoctorEntity updatedDoctorEntity = doctorMapper.doctorToDoctorEntity(updatedDoctor);
        updatedDoctorEntity = doctorJpaRepository.save(updatedDoctorEntity);
        return doctorMapper.doctorEntityToDoctor(updatedDoctorEntity);
    }

    @Transactional
    public Doctor createDoctor(Doctor doctor) {
        var doctorEntity = doctorMapper.doctorToDoctorEntity(doctor);
        doctorEntity.setPatients(new ArrayList<>());

        var newDoctorEntity = doctorJpaRepository.save(doctorEntity);

        if (doctor.getPatients() != null) {
            for (Patient patient : doctor.getPatients()) {
                PatientEntity patientEntity;

                // Check if the patient already exists in the database
                if (patient.getId() != null) {
                    patientEntity = patientJpaRepository.findById(patient.getId())
                            .orElseThrow(() -> new NotFoundException("Patient not found with id: " + patient.getId()));
                    // Assign the doctor to the existing patient
                    patientEntity.setDoctor(newDoctorEntity);
                } else {
                    // If it's a new patient, map it as usual
                    patientEntity = patientMapper.patientToPatientEntity(patient);
                    patientEntity.setDoctor(newDoctorEntity);
                }

                patientEntity = patientJpaRepository.save(patientEntity);
                newDoctorEntity.getPatients().add(patientEntity);
            }
        }

        return doctorMapper.doctorEntityToDoctor(newDoctorEntity);
    }

    public String deleteDoctor(UUID doctorId) {
        doctorJpaRepository.deleteById(doctorId);
        return "Successfully deleted doctor with id: " + doctorId;
    }

}
