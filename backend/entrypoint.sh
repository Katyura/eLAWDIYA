#!/bin/bash

# Wait for the database to be ready
echo "Waiting for database to be ready..."
sleep 5

# Run database initialization
echo "Initializing database tables..."
python -m app.init_db

# Start the FastAPI server
echo "Starting FastAPI server..."
exec uvicorn main:app --host 0.0.0.0 --port 8000 --reload
