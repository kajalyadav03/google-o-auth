# AuthHub 🔐

A modern authentication web application built with React and Node.js.

AuthHub provides secure authentication using email/password login and
Google OAuth. Authenticated users can access a protected dashboard and
securely log out of their account.

---

## ✨ Features

- 🔐 Email and password login
- 🔵 Continue with Google
- 🔑 Google OAuth 2.0 authentication
- 🍪 JWT authentication using HTTP-only cookies
- 🛡️ Protected dashboard
- 🚪 Secure logout
- 👤 User account information
- 🗄️ MongoDB database
- 📱 Responsive and modern UI
- 🔒 Passwords stored using bcrypt hashing

---

## 🛠️ Tech Stack

### Frontend

- React
- React Router
- CSS
- Vite

### Backend

- Node.js
- Express.js
- Passport.js
- Passport Google OAuth 2.0
- JWT
- bcryptjs
- MongoDB
- Mongoose

---

## 🔄 Authentication Flow

### Email & Password

```text
User
  ↓
Login Page
  ↓
Email + Password
  ↓
Node.js API
  ↓
MongoDB
  ↓
Password verification
  ↓
JWT generated
  ↓
HTTP-only Cookie
  ↓
Protected Dashboard


###  GOOGLE O AUTH

User
  ↓
Continue with Google
  ↓
Google Authentication
  ↓
Google OAuth Callback
  ↓
Find/Create User in MongoDB
  ↓
JWT generated
  ↓
HTTP-only Cookie
  ↓
Protected Dashboard