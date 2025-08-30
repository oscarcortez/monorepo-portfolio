-- Migration: SEEDER CONTACTS
-- Created: 2025-08-30T21:23:14.741Z
-- Type: Versioned
-- Description: seeder contacts
-- =====================================================
-- SEEDER CONTACTS
-- =====================================================
INSERT INTO
  contacts (
    user_id,
    link,
    contact_type_id,
    title,
    display_text,
    sort_order
  )
VALUES
  -- Email principal
  (
    1,
    'mailto:oscarkortez@gmail.com',
    (
      SELECT
        contact_type_id
      FROM
        contact_types
      WHERE
        code = 'email'
    ),
    'Email Principal',
    'oscarkortez@gmail.com',
    1
  ),
  -- LinkedIn
  (
    1,
    'https://linkedin.com/in/oscar-cortez-dev',
    (
      SELECT
        contact_type_id
      FROM
        contact_types
      WHERE
        code = 'linkedin'
    ),
    'LinkedIn Profile',
    'Oscar Cortez - Software Engineer',
    2
  ),
  -- GitHub
  (
    1,
    'https://github.com/oscarkortez',
    (
      SELECT
        contact_type_id
      FROM
        contact_types
      WHERE
        code = 'github'
    ),
    'GitHub Portfolio',
    '@oscarkortez',
    3
  ),
  -- Twitter
  (
    1,
    'https://twitter.com/oscarkortez_dev',
    (
      SELECT
        contact_type_id
      FROM
        contact_types
      WHERE
        code = 'twitter'
    ),
    'Twitter',
    '@oscarkortez_dev',
    4
  ),
  -- Instagram
  (
    1,
    'https://instagram.com/oscarkortez.dev',
    (
      SELECT
        contact_type_id
      FROM
        contact_types
      WHERE
        code = 'instagram'
    ),
    'Instagram',
    '@oscarkortez.dev',
    5
  ),
  -- WhatsApp
  (
    1,
    'https://wa.me/1234567890?text=Hi%20Oscar!',
    (
      SELECT
        contact_type_id
      FROM
        contact_types
      WHERE
        code = 'whatsapp'
    ),
    'WhatsApp',
    '+1 (234) 567-8900',
    6
  ),
  -- Telegram
  (
    1,
    'https://t.me/oscarkortez',
    (
      SELECT
        contact_type_id
      FROM
        contact_types
      WHERE
        code = 'telegram'
    ),
    'Telegram',
    '@oscarkortez',
    7
  ),
  -- Discord
  (
    1,
    'https://discord.gg/oscarkortez',
    (
      SELECT
        contact_type_id
      FROM
        contact_types
      WHERE
        code = 'discord'
    ),
    'Discord Server',
    'Oscar''s Dev Community',
    8
  ),
  -- Website personal
  (
    1,
    'https://oscarkortez.dev',
    (
      SELECT
        contact_type_id
      FROM
        contact_types
      WHERE
        code = 'website'
    ),
    'Personal Website',
    'oscarkortez.dev',
    9
  ),
  -- Teléfono
  (
    1,
    'tel:+1234567890',
    (
      SELECT
        contact_type_id
      FROM
        contact_types
      WHERE
        code = 'phone'
    ),
    'Phone',
    '+1 (234) 567-8900',
    10
  );