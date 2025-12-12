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
import { SessionService } from 'src/_models/session/session.service';
import { randomBytes } from 'crypto';

interface TempAuthCode {
  token: string;
  expiresAt: number;
  used: boolean;
}

@Injectable()
export class AuthService {
  // Store temporal para códigos de autorización (en producción usar Redis)
  private authCodes = new Map<string, TempAuthCode>();

  invalidateToken(token: string) {
    throw new Error('Method not implemented.');
  }

  constructor(
    private userService: UserService,
    private jwtService: JwtService,
    private sessionService: SessionService,
  ) {
    // Limpiar códigos expirados cada minuto
    setInterval(() => this.cleanExpiredCodes(), 60000);
  }

  async validateGoogleUser(googleUser: GoogleUser): Promise<User> {
    return this.userService.validateGoogleUser(googleUser);
  }

  async signIn(
    email: string,
    password?: string,
    provider?: string,
    browser?: string,
    os?: string,
    device?: string,
    userAgent?: string,
  ): Promise<{ access_token: string }> {
    const user = await this.userService.findByEmail(email);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    if (user.deletedAt !== null) {
      throw new UnauthorizedException('User account is deleted');
    }

    const payload = { email: user.email, sub: user.uuid };
    if (provider && provider === 'google') {
      const accessToken = await this.jwtService.signAsync(payload);
      await this.sessionService.createSession({
        token: accessToken,
        userId: user.userId,
        browser,
        os,
        device,
        userAgent,
        expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      });
      // await this.sessionService.createSession(user.userId, accessToken);
      return { access_token: accessToken };
    }

    if (
      password &&
      (await comparePassword(password, user?.passwordHash || '')) === false
    ) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const accessToken = await this.jwtService.signAsync(payload);
    await this.sessionService.createSession({
      token: accessToken,
      userId: user.userId,
      browser,
      os,
      device,
      userAgent,
      expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    });
    return { access_token: accessToken };
  }

  async revokeSessionByToken(token: string): Promise<void> {
    await this.sessionService.revokeSessionByToken(token);
  }

  /**
   * Genera un código temporal de autorización que puede ser intercambiado por el token JWT
   * El código expira en 60 segundos y solo puede usarse una vez
   */
  generateAuthCode(accessToken: string): string {
    const code = randomBytes(32).toString('hex');
    const expiresAt = Date.now() + 60000; // 60 segundos

    this.authCodes.set(code, {
      token: accessToken,
      expiresAt,
      used: false,
    });

    return code;
  }

  /**
   * Intercambia un código temporal por el token JWT
   * El código se marca como usado y no puede volver a utilizarse
   */
  async exchangeAuthCode(code: string): Promise<string> {
    const authCode = this.authCodes.get(code);

    if (!authCode) {
      throw new UnauthorizedException('Invalid or expired authorization code');
    }

    if (authCode.used) {
      // Si el código ya fue usado, es un intento de replay attack
      this.authCodes.delete(code);
      throw new UnauthorizedException('Authorization code already used');
    }

    if (Date.now() > authCode.expiresAt) {
      this.authCodes.delete(code);
      throw new UnauthorizedException('Authorization code expired');
    }

    // Marcar como usado y devolver el token
    authCode.used = true;
    const token = authCode.token;

    // Eliminar el código después de usarlo
    this.authCodes.delete(code);

    return token;
  }

  /**
   * Limpia códigos expirados del almacenamiento
   */
  private cleanExpiredCodes(): void {
    const now = Date.now();
    for (const [code, authCode] of this.authCodes.entries()) {
      if (now > authCode.expiresAt || authCode.used) {
        this.authCodes.delete(code);
      }
    }
  }
}
