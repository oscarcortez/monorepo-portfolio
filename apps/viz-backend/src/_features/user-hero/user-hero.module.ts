import { Module } from '@nestjs/common';
import { UserHeroService } from './user-hero.service';
import { UserHeroResolver } from './user-hero.resolver';
import { PrismaService } from '../../prisma.service';

@Module({
  providers: [UserHeroResolver, UserHeroService, PrismaService],
})
export class UserHeroModule {}
