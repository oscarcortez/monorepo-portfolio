-- Seed users
INSERT INTO
  users (
    user_id,
    email,
    name,
    password_hash
  )
VALUES
  (
    1,
    'oscarkortez@gmail.com',
    'Oscar Cortez',
    'hashed_password_1'
  ),
  (
    2,
    'bob@example.com',
    'Bob',
    'hashed_password_2'
  ),
  (
    3,
    'carol@example.com',
    'Carol',
    'hashed_password_3'
  );

-- Seed hero_greetings
INSERT INTO
  hero_greetings (
    title,
    content,
    footer,
    language,
    device,
    user_id
  )
VALUES
  (
    'Hi, I’m Oscar Cortez — a Software Engineer with a degree in Computer Science.',
    'I’ve worked as a Database Administrator (DBA), ETL Developer, and now I specialize in full-stack software development — from backend logic to user-facing interfaces.',
    'Thanks for stopping by — welcome to my site. 💙',
    'en',
    'desktop',
    1
  ),
  (
    '¡Hola, soy Bob!',
    'Bienvenido a mi perfil.',
    'Gracias por tu visita.',
    'es',
    'mobile',
    2
  ),
  (
    'Bonjour, je suis Carol!',
    'Bienvenue sur mon profil.',
    'Merci de votre visite.',
    'fr',
    'desktop',
    3
  );