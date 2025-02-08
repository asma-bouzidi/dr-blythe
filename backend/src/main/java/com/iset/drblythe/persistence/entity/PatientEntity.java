package com.iset.drblythe.persistence.entity;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import java.util.List;
import java.util.UUID;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
@Table(name = "patient")
public class PatientEntity {

  @Id
  @GeneratedValue(strategy = GenerationType.UUID)
  private UUID id;

  @Column(name = "email", length = 100)
  private String email;

  @Column(name = "phone", length = 100)
  private String phone;

  @Column(name = "name", length = 100)
  private String name;

  @Column(name = "emergency_contact_name", length = 100)
  private String emergencyContactName;

  @Column(name = "emergency_contact_number", length = 100)
  private String emergencyContactNumber;

  @Column(name = "insurance_provider", length = 100)
  private String insuranceProvider;

  @Column(name = "insurance_policy_number", length = 100)
  private String insurancePolicyNumber;

  @Column(name = "allergies", length = 100)
  private String allergies;

  @Column(name = "current_medication", length = 100)
  private String currentMedication;

  @Column(name = "primary_consent")
  private Boolean primaryConsent;

  @Column(name = "gender", length = 100)
  private String gender;

  @Column(name = "age", length = 3)
  private Integer age;

  @Column(name = "address", length = 100)
  private String address;

  @Column(name = "occupation", length = 100)
  private String occupation;

  @Column(name = "family_medical_history", length = 100)
  private String familyMedicalHistory;

  @Column(name = "past_medical_history", length = 100)
  private String pastMedicalHistory;

  @Column(name = "identification_type", length = 100)
  private String identificationType;

  @Column(name = "identification_document_id", length = 100)
  private String identificationDocumentId;

  @Column(name = "identification_document_url", length = 1000)
  private String identificationDocumentUrl;

  @Column(name = "primary_physician", length = 100)
  private String primaryPhysician;

  @Column(name = "is_assigned")
  private Boolean isAssigned;

  @ManyToOne
  @JoinColumn(name = "doctor_id")
  private DoctorEntity doctor;

  @OneToMany(mappedBy = "patient", cascade = CascadeType.ALL)
  private List<AppointmentEntity> appointments;


}
