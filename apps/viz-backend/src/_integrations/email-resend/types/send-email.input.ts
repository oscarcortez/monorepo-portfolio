import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class SendEmailInput {
  @Field()
  from!: string;

  @Field()
  to!: string;

  @Field()
  subject!: string;

  @Field()
  html!: string;

  @Field({ nullable: true })
  text?: string;

  @Field({ nullable: true })
  replyTo?: string;
}
