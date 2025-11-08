import { ObjectType, Field } from '@nestjs/graphql';
import { NavLinkPublicEntity } from './nav-link-public.entity';
import { HeroGreetingPublicEntity } from './hero-greeting-public.entity';
import { ContactPublicEntity } from './contact-public.entity';
import { PaymentPublicEntity } from './payment-public.entity';

@ObjectType('UserPublic')
export class UserPublicEntity {
  @Field()
  uuid: string;

  @Field()
  name: string;

  @Field()
  email: string;

  @Field(() => [NavLinkPublicEntity])
  navLinks: NavLinkPublicEntity[];

  @Field(() => [HeroGreetingPublicEntity])
  heroGreetings: HeroGreetingPublicEntity[];

  @Field(() => [ContactPublicEntity])
  contacts: ContactPublicEntity[];

  @Field(() => [PaymentPublicEntity])
  payments: PaymentPublicEntity[];
}
