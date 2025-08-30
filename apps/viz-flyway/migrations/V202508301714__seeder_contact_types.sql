-- Migration: SEEDER CONTACT TYPES
-- Created: 2025-08-30T21:14:36.373Z
-- Type: Versioned
-- Description: seeder contact types
-- =====================================================
-- SEEDER CONTACT TYPES
-- =====================================================
INSERT INTO
  contact_types (
    code,
    name,
    description,
    icon_class,
    icon_path,
    color,
    bg_color,
    sort_order
  )
VALUES
  (
    'email',
    'Email',
    'Contacto por correo electrónico',
    'fas fa-envelope',
    '/icons/email.svg',
    '#EA4335',
    '#FEF2F2',
    1
  ),
  (
    'linkedin',
    'LinkedIn',
    'Perfil profesional en LinkedIn',
    'fab fa-linkedin-in',
    '/icons/linkedin.svg',
    '#0077B5',
    '#EFF6FF',
    2
  ),
  (
    'github',
    'GitHub',
    'Repositorios y código fuente',
    'fab fa-github',
    '/icons/github.svg',
    '#181717',
    '#F9FAFB',
    3
  ),
  (
    'twitter',
    'Twitter',
    'Perfil en Twitter/X',
    'fab fa-twitter',
    '/icons/twitter.svg',
    '#1DA1F2',
    '#EFF6FF',
    4
  ),
  (
    'instagram',
    'Instagram',
    'Perfil en Instagram',
    'fab fa-instagram',
    '/icons/instagram.svg',
    '#E4405F',
    '#FDF2F8',
    5
  ),
  (
    'whatsapp',
    'WhatsApp',
    'Contacto por WhatsApp',
    'fab fa-whatsapp',
    '/icons/whatsapp.svg',
    '#25D366',
    '#F0FDF4',
    6
  ),
  (
    'telegram',
    'Telegram',
    'Contacto por Telegram',
    'fab fa-telegram-plane',
    '/icons/telegram.svg',
    '#0088CC',
    '#EFF6FF',
    7
  ),
  (
    'discord',
    'Discord',
    'Servidor de Discord',
    'fab fa-discord',
    '/icons/discord.svg',
    '#5865F2',
    '#EEF2FF',
    8
  ),
  (
    'website',
    'Website',
    'Sitio web personal',
    'fas fa-globe',
    '/icons/website.svg',
    '#FF6B35',
    '#FFF7ED',
    9
  ),
  (
    'phone',
    'Phone',
    'Número de teléfono',
    'fas fa-phone',
    '/icons/phone.svg',
    '#34C759',
    '#F0FDF4',
    10
  ),
  (
    'other',
    'Other',
    'Otros tipos de contacto',
    'fas fa-link',
    '/icons/other.svg',
    '#6C757D',
    '#F8F9FA',
    11
  );