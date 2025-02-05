CREATE TABLE patient (
    id UUID NOT NULL PRIMARY KEY,
    email VARCHAR(100),
    phone VARCHAR(100),
    name VARCHAR(100),
    emergency_contact_name VARCHAR(100),
    emergency_contact_number VARCHAR(100),
    insurance_provider VARCHAR(100),
    insurance_policy_number VARCHAR(100),
    allergies VARCHAR(100),
    current_medication VARCHAR(100),
    primary_consent BOOLEAN,
    gender VARCHAR(100),
    age INTEGER,
    address VARCHAR(100),
    occupation VARCHAR(100),
    family_medical_history VARCHAR(100),
    past_medical_history VARCHAR(100),
    identification_type VARCHAR(100),
    identification_number VARCHAR(100),
    identification_document_id VARCHAR(100),
    identification_document_url VARCHAR(100),
    primary_physician VARCHAR(100)
);