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
  pgView,
  pgEnum,
} from 'drizzle-orm/pg-core';
import { sql } from 'drizzle-orm';

export const deviceEnum = pgEnum('device_enum', [
  'mobile',
  'tablet',
  'desktop',
]);
export const languageEnum = pgEnum('language_enum', ['en', 'es', 'fr', 'de']);

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
    userId: integer('user_id').notNull(),
    title: text().notNull(),
    content: text().notNull(),
    footer: text().notNull(),
    language: languageEnum().default('en').notNull(),
    device: deviceEnum().default('desktop').notNull(),
    deletedAt: timestamp('deleted_at', { mode: 'string' }),
    createdAt: timestamp('created_at', { withTimezone: true, mode: 'string' })
      .defaultNow()
      .notNull(),
    updatedAt: timestamp('updated_at', { withTimezone: true, mode: 'string' })
      .defaultNow()
      .notNull(),
  },
  (table) => [
    foreignKey({
      columns: [table.userId],
      foreignColumns: [users.userId],
      name: 'fk_hero_greeting_user',
    }),
  ],
);
export const vwGetHero = pgView('vw_get_hero', {
  name: varchar({ length: 100 }),
  email: varchar({ length: 100 }),
  greetingTitle: text('greeting_title'),
  greetingContent: text('greeting_content'),
  greetingFooter: text('greeting_footer'),
}).as(
  sql`SELECT u.name, u.email, hg.title AS greeting_title, hg.content AS greeting_content, hg.footer AS greeting_footer FROM users u JOIN hero_greetings hg ON u.user_id = hg.user_id WHERE u.uuid = 'c8988785-25db-4a86-add3-9b6873ff131b'::uuid AND u.deleted_at IS NULL AND hg.language = 'en'::language_enum`,
);
