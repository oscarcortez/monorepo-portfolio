INSERT INTO
  public.users (
    "uuid",
    email,
    username,
    first_name,
    last_name,
    picture,
    provider,
    password_hash,
    deleted_at,
    created_at,
    updated_at
  )
VALUES
  (
    '59be8793-a4a6-4ec5-ba02-d7181b241c1b'::uuid,
    'oscarkortez@gmail.com',
    'oscarkortez',
    'Oscar',
    'Cortez',
    '',
    'google',
    '$2b$10$aEANhDHiHtSD1JZI3NXC8uI7XpG75Gc3IPzOA58eWEGni6kc3cbFm',
    NULL,
    '2025-12-01 14:14:07.829414+00',
    '2025-12-01 14:14:07.829414+00'
  );

INSERT INTO
  public.payment_sources (
    "uuid",
    "name",
    "type",
    code,
    logo_path,
    website,
    country_code,
    metadata,
    deleted_at,
    created_at,
    updated_at
  )
VALUES
  (
    '522b6390-ab0d-4fde-a9f9-45555f4b20b7'::uuid,
    'Banco Económico',
    'BANK'::public."payment_source_type",
    'BE',
    '/svg/banco-economico.svg',
    'https://www.bancoeconomico.com.bo',
    'BO',
    '{"swift": "BECBBOB0"}',
    NULL,
    '2025-12-01 14:14:07.829',
    NULL
  ),
  (
    '587d5b4c-b503-4e3d-a737-1359cf952425'::uuid,
    'Binance',
    'CRYPTO'::public."payment_source_type",
    'BINANCE',
    '/svg/binance.svg',
    'https://www.binance.com',
    NULL,
    '{"exchange": true, "supports_deposits": true}',
    NULL,
    '2025-12-01 14:14:07.829',
    NULL
  ),
  (
    'f5510053-aee0-4780-9bc4-b10e9c05788f'::uuid,
    'BNB',
    'QR'::public."payment_source_type",
    'BNB',
    '/svg/bnb.svg',
    'https://www.bnb.com.bo/',
    'BO',
    '{"network": "bnb", "example_address": "bnb1..."}',
    NULL,
    '2025-12-01 14:14:07.829',
    NULL
  ),
  (
    '6a1da12f-a30a-426a-b695-fe310a687635'::uuid,
    'AirTM',
    'AIRTM'::public."payment_source_type",
    'MERU',
    '/svg/meru.svg',
    'https://www.meru.com',
    'BO',
    '{"notes": "local PSP", "provider": "Meru"}',
    NULL,
    '2025-12-01 14:14:07.829',
    NULL
  );

INSERT INTO
  public.nav_links (
    user_id,
    "uuid",
    "content",
    "language",
    class_name,
    url,
    sort_order,
    deleted_at,
    created_at,
    updated_at
  )
