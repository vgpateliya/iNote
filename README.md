# iNotebook — Cloud Note Management System

[![Live Demo](https://img.shields.io/badge/Demo-Live%20on%20Vercel-success?style=flat&logo=vercel)](https://inotebook-psi.vercel.app)
[![React](https://img.shields.io/badge/React-18-61DAFB?style=flat&logo=react)](https://react.dev/)
[![Node.js](https://img.shields.io/badge/Node.js-Express-339933?style=flat&logo=node.js)](https://nodejs.org/)
[![MongoDB](https://img.shields.io/badge/Database-MongoDB-47A248?style=flat&logo=mongodb)](https://www.mongodb.com/)
[![JWT](https://img.shields.io/badge/Auth-JWT-black?style=flat&logo=jsonwebtokens)](https://jwt.io/)
[![Bootstrap](https://img.shields.io/badge/UI-Bootstrap%205-7952B3?style=flat&logo=bootstrap)](https://getbootstrap.com/)
[![License: ISC](https://img.shields.io/badge/License-ISC-blue.svg)](LICENSE)

A full-stack, cloud-based note-taking application built with the **MERN stack** (MongoDB, Express, React, Node.js). Engineered to provide secure, authenticated users with a private notebook on the cloud featuring full CRUD operations, tag-based categorization, and strict per-user data isolation.

🔗 **Live Deployment**: [https://inotebook-psi.vercel.app](https://inotebook-psi.vercel.app)

---

## 🏗️ Architecture & Engineering Highlights

- **Per-User Isolation**: Robust backend middleware (`fetchuser.js`) extracts and verifies the JSON Web Token (`auth-token`) from request headers, strictly scoping note queries and mutations to the authenticated user ID.
- **Data Validation & Sanitization**: Server-side request validation using `express-validator` to enforce schema constraints on user credentials and note content before database writes.
- **Secure Password Hashing**: Passwords are salted and hashed using `bcryptjs` before persisting to MongoDB.
- **Component & State Architecture**: React client utilizing React Context API for global state distribution, combined with React Router v6 for client-side navigation.
- **RESTful API Contracts**: Clean separation between server routes (`/api/auth`, `/api/notes`) and frontend consumption layers.

---

## 🛠️ Tech Stack

| Layer | Technologies |
| :--- | :--- |
| **Frontend** | React 18, React Router DOM v6, Bootstrap 5, React Bootstrap |
| **Backend** | Node.js, Express.js |
| **Database** | MongoDB, Mongoose ODM |
| **Security & Auth** | JSON Web Tokens (JWT), bcryptjs, express-validator, CORS |
| **Deployment** | Vercel (Client and Serverless functions via `vercel.json`) |

---

## 📂 Project Structure

```text
iNote/
├── client/                      # React frontend client
│   ├── public/                  # Static assets and index.html
│   ├── src/                     # React source code
│   │   ├── components/          # Reusable UI components (Navbar, Alert, NoteItem, AddNote, etc.)
│   │   ├── context/notes/       # Context API state management for notes & user sessions
│   │   ├── App.js               # Root application router and layout
│   │   └── index.js             # Client DOM entry point
│   └── package.json             # Frontend dependencies
├── config/                      # Database connection configuration (db.js)
├── middleware/                  # Express middleware
│   └── fetchuser.js             # JWT extraction and route protection
├── models/                      # Mongoose data schemas
│   ├── User.js                  # User profile & authentication schema
│   └── Note.js                  # Note entity schema with user reference
├── routes/                      # RESTful API route definitions
│   ├── auth.js                  # Registration, login, and user profile fetching
│   └── note.js                  # Note CRUD endpoints
├── index.js                     # Express server entry point
├── vercel.json                  # Serverless deployment configuration
└── package.json                 # Backend dependencies & concurrently scripts
```

---

## 🚀 Key Features

1. **User Authentication**: Secure user registration and login with encrypted password storage and JWT token generation.
2. **Note Lifecycle Management (CRUD)**:
   - **Create**: Add notes with title, description, and custom categorization tags.
   - **Read**: Fetch all private notes belonging to the logged-in user.
   - **Update**: Edit existing notes through an interactive modal dialog.
   - **Delete**: Remove notes with immediate optimistic removal from the UI.
3. **Tag Categorization**: Organize notes by tags (e.g., `Personal`, `Work`, `Ideas`).
4. **Interactive Feedback**: Dynamic alert notifications on successful operations and validation errors.

---

## ⚙️ Getting Started

### Prerequisites

- Node.js (v16+ or LTS)
- MongoDB instance (local or MongoDB Atlas connection string)
- npm or yarn

### Installation & Local Setup

1. **Clone the repository:**
   ```bash
   git clone https://github.com/vgpateliya/iNote.git
   cd iNote
   ```

2. **Install backend dependencies:**
   ```bash
   npm install
   ```

3. **Install frontend dependencies:**
   ```bash
   cd client
   npm install
   cd ..
   ```

4. **Configure Environment Variables:**
   Create a `.env` file in the root directory:
   ```env
   PORT=5000
   MONGO_URI=mongodb+srv://<username>:<password>@cluster0.mongodb.net/inotebook
   JWT_SECRET=your_super_secret_jwt_key
   ```

5. **Run the full-stack application concurrently:**
   ```bash
   npm run dev
   ```
   - Express server will run on `http://localhost:5000`
   - React client will launch on `http://localhost:3000`

---

## 📋 API Endpoints

### Authentication Routes (`/api/auth`)
| Method | Endpoint | Description | Auth Required |
| :--- | :--- | :--- | :--- |
| `POST` | `/api/auth/createuser` | Register a new user | No |
| `POST` | `/api/auth/login` | Authenticate and obtain JWT | No |
| `POST` | `/api/auth/getuser` | Fetch current authenticated user details | Yes (`auth-token`) |

### Notes Routes (`/api/notes`)
| Method | Endpoint | Description | Auth Required |
| :--- | :--- | :--- | :--- |
| `GET` | `/api/notes/fetchallnotes` | Fetch all notes for authenticated user | Yes (`auth-token`) |
| `POST` | `/api/notes/addnote` | Add a new note (title, description, tag) | Yes (`auth-token`) |
| `PUT` | `/api/notes/updatenote/:id` | Update note details | Yes (`auth-token`) |
| `DELETE` | `/api/notes/deletenote/:id` | Remove an existing note | Yes (`auth-token`) |

---

## 📸 Screenshots

*(Visual documentation of the note dashboard, modal editor, and responsive layout)*

---

## 📄 License

This project is licensed under the [ISC License](LICENSE).
