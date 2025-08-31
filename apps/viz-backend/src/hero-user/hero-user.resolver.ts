import { Resolver, Query, Args } from '@nestjs/graphql';
import { HeroUserService } from './hero-user.service';
import { UserWithContacts } from './entities/hero-user.entity';

@Resolver()
export class HeroUserResolver {
  constructor(private readonly heroUserService: HeroUserService) {}

  //find one
  @Query(() => UserWithContacts, { name: 'heroUser' })
  async findOne(
    @Args('uuid') uuid: string,
    @Args('languageCode') languageCode: string,
  ) {
    return this.heroUserService.findOne(uuid, languageCode);
  }
}
