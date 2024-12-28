ALTER TABLE patient
  ADD COLUMN doctor_id UUID;

ALTER TABLE patient ADD CONSTRAINT fk_patient_doctor FOREIGN KEY (doctor_id) REFERENCES doctor(id);

