# Healthcare API Project

This project is a Healthcare API designed for managing patients, interventions, and events in a healthcare system. The system includes user authentication, role-based access control (RBAC), and secure endpoints for managing patient data, medical events, and interventions.

The API follows the **MERN stack** architecture and includes **JWT authentication**, **role-based access control**, and **real-time event handling using Socket.io**.

## Technologies

- **Backend**: Node.js, Express.js, MongoDB (with Mongoose)
- **Authentication**: JWT (JSON Web Token)
- **Real-Time Communication**: Socket.io
- **Database**: MongoDB (using Mongoose ORM)
- **Validation**: Joi for input validation (optional)
- **Environment**: dotenv for managing environment variables
- **Encryption**: AES-256 encryption using Node.js Crypto module for sensitive patient data

## Features

- **User Registration and Authentication**: JWT-based authentication to securely log in and register users.
- **Role-Based Access Control**: Differentiates between Admin and User roles with specific permissions.
- **Patient Management**: CRUD operations for adding, updating, and viewing patient details.
- **Event Logging**: Track events (e.g., emergency alerts, patient check-ins) associated with patients.
- **Intervention Management**: Track medical interventions assigned to patients.
- **Real-Time Event Updates**: Use Socket.io to send real-time updates about events and patient status.
- **Secure Routes**: Endpoints protected by authentication middleware to restrict unauthorized access.

## Installation

1. Clone the repository:

    ```bash
    git clone https://github.com/yourusername/healthcare-api.git
    ```

2. Navigate to the project directory:

    ```bash
    cd healthcare-api
    ```

3. Install the dependencies:

    ```bash
    npm install
    ```

4. Create a `.env` file in the root directory to store your environment variables (e.g., database URL, JWT secret).

    Example `.env` file:

    ```env
    JWT_SECRET=your_jwt_secret
    MONGO_URI=mongodb://localhost:27017/healthcare
    INITIAL_ADMIN_EMAIL=admin@example.com
    ADMIN_PASSWORD=your_password
    ```

5. Run the application:

    ```bash
    npm start
    ```

    The server will start and listen on `http://localhost:5000` by default.

## API Documentation

### Authentication Routes

#### `POST /auth/register`
- Register a new user (Admin or User).

#### `POST /auth/login`
- Login and get a JWT token.

---

### Patient Routes

#### `POST /patients/add`
- Add a new patient.

#### `GET /patients/:id`
- Get details of a specific patient.

#### `PUT /patients/update/:id`
- Update patient details.

---

### Event Routes

#### `POST /events`
- Log a new event for a patient.

#### `GET /events/:patientId`
- Fetch event history for a specific patient.

---

### Intervention Routes

#### `POST /interventions/assign`
- Assign a new intervention to a patient.

#### `PUT /interventions/update/:interventionId`
- Update the status of an intervention.

#### `GET /interventions/patient/:patientId`
- Get interventions for a specific patient.

---

### Role-Based Access Control

#### User Roles

1. **Admin**: Full access to all resources (patients, events, interventions). Admin can assign roles to other users.
2. **User**: Limited access, typically only allowed to view their own patient records and associated events/interventions.

#### Role Assignment

- When the first user registers with a specific email (set in `.env` as `INITIAL_ADMIN_EMAIL`), they are automatically assigned the "Admin" role.
- Admin users can assign roles to other users, which are stored in the database as part of the user record.

## Project Structure

```plaintext
├── controllers
│   ├── authController.js
│   ├── patientController.js
│   ├── eventController.js
│   └── interventionController.js
├── models
│   ├── User.js
│   ├── Patient.js
│   ├── Event.js
│   └── Intervention.js
├── routes
│   ├── authRoutes.js
│   ├── patientRoutes.js
│   ├── eventRoutes.js
│   └── interventionRoutes.js
├── middleware
│   └── authMiddleware.js
├── sockets
│   └── socketManager.js
├── testing
│   └── testSocket.js
├── package.json
├── server.js
└── README.md
