-- Migration: CREATE TABLE CONTACTS
-- Created: 2025-08-30T18:25:43.392Z
-- Type: Versioned
-- Description: create table contacts
-- =====================================================
-- CREATE TABLE CONTACTS
-- =====================================================
CREATE TABLE
  contact_types (
    contact_type_id SERIAL PRIMARY KEY,
    uuid UUID NOT NULL DEFAULT gen_random_uuid () UNIQUE,
    code VARCHAR(50) NOT NULL UNIQUE,
    name VARCHAR(100) NOT NULL,
    description TEXT,
    icon_class VARCHAR(100), -- Para clases CSS de iconos
    icon_path VARCHAR(255), -- Para rutas de archivos de iconos
    color VARCHAR(7), -- Color hexadecimal
    bg_color VARCHAR(7), -- Color de fondo
    sort_order INTEGER DEFAULT 0,
    deleted_at TIMESTAMP WITH TIME ZONE NULL,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP
  );

CREATE INDEX idx_contact_types_code ON contact_types (code);

CREATE INDEX idx_contact_types_sort ON contact_types (sort_order);

CREATE INDEX idx_contact_types_deleted_at ON contact_types (deleted_at);

CREATE INDEX idx_contact_types_uuid ON contact_types (uuid);

-- Tabla principal de contactos
CREATE TABLE
  contacts (
    contact_id SERIAL PRIMARY KEY,
    user_id INT NOT NULL,
    uuid UUID NOT NULL DEFAULT gen_random_uuid () UNIQUE, -- ← Cambié UNIQUE DEFAULT por NOT NULL DEFAULT y UNIQUE separado
    link VARCHAR(500) NOT NULL, -- ← Aumenté longitud para URLs largas
    contact_type_id INT NOT NULL,
    title VARCHAR(100) NOT NULL,
    icon_path VARCHAR(255),
    display_text VARCHAR(255),
    sort_order INT NOT NULL DEFAULT 0,
    deleted_at TIMESTAMP WITH TIME ZONE NULL,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_contacts_user FOREIGN KEY (user_id) REFERENCES users (user_id),
    CONSTRAINT fk_contacts_contact_type FOREIGN KEY (contact_type_id) REFERENCES contact_types (contact_type_id)
  );

-- Índices para contacts
CREATE INDEX idx_contacts_user_id ON contacts (user_id);

CREATE INDEX idx_contacts_contact_type_id ON contacts (contact_type_id);

CREATE INDEX idx_contacts_uuid ON contacts (uuid);

CREATE INDEX idx_contacts_deleted_at ON contacts (deleted_at);

CREATE INDEX idx_contacts_sort_order ON contacts (sort_order);