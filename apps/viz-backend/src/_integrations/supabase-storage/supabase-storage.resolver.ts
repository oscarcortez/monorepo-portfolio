import { Resolver } from '@nestjs/graphql';
import { SupabaseStorageService } from './supabase-storage.service';

@Resolver()
export class SupabaseStorageResolver {
  constructor(
    private readonly supabaseStorageService: SupabaseStorageService,
  ) {}
}
