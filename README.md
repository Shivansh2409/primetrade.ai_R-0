# PrimeTrade.ai

Full-stack note-taking app with authentication.

## Tech Stack

**Backend:** Node.js + Express + MongoDB + JWT + Redis
**Frontend:** React + Vite + React Router + Axios + Sass (dark theme)
**Auth:** JWT cookies, protected routes
**Notes:** CRUD API + real-time optimistic updates

## Quick Start

### Prerequisites

- Node.js 18+
- MongoDB (local or Atlas)
- Redis (optional, for sessions)

### Backend

```bash
cd backend
cp .env.example .env  # Configure DB/JWT
npm install
npm start
```

Frontend API: `http://localhost:8080`

### Frontend

```bash
cd frontend
npm install
npm run dev
```

App: `http://localhost:5173`

## Features

- User auth (register/login/logout/profile)
- Protected notes CRUD (add/edit/delete/list)
- Dark grey theme throughout
- Responsive design
- Protected routes

## Project Structure

```
primetrade.ai/
├── backend/           # Express API
│   ├── src/
│   │   ├── controllers/
│   │   ├── routes/    # auth + notes
│   │   ├── docs/      # API docs (ROUTES.md)
│   └── .env.example
├── frontend/          # React + Vite
│   ├── src/features/
│   │   ├── user/      # Auth (pages/hooks/service/components)
│   │   └── notes/     # Notes CRUD (pages/hooks/service)
│   └── components/Protected.jsx
└── README.md
```

## API Routes

See [backend/docs/ROUTES.md](backend/docs/ROUTES.md)

## Environment

Copy `.env.example` files and configure:

- `PORT`, `MONGO_URI`, `JWT_SECRET`
- Redis optional for sessions

## Development

- Backend hot reload: `nodemon server.js`
- Frontend: Vite HMR

Made with ❤️ using modern React/Node patterns
