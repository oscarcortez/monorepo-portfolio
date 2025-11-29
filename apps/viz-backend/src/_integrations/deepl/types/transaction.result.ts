import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class TranslationResult {
  @Field()
  translatedText!: string;

  @Field({ nullable: true })
  detectedSourceLanguage?: string;
}
