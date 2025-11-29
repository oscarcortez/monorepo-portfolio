import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class TranslateTextsInput {
  @Field(() => [String])
  texts!: string[];

  @Field()
  targetLang!: string;

  @Field({ nullable: true })
  sourceLang?: string;
}
