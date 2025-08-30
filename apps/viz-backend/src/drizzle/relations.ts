import { relations } from 'drizzle-orm/relations';
import { users, heroGreetings } from './schema';

export const heroGreetingsRelations = relations(heroGreetings, ({ one }) => ({
  user: one(users, {
    fields: [heroGreetings.userId],
    references: [users.userId],
  }),
}));

export const usersRelations = relations(users, ({ many }) => ({
  heroGreetings: many(heroGreetings),
}));
