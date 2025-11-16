INSERT INTO
  "public"."payment_sources" (
    "name",
    "type",
    "code",
    "logo_path",
    "website",
    "country_code",
    "metadata"
  )
VALUES
  (
    'Banco Económico',
    'BANK',
    'BE',
    '/svg/banco-economico.svg',
    'https://www.bancoeconomico.com.bo',
    'BO',
    '{"swift":"BECBBOB0"}'
  ),
  (
    'BNB',
    'CRYPTO',
    'BNB',
    '/svg/bnb.svg',
    'https://www.bnb.com.bo/',
    'BO',
    '{"network":"bnb","example_address":"bnb1..."}'
  ),
  (
    'Binance',
    'CRYPTO',
    'BINANCE',
    '/svg/binance.svg',
    'https://www.binance.com',
    NULL,
    '{"exchange": true, "supports_deposits": true}'
  ),
  (
    'Meru PSP',
    'PSP',
    'MERU',
    '/svg/meru.svg',
    'https://www.meru.com',
    'BO',
    '{"provider":"Meru","notes":"local PSP"}'
  );

WITH
  user_insert AS (
    INSERT INTO
      users (
        email,
        name,
        password_hash,
        created_at,
        updated_at
      )
    VALUES
      (
        'oscarkortez@gmail.com',
        'Oscar Cortez',
        '$2b$10$dummy.hash.for.initial.user', -- Cambia esto por un hash real
        NOW(),
        NOW()
      )
    RETURNING
      user_id,
      uuid
  ),
  contact_inserts AS (
    INSERT INTO
      contacts (
        user_id,
        link,
        type,
        title,
        icon_path,
        display_text,
        sort_order,
        created_at
      )
    SELECT
      ui.user_id,
      contact_data.link,
      contact_data.type::contact_type,
      contact_data.title,
      contact_data.icon_path,
      contact_data.display_text,
      contact_data.sort_order,
      NOW()
    FROM
      user_insert ui,
      (
        VALUES
          (
            'mailto:oscarkortez@gmail.com',
            'EMAIL',
            'Email',
            '/icons/email.svg',
            'oscarkortez@gmail.com',
            1
          ),
          (
            'https://linkedin.com/in/oscarkortez',
            'LINKEDIN',
            'LinkedIn',
            '/icons/linkedin.svg',
            'Oscar Cortez',
            2
          ),
          (
            'https://github.com/oscarkortez',
            'GITHUB',
            'GitHub',
            '/icons/github.svg',
            '@oscarkortez',
            3
          ),
          (
            'tel:+1234567890',
            'PHONE',
            'Phone',
            '/icons/phone.svg',
            '+1 (234) 567-890',
            4
          )
      ) AS contact_data (
        link,
        type,
        title,
        icon_path,
        display_text,
        sort_order
      )
    RETURNING
      contact_id,
      user_id
  ),
  hero_greeting_inserts AS (
    INSERT INTO
      hero_greetings (
        user_id,
        title,
        content,
        footer,
        language,
        device,
        created_at
      )
    SELECT
      ui.user_id,
      greeting_data.title,
      greeting_data.content,
      greeting_data.footer,
      greeting_data.language::language_code,
      greeting_data.device::device_type,
      NOW()
    FROM
      user_insert ui,
      (
        VALUES
          -- Spanish greetings
          (
            '¡Hola! Soy Oscar',
            'Desarrollador Full-Stack apasionado por crear soluciones innovadoras',
            'Construyendo el futuro, una línea de código a la vez',
            'ES',
            'DESKTOP'
          ),
          (
            '¡Hola! Soy Oscar',
            'Full-Stack Developer',
            'Innovación y código',
            'ES',
            'MOBILE'
          ),
          -- English greetings
          (
            'Hello! I''m Oscar',
            'Full-Stack Developer passionate about creating innovative solutions',
            'Building the future, one line of code at a time',
            'EN',
            'DESKTOP'
          ),
          (
            'Hi! I''m Oscar',
            'Full-Stack Dev',
            'Innovation & Code',
            'EN',
            'MOBILE'
          ),
          -- Portuguese greetings
          (
            'Olá! Eu sou Oscar',
            'Desenvolvedor Full-Stack apaixonado por criar soluções inovadoras',
            'Construindo o futuro, uma linha de código por vez',
            'PT',
            'DESKTOP'
          ),
          (
            'Oi! Sou Oscar',
            'Dev Full-Stack',
            'Inovação e Código',
            'PT',
            'MOBILE'
          ),
          -- French greetings
          (
            'Salut! Je suis Oscar',
            'Développeur Full-Stack passionné par la création de solutions innovantes',
            'Construire l''avenir, une ligne de code à la fois',
            'FR',
            'DESKTOP'
          ),
          (
            'Salut! Oscar',
            'Dev Full-Stack',
            'Innovation & Code',
            'FR',
            'MOBILE'
          )
      ) AS greeting_data (
        title,
        content,
        footer,
        language,
        device
      )
    RETURNING
      hero_greeting_id,
      user_id
  ),
  nav_link_inserts AS (
    INSERT INTO
      nav_links (
        user_id,
        content,
        language,
        class_name,
        url,
        sort_order,
        created_at,
        updated_at
      )
    SELECT
      ui.user_id,
      nav_data.content,
      nav_data.language::language_code,
      nav_data.class_name,
      nav_data.url,
      nav_data.sort_order,
      NOW(),
      NOW()
    FROM
      user_insert ui,
      (
        VALUES
          -- Spanish navigation
          (
            'Inicio',
            'ES',
            'nav-link',
            '#home',
            1
          ),
          (
            'Acerca de',
            'ES',
            'nav-link',
            '#about',
            2
          ),
          (
            'Proyectos',
            'ES',
            'nav-link',
            '#projects',
            3
          ),
          (
            'Experiencia',
            'ES',
            'nav-link',
            '#experience',
            4
          ),
          (
            'Contacto',
            'ES',
            'nav-link',
            '#contact',
            5
          ),
          -- English navigation
          (
            'Home',
            'EN',
            'nav-link',
            '#home',
            1
          ),
          (
            'About',
            'EN',
            'nav-link',
            '#about',
            2
          ),
          (
            'Projects',
            'EN',
            'nav-link',
            '#projects',
            3
          ),
          (
            'Experience',
            'EN',
            'nav-link',
            '#experience',
            4
          ),
          (
            'Contact',
            'EN',
            'nav-link',
            '#contact',
            5
          ),
          -- Portuguese navigation
          (
            'Início',
            'PT',
            'nav-link',
            '#home',
            1
          ),
          (
            'Sobre',
            'PT',
            'nav-link',
            '#about',
            2
          ),
          (
            'Projetos',
            'PT',
            'nav-link',
            '#projects',
            3
          ),
          (
            'Experiência',
            'PT',
            'nav-link',
            '#experience',
            4
          ),
          (
            'Contato',
            'PT',
            'nav-link',
            '#contact',
            5
          ),
          -- French navigation
          (
            'Accueil',
            'FR',
            'nav-link',
            '#home',
            1
          ),
          (
            'À propos',
            'FR',
            'nav-link',
            '#about',
            2
          ),
          (
            'Projets',
            'FR',
            'nav-link',
            '#projects',
            3
          ),
          (
            'Expérience',
            'FR',
            'nav-link',
            '#experience',
            4
          ),
          (
            'Contact',
            'FR',
            'nav-link',
            '#contact',
            5
          )
      ) AS nav_data (
        content,
        language,
        class_name,
        url,
        sort_order
      )
    RETURNING
      nav_link_id,
      user_id
  )
SELECT
  1 as migration_complete;

INSERT INTO
  "public"."payments" (
    user_id,
    title,
    display_text,
    link,
    class_name,
    is_favorite,
    sort_order,
    payment_source_id
  )
VALUES
  (
    1,
    'BNB',
    'Pagos Varios',
    'https://www.bnb.com.bo/',
    'bg-slate-700',
    FALSE,
    2,
    1
  ),
  (
    1,
    'Banco Economico',
    'Pagos Varios',
    'https://www.bcp.com.bo/',
    'bg-slate-800',
    TRUE,
    1,
    2
  ),
  (
    1,
    'Binance',
    'Pagos Varios',
    'https://www.binance.com/',
    'bg-slate-800',
    FALSE,
    3,
    3
  );