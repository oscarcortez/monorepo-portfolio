import { Module } from '@nestjs/common';
import { SupabaseStorageService } from './supabase-storage.service';
import { SupabaseStorageResolver } from './supabase-storage.resolver';
import { ConfigModule } from '@nestjs/config';

@Module({
  exports: [SupabaseStorageService],
  imports: [ConfigModule],
  providers: [SupabaseStorageResolver, SupabaseStorageService],
})
export class SupabaseStorageModule {}
