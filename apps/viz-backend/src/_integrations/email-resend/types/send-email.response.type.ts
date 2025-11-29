import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class SendEmailResponseType {
  @Field()
  success!: boolean;

  @Field({ nullable: true })
  messageId?: string;

  @Field({ nullable: true })
  error?: string;
}
