import { ObjectType, Field } from '@nestjs/graphql';

@ObjectType('PaymentSourcePublic')
export class PaymentSourcePublicEntity {
  @Field()
  uuid: string;

  @Field()
  name: string;

  @Field(() => String)
  code: string;

  @Field(() => String, { nullable: true })
  logoPath?: string | null;

  @Field(() => String, { nullable: true })
  website?: string | null;
}
