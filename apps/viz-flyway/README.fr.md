# 📚 Flyway Migration Generator - Guide d'Instructions

**Languages**: 
[English](README.md) | 
[Español](README.es.md) | 
[Français](README.fr.md) | 
[Deutsch](README.de.md) | 
[Dansk](README.dk.md) | 
[Italiano](README.it.md) | 
[Português](README.pt.md)

## 🎯 Description du Projet

Ce projet fournit un générateur automatisé de fichiers de migration Flyway avec un format standardisé `V{YYYYMMDDhhmm}__description.sql`, ainsi que des scripts Docker pour la gestion de base de données.

## 📁 Structure du Projet

```
viz-flyway/
├── docker-compose.yml          # Configuration Docker pour Flyway
├── flyway.conf                 # Configuration Flyway
├── generate-migration.ts       # Script générateur de migration
├── package.json               # Dépendances NPM et scripts
├── logs/                      # Logs Flyway
└── migrations/                # Fichiers de migration SQL
    ├── V202508240743__init.sql
    ├── V202508301425__create_table_contacts.sql
    └── R__vw_get_hero.sql
```

## 🚀 Installation

### 1. Installer les dépendances

```bash
cd apps/viz-flyway
pnpm install
```

### 2. Configurer Docker

Assurez-vous d'avoir Docker et Docker Compose installés sur votre système.

## 📝 Génération de Migrations

### Commandes Disponibles

```bash
# Générer une migration versionnée (recommandé pour les changements de schéma)
pnpm run generate:versioned --description "create_table_users"

# Générer une migration répétable (pour les vues, fonctions, seeds)
pnpm run generate:repeatable --description "update_user_permissions"

# Afficher l'aide du générateur
pnpm run generate:migration
```

### Exemples d'Utilisation

```bash
# Créer une nouvelle table
pnpm run generate:versioned --description "create table posts"
# Résultat: V202508301456__create_table_posts.sql

# Ajouter des index
pnpm run generate:versioned --description "add user indexes"
# Résultat: V202508301457__add_user_indexes.sql

# Mettre à jour une vue (répétable)
pnpm run generate:repeatable --description "update reports view"
# Résultat: R__update_reports_view.sql
```

## 🐳 Commandes Docker Flyway

### Migration et Gestion

```bash
# Exécuter les migrations en attente
pnpm run flyway:migrate

# Afficher le statut des migrations
pnpm run flyway:info

# Valider les migrations
pnpm run flyway:validate

# Créer une baseline (première fois)
pnpm run flyway:baseline

# Réparer l'historique du schéma (si des erreurs surviennent)
pnpm run flyway:repair

# Annuler la dernière migration
pnpm run flyway:undo
```

### ⚠️ Commandes Destructrices

```bash
# NETTOYER TOUTE LA BASE DE DONNÉES (développement uniquement)
pnpm run flyway:clean
```

**AVERTISSEMENT**: `flyway:clean` supprime TOUTE la base de données. À utiliser uniquement en développement.

## 📊 Base de Données - Schéma Actuel

### Tables Principales

- **`users`** - Utilisateurs du système
- **`languages`** - Langues disponibles (en, es, fr, de)
- **`devices`** - Types d'appareils (mobile, tablet, desktop)
- **`contact_types`** - Types de contact (email, linkedin, github, etc.)
- **`contacts`** - Informations de contact des utilisateurs
- **`hero_greetings`** - Messages de bienvenue par langue/appareil

### Vues

- **`vw_get_hero`** - Vue optimisée pour récupérer les salutations

## 🔄 Flux de Travail Recommandé

### 1. Développement Local

```bash
# 1. Générer une nouvelle migration
pnpm run generate:versioned --description "add new feature"

# 2. Éditer le fichier SQL généré
# Emplacement: migrations/V{timestamp}__add_new_feature.sql

# 3. Valider la syntaxe
pnpm run flyway:validate

# 4. Exécuter la migration
pnpm run flyway:migrate

# 5. Vérifier le statut
pnpm run flyway:info
```

### 2. Gestion des Erreurs

```bash
# Si une migration échoue:
# 1. Examiner les logs
cat logs/flyway.log

# 2. Réparer l'historique du schéma
pnpm run flyway:repair

# 3. Corriger le fichier SQL
# 4. Réessayer
pnpm run flyway:migrate
```

### 3. Réinitialisation Complète (Développement Uniquement)

```bash
# ⚠️ ATTENTION: Ceci supprime tout
pnpm run flyway:clean
pnpm run flyway:migrate
```

## 📋 Conventions de Nommage

### Migrations Versionnées

```
V{YYYYMMDDhhmm}__{description}.sql
```

**Exemples:**
- `V202508301456__create_table_users.sql`
- `V202508301457__add_user_indexes.sql`
- `V202508301458__alter_table_posts.sql`

### Migrations Répétables

```
R__{description}.sql
```

**Exemples:**
- `R__create_user_reports_view.sql`
- `R__update_permissions_function.sql`
- `R__seed_initial_data.sql`

## 🎨 Modèle de Migration

Le générateur crée automatiquement cette structure:

```sql
-- Migration: {DESCRIPTION}
-- Created: {ISO_TIMESTAMP}
-- Type: {Versioned|Repeatable}
-- Description: {description}

-- =====================================================
-- {DESCRIPTION}
-- =====================================================

-- TODO: Ajoutez vos instructions SQL ici

-- Exemple de création de table:
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

## 🔍 Dépannage

### Problèmes Courants

1. **Erreur de connexion à la base de données**
   ```bash
   # Vérifier que PostgreSQL fonctionne
   docker ps | grep postgres
   ```

2. **Migration corrompue**
   ```bash
   # Réparer l'historique du schéma
   pnpm run flyway:repair
   ```

3. **Fichier SQL avec erreurs**
   ```bash
   # Valider avant de migrer
   pnpm run flyway:validate
   ```

4. **Permissions de fichier**
   ```bash
   # Sur Windows, vérifier les permissions du dossier migrations/
   ```

### Logs

```bash
# Afficher les logs Flyway
cat logs/flyway.log

# Afficher les logs en temps réel
tail -f logs/flyway.log
```

## 📚 Ressources Supplémentaires

- [Documentation Officielle Flyway](https://flywaydb.org/documentation/)
- [Docker Compose pour Flyway](https://flywaydb.org/documentation/usage/docker)
- [Meilleures Pratiques de Migration](https://flywaydb.org/documentation/concepts/migrations)

## 🤝 Contribution

1. Suivre les conventions de nommage
2. Documenter les changements complexes dans SQL
3. Tester les migrations localement avant commit
4. Utiliser les migrations versionnées pour les changements de schéma
5. Utiliser les migrations répétables pour les vues et fonctions

---

**Auteur**: Oscar Cortez  
**Projet**: Monorepo Portfolio  
**Dernière Mise à Jour**: Août 2025