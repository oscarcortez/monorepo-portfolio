# 📚 Flyway Migration Generator - Guida alle Istruzioni

**Languages**: 
[English](README.md) | 
[Español](README.es.md) | 
[Français](README.fr.md) | 
[Deutsch](README.de.md) | 
[Dansk](README.dk.md) | 
[Italiano](README.it.md) | 
[Português](README.pt.md)

## 🎯 Descrizione del Progetto

Questo progetto fornisce un generatore automatizzato di file di migrazione Flyway con un formato standardizzato `V{YYYYMMDDhhmm}__description.sql`, insieme a script Docker per la gestione del database.

## 📁 Struttura del Progetto

```
viz-flyway/
├── docker-compose.yml          # Configurazione Docker per Flyway
├── flyway.conf                 # Configurazione Flyway
├── generate-migration.ts       # Script generatore di migrazioni
├── package.json               # Dipendenze e script NPM
├── logs/                      # Log di Flyway
└── migrations/                # File di migrazione SQL
    ├── V202508240743__init.sql
    ├── V202508301425__create_table_contacts.sql
    └── R__vw_get_hero.sql
```

## 🚀 Installazione

### 1. Installare le dipendenze

```bash
cd apps/viz-flyway
pnpm install
```

### 2. Configurare Docker

Assicurati di avere Docker e Docker Compose installati sul tuo sistema.

## 📝 Generazione di Migrazioni

### Comandi Disponibili

```bash
# Generare migrazione versionata (raccomandato per modifiche dello schema)
pnpm run generate:versioned --description "create_table_users"

# Generare migrazione ripetibile (per viste, funzioni, seeds)
pnpm run generate:repeatable --description "update_user_permissions"

# Visualizzare l'aiuto del generatore
pnpm run generate:migration
```

### Esempi di Utilizzo

```bash
# Creare una nuova tabella
pnpm run generate:versioned --description "create table posts"
# Risultato: V202508301456__create_table_posts.sql

# Aggiungere indici
pnpm run generate:versioned --description "add user indexes"
# Risultato: V202508301457__add_user_indexes.sql

# Aggiornare una vista (ripetibile)
pnpm run generate:repeatable --description "update reports view"
# Risultato: R__update_reports_view.sql
```

## 🐳 Comandi Docker Flyway

### Migrazione e Gestione

```bash
# Eseguire migrazioni in sospeso
pnpm run flyway:migrate

# Visualizzare stato delle migrazioni
pnpm run flyway:info

# Validare migrazioni
pnpm run flyway:validate

# Creare baseline (prima volta)
pnpm run flyway:baseline

# Riparare schema history (se ci sono errori)
pnpm run flyway:repair

# Annullare l'ultima migrazione
pnpm run flyway:undo
```

### ⚠️ Comandi Distruttivi

```bash
# PULIRE TUTTO IL DATABASE (solo sviluppo)
pnpm run flyway:clean
```

**ATTENZIONE**: `flyway:clean` elimina TUTTO il database. Usare solo in sviluppo.

## 📊 Database - Schema Attuale

### Tabelle Principali

- **`users`** - Utenti del sistema
- **`languages`** - Lingue disponibili (en, es, fr, de)
- **`devices`** - Tipi di dispositivo (mobile, tablet, desktop)
- **`contact_types`** - Tipi di contatto (email, linkedin, github, etc.)
- **`contacts`** - Informazioni di contatto degli utenti
- **`hero_greetings`** - Messaggi di benvenuto per lingua/dispositivo

### Viste

- **`vw_get_hero`** - Vista per ottenere saluti ottimizzata

## 🔄 Flusso di Lavoro Raccomandato

### 1. Sviluppo Locale

```bash
# 1. Generare nuova migrazione
pnpm run generate:versioned --description "add new feature"

# 2. Modificare il file SQL generato
# Posizione: migrations/V{timestamp}__add_new_feature.sql

# 3. Validare sintassi
pnpm run flyway:validate

# 4. Eseguire migrazione
pnpm run flyway:migrate

# 5. Verificare stato
pnpm run flyway:info
```

### 2. Gestione degli Errori

```bash
# Se una migrazione fallisce:
# 1. Rivedere i log
cat logs/flyway.log

# 2. Riparare schema history
pnpm run flyway:repair

# 3. Correggere il file SQL
# 4. Riprovare
pnpm run flyway:migrate
```

### 3. Reset Completo (Solo Sviluppo)

```bash
# ⚠️ ATTENZIONE: Questo elimina tutto
pnpm run flyway:clean
pnpm run flyway:migrate
```

## 📋 Convenzioni di Nomenclatura

### Migrazioni Versionate

```
V{YYYYMMDDhhmm}__{description}.sql
```

**Esempi:**
- `V202508301456__create_table_users.sql`
- `V202508301457__add_user_indexes.sql`
- `V202508301458__alter_table_posts.sql`

### Migrazioni Ripetibili

```
R__{description}.sql
```

**Esempi:**
- `R__create_user_reports_view.sql`
- `R__update_permissions_function.sql`
- `R__seed_initial_data.sql`

## 🎨 Template di Migrazione

Il generatore crea automaticamente questa struttura:

```sql
-- Migration: {DESCRIPTION}
-- Created: {ISO_TIMESTAMP}
-- Type: {Versioned|Repeatable}
-- Description: {description}

-- =====================================================
-- {DESCRIPTION}
-- =====================================================

-- TODO: Aggiungi qui le tue istruzioni SQL

-- Esempio di creazione tabella:
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

## 🛠️ Configurazione

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

## 🔍 Risoluzione dei Problemi

### Problemi Comuni

1. **Errore di connessione al DB**
   ```bash
   # Verificare che PostgreSQL sia in esecuzione
   docker ps | grep postgres
   ```

2. **Migrazione corrotta**
   ```bash
   # Riparare schema history
   pnpm run flyway:repair
   ```

3. **File SQL con errori**
   ```bash
   # Validare prima di migrare
   pnpm run flyway:validate
   ```

4. **Permessi file**
   ```bash
   # Su Windows, verificare i permessi della cartella migrations/
   ```

### Log

```bash
# Visualizzare log di Flyway
cat logs/flyway.log

# Visualizzare log in tempo reale
tail -f logs/flyway.log
```

## 📚 Risorse Aggiuntive

- [Documentazione ufficiale Flyway](https://flywaydb.org/documentation/)
- [Docker Compose per Flyway](https://flywaydb.org/documentation/usage/docker)
- [Migliori pratiche di migrazione](https://flywaydb.org/documentation/concepts/migrations)

## 🤝 Contribuzione

1. Seguire le convenzioni di nomenclatura
2. Documentare modifiche complesse nel SQL
3. Testare migrazioni localmente prima del commit
4. Usare migrazioni versionate per modifiche dello schema
5. Usare migrazioni ripetibili per viste e