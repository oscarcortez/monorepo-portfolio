import { Module } from '@nestjs/common';
import { UserHeroService } from './user-hero.service';
import { UserHeroResolver } from './user-hero.resolver';
import { PrismaService } from '../../prisma.service';
import { SupabaseStorageService } from '../../_integrations/supabase-storage/supabase-storage.service';
@Module({
  providers: [
    UserHeroResolver,
    UserHeroService,
    PrismaService,
    SupabaseStorageService,
  ],
})
export class UserHeroModule {}
