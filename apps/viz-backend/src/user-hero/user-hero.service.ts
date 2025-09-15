import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { UserPublicEntity } from '../models/user-public.entity';

@Injectable()
export class UserHeroService {
  constructor(private prisma: PrismaService) {}

  async findOne(userId: number): Promise<UserPublicEntity | null> {
    return await this.prisma.user.findUnique({
      select: {
        uuid: true,
        name: true,
        email: true,
        navLinks: {
          select: {
            uuid: true,
            content: true,
            language: true,
            className: true,
            url: true,
          },
          orderBy: { sortOrder: 'asc' },
          where: {
            language: 'EN',
          },
        },
        heroGreetings: {
          select: {
            uuid: true,
            title: true,
            content: true,
            footer: true,
            device: true,
          },
          where: {
            language: 'EN',
            device: 'DESKTOP',
            deletedAt: null,
          },
        },
        contacts: {
          select: {
            uuid: true,
            link: true,
            type: true,
            title: true,
            iconPath: true,
            displayText: true,
          },
          orderBy: { sortOrder: 'asc' },
          where: { deletedAt: null },
        },
      },
      where: { userId, deletedAt: null },
    });
  }
}
