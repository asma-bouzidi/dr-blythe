package com.iset.drblythe.persistence;

import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.iset.drblythe.persistence.entity.PatientEntity;

@Repository
public interface  PatientJpaRepository extends JpaRepository<PatientEntity, UUID>{

}
