import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class TranslateTextInput {
  @Field()
  text!: string;

  @Field()
  targetLang!: string;

  @Field({ nullable: true })
  sourceLang?: string;

  @Field({ nullable: true })
  preserveFormatting?: boolean;

  @Field({ nullable: true })
  formality?: string; // 'default' | 'more' | 'less' | 'prefer_more' | 'prefer_less'
}
