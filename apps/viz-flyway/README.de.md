# 📚 Flyway Migration Generator - Anweisungshandbuch

**Languages**: 
[English](README.md) | 
[Español](README.es.md) | 
[Français](README.fr.md) | 
[Deutsch](README.de.md) | 
[Dansk](README.dk.md) | 
[Italiano](README.it.md) | 
[Português](README.pt.md)

## 🎯 Projektbeschreibung

Dieses Projekt bietet einen automatisierten Flyway-Migrationsdatei-Generator mit einem standardisierten Format `V{YYYYMMDDhhmm}__description.sql`, zusammen mit Docker-Skripten für die Datenbankverwaltung.

## 📁 Projektstruktur

```
viz-flyway/
├── docker-compose.yml          # Docker-Konfiguration für Flyway
├── flyway.conf                 # Flyway-Konfiguration
├── generate-migration.ts       # Migration Generator Skript
├── package.json               # NPM-Abhängigkeiten und Skripte
├── logs/                      # Flyway-Logs
└── migrations/                # SQL-Migrationsdateien
    ├── V202508240743__init.sql
    ├── V202508301425__create_table_contacts.sql
    └── R__vw_get_hero.sql
```

## 🚀 Installation

### 1. Abhängigkeiten installieren

```bash
cd apps/viz-flyway
pnpm install
```

### 2. Docker konfigurieren

Stellen Sie sicher, dass Docker und Docker Compose auf Ihrem System installiert sind.

## 📝 Migration-Generierung

### Verfügbare Befehle

```bash
# Versionierte Migration generieren (empfohlen für Schema-Änderungen)
pnpm run generate:versioned --description "create_table_users"

# Wiederholbare Migration generieren (für Views, Funktionen, Seeds)
pnpm run generate:repeatable --description "update_user_permissions"

# Generator-Hilfe anzeigen
pnpm run generate:migration
```

### Verwendungsbeispiele

```bash
# Eine neue Tabelle erstellen
pnpm run generate:versioned --description "create table posts"
# Ergebnis: V202508301456__create_table_posts.sql

# Indizes hinzufügen
pnpm run generate:versioned --description "add user indexes"
# Ergebnis: V202508301457__add_user_indexes.sql

# Eine View aktualisieren (wiederholbar)
pnpm run generate:repeatable --description "update reports view"
# Ergebnis: R__update_reports_view.sql
```

## 🐳 Docker Flyway-Befehle

### Migration und Verwaltung

```bash
# Ausstehende Migrationen ausführen
pnpm run flyway:migrate

# Migrationsstatus anzeigen
pnpm run flyway:info

# Migrationen validieren
pnpm run flyway:validate

# Baseline erstellen (erstes Mal)
pnpm run flyway:baseline

# Schema-Historie reparieren (bei Fehlern)
pnpm run flyway:repair

# Letzte Migration rückgängig machen
pnpm run flyway:undo
```

### ⚠️ Destruktive Befehle

```bash
# GESAMTE DATENBANK LÖSCHEN (nur Entwicklung)
pnpm run flyway:clean
```

**WARNUNG**: `flyway:clean` löscht die GESAMTE Datenbank. Nur in der Entwicklung verwenden.

## 📊 Datenbank - Aktuelles Schema

### Haupttabellen

- **`users`** - Systembenutzer
- **`languages`** - Verfügbare Sprachen (en, es, fr, de)
- **`devices`** - Gerätetypen (mobile, tablet, desktop)
- **`contact_types`** - Kontakttypen (email, linkedin, github, etc.)
- **`contacts`** - Benutzer-Kontaktinformationen
- **`hero_greetings`** - Begrüßungsnachrichten nach Sprache/Gerät

### Views

- **`vw_get_hero`** - Optimierte View zum Abrufen von Begrüßungen

## 🔄 Empfohlener Arbeitsablauf

### 1. Lokale Entwicklung

```bash
# 1. Neue Migration generieren
pnpm run generate:versioned --description "add new feature"

# 2. Generierte SQL-Datei bearbeiten
# Ort: migrations/V{timestamp}__add_new_feature.sql

# 3. Syntax validieren
pnpm run flyway:validate

# 4. Migration ausführen
pnpm run flyway:migrate

# 5. Status überprüfen
pnpm run flyway:info
```

### 2. Fehlerbehandlung

```bash
# Wenn eine Migration fehlschlägt:
# 1. Logs überprüfen
cat logs/flyway.log

# 2. Schema-Historie reparieren
pnpm run flyway:repair

# 3. SQL-Datei korrigieren
# 4. Erneut versuchen
pnpm run flyway:migrate
```

### 3. Vollständiger Reset (Nur Entwicklung)

```bash
# ⚠️ VORSICHT: Dies löscht alles
pnpm run flyway:clean
pnpm run flyway:migrate
```

## 📋 Namenskonventionen

### Versionierte Migrationen

```
V{YYYYMMDDhhmm}__{description}.sql
```

**Beispiele:**
- `V202508301456__create_table_users.sql`
- `V202508301457__add_user_indexes.sql`
- `V202508301458__alter_table_posts.sql`

### Wiederholbare Migrationen

```
R__{description}.sql
```

**Beispiele:**
- `R__create_user_reports_view.sql`
- `R__update_permissions_function.sql`
- `R__seed_initial_data.sql`

## 🎨 Migrations-Vorlage

Der Generator erstellt automatisch diese Struktur:

```sql
-- Migration: {DESCRIPTION}
-- Created: {ISO_TIMESTAMP}
-- Type: {Versioned|Repeatable}
-- Description: {description}

-- =====================================================
-- {DESCRIPTION}
-- =====================================================

-- TODO: Fügen Sie hier Ihre SQL-Anweisungen hinzu

-- Beispiel für Tabellenerstellung:
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

## 🔍 Fehlerbehebung

### Häufige Probleme

1. **Datenbankverbindungsfehler**
   ```bash
   # Überprüfen, ob PostgreSQL läuft
   docker ps | grep postgres
   ```

2. **Beschädigte Migration**
   ```bash
   # Schema-Historie reparieren
   pnpm run flyway:repair
   ```

3. **SQL-Datei mit Fehlern**
   ```bash
   # Vor Migration validieren
   pnpm run flyway:validate
   ```

4. **Dateiberechtigungen**
   ```bash
   # Unter Windows, Berechtigungen des migrations/ Ordners überprüfen
   ```

### Logs

```bash
# Flyway-Logs anzeigen
cat logs/flyway.log

# Logs in Echtzeit anzeigen
tail -f logs/flyway.log
```

## 📚 Zusätzliche Ressourcen

- [Offizielle Flyway-Dokumentation](https://flywaydb.org/documentation/)
- [Docker Compose für Flyway](https://flywaydb.org/documentation/usage/docker)
- [Migration Best Practices](https://flywaydb.org/documentation/concepts/migrations)

## 🤝 Mitwirkung

1. Namenskonventionen befolgen
2. Komplexe Änderungen in SQL dokumentieren
3. Migrationen lokal vor Commit testen
4. Versionierte Migrationen für Schema-Änderungen verwenden
5. Wiederholbare Migrationen für Views und Funktionen verwenden

---

**Autor**: Oscar Cortez  
**Projekt**: Monorepo Portfolio  
**Letzte Aktualisierung**: August 2025