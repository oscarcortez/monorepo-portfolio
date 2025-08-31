import {
  pgTable,
  unique,
  serial,
  uuid,
  varchar,
  text,
  timestamp,
  foreignKey,
  integer,
  boolean,
  index,
  pgView,
} from 'drizzle-orm/pg-core';
import { sql } from 'drizzle-orm';

export const users = pgTable(
  'users',
  {
    userId: serial('user_id').primaryKey().notNull(),
    uuid: uuid().defaultRandom().notNull(),
    email: varchar({ length: 100 }).notNull(),
    name: varchar({ length: 100 }).notNull(),
    passwordHash: text('password_hash').notNull(),
    deletedAt: timestamp('deleted_at', { mode: 'string' }),
    createdAt: timestamp('created_at', { withTimezone: true, mode: 'string' })
      .defaultNow()
      .notNull(),
    updatedAt: timestamp('updated_at', { withTimezone: true, mode: 'string' })
      .defaultNow()
      .notNull(),
  },
  (table) => [
    unique('users_uuid_key').on(table.uuid),
    unique('users_email_key').on(table.email),
  ],
);

export const heroGreetings = pgTable(
  'hero_greetings',
  {
    heroGreetingId: serial('hero_greeting_id').primaryKey().notNull(),
    uuid: uuid().defaultRandom().notNull(),
    userId: integer('user_id')
      .references(() => users.userId)
      .notNull(),
    title: text().notNull(),
    content: text().notNull(),
    footer: text().notNull(),
    languageId: integer('language_id')
      .references(() => languages.languageId)
      .notNull(),
    deviceId: integer('device_id')
      .references(() => devices.deviceId)
      .notNull(),
    deletedAt: timestamp('deleted_at', { mode: 'string' }),
    createdAt: timestamp('created_at', { withTimezone: true, mode: 'string' })
      .defaultNow()
      .notNull(),
  },
  (table) => [
    foreignKey({
      columns: [table.userId],
      foreignColumns: [users.userId],
      name: 'fk_hero_greeting_user',
    }),
    foreignKey({
      columns: [table.languageId],
      foreignColumns: [languages.languageId],
      name: 'fk_hero_greeting_language',
    }),
    foreignKey({
      columns: [table.deviceId],
      foreignColumns: [devices.deviceId],
      name: 'fk_hero_greeting_device',
    }),
    unique('hero_greetings_uuid_key').on(table.uuid),
  ],
);

export const languages = pgTable(
  'languages',
  {
    languageId: serial('language_id').primaryKey().notNull(),
    uuid: uuid().defaultRandom().notNull(),
    code: varchar({ length: 5 }).notNull(),
    name: varchar({ length: 100 }).notNull(),
    nativeName: varchar('native_name', { length: 100 }).notNull(),
    iso6391: varchar('iso_639_1', { length: 2 }).notNull(),
    flagEmoji: varchar('flag_emoji', { length: 10 }),
    flagIconPath: varchar('flag_icon_path', { length: 255 }),
    isActive: boolean('is_active').default(true),
    isDefault: boolean('is_default').default(false),
    sortOrder: integer('sort_order').default(0),
    deletedAt: timestamp('deleted_at', { withTimezone: true, mode: 'string' }),
    createdAt: timestamp('created_at', { withTimezone: true, mode: 'string' })
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
  },
  (table) => [
    unique('languages_uuid_key').on(table.uuid),
    unique('languages_code_key').on(table.code),
  ],
);

export const devices = pgTable(
  'devices',
  {
    deviceId: serial('device_id').primaryKey().notNull(),
    uuid: uuid().defaultRandom().notNull(),
    code: varchar({ length: 20 }).notNull(),
    name: varchar({ length: 100 }).notNull(),
    description: text(),
    iconClass: varchar('icon_class', { length: 100 }),
    iconPath: varchar('icon_path', { length: 255 }),
    minWidth: integer('min_width'),
    maxWidth: integer('max_width'),
    breakpoint: varchar({ length: 50 }),
    isActive: boolean('is_active').default(true),
    sortOrder: integer('sort_order').default(0),
    deletedAt: timestamp('deleted_at', { withTimezone: true, mode: 'string' }),
    createdAt: timestamp('created_at', { withTimezone: true, mode: 'string' })
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
  },
  (table) => [
    unique('devices_uuid_key').on(table.uuid),
    unique('devices_code_key').on(table.code),
  ],
);

export const navLinks = pgTable(
  'nav_links',
  {
    navLinkId: serial('nav_link_id').primaryKey().notNull(),
    userId: integer('user_id')
      .references(() => users.userId)
      .notNull(),
    uuid: uuid().defaultRandom().notNull(),
    content: varchar({ length: 255 }).notNull(),
    className: varchar('class_name', { length: 255 }),
    url: varchar({ length: 70 }).default('#').notNull(),
    sortOrder: integer('sort_order').default(0).notNull(),
    deletedAt: timestamp('deleted_at', { withTimezone: true, mode: 'string' }),
    createdAt: timestamp('created_at', { withTimezone: true, mode: 'string' })
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
    updatedAt: timestamp('updated_at', { withTimezone: true, mode: 'string' })
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
  },
  (table) => [
    index('idx_nav_links_created_at').using(
      'btree',
      table.createdAt.asc().nullsLast().op('timestamptz_ops'),
    ),
    index('idx_nav_links_deleted_at').using(
      'btree',
      table.deletedAt.asc().nullsLast().op('timestamptz_ops'),
    ),
    index('idx_nav_links_sort_order').using(
      'btree',
      table.sortOrder.asc().nullsLast().op('int4_ops'),
    ),
    index('idx_nav_links_uuid').using(
      'btree',
      table.uuid.asc().nullsLast().op('uuid_ops'),
    ),
    foreignKey({
      columns: [table.userId],
      foreignColumns: [users.userId],
      name: 'fk_nav_links_user',
    }),
    unique('nav_links_uuid_key').on(table.uuid),
  ],
);

