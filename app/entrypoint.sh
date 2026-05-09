#!/bin/bash
set -e

echo "Waiting for database to be ready..."
for i in {1..30}; do
  if nc -z db 5432 2>/dev/null; then
    echo "Database is ready!"
    break
  fi
  echo "Waiting for database... ($i/30)"
  sleep 1
done

echo "Starting FastAPI application..."
exec uvicorn app.main:app --host 0.0.0.0 --port 8000