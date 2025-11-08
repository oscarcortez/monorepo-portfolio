import { CreateUserHeroInput } from './create-user-hero.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateUserHeroInput extends PartialType(CreateUserHeroInput) {
  @Field(() => Int)
  id: number;
}
