import { Field, ObjectType } from '@nestjs/graphql';
import { ContactPhone } from './contact-phone.type';

@ObjectType()
export class ContactsListResponse {
  @Field()
  success!: boolean;

  @Field(() => [ContactPhone])
  data!: ContactPhone[];

  @Field({ nullable: true })
  error?: string;
}
