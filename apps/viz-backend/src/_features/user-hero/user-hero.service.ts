import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma.service';
import { User } from '../../prisma-generate/user/user.model';
import { SupabaseStorageService } from '../../_integrations/supabase-storage/supabase-storage.service';
import { join } from 'path';

@Injectable()
export class UserHeroService {
  constructor(
    private prisma: PrismaService,
    private supabaseStorageService: SupabaseStorageService,
  ) {}
  async findOne(uuid: string): Promise<User | null> {
    const filePath = join(process.cwd(), 'temp-storage', 'bg-tech2.webp');
    await this.supabaseStorageService.uploadFromPath(
      filePath,
      'hero/qr/uuid/bg-tech2.webp',
    );
    return await this.prisma.user.findUnique({
      where: { uuid, deletedAt: null },
      include: {
        navLinks: {
          where: { language: 'EN', deletedAt: null },
          orderBy: { sortOrder: 'asc' },
        },
        heroGreetings: {
          where: {
            language: 'EN',
            device: 'DESKTOP',
            deletedAt: null,
          },
        },
        contacts: {
          where: { deletedAt: null },
          orderBy: { sortOrder: 'asc' },
        },
        payments: {
          where: { deletedAt: null },
          orderBy: { sortOrder: 'asc' },
          include: {
            paymentSource: true,
          },
        },
      },
    });
  }
}