export const contactTypes = pgTable(
  'contact_types',
  {
    contactTypeId: serial('contact_type_id').primaryKey().notNull(),
    uuid: uuid().defaultRandom().notNull(),
    code: varchar({ length: 50 }).notNull(),
    name: varchar({ length: 100 }).notNull(),
    description: text(),
    iconClass: varchar('icon_class', { length: 100 }),
    iconPath: varchar('icon_path', { length: 255 }),
    color: varchar({ length: 7 }),
    bgColor: varchar('bg_color', { length: 7 }),
    sortOrder: integer('sort_order').default(0),
    deletedAt: timestamp('deleted_at', { withTimezone: true, mode: 'string' }),
    createdAt: timestamp('created_at', { withTimezone: true, mode: 'string' })
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
  },
  (table) => [
    index('idx_contact_types_code').using(
      'btree',
      table.code.asc().nullsLast().op('text_ops'),
    ),
    index('idx_contact_types_deleted_at').using(
      'btree',
      table.deletedAt.asc().nullsLast().op('timestamptz_ops'),
    ),
    index('idx_contact_types_sort').using(
      'btree',
      table.sortOrder.asc().nullsLast().op('int4_ops'),
    ),
    index('idx_contact_types_uuid').using(
      'btree',
      table.uuid.asc().nullsLast().op('uuid_ops'),
    ),
    unique('contact_types_uuid_key').on(table.uuid),
    unique('contact_types_code_key').on(table.code),
  ],
);

export const contacts = pgTable(
  'contacts',
  {
    contactId: serial('contact_id').primaryKey().notNull(),
    userId: integer('user_id')
      .references(() => users.userId)
      .notNull(),
    uuid: uuid().defaultRandom().notNull(),
    link: varchar({ length: 500 }).notNull(),
    contactTypeId: integer('contact_type_id')
      .references(() => contactTypes.contactTypeId)
      .notNull(),
    title: varchar({ length: 100 }).notNull(),
    iconPath: varchar('icon_path', { length: 255 }),
    displayText: varchar('display_text', { length: 255 }),
    sortOrder: integer('sort_order').default(0).notNull(),
    deletedAt: timestamp('deleted_at', { withTimezone: true, mode: 'string' }),
    createdAt: timestamp('created_at', { withTimezone: true, mode: 'string' })
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
  },
  (table) => [
    index('idx_contacts_contact_type_id').using(
      'btree',
      table.contactTypeId.asc().nullsLast().op('int4_ops'),
    ),
    index('idx_contacts_deleted_at').using(
      'btree',
      table.deletedAt.asc().nullsLast().op('timestamptz_ops'),
    ),
    index('idx_contacts_sort_order').using(
      'btree',
      table.sortOrder.asc().nullsLast().op('int4_ops'),
    ),
    index('idx_contacts_user_id').using(
      'btree',
      table.userId.asc().nullsLast().op('int4_ops'),
    ),
    index('idx_contacts_uuid').using(
      'btree',
      table.uuid.asc().nullsLast().op('uuid_ops'),
    ),
    foreignKey({
      columns: [table.userId],
      foreignColumns: [users.userId],
      name: 'fk_contacts_user',
    }),
    foreignKey({
      columns: [table.contactTypeId],
      foreignColumns: [contactTypes.contactTypeId],
      name: 'fk_contacts_contact_type',
    }),
    unique('contacts_uuid_key').on(table.uuid),
  ],
);

export const flywaySchemaHistory = pgTable(
  'flyway_schema_history',
  {
    installedRank: integer('installed_rank').primaryKey().notNull(),
    version: varchar({ length: 50 }),
    description: varchar({ length: 200 }).notNull(),
    type: varchar({ length: 20 }).notNull(),
    script: varchar({ length: 1000 }).notNull(),
    checksum: integer(),
    installedBy: varchar('installed_by', { length: 100 }).notNull(),
    installedOn: timestamp('installed_on', { mode: 'string' })
      .defaultNow()
      .notNull(),
    executionTime: integer('execution_time').notNull(),
    success: boolean().notNull(),
  },
  (table) => [
    index('flyway_schema_history_s_idx').using(
      'btree',
      table.success.asc().nullsLast().op('bool_ops'),
    ),
  ],
);
export const vwGetHero = pgView('vw_get_hero', {
  name: varchar({ length: 100 }),
  email: varchar({ length: 100 }),
  greetingTitle: text('greeting_title'),
  greetingContent: text('greeting_content'),
  greetingFooter: text('greeting_footer'),
}).as(
  sql`SELECT u.name, u.email, hg.title AS greeting_title, hg.content AS greeting_content, hg.footer AS greeting_footer FROM users u JOIN hero_greetings hg ON u.user_id = hg.user_id`,
);
