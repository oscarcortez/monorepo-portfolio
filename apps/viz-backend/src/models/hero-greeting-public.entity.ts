import { ObjectType, Field } from '@nestjs/graphql';
import { DeviceType } from './enums';

@ObjectType('HeroGreetingPublic')
export class HeroGreetingPublicEntity {
  @Field()
  uuid: string;

  @Field()
  title: string;

  @Field()
  content: string;

  @Field()
  footer: string;

  @Field(() => DeviceType)
  device: DeviceType;
}
