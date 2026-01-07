# Django Backend (API) Boilerplate

A lightweight Django REST API configured for production and Vercel deployment.

## Key eatures ✅

- Django 5.2.10 with Django REST Framework
- Environment-based configuration using `python-dotenv` / `django-environ`
- Single-file Vercel configuration (`vercel.json`) and `build_files.sh` for static assets
- Whitenoise for serving static files
- PostgreSQL friendly (via `dj-database-url` / `psycopg2-binary`)

## Quick start

1. Create and activate a virtual environment:

```bash
python -m venv .venv
source .venv/bin/activate
```

2. Install dependencies:

```bash
pip install -r requirements.txt
```

3. Copy or create a `.env` file with the minimal values:

```
# Example
SECRET_KEY=your-secret-key
DEBUG=True
DATABASE_URL=sqlite:///db.sqlite3
```

4. Run migrations and create a superuser:

```bash
python manage.py migrate
python manage.py createsuperuser
```

5. Run the development server:

```bash
python manage.py runserver
```

Open http://localhost:8000 to view the API or Django admin.

## Static files & production notes

- Use `python manage.py collectstatic` to collect static files into `staticfiles/` (the folder configured for Vercel static build).
- `vercel.json` is preconfigured to use `core/wsgi.py` for the Python lambda and serve `/static` from `staticfiles/`.
- `build_files.sh` is included to prepare any files needed during the Vercel build.

## Environment variables (common) ⚠️

- `SECRET_KEY` — Django secret key
- `DEBUG` — `True` or `False` (set to `False` in production)
- `DJANGO_SUPERUSER_USERNAME` — admin username
- `DJANGO_SUPERUSER_EMAIL` — admin email
- `DJANGO_SUPERUSER_PASSWORD` — admin password
- `REMOTE_DB` — `True` to enable a remote database (defaults to sqlite3 locally)
- `DATABASE_URL` — DB connection string (e.g., `postgres://user:pass@host:port/dbname`); set when `REMOTE_DB=True`
- Optionally: `ALLOWED_HOSTS` etc.

## Deploying on Vercel 🚀

- `backend/vercel.json` configures the Python runtime and routes static assets.
- Ensure environment variables are set in the Vercel dashboard (e.g., `SECRET_KEY`, `DATABASE_URL`).