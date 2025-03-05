# MERN Task Manager

A simple task management application built with the MERN stack (MongoDB, Express, React, Node.js).

## Features

- User authentication (register, login)
- Create, read, update, and delete tasks
- Filter tasks by status
- Responsive design

## Tech Stack

### Frontend
- React 
- React Router for navigation
- Tailwind CSS for styling
- Axios for API requests
- Lucide React for icons

### Backend
- Node.js with Express
- MongoDB with Mongoose
- JWT for authentication
- bcrypt for password hashing

## Setup Instructions

### Prerequisites
- Node.js 
- MongoDB 

### Installation

1. Clone the repository

2. Install dependencies
```
npm install
```

3. Set up environment variables
Create a `.env` file in the root directory with the following variables:
```
FRONTEND
VITE_API_URL=http://localhost:5000
VITE_APP_NAME=Task Manager

BACKEND

PORT=5000
NODE_ENV=development
MONGODB_URI=
appName=Cclustername
JWT_SECRET=your_jwt_secret_key
JWT_EXPIRES_IN=1h
ALLOWED_ORIGINS=http://localhost:5173

```

4. Start the development server
```
# Start the backend server
npm run dev

# In a separate terminal, start the frontend
npm run dev
```

5. Open your browser and navigate to `http://localhost:5173`
