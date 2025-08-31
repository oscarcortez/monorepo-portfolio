import { ObjectType, Field } from '@nestjs/graphql';

@ObjectType()
export class ContactType {
  @Field(() => String)
  name: string;

  @Field(() => String)
  iconClass: string;

  @Field(() => String)
  color: string;
}

@ObjectType()
export class Contact {
  @Field(() => String)
  uuid: string;

  @Field(() => String)
  link: string;

  @Field(() => String)
  title: string;

  @Field(() => String)
  displayText: string;
}

@ObjectType()
export class UserWithContacts {
  @Field(() => String)
  uuid: string;

  @Field(() => String)
  name: string;

  @Field(() => String)
  email: string;

  @Field(() => [Contact])
  contacts: Contact[];
}
