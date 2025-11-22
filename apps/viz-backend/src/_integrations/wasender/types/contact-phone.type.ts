import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class ContactPhone {
  @Field({ nullable: true })
  id?: string;

  @Field({ nullable: true })
  name?: string;

  @Field({ nullable: true })
  phone?: string;
}
