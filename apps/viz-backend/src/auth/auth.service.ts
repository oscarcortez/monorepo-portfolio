import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async signIn(
    email: string,
    password: string,
  ): Promise<{ access_token: string }> {
    const user = await this.userService.findByEmail(email);
    if (user?.passwordHash !== password) {
      throw new UnauthorizedException();
    }
    const payload = { email: user.email, sub: user.userId };
    return { access_token: await this.jwtService.signAsync(payload) };
  }
}
