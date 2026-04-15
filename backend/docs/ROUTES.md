# Backend API Routes Documentation

## Overview

All routes are mounted under `/api/`. Auth related under `/api/auth`, Notes CRUD under `/api/notes`.

**Base URL:** `http://localhost:5000/api`

**Middleware Legend:**

- `protect`: JWT authentication required
- `validate*`: Input validation
- `authorizeRoles('admin')`: Admin role required

## Auth Routes (`/api/auth`)

| Method | Endpoint           | Description                    | Middleware                           | Controller |
| ------ | ------------------ | ------------------------------ | ------------------------------------ | ---------- |
| POST   | `/register`        | Register new user              | `validateRegister`                   | `register` |
| POST   | `/login`           | Login user                     | `validateLogin`                      | `login`    |
| POST   | `/logout`          | Logout user                    | -                                    | `logout`   |
| GET    | `/profile`         | Get authenticated user profile | `protect`                            | inline     |
| GET    | `/admin-dashboard` | Admin dashboard access         | `protect`, `authorizeRoles('admin')` | inline     |

## Notes Routes (`/api/notes`)

| Method | Endpoint  | Description        | Middleware | Controller   |
| ------ | --------- | ------------------ | ---------- | ------------ |
| POST   | `/create` | Create new note    | `protect`  | `createNote` |
| GET    | `/`       | Get all user notes | `protect`  | `getNotes`   |
| GET    | `/:id`    | Get single note    | `protect`  | `getNote`    |
| PUT    | `/:id`    | Update note        | `protect`  | `updateNote` |
| DELETE | `/:id`    | Delete note        | `protect`  | `deleteNote` |

## JSON Export

See [routes.json](./routes.json) for machine-readable format.

---

_Generated automatically from route files_
