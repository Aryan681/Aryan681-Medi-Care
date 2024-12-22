# Healthcare API

This is a healthcare management API designed to manage patient data, events (appointments, interventions), and track healthcare interventions. The API also integrates real-time updates using WebSockets and JWT-based authentication for secure access.

## Features

- **Patient Management**: Add, update, and retrieve patient details.
- **Event Management**: Log patient events (appointments, surgeries, etc.) and fetch event history.
- **Intervention Tracking**: Track and manage healthcare interventions (medications, surgeries).
- **JWT Authentication**: Secure access with JWT authentication.
- **Real-time Updates**: Get real-time notifications for patient events using WebSockets.
- **Role-Based Access Control**: Different roles for users (e.g., doctors vs admins).

## Tech Stack

- **Backend**: Node.js with Express.js
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: JWT (JSON Web Tokens)
- **Real-Time**: WebSockets
- **Environment Variables**: dotenv
- **Security**: bcryptjs (for password hashing), OAuth2 integration (optional)
- **CORS**: To allow cross-origin requests

## Installation

### Clone the repository
```bash
git clone https://github.com/your-username/healthcare-api.git
cd healthcare-api
