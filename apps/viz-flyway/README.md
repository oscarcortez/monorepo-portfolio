# 📚 Flyway Migration Generator - Instructions Guide

**Languages**: 
[English](README.md) | 
[Español](README.es.md) | 
[Français](README.fr.md) | 
[Deutsch](README.de.md) | 
[Dansk](README.dk.md) | 
[Italiano](README.it.md) | 
[Português](README.pt.md)

## 🎯 Project Description

This project provides an automated Flyway migration file generator with a standardized format `V{YYYYMMDDhhmm}__description.sql`, along with Docker scripts for database management.

## 📁 Project Structure

```
viz-flyway/
├── docker-compose.yml          # Docker configuration for Flyway
├── flyway.conf                 # Flyway configuration
├── generate-migration.ts       # Migration generator script
├── package.json               # NPM dependencies and scripts
├── logs/                      # Flyway logs
└── migrations/                # SQL migration files
    ├── V202508240743__init.sql
    ├── V202508301425__create_table_contacts.sql
    └── R__vw_get_hero.sql
```

## 🚀 Installation

### 1. Install dependencies

```bash
cd apps/viz-flyway
pnpm install
```

### 2. Configure Docker

Make sure you have Docker and Docker Compose installed on your system.

## 📝 Migration Generation

### Available Commands

```bash
# Generate versioned migration (recommended for schema changes)
pnpm run generate:versioned --description "create_table_users"

# Generate repeatable migration (for views, functions, seeds)
pnpm run generate:repeatable --description "update_user_permissions"

# View generator help
pnpm run generate:migration
```

### Usage Examples

```bash
# Create a new table
pnpm run generate:versioned --description "create table posts"
# Result: V202508301456__create_table_posts.sql

# Add indexes
pnpm run generate:versioned --description "add user indexes"
# Result: V202508301457__add_user_indexes.sql

# Update a view (repeatable)
pnpm run generate:repeatable --description "update reports view"
# Result: R__update_reports_view.sql
```

## 🐳 Docker Flyway Commands

### Migration and Management

```bash
# Execute pending migrations
pnpm run flyway:migrate

# View migration status
pnpm run flyway:info

# Validate migrations
pnpm run flyway:validate

# Create baseline (first time)
pnpm run flyway:baseline

# Repair schema history (if errors occur)
pnpm run flyway:repair

# Undo last migration
pnpm run flyway:undo
```

### ⚠️ Destructive Commands

```bash
# CLEAN ENTIRE DATABASE (development only)
pnpm run flyway:clean
```

**WARNING**: `flyway:clean` deletes the ENTIRE database. Use only in development.

## 📊 Database - Current Schema

### Main Tables

- **`users`** - System users
- **`languages`** - Available languages (en, es, fr, de)
- **`devices`** - Device types (mobile, tablet, desktop)
- **`contact_types`** - Contact types (email, linkedin, github, etc.)
- **`contacts`** - User contact information
- **`hero_greetings`** - Welcome messages by language/device

### Views

- **`vw_get_hero`** - Optimized view for retrieving greetings

## 🔄 Recommended Workflow

### 1. Local Development

```bash
# 1. Generate new migration
pnpm run generate:versioned --description "add new feature"

# 2. Edit the generated SQL file
# Location: migrations/V{timestamp}__add_new_feature.sql

# 3. Validate syntax
pnpm run flyway:validate

# 4. Execute migration
pnpm run flyway:migrate

# 5. Verify status
pnpm run flyway:info
```

### 2. Error Handling

```bash
# If a migration fails:
# 1. Review logs
cat logs/flyway.log

# 2. Repair schema history
pnpm run flyway:repair

# 3. Fix the SQL file
# 4. Try again
pnpm run flyway:migrate
```

### 3. Complete Reset (Development Only)

```bash
# ⚠️ CAUTION: This deletes everything
pnpm run flyway:clean
pnpm run flyway:migrate
```

## 📋 Naming Conventions

### Versioned Migrations

```
V{YYYYMMDDhhmm}__{description}.sql
```

**Examples:**
- `V202508301456__create_table_users.sql`
- `V202508301457__add_user_indexes.sql`
- `V202508301458__alter_table_posts.sql`

### Repeatable Migrations

```
R__{description}.sql
```

**Examples:**
- `R__create_user_reports_view.sql`
- `R__update_permissions_function.sql`
- `R__seed_initial_data.sql`

## 🎨 Migration Template

The generator automatically creates this structure:

```sql
-- Migration: {DESCRIPTION}
-- Created: {ISO_TIMESTAMP}
-- Type: {Versioned|Repeatable}
-- Description: {description}

-- =====================================================
-- {DESCRIPTION}
-- =====================================================

-- TODO: Add your SQL statements here

-- Example table creation:
-- CREATE TABLE example_table (
--     id SERIAL PRIMARY KEY,
--     uuid UUID NOT NULL DEFAULT gen_random_uuid() UNIQUE,
--     name VARCHAR(255) NOT NULL,
--     deleted_at TIMESTAMP WITH TIME ZONE NULL,
--     created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
--     updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP
-- );

-- =====================================================
-- END OF MIGRATION
-- =====================================================
```

## 🛠️ Configuration

### flyway.conf

```properties
flyway.url=jdbc:postgresql://localhost:5432/portfolio
flyway.user=postgres
flyway.password=password
flyway.schemas=public
flyway.locations=filesystem:./migrations
```

### docker-compose.yml

```yaml
services:
  flyway:
    image: flyway/flyway:latest
    command: migrate
    volumes:
      - ./migrations:/flyway/sql
      - ./flyway.conf:/flyway/conf/flyway.conf
      - ./logs:/flyway/logs
    depends_on:
      - postgres
```

## 🔍 Troubleshooting

### Common Issues

1. **Database connection error**
   ```bash
   # Verify PostgreSQL is running
   docker ps | grep postgres
   ```

2. **Corrupted migration**
   ```bash
   # Repair schema history
   pnpm run flyway:repair
   ```

3. **SQL file with errors**
   ```bash
   # Validate before migrating
   pnpm run flyway:validate
   ```

4. **File permissions**
   ```bash
   # On Windows, check migrations/ folder permissions
   ```

### Logs

```bash
# View Flyway logs
cat logs/flyway.log

# View logs in real-time
tail -f logs/flyway.log
```

## 📚 Additional Resources

- [Official Flyway Documentation](https://flywaydb.org/documentation/)
- [Docker Compose for Flyway](https://flywaydb.org/documentation/usage/docker)
- [Migration Best Practices](https://flywaydb.org/documentation/concepts/migrations)

## 🤝 Contributing

1. Follow naming conventions
2. Document complex changes in SQL
3. Test migrations locally before commit
4. Use versioned migrations for schema changes
5. Use repeatable migrations for views and functions

---

**Author**: Oscar Cortez  
**Project**: Monorepo Portfolio  
**Last Updated**: August 2025