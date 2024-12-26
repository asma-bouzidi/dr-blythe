package com.iset.drblythe.persistence.entity;

import java.time.LocalDate;
import java.util.UUID;

import org.springframework.format.annotation.DateTimeFormat;

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
@Table(name="appointment")
public class AppointmentEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @Column(name = "status", length = 100)
    private String status;

    @Column(name = "primaryPhysician", length = 100)
    private String primaryPhysician;
    
    @Column(name = "reason", length = 100)
    private String reason;
    
    @Column(name = "note", length = 100)
    private String note;
    
    @Column(name = "cancellationReason", length = 100)
    private String cancellationReason;

    @Column(name = "schedule")
    @DateTimeFormat(pattern = "yyyy-MM-dd")
    private LocalDate schedule;

    /*@Column(name = "userId", length = 100)
    private String userId;*/

    //patient: Patient;
}
