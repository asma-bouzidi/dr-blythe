package com.iset.drblythe.persistence.entity;

import java.util.UUID;

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
    
    @Column(name = "userId", length = 100)
    private String userId;
    
    @Column(name = "cancellationReason", length = 100)
    private String cancellationReason;

    @Column(name = "schedule")
    @DateTimeFormat(pattern = "yyyy-MM-dd")
    private LocalDate schedule;

    //patient: Patient;
}
