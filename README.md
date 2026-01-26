# Dr. Blythe - Medical Clinic Management System

A comprehensive medical clinic management system built with modern technologies for efficient healthcare administration.

![Dr. Blythe](https://img.shields.io/badge/Dr.Blythe-MVP-blue?style=for-the-badge)
![Java](https://img.shields.io/badge/Java-17-orange?style=for-the-badge&logo=openjdk)
![Spring Boot](https://img.shields.io/badge/Spring%20Boot-3.2.0-green?style=for-the-badge&logo=springboot)
![Angular](https://img.shields.io/badge/Angular-17-red?style=for-the-badge&logo=angular)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-16-blue?style=for-the-badge&logo=postgresql)

## 📋 Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Architecture](#architecture)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Running with Docker](#running-with-docker)
  - [Running Locally](#running-locally)
- [API Documentation](#api-documentation)
- [Configuration](#configuration)
- [Testing](#testing)
- [Deployment](#deployment)
- [Contributing](#contributing)
- [License](#license)

## Overview

Dr. Blythe is a medical clinic management application designed to streamline healthcare operations. It provides a complete solution for managing patients, doctors, and appointments in a healthcare facility.

## Features

### Patient Management
- 👤 Complete patient profiles with medical history
- 📞 Emergency contact information
- 🏥 Insurance details and policy management
- 💊 Allergy and medication tracking
- 📋 Medical history documentation

### Doctor Management
- 👨‍⚕️ Doctor profiles with specializations
- 📊 Experience tracking
- 👥 Patient assignment management
- 📅 Schedule management

### Appointment Management
- 📅 Appointment scheduling
- 🔄 Status tracking (scheduled, completed, cancelled)
- 📝 Reason for visit and notes
- ❌ Cancellation handling with reasons

### System Features
- 🔐 Secure authentication (OAuth2/Azure AD)
- 📊 Data visualization with ApexCharts
- 📱 Responsive design
- 🌐 RESTful API with OpenAPI documentation

## Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                        Frontend                              │
│                   (Angular 17 + Material)                   │
└──────────────────────────┬──────────────────────────────────┘
                           │ HTTP/REST
┌──────────────────────────▼──────────────────────────────────┐
│                        Backend                               │
│              (Spring Boot 3.2.0 + Java 17)                  │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────────────┐  │
│  │ Controllers │  │  Services   │  │    Repositories     │  │
│  └─────────────┘  └─────────────┘  └─────────────────────┘  │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────────────┐  │
│  │   Mappers   │  │  Security   │  │    OpenAPI Gen│  └────────      │  │
─────┘  └─────────────┘  └─────────────────────┘  │
└──────────────────────────┬──────────────────────────────────┘
                           │ JDBC
┌──────────────────────────▼──────────────────────────────────┐
│                     Database                                 │
│                    (PostgreSQL 16)                          │
└─────────────────────────────────────────────────────────────┘
```

## Tech Stack

### Backend
| Technology | Version | Purpose |
|------------|---------|---------|
| Java | 17 | Programming language |
| Spring Boot | 3.2.0 | Backend framework |
| Spring Data JPA | - | ORM and data access |
| PostgreSQL | 16 | Primary database |
| Liquibase | 4.24.0 | Database migrations |
| MapStruct | 1.5.5 | Object mapping |
| Spring Security | - | Authentication/Authorization |
| Spring OAuth2 | - | OAuth2 resource server |
| OpenAPI/Swagger | 2.3.0 | API documentation |
| Microsoft Graph | 5.42.0 | Azure AD integration |
| Apache Commons CSV | 1.11.0 | CSV processing |

### Frontend
| Technology | Version | Purpose |
|------------|---------|---------|
| Angular | 17.3.7 | Frontend framework |
| Angular Material | 17.3.7 | UI component library |
| ApexCharts | 3.49.0 | Data visualization |
| RxJS | 7.8.1 | Reactive programming |
| SCSS | - | Styling |

### DevOps
| Technology | Purpose |
|------------|---------|
| Docker | Containerization |
| Docker Compose | Multi-container orchestration |
| Maven | Build automation |

## Project Structure

```
dr-blythe/
├── backend/                    # Spring Boot backend application
│   ├── src/main/
│   │   ├── java/com/iset/drblythe/
│   │   │   ├── config/         # Security, Swagger configurations
│   │   │   ├── controller/     # REST API controllers
│   │   │   ├── exception/      # Custom exceptions & handlers
│   │   │   ├── persistence/    # JPA repositories & entities
│   │   │   │   ├── entity/     # Database entities
│   │   │   │   ├── mappers/    # MapStruct mappers
│   │   │   │   └── repository/ # Spring Data repositories
│   │   │   └── service/        # Business logic services
│   │   └── resources/
│   │       ├── application.yaml
│   │       ├── liquibase.properties
│   │       └── db/
│   │           ├── changelog/
│   │           └── migrations/ # Liquibase migrations
│   └── pom.xml
├── frontend/                   # Angular frontend application
│   ├── src/
│   │   ├── app/
│   │   │   ├── components/     # Angular components
│   │   │   │   ├── appointment/
│   │   │   │   ├── doctor/
│   │   │   │   ├── patient/
│   │   │   │   ├── layouts/
│   │   │   │   └── shared/
│   │   │   ├── models/         # TypeScript interfaces
│   │   │   ├── services/       # API services
│   │   │   └── utils/          # Utility functions
│   │   ├── assets/
│   │   │   ├── images/
│   │   │   └── styles/
│   │   ├── index.html
│   │   └── styles.scss
│   └── package.json
├── openapi/                    # OpenAPI specifications
│   └── schema.yaml             # API schema definitions
├── docker-compose.yml          # Docker Compose configuration
└── pom.xml                     # Parent Maven POM
```

## Getting Started

### Prerequisites

- **Java Development Kit**: JDK 17 or later
- **Node.js**: Version 18 or later
- **npm**: Version 9 or later
- **Docker**: For containerized database
- **Maven**: Version 3.6+ for backend builds
- **Angular CLI**: Version 17+ for frontend development

### Installation

#### 1. Clone the repository

```bash
git clone <repository-url>
cd dr-blythe
```

#### 2. Set up the database

**Using Docker (Recommended):**
```bash
docker-compose up -d
```

This will start a PostgreSQL 16 container with:
- Database: `dr-blythe-db`
- User: `dr-blythe`
- Password: `iset`
- Port: `5433` (mapped from 5432)

**Or manually:**
```bash
docker run -d \
  --name dr-blythe-backend-db \
  -e POSTGRES_USER=dr-blythe \
  -e POSTGRES_PASSWORD=iset \
  -e POSTGRES_DB=dr-blythe-db \
  -p 5433:5432 \
  --restart unless-stopped \
  postgres:16
```

#### 3. Build and run the backend

```bash
cd backend
mvn clean compile
mvn clean install
mvn spring-boot:run
```

The backend will start at `http://localhost:8080`

#### 4. Build and run the frontend

```bash
cd frontend
npm install
ng serve
```

The frontend will start at `http://localhost:4200`

### Running with Docker

Build and run all services using Docker Compose:

```bash
docker-compose up -d --build
```

### Running Locally

**Backend:**
```bash
cd backend
mvn spring-boot:run
```

**Frontend:**
```bash
cd frontend
ng serve
```

Access the application:
- **Frontend**: http://localhost:4200
- **Backend API**: http://localhost:8080/api
- **API Documentation**: http://localhost:8080/api/swagger-ui/index.html

## API Documentation

The API is documented using OpenAPI 3.0 specification. Access Swagger UI at:

```
http://localhost:8080/api/swagger-ui/index.html
```

### Main Endpoints

#### Patient Management
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/patient` | Get all patients |
| GET | `/patient/{id}` | Get patient by ID |
| POST | `/patient` | Create new patient |
| PUT | `/patient/{id}` | Update patient |
| DELETE | `/patient/{id}` | Delete patient |

#### Doctor Management
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/doctor` | Get all doctors |
| GET | `/doctor/{id}` | Get doctor by ID |
| POST | `/doctor` | Create new doctor |
| PUT | `/doctor/{id}` | Update doctor |
| DELETE | `/doctor/{id}` | Delete doctor |

#### Appointment Management
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/appointment` | Get all appointments |
| GET | `/appointment/{id}` | Get appointment by ID |
| POST | `/appointment` | Create new appointment |
| PUT | `/appointment/{id}` | Update appointment |
| DELETE | `/appointment/{id}` | Delete appointment |

## Configuration

### Backend Configuration

Configuration is managed via `backend/src/main/resources/application.yaml`:

```yaml
spring:
  application:
    name: dr-blythe-backend
  datasource:
    url: jdbc:postgresql://localhost:5433/dr-blythe-db
    username: dr-blythe
    password: iset
  jpa:
    hibernate:
      ddl-auto: update

server:
  port: 8080
  servlet:
    context-path: /api
```

### Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `DATABASE_URL` | PostgreSQL connection URL | jdbc:postgresql://localhost:5433/dr-blythe-db |
| `DATABASE_USERNAME` | Database username | dr-blythe |
| `DATABASE_PASSWORD` | Database password | iset |
| `SERVER_PORT` | Backend server port | 8080 |
| `CLIENT_ID` | Azure AD client ID | - |
| `TENANT_ID` | Azure AD tenant ID | - |
| `CLIENT_SECRET` | Azure AD client secret | - |

### Swagger/OpenAPI Configuration

Access API documentation at:
- Swagger UI: `/swagger-ui.html`
- OpenAPI JSON: `/v3/api-docs`

## Testing

### Backend Tests

```bash
cd backend
mvn test
```

### Frontend Tests

```bash
cd frontend
ng test
```

## Deployment

### Docker Deployment

1. Build the images:
```bash
docker-compose -f docker-compose.yml build
```

2. Deploy:
```bash
docker-compose -f docker-compose.yml up -d
```

### Production Considerations

- Configure proper database credentials
- Set up SSL/TLS certificates
- Configure Azure AD/OAuth2 for authentication
- Set up proper logging and monitoring
- Use environment-specific configurations

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is proprietary software. All rights reserved.

---

## Support

For support, please contact the development team or open an issue in the repository.

---

**Built with ❤️ for better healthcare management**

