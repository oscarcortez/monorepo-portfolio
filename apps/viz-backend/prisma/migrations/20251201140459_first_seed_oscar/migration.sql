-- ============================================
-- 1. INSERT PAYMENT SOURCES
-- ============================================
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

-- ============================================
-- 2. INSERT USER WITH ALL RELATED DATA
-- ============================================
WITH
  user_insert AS (
    INSERT INTO
      users (
        email,
        username,
        first_name,
        last_name,
        picture,
        provider,
        password_hash,
        created_at,
        updated_at
      )
    VALUES
      (
        'oscarkortez@gmail.com',
        'oscarkortez',
        'Oscar',
        'Cortez',
        '',
        'google',
        '$2b$10$aEANhDHiHtSD1JZI3NXC8uI7XpG75Gc3IPzOA58eWEGni6kc3cbFm',
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
            'Hi, I''m Oscar Cortez — a Software Engineer with a degree in Computer Science.',
            'I''ve worked as a Database Administrator (DBA), ETL Developer, and now I specialize in full-stack software development — from backend logic to user-facing interfaces',
            'Thanks for stopping by — welcome to my professional site. 💙',
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
          -- English navigation
          (
            'Skills',
            'EN',
            'nav-link',
            'skills',
            4
          ),
          (
            'Contacts',
            'EN',
            'nav-link',
            'contacts',
            2
          ),
          (
            'Home',
            'EN',
            'nav-link',
            'hero',
            1
          ),
          (
            'AI Builder',
            'EN',
            'nav-link',
            'ai-builder',
            3
          ),
          (
            'Footer',
            'EN',
            'nav-link',
            'footer',
            7
          ),
          (
            'Payments',
            'EN',
            'nav-link',
            'payments',
            6
          ),
          (
            'Resume',
            'EN',
            'nav-link',
            'resume',
            5
          ),
          -- Spanish navigation
          (
            'Habilidades',
            'ES',
            'nav-link',
            'skills',
            4
          ),
          (
            'Contactos',
            'ES',
            'nav-link',
            'contacts',
            2
          ),
          (
            'Inicio',
            'ES',
            'nav-link',
            'hero',
            1
          ),
          (
            'Constructor IA',
            'ES',
            'nav-link',
            'ai-builder',
            3
          ),
          (
            'Pie de página',
            'ES',
            'nav-link',
            'footer',
            7
          ),
          (
            'Pagos',
            'ES',
            'nav-link',
            'payments',
            6
          ),
          (
            'Currículum',
            'ES',
            'nav-link',
            'resume',
            5
          ),
          -- Portuguese navigation
          (
            'Habilidades',
            'PT',
            'nav-link',
            'skills',
            4
          ),
          (
            'Contatos',
            'PT',
            'nav-link',
            'contacts',
            2
          ),
          (
            'Início',
            'PT',
            'nav-link',
            'hero',
            1
          ),
          (
            'Construtor IA',
            'PT',
            'nav-link',
            'ai-builder',
            3
          ),
          (
            'Rodapé',
            'PT',
            'nav-link',
            'footer',
            7
          ),
          (
            'Pagamentos',
            'PT',
            'nav-link',
            'payments',
            6
          ),
          (
            'Currículo',
            'PT',
            'nav-link',
            'resume',
            5
          ),
          -- French navigation
          (
            'Compétences',
            'FR',
            'nav-link',
            'skills',
            4
          ),
          (
            'Contacts',
            'FR',
            'nav-link',
            'contacts',
            2
          ),
          (
            'Accueil',
            'FR',
            'nav-link',
            'hero',
            1
          ),
          (
            'Constructeur IA',
            'FR',
            'nav-link',
            'ai-builder',
            3
          ),
          (
            'Pied de page',
            'FR',
            'nav-link',
            'footer',
            7
          ),
          (
            'Paiements',
            'FR',
            'nav-link',
            'payments',
            6
          ),
          (
            'CV',
            'FR',
            'nav-link',
            'resume',
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
  ),
  payment_inserts AS (
    INSERT INTO
      payments (
        user_id,
        payment_source_id,
        title,
        display_text,
        link,
        class_name,
        is_favorite,
        sort_order,
        created_at
      )
    SELECT
      ui.user_id,
      payment_data.payment_source_id,
      payment_data.title,
      payment_data.display_text,
      payment_data.link,
      payment_data.class_name,
      payment_data.is_favorite,
      payment_data.sort_order,
      NOW()
    FROM
      user_insert ui,
      (
        VALUES
          (
            1,
            'Banco Economico',
            'Pagos Varios',
            'https://www.bancoeconomico.com.bo/',
            'bg-slate-800',
            TRUE,
            1
          ),
          (
            2,
            'BNB',
            'Pagos Varios',
            'https://www.bnb.com.bo/',
            'bg-slate-700',
            FALSE,
            2
          ),
          (
            3,
            'Binance',
            'Pagos Varios',
            'https://www.binance.com/',
            'bg-slate-800',
            FALSE,
            3
          ),
          (
            4,
            'Meru PSP',
            'Pagos con Meru',
            'https://www.meru.com/',
            'bg-blue-600',
            FALSE,
            4
          )
      ) AS payment_data (
        payment_source_id,
        title,
        display_text,
        link,
        class_name,
        is_favorite,
        sort_order
      )
    RETURNING
      payment_id,
      user_id
  )
SELECT
  (
    SELECT
      COUNT(*)
    FROM
      contact_inserts
  ) as contacts_created,
  (
    SELECT
      COUNT(*)
    FROM
      hero_greeting_inserts
  ) as hero_greetings_created,
  (
    SELECT
      COUNT(*)
    FROM
      nav_link_inserts
  ) as nav_links_created,
  (
    SELECT
      COUNT(*)
    FROM
      payment_inserts
  ) as payments_created;