import { ObjectType, Field } from '@nestjs/graphql';
import { ContactType } from './enums';

@ObjectType('ContactPublic')
export class ContactPublicEntity {
  @Field()
  uuid: string;

  @Field()
  link: string;

  @Field(() => ContactType)
  type: ContactType;

  @Field()
  title: string;

  @Field(() => String, { nullable: true })
  iconPath?: string | null;

  @Field(() => String, { nullable: true })
  displayText?: string | null;
}
