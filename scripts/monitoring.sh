#!/bin/bash

# Check container health
echo "Checking container health..."
docker-compose -f docker-compose.prod.yml ps

# Check container logs
echo "Checking container logs..."
docker-compose -f docker-compose.prod.yml logs --tail=100

# Check system resources
echo "Checking system resources..."
docker stats --no-stream

# Check application metrics
echo "Checking application metrics..."
curl -s http://localhost:8080/actuator/health | jq .