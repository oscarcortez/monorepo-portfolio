import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateUserHeroInput {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  exampleField!: number;
}