VALUES
  (
    1,
    'e6cb9b14-23d9-4a58-b412-5ae22ec7ba7f'::uuid,
    'Skills',
    'EN'::public."language_code",
    'nav-link',
    'skills',
    4,
    NULL,
    '2025-12-01 10:14:07.829',
    '2025-12-01 10:14:07.829'
  ),
  (
    1,
    'a279b9ff-c0e6-4a17-96ce-513fa8aef16f'::uuid,
    'Contacts',
    'EN'::public."language_code",
    'nav-link',
    'contacts',
    2,
    NULL,
    '2025-12-01 10:14:07.829',
    '2025-12-01 10:14:07.829'
  ),
  (
    1,
    '912af4f3-42ef-4644-9bb1-69f98094cac3'::uuid,
    'Home',
    'EN'::public."language_code",
    'nav-link',
    'hero',
    1,
    NULL,
    '2025-12-01 10:14:07.829',
    '2025-12-01 10:14:07.829'
  ),
  (
    1,
    '55d6a676-8d91-4e11-be79-7626f7d632bb'::uuid,
    'Payments',
    'EN'::public."language_code",
    'nav-link',
    'payments',
    6,
    NULL,
    '2025-12-01 10:14:07.829',
    '2025-12-01 10:14:07.829'
  ),
  (
    1,
    '51133d18-f446-4437-a2de-6ed7388ac7c4'::uuid,
    'Resume',
    'EN'::public."language_code",
    'nav-link',
    'resume',
    5,
    NULL,
    '2025-12-01 10:14:07.829',
    '2025-12-01 10:14:07.829'
  ),
  (
    1,
    '7dbbfba6-f65d-4964-b89b-6ff5be28071a'::uuid,
    'Habilidades',
    'ES'::public."language_code",
    'nav-link',
    'skills',
    4,
    NULL,
    '2025-12-01 10:14:07.829',
    '2025-12-01 10:14:07.829'
  ),
  (
    1,
    'e518f35c-27ac-48cc-a716-1ae78e59ee2e'::uuid,
    'Contactos',
    'ES'::public."language_code",
    'nav-link',
    'contacts',
    2,
    NULL,
    '2025-12-01 10:14:07.829',
    '2025-12-01 10:14:07.829'
  ),
  (
    1,
    '9f044605-fc09-4259-9197-4462b40b6879'::uuid,
    'Inicio',
    'ES'::public."language_code",
    'nav-link',
    'hero',
    1,
    NULL,
    '2025-12-01 10:14:07.829',
    '2025-12-01 10:14:07.829'
  ),
  (
    1,
    '8ac86ebe-712e-4083-b5b6-fdc78dcdf540'::uuid,
    'Constructor IA',
    'ES'::public."language_code",
    'nav-link',
    'ai-builder',
    3,
    NULL,
    '2025-12-01 10:14:07.829',
    '2025-12-01 10:14:07.829'
  ),
  (
    1,
    'd203b966-4f49-4c78-bf26-b663a8e574c2'::uuid,
    'Pie de página',
    'ES'::public."language_code",
    'nav-link',
    'footer',
    7,
    NULL,
    '2025-12-01 10:14:07.829',
    '2025-12-01 10:14:07.829'
  );

INSERT INTO
  public.nav_links (
    user_id,
    "uuid",
    "content",
    "language",
    class_name,
    url,
    sort_order,
    deleted_at,
    created_at,
    updated_at
  )
VALUES
  (
    1,
    '16341996-1f5d-4680-937c-f7a4e6d05141'::uuid,
    'Pagos',
    'ES'::public."language_code",
    'nav-link',
    'payments',
    6,
    NULL,
    '2025-12-01 10:14:07.829',
    '2025-12-01 10:14:07.829'
  ),
  (
    1,
    '317d75e1-9bd1-430c-89a3-8266d0260ab3'::uuid,
    'Currículum',
    'ES'::public."language_code",
    'nav-link',
    'resume',
    5,
    NULL,
    '2025-12-01 10:14:07.829',
    '2025-12-01 10:14:07.829'
  ),
  (
    1,
    '3c9f7443-581d-44d2-bb16-6fcac8ae60bf'::uuid,
    'Habilidades',
    'PT'::public."language_code",
    'nav-link',
    'skills',
    4,
    NULL,
    '2025-12-01 10:14:07.829',
    '2025-12-01 10:14:07.829'
  ),
  (
    1,
    '7992bf5a-c8a3-4215-b2e0-b1f709e52a42'::uuid,
    'Contatos',
    'PT'::public."language_code",
    'nav-link',
    'contacts',
    2,
    NULL,
    '2025-12-01 10:14:07.829',
    '2025-12-01 10:14:07.829'
  ),
  (
    1,
    '1fa3de98-cc86-4dd0-ae84-49c6c9809807'::uuid,
    'Início',
    'PT'::public."language_code",
    'nav-link',
    'hero',
    1,
    NULL,
    '2025-12-01 10:14:07.829',
    '2025-12-01 10:14:07.829'
  ),
  (
    1,
    '81300fd8-71ba-47e0-b802-31e150f46fed'::uuid,
    'Construtor IA',
    'PT'::public."language_code",
    'nav-link',
    'ai-builder',
    3,
    NULL,
    '2025-12-01 10:14:07.829',
    '2025-12-01 10:14:07.829'
  ),
  (
    1,
    'c396ca13-4362-48fc-9436-21fc5844e9ad'::uuid,
    'Rodapé',
    'PT'::public."language_code",
    'nav-link',
    'footer',
    7,
    NULL,
    '2025-12-01 10:14:07.829',
    '2025-12-01 10:14:07.829'
  ),
  (
    1,
    '22cea8e0-85f4-4fff-b418-268b7b363fc4'::uuid,
    'Pagamentos',
    'PT'::public."language_code",
    'nav-link',
    'payments',
    6,
    NULL,
    '2025-12-01 10:14:07.829',
    '2025-12-01 10:14:07.829'
  ),
  (
    1,
    'd6a8ad00-1a08-4b01-9a73-2ca4ce7461c4'::uuid,
    'Currículo',
    'PT'::public."language_code",
    'nav-link',
    'resume',
    5,
    NULL,
    '2025-12-01 10:14:07.829',
    '2025-12-01 10:14:07.829'
  ),
  (
    1,
    '8fd99720-047e-46b3-861f-8749a7f34c8b'::uuid,
    'Compétences',
    'FR'::public."language_code",
    'nav-link',
    'skills',
    4,
    NULL,
    '2025-12-01 10:14:07.829',
    '2025-12-01 10:14:07.829'
  );

