import { InputType, Field, Float, Int } from '@nestjs/graphql';

@InputType()
export class GenerateTextInput {
  @Field()
  prompt: string;

  @Field({ nullable: true })
  model?: string;

  @Field(() => Float, { nullable: true })
  temperature?: number;

  @Field(() => Int, { nullable: true })
  maxOutputTokens?: number;
}
