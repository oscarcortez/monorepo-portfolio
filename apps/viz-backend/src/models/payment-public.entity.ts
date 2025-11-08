import { PaymentSourcePublicEntity } from './payment-source-public.entity';
import { ObjectType, Field } from '@nestjs/graphql';
// import { PaymentSourceType } from './enums';
// import { PaymentSourcePublicEntity } from './payment-source-public.entity';

@ObjectType('PaymentPublic')
export class PaymentPublicEntity {
  @Field()
  uuid: string;

  @Field()
  title: string;

  @Field()
  link: string;

  @Field(() => String, { nullable: true })
  displayText?: string | null;

  @Field(() => String, { nullable: true })
  className?: string | null;

  @Field(() => Boolean)
  isFavorite: boolean;

  @Field(() => [PaymentSourcePublicEntity])
  paymentSources: PaymentSourcePublicEntity[];
}
