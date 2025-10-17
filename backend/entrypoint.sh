#!/bin/sh
# Construct DATABASE_URL from DB_* variables if not already set
set -e

: "${DB_HOST:?DB_HOST is required}"
: "${DB_PORT:?DB_PORT is required}"
: "${DB_NAME:?DB_NAME is required}"
: "${DB_USER:?DB_USER is required}"
: "${DB_PASSWORD:?DB_PASSWORD is required}"

if [ -z "$DATABASE_URL" ]; then
  export DATABASE_URL="postgresql://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/${DB_NAME}"
fi

# Print for debugging (can be removed in prod)
echo "Using DATABASE_URL: ${DATABASE_URL}"

# Exec the CMD passed from Dockerfile/compose
exec "$@"
