import { Resolver, Query, Args } from '@nestjs/graphql';
import { UserHeroService } from './user-hero.service';
import { UserPublicEntity } from '../models/user-public.entity';

@Resolver(() => UserPublicEntity)
export class UserHeroResolver {
  constructor(private readonly userHeroService: UserHeroService) {}

  @Query(() => UserPublicEntity, { name: 'userHero' })
  findOne(
    @Args('userUuid', { type: () => String }) userUuid: string,
  ): Promise<UserPublicEntity | null> {
    return this.userHeroService.findOne(userUuid);
  }
}
