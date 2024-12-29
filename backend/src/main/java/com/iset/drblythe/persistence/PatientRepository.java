package com.iset.drblythe.persistence;

import com.iset.drblythe.exception.NotFoundException;
import com.iset.drblythe.model.Appointment;
import com.iset.drblythe.model.Patient;
import com.iset.drblythe.persistence.entity.PatientEntity;
import com.iset.drblythe.persistence.mappers.AppointmentMapper;
import com.iset.drblythe.persistence.mappers.PatientMapper;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

@Repository
@AllArgsConstructor
public class PatientRepository {

  public static final String PATIENT_ID_NOT_FOUND = "Patient with following Id is not found: ";

  private final PatientMapper patientMapper;
  private final AppointmentMapper appointmentMapper;

  private final PatientJpaRepository patientJpaRepository;
  private final AppointmentJpaRepository appointmentJpaRepository;

  @Transactional
  public Patient createPatient(Patient patient) {
    var patientEntity = patientMapper.patientToPatientEntity(patient);

    patientEntity.setAppointments(new ArrayList<>());
    if (patient.getAppointments() != null) {
      for (Appointment appointment : patient.getAppointments()) {
        var appointmentEntity = appointmentMapper.appointmentToAppointmentEntity(appointment);
        appointmentEntity.setPatient(patientEntity);

        var newAppointmentEntity = appointmentJpaRepository.save(appointmentEntity);
        patientEntity.getAppointments().add(newAppointmentEntity);
      }
    }
    PatientEntity newPatientEntity = patientJpaRepository.save(patientEntity);
    return patientMapper.patientEntityToPatient(newPatientEntity);
  }

  public Patient getPatientById(UUID patientId) {

    var patientEntity = patientJpaRepository.findById(patientId)
        .orElseThrow(() -> new NotFoundException(PATIENT_ID_NOT_FOUND + patientId));

    return patientMapper.patientEntityToPatient(patientEntity);

  }

  public List<Patient> getAllPatients() {
    var patientEntities = patientJpaRepository.findAll();
    return patientMapper.patientEntitiesToPatients(patientEntities);
  }

  public Patient updatePatient(Patient updatedPatient) {
    PatientEntity updatedPatientEntity = patientMapper.patientToPatientEntity(updatedPatient);
    updatedPatientEntity = patientJpaRepository.save(updatedPatientEntity);
    return patientMapper.patientEntityToPatient(updatedPatientEntity);
  }

  public String deletePatient(UUID patientId) {
    patientJpaRepository.deleteById(patientId);
    return "Successfully deleted patient with id: " + patientId;
  }
}
