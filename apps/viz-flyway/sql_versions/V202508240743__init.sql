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

DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'language_enum') THEN
    CREATE TYPE language_enum AS ENUM ('en', 'es', 'fr', 'de');
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'device_enum') THEN
    CREATE TYPE device_enum AS ENUM ('mobile', 'tablet', 'desktop');
  END IF;
END$$;

CREATE TABLE
  hero_greetings (
    hero_greeting_id SERIAL PRIMARY KEY,
    user_id INT NOT NULL,
    title TEXT NOT NULL,
    content TEXT NOT NULL,
    footer TEXT NOT NULL,
    language language_enum NOT NULL DEFAULT 'en',
    device device_enum NOT NULL DEFAULT 'desktop',
    deleted_at TIMESTAMP DEFAULT NULL,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
    CONSTRAINT fk_hero_greeting_user FOREIGN KEY (user_id) REFERENCES users (user_id)
  );