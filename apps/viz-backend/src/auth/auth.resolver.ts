import {
  Resolver,
  Mutation,
  Args,
  ObjectType,
  Field,
  Context,
  Query,
} from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { AuthGuard } from './auth.guard';
import { UseGuards } from '@nestjs/common';
// import { User } from '../generated/prisma-graphql/user/user.model';
import { GraphQLJSONObject } from 'graphql-type-json';
import { Public } from './public.decorator';
import type { Response } from 'express';

type JwtPayload = {
  sub?: number;
  email?: string;
  [k: string]: any;
};

@ObjectType()
export class AuthResponse {
  @Field()
  access_token!: string;
}

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

    context.res.cookie('auth_token', result.access_token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });
    return { access_token: result.access_token };
  }

  @UseGuards(AuthGuard)
  @Query(() => GraphQLJSONObject, { nullable: true })
  getUser(
    @Context() context: { req: Request & { user?: JwtPayload } },
  ): JwtPayload | null {
    return context.req.user ?? null;
  }
}
