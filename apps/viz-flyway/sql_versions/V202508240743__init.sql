CREATE TABLE
  user(
    user_id SERIAL PRIMARY KEY,
    uuid UUID NOT NULL UNIQUE DEFAULT gen_random_uuid (),
    email VARCHAR(100) NOT NULL UNIQUE,
    name VARCHAR(100) NOT NULL,
    password_hash TEXT NOT NULL,
    deleted_at TIMESTAMP,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW()
  );

DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'language_enum') THEN
    CREATE TYPE language_enum AS ENUM ('en', 'es', 'fr', 'de');
  END IF;
END$$;

CREATE TABLE
  hero_greeting (
    hero_greeting_id SERIAL PRIMARY KEY,
    user_id INT NOT NULL,
    title TEXT NOT NULL,
    subtitle TEXT NOT NULL,
    footer TEXT NOT NULL,
    language language_enum NOT NULL DEFAULT 'en',
    CONSTRAINT fk_hero_greeting_user FOREIGN KEY (user_id) REFERENCES users (user_id)
  );