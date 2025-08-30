# 📚 Flyway Migration Generator - Instruktionsguide

**Languages**: 
[English](README.md) | 
[Español](README.es.md) | 
[Français](README.fr.md) | 
[Deutsch](README.de.md) | 
[Dansk](README.dk.md) | 
[Italiano](README.it.md) | 
[Português](README.pt.md)

## 🎯 Projektbeskrivelse

Dette projekt giver en automatiseret Flyway migrations-fil generator med et standardiseret format `V{YYYYMMDDhhmm}__description.sql`, sammen med Docker scripts til databasehåndtering.

## 📁 Projektstruktur

```
viz-flyway/
├── docker-compose.yml          # Docker konfiguration til Flyway
├── flyway.conf                 # Flyway konfiguration
├── generate-migration.ts       # Migration generator script
├── package.json               # NPM afhængigheder og scripts
├── logs/                      # Flyway logs
└── migrations/                # SQL migration filer
    ├── V202508240743__init.sql
    ├── V202508301425__create_table_contacts.sql
    └── R__vw_get_hero.sql
```

## 🚀 Installation

### 1. Installer afhængigheder

```bash
cd apps/viz-flyway
pnpm install
```

### 2. Konfigurer Docker

Sørg for at have Docker og Docker Compose installeret på dit system.

## 📝 Migration Generering

### Tilgængelige Kommandoer

```bash
# Generer versioneret migration (anbefalet til schema ændringer)
pnpm run generate:versioned --description "create_table_users"

# Generer gentagelig migration (til views, funktioner, seeds)
pnpm run generate:repeatable --description "update_user_permissions"

# Vis generator hjælp
pnpm run generate:migration
```

### Brugseksempler

```bash
# Opret en ny tabel
pnpm run generate:versioned --description "create table posts"
# Resultat: V202508301456__create_table_posts.sql

# Tilføj indekser
pnpm run generate:versioned --description "add user indexes"
# Resultat: V202508301457__add_user_indexes.sql

# Opdater et view (gentagelig)
pnpm run generate:repeatable --description "update reports view"
# Resultat: R__update_reports_view.sql
```

## 🐳 Docker Flyway Kommandoer

### Migration og Håndtering

```bash
# Udfør ventende migrationer
pnpm run flyway:migrate

# Vis migration status
pnpm run flyway:info

# Valider migrationer
pnpm run flyway:validate

# Opret baseline (første gang)
pnpm run flyway:baseline

# Reparer schema historik (hvis fejl opstår)
pnpm run flyway:repair

# Fortryd sidste migration
pnpm run flyway:undo
```

### ⚠️ Destruktive Kommandoer

```bash
# RENS HELE DATABASEN (kun udvikling)
pnpm run flyway:clean
```

**ADVARSEL**: `flyway:clean` sletter HELE databasen. Brug kun i udvikling.

## 📊 Database - Nuværende Schema

### Hovedtabeller

- **`users`** - Systembrugere
- **`languages`** - Tilgængelige sprog (en, es, fr, de)
- **`devices`** - Enhedstyper (mobile, tablet, desktop)
- **`contact_types`** - Kontakttyper (email, linkedin, github, osv.)
- **`contacts`** - Bruger kontaktoplysninger
- **`hero_greetings`** - Velkomstbeskeder efter sprog/enhed

### Views

- **`vw_get_hero`** - Optimeret view til at hente hilsner

## 🔄 Anbefalet Arbejdsgang

### 1. Lokal Udvikling

```bash
# 1. Generer ny migration
pnpm run generate:versioned --description "add new feature"

# 2. Rediger den genererede SQL fil
# Placering: migrations/V{timestamp}__add_new_feature.sql

# 3. Valider syntaks
pnpm run flyway:validate

# 4. Udfør migration
pnpm run flyway:migrate

# 5. Verificer status
pnpm run flyway:info
```

### 2. Fejlhåndtering

```bash
# Hvis en migration fejler:
# 1. Gennemgå logs
cat logs/flyway.log

# 2. Reparer schema historik
pnpm run flyway:repair

# 3. Ret SQL filen
# 4. Prøv igen
pnpm run flyway:migrate
```

### 3. Komplet Reset (Kun Udvikling)

```bash
# ⚠️ FORSIGTIG: Dette sletter alt
pnpm run flyway:clean
pnpm run flyway:migrate
```

## 📋 Navngivningskonventioner

### Versionerede Migrationer

```
V{YYYYMMDDhhmm}__{description}.sql
```

**Eksempler:**
- `V202508301456__create_table_users.sql`
- `V202508301457__add_user_indexes.sql`
- `V202508301458__alter_table_posts.sql`

### Gentagelige Migrationer

```
R__{description}.sql
```

**Eksempler:**
- `R__create_user_reports_view.sql`
- `R__update_permissions_function.sql`
- `R__seed_initial_data.sql`

## 🎨 Migration Skabelon

Generatoren opretter automatisk denne struktur:

```sql
-- Migration: {DESCRIPTION}
-- Created: {ISO_TIMESTAMP}
-- Type: {Versioned|Repeatable}
-- Description: {description}

-- =====================================================
-- {DESCRIPTION}
-- =====================================================

-- TODO: Tilføj dine SQL statements her

-- Eksempel tabel oprettelse:
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

## 🛠️ Konfiguration

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

## 🔍 Fejlfinding

### Almindelige Problemer

1. **Database forbindelsesfejl**
   ```bash
   # Verificer at PostgreSQL kører
   docker ps | grep postgres
   ```

2. **Korrupt migration**
   ```bash
   # Reparer schema historik
   pnpm run flyway:repair
   ```

3. **SQL fil med fejl**
   ```bash
   # Valider før migrering
   pnpm run flyway:validate
   ```

4. **Fil tilladelser**
   ```bash
   # På Windows, tjek migrations/ mappe tilladelser
   ```

### Logs

```bash
# Vis Flyway logs
cat logs/flyway.log

# Vis logs i realtid
tail -f logs/flyway.log
```

## 📚 Yderligere Ressourcer

- [Officiel Flyway Dokumentation](https://flywaydb.org/documentation/)
- [Docker Compose til Flyway](https://flywaydb.org/documentation/usage/docker)
- [Migration Bedste Praksis](https://flywaydb.org/documentation/concepts/migrations)

## 🤝 Bidrag

1. Følg navngivningskonventioner
2. Dokumenter komplekse ændringer i SQL
3. Test migrationer lokalt før commit
4. Brug versionerede migrationer til schema ændringer
5. Brug gentagelige migrationer til views og funktioner

---

**Forfatter**: Oscar Cortez  
**Projekt**: Monorepo Portfolio  
**Sidst Opdateret**: August 2025