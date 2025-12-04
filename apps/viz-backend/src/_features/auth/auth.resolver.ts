import { Resolver, Mutation, Args, Context, Query } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './jwt-auth.guard';
import { UseGuards } from '@nestjs/common';
import { GraphQLJSONObject } from 'graphql-type-json';
import { Public } from './public.decorator';
import type { Response } from 'express';
import { JwtPayload } from './types/jwt-payload.type';
import { AuthResponse, LogoutResponse } from './types';

@Resolver()
export class AuthResolver {
  constructor(private authService: AuthService) {}

  @Public()
  @Mutation(() => AuthResponse, { name: 'signIn' })
  async signIn(
    @Args('email') email: string,
    @Args('password') password: string,
    @Context() context: { res: Response },
  ): Promise<AuthResponse> {
    const result = await this.authService.signIn(email, password);

    // console.log(result.access_token);
    context.res.cookie('auth_token', result.access_token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });
    return { access_token: result.access_token };
  }

  @Mutation(() => LogoutResponse, { name: 'logout' })
  logout(@Context() context: { res: Response }): LogoutResponse {
    // Limpia la cookie HTTP-only
    context.res.clearCookie('auth_token', {
      httpOnly: true,
      path: '/',
      sameSite: 'lax',
    });

    // TODO: Opcional — invalida el token en base de datos
    // this.authService.invalidateToken(user.id);

    console.log('🔓 User logged out at', new Date().toISOString());

    return {
      success: true,
      message: 'Logged out successfully',
    };
  }

  @UseGuards(JwtAuthGuard)
  @Query(() => GraphQLJSONObject, { nullable: true })
  getUser(
    @Context() context: { req: Request & { user?: JwtPayload } },
  ): JwtPayload | null {
    return context.req.user ?? null;
  }
}
