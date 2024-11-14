#!/bin/bash

# Exit on error
set -e

# Load environment variables
if [ -f .env ]; then
    export $(cat .env | grep -v '^#' | xargs)
else
    echo "Error: .env file not found"
    exit 1
fi

# Check if Docker is running
if ! docker info > /dev/null 2>&1; then
    echo "Error: Docker is not running"
    exit 1
fi

# Build and deploy
echo "Building and deploying application..."

# Pull latest changes
git pull origin main

# Build application
docker-compose -f docker-compose.prod.yml build

# Deploy with zero downtime
docker-compose -f docker-compose.prod.yml up -d --remove-orphans

# Clean up
echo "Cleaning up..."
docker system prune -f

echo "Deployment completed successfully!"