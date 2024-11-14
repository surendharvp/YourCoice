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

# Create backup directory if it doesn't exist
BACKUP_DIR="backups/$(date +%Y-%m-%d)"
mkdir -p $BACKUP_DIR

# Backup PostgreSQL database
echo "Backing up PostgreSQL database..."
docker-compose -f docker-compose.prod.yml exec -T db pg_dump -U postgres timebank > "$BACKUP_DIR/database.sql"

# Compress backup
tar -czf "$BACKUP_DIR/backup.tar.gz" "$BACKUP_DIR/database.sql"

# Remove uncompressed files
rm "$BACKUP_DIR/database.sql"

# Keep only last 7 days of backups
find backups/* -type d -mtime +7 -exec rm -rf {} +

echo "Backup completed successfully!"