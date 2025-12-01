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

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async validateGoogleUser(googleUser: GoogleUser): Promise<User> {
    return this.userService.validateGoogleUser(googleUser);
  }

  async signIn(
    email: string,
    password?: string,
    provider?: string,
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
      return { access_token: await this.jwtService.signAsync(payload) };
    }

    if (
      password &&
      (await comparePassword(password, user?.passwordHash || '')) === false
    ) {
      throw new UnauthorizedException('Invalid credentials');
    }

    // const payload = { email: user.email, sub: user.userId };
    return { access_token: await this.jwtService.signAsync(payload) };
  }
}
