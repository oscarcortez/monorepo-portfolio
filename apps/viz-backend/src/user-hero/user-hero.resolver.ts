import { Resolver, Query, Args, Int } from '@nestjs/graphql';
import { UserHeroService } from './user-hero.service';
// import { GraphQLJSON } from 'graphql-type-json';
import { UserHeroResult } from './entities/user-hero.entity';

@Resolver(() => UserHeroResult)
export class UserHeroResolver {
  constructor(private readonly userHeroService: UserHeroService) {}

  @Query(() => UserHeroResult, { name: 'userHero' })
  findOne(
    @Args('userId', { type: () => Int }) userId: number,
  ): Promise<UserHeroResult | null> {
    return this.userHeroService.findOne(userId);
  }
}
