import { Resolver, Query, Args } from '@nestjs/graphql';
import { UserHeroService } from './user-hero.service';
import { User } from '../prisma-generate/user/user.model';
import { Public } from '../auth/public.decorator';

@Resolver(() => User)
export class UserHeroResolver {
  constructor(private readonly userHeroService: UserHeroService) {}

  @Public()
  @Query(() => User, { name: 'userHero' })
  findOne(
    @Args('userUuid', { type: () => String }) userUuid: string,
  ): Promise<User | null> {
    return this.userHeroService.findOne(userUuid);
  }
}