INSERT INTO
  public.nav_links (
    user_id,
    "uuid",
    "content",
    "language",
    class_name,
    url,
    sort_order,
    deleted_at,
    created_at,
    updated_at
  )
VALUES
  (
    1,
    '2f585670-47ec-4257-9840-312c9a68583c'::uuid,
    'Contacts',
    'FR'::public."language_code",
    'nav-link',
    'contacts',
    2,
    NULL,
    '2025-12-01 10:14:07.829',
    '2025-12-01 10:14:07.829'
  ),
  (
    1,
    '7bcb4015-4d2e-4df9-a8c8-f501ef2b1e52'::uuid,
    'Accueil',
    'FR'::public."language_code",
    'nav-link',
    'hero',
    1,
    NULL,
    '2025-12-01 10:14:07.829',
    '2025-12-01 10:14:07.829'
  ),
  (
    1,
    'e1b6fcdf-fbc8-4ca9-9172-f34d14378175'::uuid,
    'Constructeur IA',
    'FR'::public."language_code",
    'nav-link',
    'ai-builder',
    3,
    NULL,
    '2025-12-01 10:14:07.829',
    '2025-12-01 10:14:07.829'
  ),
  (
    1,
    'a7975d22-267e-4ef9-a195-11a80ee41bc1'::uuid,
    'Pied de page',
    'FR'::public."language_code",
    'nav-link',
    'footer',
    7,
    NULL,
    '2025-12-01 10:14:07.829',
    '2025-12-01 10:14:07.829'
  ),
  (
    1,
    'adb62c8f-a27b-44e7-b4f6-513b9938ecd2'::uuid,
    'Paiements',
    'FR'::public."language_code",
    'nav-link',
    'payments',
    6,
    NULL,
    '2025-12-01 10:14:07.829',
    '2025-12-01 10:14:07.829'
  ),
  (
    1,
    '815c946a-a401-4783-94f7-8b5396565802'::uuid,
    'CV',
    'FR'::public."language_code",
    'nav-link',
    'resume',
    5,
    NULL,
    '2025-12-01 10:14:07.829',
    '2025-12-01 10:14:07.829'
  ),
  (
    1,
    '298e7b64-c72c-4292-902c-5ddcb89fe5b1'::uuid,
    'AI Builder',
    'EN'::public."language_code",
    'nav-link',
    'ai-builder',
    3,
    '2025-12-01 10:14:07.829',
    '2025-12-01 10:14:07.829',
    '2025-12-01 10:14:07.829'
  ),
  (
    1,
    '1215e989-e69f-4eb3-bafd-86ddd5cb3de4'::uuid,
    'Footer',
    'EN'::public."language_code",
    'nav-link',
    'footer',
    7,
    '2025-12-01 10:14:07.829',
    '2025-12-01 10:14:07.829',
    '2025-12-01 10:14:07.829'
  );

