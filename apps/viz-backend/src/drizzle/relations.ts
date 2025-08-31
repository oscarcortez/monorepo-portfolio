import { relations } from 'drizzle-orm/relations';
import {
  users,
  heroGreetings,
  languages,
  devices,
  navLinks,
  contacts,
  contactTypes,
} from './schema';

export const heroGreetingsRelations = relations(heroGreetings, ({ one }) => ({
  user: one(users, {
    fields: [heroGreetings.userId],
    references: [users.userId],
  }),
  language: one(languages, {
    fields: [heroGreetings.languageId],
    references: [languages.languageId],
  }),
  device: one(devices, {
    fields: [heroGreetings.deviceId],
    references: [devices.deviceId],
  }),
}));

export const usersRelations = relations(users, ({ many }) => ({
  heroGreetings: many(heroGreetings),
  navLinks: many(navLinks),
  contacts: many(contacts),
}));

export const languagesRelations = relations(languages, ({ many }) => ({
  heroGreetings: many(heroGreetings),
}));

export const devicesRelations = relations(devices, ({ many }) => ({
  heroGreetings: many(heroGreetings),
}));

export const navLinksRelations = relations(navLinks, ({ one }) => ({
  user: one(users, {
    fields: [navLinks.userId],
    references: [users.userId],
  }),
}));

export const contactsRelations = relations(contacts, ({ one }) => ({
  user: one(users, {
    fields: [contacts.userId],
    references: [users.userId],
  }),
  contactType: one(contactTypes, {
    fields: [contacts.contactTypeId],
    references: [contactTypes.contactTypeId],
  }),
}));

export const contactTypesRelations = relations(contactTypes, ({ many }) => ({
  contacts: many(contacts),
}));
