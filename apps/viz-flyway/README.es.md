# 📚 Flyway Migration Generator - Guía de Instrucciones

**Languages**: 
[English](README.md) | 
[Español](README.es.md) | 
[Français](README.fr.md) | 
[Deutsch](README.de.md) | 
[Dansk](README.dk.md) | 
[Italiano](README.it.md) | 
[Português](README.pt.md)

## 🎯 Descripción del Proyecto

Este proyecto proporciona un generador automatizado de archivos de migración Flyway con un formato estandarizado `V{YYYYMMDDhhmm}__description.sql`, junto con scripts Docker para gestión de base de datos.

## 📁 Estructura del Proyecto

```
viz-flyway/
├── docker-compose.yml          # Configuración Docker para Flyway
├── flyway.conf                 # Configuración de Flyway
├── generate-migration.ts       # Script generador de migraciones
├── package.json               # Dependencias y scripts NPM
├── logs/                      # Logs de Flyway
└── migrations/                # Archivos de migración SQL
    ├── V202508240743__init.sql
    ├── V202508301425__create_table_contacts.sql
    └── R__vw_get_hero.sql
```

## 🚀 Instalación

### 1. Instalar dependencias

```bash
cd apps/viz-flyway
pnpm install
```

### 2. Configurar Docker

Asegúrate de tener Docker y Docker Compose instalados en tu sistema.

## 📝 Generación de Migraciones

### Comandos Disponibles

```bash
# Generar migración versionada (recomendado para cambios de schema)
pnpm run generate:versioned --description "create_table_users"

# Generar migración repetible (para vistas, funciones, seeds)
pnpm run generate:repeatable --description "update_user_permissions"

# Ver ayuda del generador
pnpm run generate:migration
```

### Ejemplos de Uso

```bash
# Crear una nueva tabla
pnpm run generate:versioned --description "create table posts"
# Resultado: V202508301456__create_table_posts.sql

# Agregar índices
pnpm run generate:versioned --description "add user indexes"
# Resultado: V202508301457__add_user_indexes.sql

# Actualizar una vista (repetible)
pnpm run generate:repeatable --description "update reports view"
# Resultado: R__update_reports_view.sql
```

## 🐳 Comandos Docker Flyway

### Migración y Gestión

```bash
# Ejecutar migraciones pendientes
pnpm run flyway:migrate

# Ver estado de migraciones
pnpm run flyway:info

# Validar migraciones
pnpm run flyway:validate

# Crear baseline (primera vez)
pnpm run flyway:baseline

# Reparar schema history (si hay errores)
pnpm run flyway:repair

# Deshacer última migración
pnpm run flyway:undo
```

### ⚠️ Comandos Destructivos

```bash
# LIMPIAR TODA LA BASE DE DATOS (solo desarrollo)
pnpm run flyway:clean
```

**ADVERTENCIA**: `flyway:clean` elimina TODA la base de datos. Usar solo en desarrollo.

## 📊 Base de Datos - Esquema Actual

### Tablas Principales

- **`users`** - Usuarios del sistema
- **`languages`** - Idiomas disponibles (en, es, fr, de)
- **`devices`** - Tipos de dispositivo (mobile, tablet, desktop)
- **`contact_types`** - Tipos de contacto (email, linkedin, github, etc.)
- **`contacts`** - Información de contacto de usuarios
- **`hero_greetings`** - Mensajes de bienvenida por idioma/dispositivo

### Vistas

- **`vw_get_hero`** - Vista para obtener greetings optimizada

## 🔄 Flujo de Trabajo Recomendado

### 1. Desarrollo Local

```bash
# 1. Generar nueva migración
pnpm run generate:versioned --description "add new feature"

# 2. Editar el archivo SQL generado
# Ubicación: migrations/V{timestamp}__add_new_feature.sql

# 3. Validar sintaxis
pnpm run flyway:validate

# 4. Ejecutar migración
pnpm run flyway:migrate

# 5. Verificar estado
pnpm run flyway:info
```

### 2. Manejo de Errores

```bash
# Si una migración falla:
# 1. Revisar logs
cat logs/flyway.log

# 2. Reparar schema history
pnpm run flyway:repair

# 3. Corregir el archivo SQL
# 4. Intentar de nuevo
pnpm run flyway:migrate
```

### 3. Reset Completo (Solo Desarrollo)

```bash
# ⚠️ CUIDADO: Esto elimina todo
pnpm run flyway:clean
pnpm run flyway:migrate
```

## 📋 Convenciones de Nomenclatura

### Migraciones Versionadas

```
V{YYYYMMDDhhmm}__{description}.sql
```

**Ejemplos:**
- `V202508301456__create_table_users.sql`
- `V202508301457__add_user_indexes.sql`
- `V202508301458__alter_table_posts.sql`

### Migraciones Repetibles

```
R__{description}.sql
```

**Ejemplos:**
- `R__create_user_reports_view.sql`
- `R__update_permissions_function.sql`
- `R__seed_initial_data.sql`

## 🎨 Plantilla de Migración

El generador crea automáticamente esta estructura:

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

## 🛠️ Configuración

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

### Problemas Comunes

1. **Error de conexión a BD**
   ```bash
   # Verificar que PostgreSQL esté corriendo
   docker ps | grep postgres
   ```

2. **Migración corrupta**
   ```bash
   # Reparar schema history
   pnpm run flyway:repair
   ```

3. **Archivo SQL con errores**
   ```bash
   # Validar antes de migrar
   pnpm run flyway:validate
   ```

4. **Permisos de archivo**
   ```bash
   # En Windows, verificar permisos de la carpeta migrations/
   ```

### Logs

```bash
# Ver logs de Flyway
cat logs/flyway.log

# Ver logs en tiempo real
tail -f logs/flyway.log
```

## 📚 Recursos Adicionales

- [Documentación oficial de Flyway](https://flywaydb.org/documentation/)
- [Docker Compose para Flyway](https://flywaydb.org/documentation/usage/docker)
- [Mejores prácticas de migración](https://flywaydb.org/documentation/concepts/migrations)

## 🤝 Contribución

1. Seguir las convenciones de nomenclatura
2. Documentar cambios complejos en el SQL
3. Probar migraciones localmente antes de commit
4. Usar migraciones versionadas para cambios de schema
5. Usar migraciones repetibles para vistas y funciones

---

**Autor**: Oscar Cortez  
**Proyecto**: Monorepo Portfolio  
**Última actualización**: Agosto 2025