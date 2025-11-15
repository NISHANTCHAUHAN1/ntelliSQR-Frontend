# Todo App – Full Stack (Node.js + React)

This is a full-stack Todo application built with Node.js + TypeScript on the backend and React + TypeScript on the frontend.
The app includes authentication, password reset, and complete Todo management.

# Features
- User Features
- Create a new account
- Login with JWT authentication
- Forgot password (reset link)
- Reset password
- Logout
- Logged-in state persists using Zustand store

# Todo Features

- Add a new todo
- Edit an existing todo
- Delete a todo
- Mark todo as completed or not completed
- List all todos of the logged-in user

# Other Backend Features
	
- All errors are handled with proper messages
- Every backend error is stored inside a separate logs collection in MongoDB
- Uses MongoDB Atlas (free tier)
- Uses Zod for validation	
- Uses JWT for authentication

# Frontend Features
	
- React Router for navigation	
- Zustand for global auth state	
- React Query v5 for API calls + caching	
- Zod for form validation	
- React Hook Form for forms	
- Tailwind CSS for UI	
- Custom UI for Login/Signup pages

🛠️ Tech Stack
# Backend

- Node.js + TypeScript
- Express.js
- MongoDB
- JWT Authentication
- Zod validation
- Bcrypt for password hashing
- Frontend
- React + TypeScript (Vite)
- React Router

# Zustand

- React Query
- Zod + React Hook Form
- Tailwind CSS