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

@Injectable()
export class AuthService {
  invalidateToken(token: string) {
    throw new Error('Method not implemented.');
  }
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
    private sessionService: SessionService,
  ) {}

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
}
