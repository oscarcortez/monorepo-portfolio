import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class SendMessageInput {
  @Field()
  to!: string;

  @Field()
  text!: string;
}
