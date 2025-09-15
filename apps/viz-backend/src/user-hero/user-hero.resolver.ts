import { Resolver, Query, Args, Int } from '@nestjs/graphql';
import { UserHeroService } from './user-hero.service';
import { UserPublicEntity } from '../models/user-public.entity';

@Resolver(() => UserPublicEntity)
export class UserHeroResolver {
  constructor(private readonly userHeroService: UserHeroService) {}

  @Query(() => UserPublicEntity, { name: 'userHero' })
  findOne(
    @Args('userId', { type: () => Int }) userId: number,
  ): Promise<UserPublicEntity | null> {
    return this.userHeroService.findOne(userId);
  }
}
