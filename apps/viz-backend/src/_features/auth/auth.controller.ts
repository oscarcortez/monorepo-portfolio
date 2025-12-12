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
import { NotAuthenticatedGuard } from './guards/not-authenticated.guard';

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

class ExchangeCodeDto {
  @ApiProperty({ example: 'abc123...' })
  @IsString()
  @IsNotEmpty()
  code!: string;
}

interface AuthResponse {
  access_token: string;
}

interface AuthCodeResponse {
  code: string;
  expires_in: number;
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
  private readonly logger = new Logger(AuthController.name);
  constructor(private authService: AuthService) {}

  @Public()
  @Post('login')
  @ApiBearerAuth('JWT-auth')
  @UseGuards(NotAuthenticatedGuard)
  @HttpCode(HttpStatus.OK)
  async signIn(
    @Body() signInDto: SignInDto,
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response,
  ): Promise<AuthCodeResponse> {
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

    // Generar código temporal en lugar de devolver el token directamente
    const code = this.authService.generateAuthCode(result.access_token);

    this.logger.log(
      `🔑 Generated auth code for ${signInDto.email} (expires in 60s)`,
    );

    return {
      code,
      expires_in: 60, // segundos
    };
  }

  @Public()
  @Post('exchange-code')
  @HttpCode(HttpStatus.OK)
  async exchangeCode(
    @Body() exchangeCodeDto: ExchangeCodeDto,
    @Res({ passthrough: true }) res: Response,
  ): Promise<AuthResponse> {
    this.logger.log('🔄 Exchanging authorization code for token');

    const token = await this.authService.exchangeAuthCode(
      exchangeCodeDto.code,
    );

    // Setear cookie httpOnly con el token
    res.cookie('auth_token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    this.logger.log('✅ Token exchanged successfully');

    return { access_token: token };
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
