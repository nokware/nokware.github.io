---
title: "Docker VPN Database Client: Simplifying Secure Database Access"
date: 2025-11-19T15:25:01-07:00
image: images/blog/nokware-docker-vpn-database.png
feature_image: images/blog/nokware-docker-vpn-database.png
author: Mishael Ochu
---
### Containerized VPN Access to AWS Database Infrastructure

Connecting to databases behind a corporate VPN typically requires each developer to configure their own VPN client, manage credentials, and remember connection strings for multiple environments. I built a Docker-based solution that abstracts away this complexity.

#### The Challenge

Working with databases across multiple environments (dev, UAT, staging, hotfix) and geographic regions (UK, US, AU) meant:
- Manual VPN client configuration
- Remembering different connection strings per environment
- Troubleshooting connectivity issues individually
- Managing credentials securely

#### The Solution: A Self-Contained Container

The Docker container handles everything:

1. **Automatic VPN Connection** - Establishes OpenVPN tunnel on startup
2. **Pre-configured Database Client** - MySQL client ready to use
3. **Simple CLI Interface** - Connect with a single command
4. **Multi-environment Support** - Switch between environments easily

#### Usage Examples

```bash
# Interactive session to sync-dev
./db-connect.sh sync-dev

# Connect to specific database
./db-connect.sh sync-dev production_database

# Execute a query directly
./db-connect.sh sync-dev -e "SHOW DATABASES"

# Run a SQL file
./db-connect.sh sync-dev -f query.sql
```

#### Smart VPN Management

The container handles VPN lifecycle automatically:

```bash
# Startup sequence
1. Create TUN device if needed
2. Start OpenVPN client
3. Wait for connection (60-second timeout with retry)
4. Verify DNS resolution
5. Ready for database connections
```

Graceful shutdown ensures proper cleanup when stopping the container.

#### Centralized Configuration

All database environments are defined in a single JSON configuration:

```json
{
  "sync-dev": {
    "host": "sync-dev.internal.aws",
    "port": 3306,
    "user": "developer",
    "password": "...",
    "status": "active"
  },
  "sync-uat": { ... },
  "sync-stage": { ... }
}
```

This centralization means updating credentials or adding environments requires changing one file, not reconfiguring every developer's machine.

#### Security Features

- **Encrypted VPN tunnel** with AES-256-GCM
- **Certificate-based authentication**
- **Credentials in configuration**, not environment variables or shell history
- **Container isolation** from host system

#### Developer Experience

The goal was zero-friction database access:

```bash
# Start the container
docker-compose up -d

# Connect to any environment
docker exec -it vpn-db-client db-connect.sh sync-dev

# Test all connections
docker exec -it vpn-db-client test-connections.sh
```

New team members can access all database environments within minutes of cloning the repository, rather than spending hours on VPN and client configuration.

> Good developer tooling should make the complex feel simple and the secure feel effortless.
