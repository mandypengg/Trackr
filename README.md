# Trackr — Job Application Tracker

A full-stack web application for managing and analyzing job applications in one place. Upload existing spreadsheets from Google Sheets or Excel, manually add applications, and track your progress with a built-in analytics dashboard.

> 🚧 **Status: In Progress** — Core backend and frontend are functional. Authentication integration and analytics dashboard in active development.

---

## Features

- **CSV & Excel Import** — Upload existing spreadsheets and have all applications parsed and saved automatically
- **CRUD Application Management** — Create, view, update, and delete job applications
- **Data Normalization** — Automatically standardizes column names across different spreadsheet formats
- **JWT Authentication** — Secure signup and login with bcrypt password hashing
- **REST API** — Fully documented API with interactive docs at `/docs`
- **React Frontend** — Clean, dark-themed UI with multi-page routing

---

## Tech Stack

**Frontend**
- React + Vite
- React Router DOM
- Tailwind CSS

**Backend**
- FastAPI (Python)
- PostgreSQL
- SQLAlchemy
- pandas + openpyxl (file parsing)
- JWT (python-jose) + bcrypt (passlib)

---

## Project Structure

```
job-tracker/
├── frontend/               # React app
│   └── src/
│       ├── App.jsx
│       ├── LandingPage.jsx
│       ├── LoginPage.jsx
│       └── SignupPage.jsx
└── backend/                # FastAPI app
    └── app/
        ├── main.py         # App entry point + CORS
        ├── models.py       # Database models
        ├── schemas.py      # Pydantic schemas
        ├── routes.py       # Application CRUD routes
        ├── auth_routes.py  # Auth routes (signup, login)
        ├── auth.py         # JWT + password utilities
        ├── database.py     # DB connection + session
        └── parser.py       # CSV/Excel parsing pipeline
```

---

## Getting Started

### Prerequisites
- Python 3.10+
- Node.js 18+
- PostgreSQL 15+

### Backend Setup

```bash
cd backend
python3 -m venv venv
source venv/bin/activate
pip install fastapi uvicorn sqlalchemy psycopg2-binary python-dotenv pandas openpyxl "python-jose[cryptography]" "passlib[bcrypt]" python-multipart
```

Create a `.env` file in the `backend` folder:
```
DATABASE_URL=postgresql://your_user:your_password@localhost/job_tracker
SECRET_KEY=your-secret-key-here
```

Run the server:
```bash
uvicorn app.main:app --reload
```

API will be available at `http://127.0.0.1:8000`
Interactive API docs at `http://127.0.0.1:8000/docs`

### Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

App will be available at `http://localhost:5173`

---

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/auth/signup` | Register a new user |
| POST | `/auth/login` | Login and receive JWT token |
| GET | `/auth/me` | Get current authenticated user |
| GET | `/applications/` | Get all applications |
| POST | `/applications/` | Create a new application |
| GET | `/applications/{id}` | Get a single application |
| PUT | `/applications/{id}` | Update an application |
| DELETE | `/applications/{id}` | Delete an application |
| POST | `/applications/upload` | Upload a CSV or Excel file |

---

## Roadmap

- [x] REST API with CRUD operations
- [x] PostgreSQL database schema
- [x] CSV and Excel file parsing pipeline
- [x] JWT authentication backend
- [x] React frontend with routing
- [x] Login and signup pages
- [ ] Connect auth to frontend
- [ ] Protected tracker dashboard
- [ ] Analytics dashboard (response rate, interview rate, status breakdown)
- [ ] Deduplication logic
- [ ] Deployment (Vercel + Railway)

---

## Author

**Mandy Peng**
- GitHub: [@mandypengg](https://github.com/mandypengg)
- LinkedIn: [mandypengg](https://www.linkedin.com/in/mandypengg)
