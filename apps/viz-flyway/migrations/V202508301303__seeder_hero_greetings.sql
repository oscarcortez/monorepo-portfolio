-- Seeder: Hero greetings para diferentes idiomas y dispositivos
INSERT INTO
  hero_greetings (
    user_id,
    title,
    content,
    footer,
    language_id,
    device_id
  )
VALUES
  (
    (
      SELECT
        user_id
      FROM
        users
      WHERE
        email = 'oscarkortez@gmail.com'
    ),
    'Hi, I''m Oscar Cortez — a Software Engineer with a degree in Computer Science.',
    'I''ve worked as a Database Administrator (DBA), ETL Developer, and now I specialize in full-stack software development — from backend logic to user-facing interfaces.',
    'Thanks for stopping by — welcome to my site. 💙',
    (
      SELECT
        language_id
      FROM
        languages
      WHERE
        code = 'en'
    ),
    (
      SELECT
        device_id
      FROM
        devices
      WHERE
        code = 'desktop'
    )
  ),
  -- Inglés - Mobile
  (
    (
      SELECT
        user_id
      FROM
        users
      WHERE
        email = 'oscarkortez@gmail.com'
    ),
    'Hi, I''m Oscar Cortez',
    'Software Engineer specializing in full-stack development — from backend logic to user interfaces.',
    'Welcome to my site. 💙',
    (
      SELECT
        language_id
      FROM
        languages
      WHERE
        code = 'en'
    ),
    (
      SELECT
        device_id
      FROM
        devices
      WHERE
        code = 'mobile'
    )
  ),
  -- Español - Desktop
  (
    (
      SELECT
        user_id
      FROM
        users
      WHERE
        email = 'oscarkortez@gmail.com'
    ),
    '¡Hola, soy Oscar Cortez — Ingeniero de Software con título en Ciencias de la Computación!',
    'He trabajado como Administrador de Base de Datos (DBA), Desarrollador ETL, y ahora me especializo en desarrollo full-stack — desde lógica backend hasta interfaces de usuario.',
    'Gracias por visitarme — bienvenido a mi sitio. 💙',
    (
      SELECT
        language_id
      FROM
        languages
      WHERE
        code = 'es'
    ),
    (
      SELECT
        device_id
      FROM
        devices
      WHERE
        code = 'desktop'
    )
  ),
  -- Español - Mobile
  (
    (
      SELECT
        user_id
      FROM
        users
      WHERE
        email = 'oscarkortez@gmail.com'
    ),
    '¡Hola, soy Oscar Cortez!',
    'Ingeniero de Software especializado en desarrollo full-stack — desde backend hasta interfaces de usuario.',
    'Bienvenido a mi sitio. 💙',
    (
      SELECT
        language_id
      FROM
        languages
      WHERE
        code = 'es'
    ),
    (
      SELECT
        device_id
      FROM
        devices
      WHERE
        code = 'mobile'
    )
  ),
  -- Francés - Desktop
  (
    (
      SELECT
        user_id
      FROM
        users
      WHERE
        email = 'oscarkortez@gmail.com'
    ),
    'Salut, je suis Oscar Cortez — Ingénieur Logiciel diplômé en Informatique.',
    'J''ai travaillé comme Administrateur de Base de Données (DBA), Développeur ETL, et maintenant je me spécialise dans le développement full-stack — de la logique backend aux interfaces utilisateur.',
    'Merci de votre visite — bienvenue sur mon site. 💙',
    (
      SELECT
        language_id
      FROM
        languages
      WHERE
        code = 'fr'
    ),
    (
      SELECT
        device_id
      FROM
        devices
      WHERE
        code = 'desktop'
    )
  ),
  -- Alemán - Desktop
  (
    (
      SELECT
        user_id
      FROM
        users
      WHERE
        email = 'oscarkortez@gmail.com'
    ),
    'Hallo, ich bin Oscar Cortez — Software-Ingenieur mit Abschluss in Informatik.',
    'Ich habe als Datenbankadministrator (DBA), ETL-Entwickler gearbeitet und spezialisiere mich jetzt auf Full-Stack-Softwareentwicklung — von Backend-Logik bis zu Benutzeroberflächen.',
    'Danke für Ihren Besuch — willkommen auf meiner Website. 💙',
    (
      SELECT
        language_id
      FROM
        languages
      WHERE
        code = 'de'
    ),
    (
      SELECT
        device_id
      FROM
        devices
      WHERE
        code = 'desktop'
    )
  );