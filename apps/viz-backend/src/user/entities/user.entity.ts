import { ObjectType, Field, ID } from '@nestjs/graphql';

@ObjectType()
export class User {
  @Field(() => ID)
  userId: number;

  @Field(() => String)
  uuid: string;

  @Field(() => String)
  email: string;

  @Field(() => String)
  name: string;

  // @Field()
  // passwordHash: string; // omitido completamente del esquema GraphQL

  @Field(() => String, { nullable: true })
  deletedAt: string | null;

  @Field(() => String)
  createdAt: string;

  @Field()
  updatedAt: string;
}
