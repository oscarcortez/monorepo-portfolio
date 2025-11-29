import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class LanguageInfo {
  @Field()
  code!: string;

  @Field()
  name!: string;

  @Field({ nullable: true })
  supportsFormality?: boolean;
}
