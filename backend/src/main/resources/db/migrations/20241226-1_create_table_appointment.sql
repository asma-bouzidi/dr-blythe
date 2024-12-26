CREATE TABLE appointment (
    id UUID NOT NULL PRIMARY KEY,
    status VARCHAR(100) DEFAULT 'ON',
    primaryPhysician VARCHAR(100),
    reason VARCHAR(100),
    note VARCHAR(100),
    cancellationReason VARCHAR(100),
    schedule DATE,
)