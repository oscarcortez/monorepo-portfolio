# 📚 Flyway Migration Generator - Guia de Instruções

**Languages**: 
[English](README.md) | 
[Español](README.es.md) | 
[Français](README.fr.md) | 
[Deutsch](README.de.md) | 
[Dansk](README.dk.md) | 
[Italiano](README.it.md) | 
[Português](README.pt.md)

## 🎯 Descrição do Projeto

Este projeto fornece um gerador automatizado de arquivos de migração Flyway com um formato padronizado `V{YYYYMMDDhhmm}__description.sql`, junto com scripts Docker para gerenciamento de banco de dados.

## 📁 Estrutura do Projeto

```
viz-flyway/
├── docker-compose.yml          # Configuração Docker para Flyway
├── flyway.conf                 # Configuração do Flyway
├── generate-migration.ts       # Script gerador de migrações
├── package.json               # Dependências e scripts NPM
├── logs/                      # Logs do Flyway
└── migrations/                # Arquivos de migração SQL
    ├── V202508240743__init.sql
    ├── V202508301425__create_table_contacts.sql
    └── R__vw_get_hero.sql
```

## 🚀 Instalação

### 1. Instalar dependências

```bash
cd apps/viz-flyway
pnpm install
```

### 2. Configurar Docker

Certifique-se de ter Docker e Docker Compose instalados no seu sistema.

## 📝 Geração de Migrações

### Comandos Disponíveis

```bash
# Gerar migração versionada (recomendado para mudanças de schema)
pnpm run generate:versioned --description "create_table_users"

# Gerar migração repetível (para views, funções, seeds)
pnpm run generate:repeatable --description "update_user_permissions"

# Ver ajuda do gerador
pnpm run generate:migration
```

### Exemplos de Uso

```bash
# Criar uma nova tabela
pnpm run generate:versioned --description "create table posts"
# Resultado: V202508301456__create_table_posts.sql

# Adicionar índices
pnpm run generate:versioned --description "add user indexes"
# Resultado: V202508301457__add_user_indexes.sql

# Atualizar uma view (repetível)
pnpm run generate:repeatable --description "update reports view"
# Resultado: R__update_reports_view.sql
```

## 🐳 Comandos Docker Flyway

### Migração e Gerenciamento

```bash
# Executar migrações pendentes
pnpm run flyway:migrate

# Ver status das migrações
pnpm run flyway:info

# Validar migrações
pnpm run flyway:validate

# Criar baseline (primeira vez)
pnpm run flyway:baseline

# Reparar histórico do schema (se houver erros)
pnpm run flyway:repair

# Desfazer última migração
pnpm run flyway:undo
```

### ⚠️ Comandos Destrutivos

```bash
# LIMPAR TODO O BANCO DE DADOS (apenas desenvolvimento)
pnpm run flyway:clean
```

**AVISO**: `flyway:clean` remove TODO o banco de dados. Use apenas em desenvolvimento.

## 📊 Banco de Dados - Schema Atual

### Tabelas Principais

- **`users`** - Usuários do sistema
- **`languages`** - Idiomas disponíveis (en, es, fr, de)
- **`devices`** - Tipos de dispositivo (mobile, tablet, desktop)
- **`contact_types`** - Tipos de contato (email, linkedin, github, etc.)
- **`contacts`** - Informações de contato dos usuários
- **`hero_greetings`** - Mensagens de boas-vindas por idioma/dispositivo

### Views

- **`vw_get_hero`** - View otimizada para obter saudações

## 🔄 Fluxo de Trabalho Recomendado

### 1. Desenvolvimento Local

```bash
# 1. Gerar nova migração
pnpm run generate:versioned --description "add new feature"

# 2. Editar o arquivo SQL gerado
# Localização: migrations/V{timestamp}__add_new_feature.sql

# 3. Validar sintaxe
pnpm run flyway:validate

# 4. Executar migração
pnpm run flyway:migrate

# 5. Verificar status
pnpm run flyway:info
```

### 2. Tratamento de Erros

```bash
# Se uma migração falhar:
# 1. Revisar logs
cat logs/flyway.log

# 2. Reparar histórico do schema
pnpm run flyway:repair

# 3. Corrigir o arquivo SQL
# 4. Tentar novamente
pnpm run flyway:migrate
```

### 3. Reset Completo (Apenas Desenvolvimento)

```bash
# ⚠️ CUIDADO: Isso remove tudo
pnpm run flyway:clean
pnpm run flyway:migrate
```

## 📋 Convenções de Nomenclatura

### Migrações Versionadas

```
V{YYYYMMDDhhmm}__{description}.sql
```

**Exemplos:**
- `V202508301456__create_table_users.sql`
- `V202508301457__add_user_indexes.sql`
- `V202508301458__alter_table_posts.sql`

### Migrações Repetíveis

```
R__{description}.sql
```

**Exemplos:**
- `R__create_user_reports_view.sql`
- `R__update_permissions_function.sql`
- `R__seed_initial_data.sql`

## 🎨 Template de Migração

O gerador cria automaticamente esta estrutura:

```sql
-- Migration: {DESCRIPTION}
-- Created: {ISO_TIMESTAMP}
-- Type: {Versioned|Repeatable}
-- Description: {description}

-- =====================================================
-- {DESCRIPTION}
-- =====================================================

-- TODO: Adicione suas instruções SQL aqui

-- Exemplo de criação de tabela:
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

## 🛠️ Configuração

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

## 🔍 Solução de Problemas

### Problemas Comuns

1. **Erro de conexão com BD**
   ```bash
   # Verificar se PostgreSQL está rodando
   docker ps | grep postgres
   ```

2. **Migração corrompida**
   ```bash
   # Reparar histórico do schema
   pnpm run flyway:repair
   ```

3. **Arquivo SQL com erros**
   ```bash
   # Validar antes de migrar
   pnpm run flyway:validate
   ```

4. **Permissões de arquivo**
   ```bash
   # No Windows, verificar permissões da pasta migrations/
   ```

### Logs

```bash
# Ver logs do Flyway
cat logs/flyway.log

# Ver logs em tempo real
tail -f logs/flyway.log
```

## 📚 Recursos Adicionais

- [Documentação oficial do Flyway](https://flywaydb.org/documentation/)
- [Docker Compose para Flyway](https://flywaydb.org/documentation/usage/docker)
- [Melhores práticas de migração](https://flywaydb.org/documentation/concepts/migrations)

## 🤝 Contribuição

1. Seguir as convenções de nomenclatura
2. Documentar mudanças complexas no SQL
3. Testar migrações localmente antes do commit
4. Usar migrações versionadas para mudanças de schema
5. Usar migrações repetíveis para views e funções

---

**Autor**: Oscar Cortez  
**Projeto**: Monorepo Portfolio  
**Última atualização**: Agosto 2025