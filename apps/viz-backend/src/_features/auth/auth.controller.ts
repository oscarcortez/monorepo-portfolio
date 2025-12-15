import {
  Controller,
  Post,
  Get,
  Body,
  Res,
  Req,
  HttpCode,
  HttpStatus,
  UseGuards,
  Logger,
  UnauthorizedException,
  // Headers,
} from '@nestjs/common';
import {
  ApiTags,
  // ApiOperation,
  // ApiResponse,
  // ApiBearerAuth,
  // ApiCookieAuth,
  // ApiBody,
  ApiProperty,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { User } from '@prisma/client';

import { CurrentUser } from './decorators/current-user.decorator';
import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

import { Response, Request } from 'express';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './jwt-auth.guard';
import { Public } from './public.decorator';
import { JwtPayload } from './types/jwt-payload.type';
import { Token } from './decorators/token.decorator';
import { randomBytes } from 'crypto';
import { UserService } from 'src/_models/user/user.service';
// import { NotAuthenticatedGuard } from './guards/not-authenticated.guard';

class SignInDto {
  @ApiProperty({ example: 'oscarkortez@gmail.com' })
  @IsEmail()
  email!: string;

  @ApiProperty({ example: '123456' })
  @IsString()
  @MinLength(6)
  @IsNotEmpty()
  password!: string;
}

interface AuthResponse {
  // access_token: string;
  exchangeCode: string;
}

interface LogoutResponse {
  success: boolean;
  message: string;
}

interface UserResponse {
  user: JwtPayload | null;
}

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  private exchangeCodes = new Map<
    string,
    { token: string; expiresAt: number }
  >();
  private readonly logger = new Logger(AuthController.name);
  constructor(
    private authService: AuthService,
    private userService: UserService,
  ) {}

  @Public()
  @Post('login')
  @ApiBearerAuth('JWT-auth')
  // @UseGuards(NotAuthenticatedGuard)
  @HttpCode(HttpStatus.OK)
  async signIn(
    @Body() signInDto: SignInDto,
    @Req() req: Request,
    // @Res({ passthrough: true }) res: Response,
  ): Promise<AuthResponse> {
    const userAgent = req.headers['user-agent'] || undefined;
    const ipAddress = (req.ip ||
      req.headers['x-forwarded-for'] ||
      undefined) as string;

    const result = await this.authService.signIn(
      signInDto.email,
      signInDto.password,
      userAgent,
      ipAddress,
    );

    const exchangeCode = randomBytes(16).toString('hex');
    this.exchangeCodes.set(exchangeCode, {
      token: result.access_token,
      expiresAt: Date.now() + 60000, // 1 minuto
    });

    this.cleanExpiredCodes();
    // res.cookie('auth_token', result.access_token, {
    //   httpOnly: true,
    //   secure: process.env.NODE_ENV === 'production',
    //   sameSite: 'lax',
    //   path: '/',
    //   maxAge: 7 * 24 * 60 * 60 * 1000,
    // });

    // return { access_token: result.access_token };

    return { exchangeCode };
  }

  private cleanExpiredCodes() {
    const now = Date.now();

    for (const [code, data] of this.exchangeCodes.entries()) {
      if (data.expiresAt < now) {
        this.exchangeCodes.delete(code);
      }
    }
  }

  @Public()
  @Post('exchange')
  @HttpCode(HttpStatus.OK)
  exchangeCode(
    @Body() body: { code: string },
    @Res({ passthrough: true }) res: Response,
  ): { success: boolean } {
    const data = this.exchangeCodes.get(body.code);

    if (!data || data.expiresAt < Date.now()) {
      throw new UnauthorizedException('Invalid or expired code');
    }

    // Elimina el código (un solo uso)
    this.exchangeCodes.delete(body.code);

    // Establece la cookie
    res.cookie('auth_token', data.token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return { success: true };
  }

  @ApiBearerAuth('JWT-auth')
  @Post('logout')
  @HttpCode(HttpStatus.OK)
  async logout(
    @Token() token: string | undefined,
    @Res({ passthrough: true }) res: Response,
  ): Promise<LogoutResponse> {
    console.log('Logout called');
    // Limpiar cookie
    res.clearCookie('auth_token', {
      httpOnly: true,
      path: '/',
      sameSite: 'lax',
    });

    if (token) {
      await this.authService.revokeSessionByToken(token);
    }

    console.log('🔓 User logged out at', new Date().toISOString());

    return {
      success: true,
      message: 'Logged out successfully',
    };
  }

  @Public()
  @Get('google')
  @UseGuards(AuthGuard('google'))
  googleAuth() {
    // Inicia el flujo de Google
    this.logger.log('Google auth initiated');
  }

  @ApiBearerAuth('JWT-auth')
  @UseGuards(JwtAuthGuard)
  @Get('me')
  getUser(@Req() req: Request & { user?: JwtPayload }): UserResponse {
    return {
      user: req.user ?? null,
    };
  }

  @Get('check')
  @ApiBearerAuth('JWT-auth')
  @UseGuards(JwtAuthGuard)
  checkAuth(@Req() req: Request & { user?: JwtPayload }): {
    authenticated: boolean;
    user: JwtPayload | null;
  } {
    return {
      authenticated: !!req.user,
      user: req.user ?? null,
    };
  }

  @Get('validate')
  @ApiBearerAuth('JWT-auth')
  @UseGuards(JwtAuthGuard)
  async validate(
    @CurrentUser() user?: JwtPayload,
  ): Promise<{ id: string; email: string; name?: string }> {
    if (!user?.sub) {
      throw new UnauthorizedException('Invalid token');
    }

    const fullUser = await this.userService.getUserByUuid(user.sub);

    if (!fullUser) {
      throw new UnauthorizedException('User not found');
    }

    return {
      id: fullUser.uuid,
      email: fullUser.email,
      name: fullUser.username ?? undefined,
    };
  }

  @Public()
  @Get('google/callback')
  @UseGuards(AuthGuard('google'))
  async googleAuthRedirect(@CurrentUser() user: User, @Res() res: Response) {
    this.logger.log('✅ Google callback received');
    this.logger.log(`User: ${JSON.stringify(user)}`);
    const adminUrl =
      process.env.NEXT_PUBLIC_ADMIN_URL || 'http://localhost:3020';
    try {
      const { access_token } = await this.authService.signIn(
        user.email,
        '123',
        'google',
      );

      const redirectUrl = `${adminUrl}/auth/callback?auth_token=${access_token}`;
      this.logger.log(`↪️  Redirecting to: ${redirectUrl}`);
      res.redirect(redirectUrl);
    } catch (error) {
      this.logger.error('Google auth failed', error);
      res.redirect(`${adminUrl}/auth/callback?error=AuthenticationFailed`);
    }
  }
}
