CREATE TABLE
  users (
    user_id SERIAL PRIMARY KEY,
    uuid UUID NOT NULL UNIQUE DEFAULT gen_random_uuid (),
    email VARCHAR(100) NOT NULL UNIQUE,
    name VARCHAR(100) NOT NULL,
    password_hash TEXT NOT NULL,
    deleted_at TIMESTAMP DEFAULT NULL,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW()
  );

CREATE TABLE
  languages (
    language_id SERIAL PRIMARY KEY,
    uuid UUID NOT NULL DEFAULT gen_random_uuid () UNIQUE,
    code VARCHAR(5) NOT NULL UNIQUE, -- 'en', 'es', 'fr', 'de'
    name VARCHAR(100) NOT NULL, -- 'English', 'Español', etc.
    native_name VARCHAR(100) NOT NULL, -- 'English', 'Español', 'Français', 'Deutsch'
    iso_639_1 VARCHAR(2) NOT NULL, -- Código ISO estándar
    flag_emoji VARCHAR(10), -- 🇺🇸, 🇪🇸, 🇫🇷, 🇩🇪
    flag_icon_path VARCHAR(255), -- Ruta a iconos de banderas
    is_active BOOLEAN DEFAULT true,
    is_default BOOLEAN DEFAULT false,
    sort_order INTEGER DEFAULT 0,
    deleted_at TIMESTAMP WITH TIME ZONE NULL,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP
  );

CREATE TABLE
  devices (
    device_id SERIAL PRIMARY KEY,
    uuid UUID NOT NULL DEFAULT gen_random_uuid () UNIQUE,
    code VARCHAR(20) NOT NULL UNIQUE, -- 'mobile', 'tablet', 'desktop'
    name VARCHAR(100) NOT NULL, -- 'Mobile', 'Tablet', 'Desktop'
    description TEXT, -- Descripción del dispositivo
    icon_class VARCHAR(100), -- Clase CSS para iconos
    icon_path VARCHAR(255), -- Ruta a iconos
    min_width INTEGER, -- Ancho mínimo en px
    max_width INTEGER, -- Ancho máximo en px
    breakpoint VARCHAR(50), -- Breakpoint CSS (sm, md, lg, xl)
    is_active BOOLEAN DEFAULT true,
    sort_order INTEGER DEFAULT 0,
    deleted_at TIMESTAMP WITH TIME ZONE NULL,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP
  );

CREATE TABLE
  hero_greetings (
    hero_greeting_id SERIAL PRIMARY KEY,
    uuid UUID NOT NULL UNIQUE DEFAULT gen_random_uuid (),
    user_id INT NOT NULL,
    title TEXT NOT NULL,
    content TEXT NOT NULL,
    footer TEXT NOT NULL,
    language_id INT NOT NULL,
    device_id INT NOT NULL,
    deleted_at TIMESTAMP DEFAULT NULL,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
    CONSTRAINT fk_hero_greeting_user FOREIGN KEY (user_id) REFERENCES users (user_id),
    CONSTRAINT fk_hero_greeting_language FOREIGN KEY (language_id) REFERENCES languages (language_id),
    CONSTRAINT fk_hero_greeting_device FOREIGN KEY (device_id) REFERENCES devices (device_id)
  );

INSERT INTO
  languages (
    code,
    name,
    native_name,
    iso_639_1,
    flag_emoji,
    flag_icon_path,
    is_default,
    sort_order
  )
VALUES
  (
    'en',
    'English',
    'English',
    'en',
    '🇺🇸',
    '/flags/us.svg',
    true,
    1
  ),
  (
    'es',
    'Spanish',
    'Español',
    'es',
    '🇪🇸',
    '/flags/es.svg',
    false,
    2
  ),
  (
    'fr',
    'French',
    'Français',
    'fr',
    '🇫🇷',
    '/flags/fr.svg',
    false,
    3
  ),
  (
    'de',
    'German',
    'Deutsch',
    'de',
    '🇩🇪',
    '/flags/de.svg',
    false,
    4
  );

-- =====================================================
-- DATOS INICIALES PARA DEVICES
-- =====================================================
INSERT INTO
  devices (
    code,
    name,
    description,
    icon_class,
    icon_path,
    min_width,
    max_width,
    breakpoint,
    sort_order
  )
VALUES
  (
    'mobile',
    'Mobile',
    'Dispositivos móviles y smartphones',
    'fas fa-mobile-alt',
    '/icons/mobile.svg',
    0,
    767,
    'sm',
    1
  ),
  (
    'tablet',
    'Tablet',
    'Tablets y dispositivos medianos',
    'fas fa-tablet-alt',
    '/icons/tablet.svg',
    768,
    1023,
    'md',
    2
  ),
  (
    'desktop',
    'Desktop',
    'Computadoras de escritorio y laptops',
    'fas fa-desktop',
    '/icons/desktop.svg',
    1024,
    NULL,
    'lg',
    3
  );