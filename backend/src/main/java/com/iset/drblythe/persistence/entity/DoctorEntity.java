package com.iset.drblythe.persistence.entity;

import jakarta.persistence.CascadeType;
import jakarta.persistence.OneToMany;
import java.util.List;
import java.util.UUID;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
@Table(name = "doctor")
public class DoctorEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @Column(name = "name", length = 100)
    private String name;

    @Column(name = "image", length = 1000)
    private String image;

    @Column(name = "contact_number", length = 100)
    private String contactNumber;

    @Column(name = "email", length = 100)
    private String email;


    @Column(name = "address", length = 100)
    private String address;

    @Column(name = "specialization", length = 100)
    private String specialization;

    @Column(name = "experienceYears", length = 100)
    private String experience_years;



    @OneToMany(mappedBy = "doctor", cascade = CascadeType.ALL)
    private List<PatientEntity> patients;

}
