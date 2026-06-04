# Task Management App (MERN)

A clean task manager built with MongoDB, Express, React, and Node. It covers secure authentication, full CRUD for tasks, and a responsive interface with search and status filters.

## Features

- Register and login with JWT
- Create, edit, delete, and toggle tasks
- Search by title or description
- Filter by status (pending or completed)
- Responsive layout with Tailwind CSS

## Tech Stack

- Frontend: React, Vite, Tailwind CSS
- Backend: Node.js, Express, MongoDB, Mongoose
- Auth: JWT, bcrypt

## Setup

### 1) Server

1. Open a terminal in the `server` folder
2. Install dependencies
   ```bash
   npm install
   ```
3. Create a `.env` file using `.env.example` as a template
4. Start the server
   ```bash
   npm run dev
   ```

### 2) Client

1. Open a terminal in the `client` folder
2. Install dependencies
   ```bash
   npm install
   ```
3. Start the client
   ```bash
   npm run dev
   ```

## Environment Variables

Server `.env`

```
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
PORT=5000
CLIENT_ORIGIN=http://localhost:5173
```

Client `.env`

```
VITE_API_URL=http://localhost:5000
```

## Screenshots or Demo

Add screenshots or a short demo video link here after running the app.

## Notes

- Pagination is intentionally not included.
- Search and filter are implemented as requested.
