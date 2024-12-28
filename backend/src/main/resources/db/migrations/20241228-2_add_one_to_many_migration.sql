ALTER TABLE appointment
  ADD COLUMN patient_id UUID;

ALTER TABLE appointment ADD CONSTRAINT fk_appointment_patient FOREIGN KEY (patient_id) REFERENCES patient(id);
