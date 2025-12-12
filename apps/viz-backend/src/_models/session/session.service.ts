import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma.service';
import { Prisma, Session } from '@prisma/client';

@Injectable()
export class SessionService {
  constructor(private prisma: PrismaService) {}

  async getSessionById(sessionId: number) {
    return this.prisma.session.findUnique({
      where: { sessionId },
    });
  }

  async createSession(
    data: Prisma.SessionUncheckedCreateInput,
  ): Promise<Session> {
    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + 7);
    data.expiresAt = expiresAt;
    return this.prisma.session.create({
      data,
    });
  }

  async revokeSessionByToken(token: string) {
    return this.prisma.session.update({
      where: { token },
      data: { isActive: false },
    });
  }

  async isTokenActive(token: string) {
    const session = await this.prisma.session.findFirst({
      where: { token, isActive: true },
    });

    return session !== null;
  }
}
