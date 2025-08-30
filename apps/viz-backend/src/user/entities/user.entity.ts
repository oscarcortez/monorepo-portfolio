import { ObjectType, Field, ID } from '@nestjs/graphql';
import * as schema from 'src/drizzle/schema';

type UserSelect = typeof schema.users.$inferSelect;

@ObjectType()
export class User implements UserSelect {
  @Field(() => ID)
  userId: number;

  @Field()
  uuid: string;

  @Field()
  email: string;

  @Field()
  name: string;

  @Field()
  passwordHash: string; // omitido completamente del esquema GraphQL

  @Field(() => String, { nullable: true })
  deletedAt: string | null;

  @Field(() => String)
  createdAt: string;

  @Field()
  updatedAt: string;
}
