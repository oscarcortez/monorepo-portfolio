import { Module } from '@nestjs/common';
import { HeroUserService } from './hero-user.service';
import { HeroUserResolver } from './hero-user.resolver';

@Module({
  providers: [HeroUserResolver, HeroUserService],
})
export class HeroUserModule {}
