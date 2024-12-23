CREATE TABLE lead(
                     id UUID NOT NULL PRIMARY KEY,
                     email VARCHAR(255) NOT NULL UNIQUE,
                     firstname VARCHAR(255) NOT NULL,
                     lastname VARCHAR(255) NOT NULL,
                     owner VARCHAR(255),
                     mobilephone VARCHAR(20),
                     officephone VARCHAR(20),
                     salutation VARCHAR(20),
                     created DATE NOT NULL,
                     updated DATE NOT NULL,
                     status VARCHAR(20) DEFAULT 'ACTIVE',
                     level VARCHAR(10) DEFAULT 'SEED',
                     businesstype VARCHAR(255),
                     language VARCHAR(3) ,
                     note VARCHAR(255),
                     customfields VARCHAR(225),
                     addressid UUID,
                     companyid UUID
);
---
CREATE TABLE company(
                        id UUID NOT NULL PRIMARY KEY,
                        name VARCHAR(255) NOT NULL,
                        legalstatus VARCHAR(255),
                        revenue BIGINT,
                        industry VARCHAR(70),
                        size INTEGER,
                        created DATE NOT NULL,
                        updated DATE NOT NULL
);
---
CREATE TABLE address(
                        id UUID NOT NULL PRIMARY KEY,
                        streetname VARCHAR(255) NOT NULL,
                        city VARCHAR(255) NOT NULL,
                        country VARCHAR(255) NOT NULL,
                        postcode INTEGER NOT NULL,
                        streetnumber INTEGER NOT NULL,
                        companyid UUID
);
---
ALTER TABLE lead ADD CONSTRAINT fk_lead_address FOREIGN KEY (addressid) REFERENCES address(id);
ALTER TABLE address ADD CONSTRAINT fk_address_company FOREIGN KEY (companyid) REFERENCES company(id);
ALTER TABLE lead ADD CONSTRAINT fk_lead_company FOREIGN KEY (companyid) REFERENCES company(id);

