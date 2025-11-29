import { Controller, Get, Res, UseGuards, Logger } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Response } from 'express';
import { User } from '@prisma/client';
import { AuthService } from './auth.service';
import { CurrentUser } from './decorators/current-user.decorator';
import { Public } from './public.decorator';

@Controller('auth')
export class AuthController {
  private readonly logger = new Logger(AuthController.name);
  constructor(private authService: AuthService) {}

  @Public()
  @Get('google')
  @UseGuards(AuthGuard('google'))
  googleAuth() {
    // Inicia el flujo de Google
    this.logger.log('Google auth initiated');
  }

  @Public()
  @Get('google/callback')
  @UseGuards(AuthGuard('google'))
  async googleAuthRedirect(@CurrentUser() user: User, @Res() res: Response) {
    this.logger.log('✅ Google callback received');
    this.logger.log(`User: ${JSON.stringify(user)}`);

    try {
      const { access_token } = await this.authService.signIn(
        user.email,
        '123',
        'google',
      );
      const redirectUrl = `http://localhost:3020/auth/callback?auth_token=${access_token}`;
      this.logger.log(`↪️  Redirecting to: ${redirectUrl}`);
      res.redirect(redirectUrl);
    } catch (error) {
      this.logger.error('Google auth failed', error);
      res.redirect(
        `http://localhost:3020/auth/callback?error=AuthenticationFailed`,
      );
    }
  }
}
