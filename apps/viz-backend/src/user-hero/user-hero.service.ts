import { Injectable } from '@nestjs/common';
// import { User } from '@prisma/client';
import { PrismaService } from '../prisma.service';
import { UserHeroResult } from './entities/user-hero.entity';

@Injectable()
export class UserHeroService {
  constructor(private prisma: PrismaService) {}

  async findOne(userId: number): Promise<UserHeroResult | null> {
    return await this.prisma.user.findUnique({
      select: {
        uuid: true,
        name: true,
        email: true,
        navLinks: {
          select: {
            navLinkId: true,
            content: true,
          },
          where: {
            language: 'EN',
          },
        },
        heroGreetings: {
          select: {
            heroGreetingId: true,
            title: true,
            content: true,
            footer: true,
          },
          where: {
            language: 'EN',
          },
        },
        contacts: {
          select: {
            contactId: true,
            title: true,
            link: true,
            type: true,
          },
        },
      },
      where: { userId },
    });
  }
}
