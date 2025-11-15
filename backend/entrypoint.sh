#!/bin/bash
set -e

uv run python manage.py collectstatic --noinput

exec uv run gunicorn backend.wsgi:application \
    --bind 0.0.0.0:8000
