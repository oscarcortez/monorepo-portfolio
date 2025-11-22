import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class TokenUsage {
  @Field(() => Int)
  inputTokens!: number;

  @Field(() => Int)
  outputTokens!: number;
}
