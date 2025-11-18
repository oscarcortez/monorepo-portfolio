import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma.service';
import { User } from '../../prisma-generate/user/user.model';

@Injectable()
export class UserHeroService {
  constructor(private prisma: PrismaService) {}

  async findOne(uuid: string): Promise<User | null> {
    return await this.prisma.user.findUnique({
      where: { uuid, deletedAt: null },
      include: {
        navLinks: {
          where: { language: 'EN' },
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
