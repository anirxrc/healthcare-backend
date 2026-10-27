# Healthcare System Backend

A Node.js backend system for a healthcare application that manages patients, doctors, and their relationships.

## Features

- User authentication with JWT
- Patient management
- Doctor management
- Patient-Doctor mapping
- Role-based access control
- Input validation
- Error handling

## Prerequisites

- Node.js (v14 or higher)
- PostgreSQL (v12 or higher)
- npm or yarn

## Setup

1. Clone the repository:
```bash
git clone <repository-url>
cd healthcare-system-backend
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the root directory with the following variables:
```
PORT=
DB_NAME=healthcare_db
DB_USER=postgres(default)
DB_PASSWORD=your_password
DB_HOST=localhost
DB_PORT=5432(default)
JWT_SECRET=your_jwt_secret_key
JWT_EXPIRES_IN=
```

4. Create the PostgreSQL database:
```bash
createdb healthcare_db
```

5. Start the server:
```bash
# Development mode
npm run dev

# Production mode
npm start
```

## API Endpoints

### Authentication

- `POST /api/auth/register` - Register a new user
  - Body: `{ "name": "string", "email": "string", "password": "string" }`

- `POST /api/auth/login` - Login user
  - Body: `{ "email": "string", "password": "string" }`

### Patients

- `POST /api/patients` - Create a new patient (Authenticated)
  - Body: `{ "firstName": "string", "lastName": "string", "dateOfBirth": "date", "gender": "male|female|other", "contactNumber": "string", "address": "string", "medicalHistory": "string" }`

- `GET /api/patients` - Get all patients for authenticated user
- `GET /api/patients/:id` - Get specific patient
- `PUT /api/patients/:id` - Update patient
- `DELETE /api/patients/:id` - Delete patient

### Doctors

- `POST /api/doctors` - Create a new doctor (Admin only)
  - Body: `{ "firstName": "string", "lastName": "string", "specialization": "string", "licenseNumber": "string", "contactNumber": "string", "email": "string" }`

- `GET /api/doctors` - Get all doctors
- `GET /api/doctors/:id` - Get specific doctor
- `PUT /api/doctors/:id` - Update doctor (Admin only)
- `DELETE /api/doctors/:id` - Delete doctor (Admin only)

### Patient-Doctor Mappings

- `POST /api/mappings` - Assign doctor to patient
  - Body: `{ "patientId": "uuid", "doctorId": "uuid", "notes": "string" }`

- `GET /api/mappings` - Get all mappings for user's patients
- `GET /api/mappings/:patientId` - Get all doctors for a specific patient
- `DELETE /api/mappings/:id` - Remove doctor from patient

## Authentication

All protected endpoints require a JWT token in the Authorization header:
```
Authorization: Bearer <token>
```


## Development

The project uses:
- Express.js for the web framework
- Sequelize as the ORM
- PostgreSQL as the database
- JWT for authentication
- Express Validator for input validation
- CORS for cross-origin resource sharing 
