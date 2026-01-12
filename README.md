# Next.js + Django Starter (Vercel-ready)

Next.js frontend with a Django REST backend, pre-configured to be deployed on Vercel.

## What's inside

- A Next.js App Router frontend in `frontend/app-client/` (TypeScript-friendly)
- A Django REST backend in `backend/` with DRF and Whitenoise
- Vercel build configuration for the backend (`backend/vercel.json`) and a static build path for static assets
- Example build script (`backend/build_files.sh`) and `requirements.txt`

## Quick start (full stack) ⚡

1. Backend setup

```bash
cd backend
python -m venv .venv && source .venv/bin/activate
pip install -r requirements.txt
# create .env (see backend/README.md)
python manage.py migrate
python manage.py runserver
```

2. Frontend setup

```bash
cd frontend/app-client
npm install
npm run dev
```

Open the frontend at http://localhost:3000 and the backend at http://localhost:8000 by default.

## Deploying to Vercel

- The backend includes `vercel.json` to run a Python serverless function using `core/wsgi.py` and to serve static files from `staticfiles/`.
- The frontend is a standard Next.js app and can be deployed either as a separate project on Vercel or as part of the monorepo — configure Vercel to use `frontend/app-client` as the project root if necessary.
- Ensure environment variables (e.g., `SECRET_KEY`, `DATABASE_URL`) are set in the Vercel dashboard.

## Project structure 📁

- `frontend/app-client/` — Next.js frontend app
- `backend/` — Django backend and API
- `backend/vercel.json` — Vercel configuration for the backend
- `build_files.sh` — helper to prepare files for build (backend)