INSERT INTO
  public.payments (
    user_id,
    payment_source_id,
    "uuid",
    link,
    title,
    display_text,
    class_name,
    is_favorite,
    sort_order,
    deleted_at,
    created_at,
    frontend_details,
    has_qr_code
  )
VALUES
  (
    1,
    1,
    'd71b8880-c460-432a-b5bd-13aca5d5af7f'::uuid,
    'https://www.bancoeconomico.com.bo/',
    'Banco Economico',
    'Pagos Varios',
    'from-blue-500 to-cyan-500',
    true,
    1,
    NULL,
    '2025-12-01 10:14:07.829',
    '{"account": "123456789", "instructions": ["Transfer amount to provided account", "Use transaction ID as reference", "Confirmation within 24 hours"], "accountHolder": "Oscar Cortez"}',
    false
  ),
  (
    1,
    3,
    '3319ce02-1278-494b-ae19-14d16f10b28a'::uuid,
    'https://www.binance.com/',
    'Binance',
    'Pagos Varios',
    'from-blue-500 to-cyan-500',
    false,
    3,
    NULL,
    '2025-12-01 10:14:07.829',
    '{"account": "0x742d35Cc6634C0532925a3b844Bc9e7595f2D3e1", "instructions": ["Open Binance Pay", "Select your preferred crypto", "Send to wallet address", "Receive confirmation"]}',
    false
  ),
  (
    1,
    4,
    '31060cac-9e16-42b2-a62f-5f3f6dcbe793'::uuid,
    'https://www.meru.com/',
    'Meru PSP',
    'Pagos con Meru',
    'from-blue-500 to-cyan-500',
    false,
    4,
    NULL,
    '2025-12-01 10:14:07.829',
    '{"account": "airtm.user@example.com", "instructions": ["Login to AirTM", "Select transfer option", "Enter amount and recipient", "Complete transaction"]}',
    false
  ),
  (
    1,
    2,
    '8b4ba4e8-3809-45b2-b596-f1b22937a3f5'::uuid,
    'https://www.bnb.com.bo/',
    'BNB',
    'Pagos Varios',
    'from-blue-500 to-cyan-500',
    false,
    2,
    NULL,
    '2025-12-01 10:14:07.829',
    '{"instructions": ["Open your payment app", "Scan the QR code", "Confirm the amount", "Transaction complete"]}',
    true
  );

INSERT INTO
  public.hero_greetings (
    "uuid",
    user_id,
    title,
    "content",
    footer,
    "language",
    device,
    deleted_at,
    created_at
  )
