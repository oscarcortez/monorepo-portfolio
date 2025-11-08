import { Field, ID } from '@nestjs/graphql';

export abstract class BaseEntity {
  @Field(() => ID)
  id: number;

  @Field()
  uuid: string;

  @Field(() => Date)
  createdAt: Date;

  @Field(() => Date)
  updatedAt: Date;
}
