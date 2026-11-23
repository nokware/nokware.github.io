---
title: "Docker VPN Database Client: Simplifying Secure Database Access"
date: 2025-11-19T15:25:01-07:00
image: images/blog/nokware-docker-vpn-database.png
feature_image: images/blog/nokware-docker-vpn-database.png
author: Mishael Ochu
lastmod: 2026-11-23
---

I needed database access across development, UAT, staging and hotfix environments in the UK, US and Australia. Each developer had to configure a VPN client and database tooling before making a connection.

I packaged OpenVPN and a MySQL client in a Docker container. The container establishes the tunnel on startup, checks connectivity and exposes a command for choosing an environment.

### Connect through the container

```bash
# Interactive session to sync-dev
./db-connect.sh sync-dev

# Connect to a specific database
./db-connect.sh sync-dev production_database

# Execute a query directly
./db-connect.sh sync-dev -e "SHOW DATABASES"

# Run a SQL file
./db-connect.sh sync-dev -f query.sql
```

Startup creates the TUN device when needed, starts OpenVPN and waits for the connection with a 60-second timeout and retry. It then verifies DNS resolution before accepting database connections. Shutdown handles tunnel cleanup.

### Maintain the environment configuration

A JSON file holds the connection settings. This example uses placeholder values.

```json
{
  "sync-dev": {
    "host": "sync-dev.internal.aws",
    "port": 3306,
    "user": "developer",
    "password": "...",
    "status": "active"
  }
}
```

Adding an environment or updating a credential changes that configuration file. Developers select the environment by name. The setup uses certificate authentication and an AES-256-GCM VPN tunnel, and the connection commands select entries from the configuration file.

```bash
docker-compose up -d
docker exec -it vpn-db-client db-connect.sh sync-dev
docker exec -it vpn-db-client test-connections.sh
```

This puts the VPN startup sequence and connectivity checks in a script I can maintain and test. It also gives a developer a consistent starting point when a connection fails.
