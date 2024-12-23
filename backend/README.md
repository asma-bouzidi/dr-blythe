# Lead Management Backend - Java + SpringBoot

This is the backend for the Lead project

## Setup Environment Variables for Liquibase, Azure, Beacon and Scheduler

1. From the main menu, select `Run | Edit Configurations` or choose `Edit Configurations` from the
   run/debug configurations selector on the toolbar.
2. In the `Run/Debug Configurations` dialog, select a configuration you want to add the environment
   variables to. Note that Lead Management Backend is set by default.
3. Type the variable name and value: `<name>=<value>`. If you add several variables, they should be
   separated with semicolons `;` .
4. For Liquibase credentials use:

 ```bash 
# Postgres (Liquibase)
DATABASE_USERNAME=
DATABASE_PASSWORD=
DATABASE_URL=

# Azure
CLIENT_ID=
TENANT_ID=
CLIENT_SECRET= 
AUTHORIZATION_URL=
TOKEN_URL=

# Beacon   
BEACON_URL=

# Scheduler 
FREQUENCY_CAMPAIGN_DONE=
FREQUENCY_SEND_EMAIL=

# Swagger 
SWAGGER_OAUTH2_REDIRECT_URL=
```

5. Hit `OK`, `Apply` and `OK` again to save.
   Alternatively, click the Environment variables icon and add the variable name and value to the
   User environment variables list.

ATTENTION: All values of the variables are hidden under `backend/Passwords.kdbx`. Ask the team for
the password to get access to it.

## Start the application locally

1. Deploy Database locally
   Under the backend folder we should start the database container with Docker Compose:
   ```bash
    > docker compose up -d
    ```
   Using the compose file the environment variables should be exported at the OS level.

   Or Docker build:
   ```bash
    > docker run -d \
   --name lmp-backend-db \
   -e POSTGRES_USER= \
   -e POSTGRES_PASSWORD= \
   -e POSTGRES_DB= \
   -p 5432:5432 \
   --restart unless-stopped \
   postgres:16
   ```

ATTENTION: All values of the variables are hidden under `backend/Passwords.kdbx`. Ask the team for
the password to get access to it.

2. Run the backend
    ```bash
    > cd backend
    > mvn clean compile 
    > mvn clean install  
    > mvn spring-boot:run
    ```

If using IntelliJ IDEA you can run the app using the configured project.

## Swagger UI

Swagger UI (API documentation) is available at `http://localhost:8080/api/swagger-ui/index.html`
