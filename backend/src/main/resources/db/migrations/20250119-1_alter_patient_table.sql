
ALTER TABLE patient
    DROP COLUMN identification_number;

ALTER TABLE patient
    ALTER COLUMN identification_document_url TYPE VARCHAR(1000);
