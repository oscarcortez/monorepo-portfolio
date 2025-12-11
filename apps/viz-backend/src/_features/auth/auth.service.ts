import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { UserService } from 'src/_models/user/user.service';
import { JwtService } from '@nestjs/jwt';
import { comparePassword } from 'src/utils/password';
import { GoogleUser } from './interfaces/google-profile.interface';
import { User } from 'src/prisma-generate/user/user.model';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
    private prisma: PrismaService,
  ) {}

  async validateGoogleUser(googleUser: GoogleUser): Promise<User> {
    return this.userService.validateGoogleUser(googleUser);
  }

  async signIn(
    email: string,
    password?: string,
    provider?: string,
    ipAddress?: string,
    userAgent?: string,
  ): Promise<{ access_token: string }> {
    const user = await this.userService.findByEmail(email);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    if (user.deletedAt !== null) {
      throw new UnauthorizedException('User account is deleted');
    }

    const payload = { email: user.email, sub: user.userId };
    if (provider && provider === 'google') {
      const token = await this.jwtService.signAsync(payload);
      await this.createSession(user.userId, token, ipAddress, userAgent);
      return { access_token: token };
    }

    if (
      password &&
      (await comparePassword(password, user?.passwordHash || '')) === false
    ) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const token = await this.jwtService.signAsync(payload);

    // Crea la sesión en la base de datos
    await this.createSession(user.userId, token, ipAddress, userAgent);

    return { access_token: token };
  }

  /**
   * Crea una sesión activa en la base de datos
   */
  async createSession(
    userId: number,
    token: string,
    ipAddress?: string,
    userAgent?: string,
  ): Promise<void> {
    // Calcula expiración (7 días desde ahora)
    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + 7);

    await this.prisma.session.create({
      data: {
        userId,
        token,
        expiresAt,
        ipAddress,
        userAgent,
        isActive: true,
      },
    });
  }

  /**
   * Invalida una sesión específica por token
   */
  async invalidateSession(token: string): Promise<void> {
    await this.prisma.session.updateMany({
      where: { token, isActive: true },
      data: { isActive: false },
    });
  }

  /**
   * Invalida todas las sesiones de un usuario
   */
  async invalidateAllUserSessions(userId: number): Promise<void> {
    await this.prisma.session.updateMany({
      where: { userId, isActive: true },
      data: { isActive: false },
    });
  }

  /**
   * Verifica si una sesión está activa y no ha expirado
   */
  async isSessionActive(token: string): Promise<boolean> {
    const session = await this.prisma.session.findUnique({
      where: { token },
      select: {
        isActive: true,
        expiresAt: true,
      },
    });

    if (!session) {
      return false;
    }

    // Verifica si está activa y no ha expirado
    const now = new Date();
    return session.isActive && session.expiresAt > now;
  }

  /**
   * Actualiza el timestamp de última actividad de la sesión
   */
  async updateSessionActivity(token: string): Promise<void> {
    await this.prisma.session.updateMany({
      where: { token, isActive: true },
      data: { lastActiveAt: new Date() },
    });
  }

  /**
   * Limpia sesiones expiradas (puede ejecutarse con un cron job)
   */
  async cleanupExpiredSessions(): Promise<number> {
    const result = await this.prisma.session.deleteMany({
      where: {
        OR: [
          { expiresAt: { lt: new Date() } },
          { isActive: false },
        ],
      },
    });

    return result.count;
  }
}
