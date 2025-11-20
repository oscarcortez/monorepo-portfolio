import { Field, ObjectType } from '@nestjs/graphql';
import { TokenUsage } from './token-usage.type';

@ObjectType()
export class GenerateTextResponse {
  @Field()
  success: boolean;

  @Field({ nullable: true })
  text?: string;

  @Field({ nullable: true })
  error?: string;

  @Field(() => TokenUsage, { nullable: true })
  usage?: TokenUsage;
}
