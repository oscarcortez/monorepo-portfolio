import { ObjectType, Field } from '@nestjs/graphql';
import { LanguageCode } from './enums';

@ObjectType('NavLinkPublic')
export class NavLinkPublicEntity {
  @Field()
  uuid: string;

  @Field()
  content: string;

  @Field(() => LanguageCode)
  language: LanguageCode;

  @Field(() => String, { nullable: true })
  className?: string | null;

  @Field()
  url: string;
}
