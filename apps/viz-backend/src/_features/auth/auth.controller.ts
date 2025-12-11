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
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
  ApiCookieAuth,
  ApiBody,
  ApiProperty,
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

class SignInDto {
  @ApiProperty({ example: 'user@example.com' })
  @IsEmail()
  email!: string;

  @ApiProperty({ example: 'password123' })
  @IsString()
  @MinLength(6)
  @IsNotEmpty()
  password!: string;
}

interface AuthResponse {
  access_token: string;
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
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Login with email and password' })
  @ApiBody({ type: SignInDto })
  @ApiResponse({
    status: 200,
    description: 'Successfully authenticated. Returns access token and sets auth_token cookie.',
  })
  @ApiResponse({ status: 401, description: 'Invalid credentials' })
  async signIn(
    @Body() signInDto: SignInDto,
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response,
  ): Promise<AuthResponse> {
    // Extrae IP y User-Agent para tracking de sesión
    const ipAddress = req.ip || req.socket.remoteAddress;
    const userAgent = req.headers['user-agent'];

    const result = await this.authService.signIn(
      signInDto.email,
      signInDto.password,
      undefined, // provider
      ipAddress,
      userAgent,
    );

    // console.log(result.access_token);

    res.cookie('auth_token', result.access_token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 días
    });

    return { access_token: result.access_token };
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('JWT-auth')
  @ApiCookieAuth('auth_token')
  @Post('logout')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Logout and clear auth cookie' })
  @ApiResponse({
    status: 200,
    description: 'Successfully logged out',
  })
  async logout(
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response,
  ): Promise<LogoutResponse> {
    // Extrae el token de la request
    const token = this.extractToken(req);

    if (token) {
      // 🔐 Invalida la sesión en la base de datos
      await this.authService.invalidateSession(token);
      this.logger.log(`Session invalidated for token: ${token.substring(0, 10)}...`);
    }

    // Limpiar cookie del navegador
    res.clearCookie('auth_token', {
      httpOnly: true,
      path: '/',
      sameSite: 'lax',
    });

    this.logger.log('🔓 User logged out at ' + new Date().toISOString());

    return {
      success: true,
      message: 'Logged out successfully',
    };
  }

  /**
   * Extrae el token de la request (header o cookie)
   */
  private extractToken(req: Request): string | null {
    // 1. Intenta desde Authorization header
    const [type, token] = req.headers.authorization?.split(' ') ?? [];
    if (type === 'Bearer' && token) {
      return token;
    }

    // 2. Intenta desde cookie
    const cookieToken = (req as any).cookies?.['auth_token'];
    return cookieToken || null;
  }

  @Public()
  @Get('google')
  @UseGuards(AuthGuard('google'))
  googleAuth() {
    // Inicia el flujo de Google
    this.logger.log('Google auth initiated');
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('JWT-auth')
  @ApiCookieAuth('auth_token')
  @ApiOperation({ summary: 'Get current user information' })
  @ApiResponse({
    status: 200,
    description: 'Returns the current authenticated user',
  })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @Get('me')
  getUser(@Req() req: Request & { user?: JwtPayload }): UserResponse {
    return {
      user: req.user ?? null,
    };
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('JWT-auth')
  @ApiCookieAuth('auth_token')
  @ApiOperation({ summary: 'Check authentication status' })
  @ApiResponse({
    status: 200,
    description: 'Returns authentication status and user data',
  })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @Get('check')
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
  async googleAuthRedirect(
    @CurrentUser() user: User,
    @Req() req: Request,
    @Res() res: Response,
  ) {
    this.logger.log('✅ Google callback received');
    this.logger.log(`User: ${JSON.stringify(user)}`);
    const adminUrl =
      process.env.NEXT_PUBLIC_ADMIN_URL || 'http://localhost:3020';
    try {
      // Extrae IP y User-Agent para tracking de sesión
      const ipAddress = req.ip || req.socket.remoteAddress;
      const userAgent = req.headers['user-agent'];

      const { access_token } = await this.authService.signIn(
        user.email,
        '123',
        'google',
        ipAddress,
        userAgent,
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
