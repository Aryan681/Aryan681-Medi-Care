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
    ```

5. Run the application:

    ```bash
    npm start
    ```

    The server will start and listen on `http://localhost:5000` by default.

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
├── server.js
└── README.md
