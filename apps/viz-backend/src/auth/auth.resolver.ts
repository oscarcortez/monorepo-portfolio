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
  ): Promise<AuthResponse> {
    return await this.authService.signIn(email, password);
  }

  @UseGuards(AuthGuard)
  @Query(() => GraphQLJSONObject, { nullable: true })
  getUser(
    @Context() context: { req: Request & { user?: JwtPayload } },
  ): JwtPayload | null {
    return context.req.user ?? null;
  }
}
