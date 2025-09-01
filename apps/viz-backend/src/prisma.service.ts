import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
// import { prisma, PrismaClient } from '@portfolio/db';
import { prisma } from '../../../packages/prisma-db';

@Injectable()
export class PrismaService implements OnModuleInit, OnModuleDestroy {
  async onModuleInit() {
    await prisma.$connect();
  }

  async onModuleDestroy() {
    await prisma.$disconnect();
  }

  get client() {
    return prisma;
  }
}

export { prisma };
