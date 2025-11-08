import { Resolver, Query, Args } from '@nestjs/graphql';
import { UserHeroService } from './user-hero.service';
import { User } from '../prisma-generate/user/user.model';

@Resolver(() => User)
export class UserHeroResolver {
  constructor(private readonly userHeroService: UserHeroService) {}

  @Query(() => User, { name: 'userHero' })
  findOne(
    @Args('userUuid', { type: () => String }) userUuid: string,
  ): Promise<User | null> {
    return this.userHeroService.findOne(userUuid);
  }
}
