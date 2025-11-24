import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserResolver } from './user.resolver';
import { PrismaService } from '../../prisma.service';
import { SupabaseStorageService } from '../../_integrations/supabase-storage/supabase-storage.service';
import { QrCodeService } from '../../_integrations/qr-code/qr-code.service';

@Module({
  providers: [
    PrismaService,
    SupabaseStorageService,
    UserService,
    UserResolver,
    QrCodeService,
  ],
  exports: [UserService],
})
export class UserModule {}