VALUES
  (
    '345be9df-9f40-4caf-973e-f66add8e763d'::uuid,
    1,
    '¡Hola! Soy Oscar',
    'Desarrollador Full-Stack apasionado por crear soluciones innovadoras',
    'Construyendo el futuro, una línea de código a la vez',
    'ES'::public."language_code",
    'DESKTOP'::public."device_type",
    NULL,
    '2025-12-01 10:14:07.829'
  ),
  (
    '43c21f9c-6ae3-4708-b449-6eff3a471359'::uuid,
    1,
    '¡Hola! Soy Oscar',
    'Full-Stack Developer',
    'Innovación y código',
    'ES'::public."language_code",
    'MOBILE'::public."device_type",
    NULL,
    '2025-12-01 10:14:07.829'
  ),
  (
    '2dc46b09-a598-4fb9-8a10-8cfc60ab4a39'::uuid,
    1,
    'Hi, I''m Oscar Cortez — a Software Engineer with a degree in Computer Science.',
    'I''ve worked as a Database Administrator (DBA), ETL Developer, and now I specialize in full-stack software development — from backend logic to user-facing interfaces',
    'Thanks for stopping by — welcome to my professional site. 💙',
    'EN'::public."language_code",
    'DESKTOP'::public."device_type",
    NULL,
    '2025-12-01 10:14:07.829'
  ),
  (
    '4c5504a9-cc11-4a67-b9bb-183f83b04926'::uuid,
    1,
    'Hi! I''m Oscar',
    'Full-Stack Dev',
    'Innovation & Code',
    'EN'::public."language_code",
    'MOBILE'::public."device_type",
    NULL,
    '2025-12-01 10:14:07.829'
  ),
  (
    '26eeac01-3149-4b8f-94df-03867ea7936b'::uuid,
    1,
    'Olá! Eu sou Oscar',
    'Desenvolvedor Full-Stack apaixonado por criar soluções inovadoras',
    'Construindo o futuro, uma linha de código por vez',
    'PT'::public."language_code",
    'DESKTOP'::public."device_type",
    NULL,
    '2025-12-01 10:14:07.829'
  ),
  (
    '91fb106a-b697-4b26-99ae-a69cafcc8b53'::uuid,
    1,
    'Oi! Sou Oscar',
    'Dev Full-Stack',
    'Inovação e Código',
    'PT'::public."language_code",
    'MOBILE'::public."device_type",
    NULL,
    '2025-12-01 10:14:07.829'
  ),
  (
    '274a727a-8b76-44e1-87dc-bac2f8ea78a9'::uuid,
    1,
    'Salut! Je suis Oscar',
    'Développeur Full-Stack passionné par la création de solutions innovantes',
    'Construire l''avenir, une ligne de code à la fois',
    'FR'::public."language_code",
    'DESKTOP'::public."device_type",
    NULL,
    '2025-12-01 10:14:07.829'
  ),
  (
    '127e1460-6116-4c78-8460-f2325beb8b15'::uuid,
    1,
    'Salut! Oscar',
    'Dev Full-Stack',
    'Innovation & Code',
    'FR'::public."language_code",
    'MOBILE'::public."device_type",
    NULL,
    '2025-12-01 10:14:07.829'
  );

INSERT INTO
  public.contacts (
    user_id,
    "uuid",
    link,
    "type",
    title,
    display_text,
    class_name,
    sort_order,
    deleted_at,
    created_at,
    icon_name
  )
VALUES
  (
    1,
    '50f9975f-9c51-4936-b648-03983696f570'::uuid,
    'mailto:oscarkortez@gmail.com',
    'EMAIL'::public."contact_type",
    'Email',
    'oscarkortez@gmail.com',
    'from-blue-500/20 to-blue-500/5 border-blue-500/30',
    1,
    NULL,
    '2025-12-01 10:14:07.829',
    'mail'
  ),
  (
    1,
    'c13d98a2-736b-4def-9d5d-05ae4ccdc486'::uuid,
    'https://linkedin.com/in/oscarkortez',
    'LINKEDIN'::public."contact_type",
    'LinkedIn',
    'linkedin.com/in/oscarkortez',
    'from-cyan-500/20 to-cyan-500/5 border-cyan-500/30',
    2,
    NULL,
    '2025-12-01 10:14:07.829',
    'linkedin'
  ),
  (
    1,
    '83ded355-9403-4555-8c85-816378259caf'::uuid,
    'https://github.com/oscarkortez',
    'GITHUB'::public."contact_type",
    'GitHub',
    'github.com/oscarcortez',
    'from-purple-500/20 to-purple-500/5 border-purple-500/30',
    3,
    NULL,
    '2025-12-01 10:14:07.829',
    'github'
  ),
  (
    1,
    'b668a86c-b839-4050-8abc-0707b3964d20'::uuid,
    'tel:+59177703364',
    'PHONE'::public."contact_type",
    'Phone',
    '591 77703364',
    'from-green-500/20 to-green-500/5 border-green-500/30',
    4,
    NULL,
    '2025-12-01 10:14:07.829',
    'phone'
  );

INSERT INTO
  public.templates (
    user_id,
    "uuid",
    "name",
    "type",
    preview_image,
    description,
    "status",
    theme_color,
    deleted_at,
    created_at
  )
VALUES
  (
    1,
    '56560408-d313-431e-8943-3676b8061cae'::uuid,
    'Beta Template',
    'PROFESSIONAL'::public."template_type",
    '/images/templates/beta-dark.jpg',
    'A beta template for portfolios',
    'ACTIVE'::public."status",
    'dark',
    NULL,
    '2025-12-05 23:02:56.138593+00'
  );