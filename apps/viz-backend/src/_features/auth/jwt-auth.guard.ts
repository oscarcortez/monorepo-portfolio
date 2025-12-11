import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Reflector } from '@nestjs/core';
import { jwtConstants } from './constants';
import { Request } from 'express';
import { GqlExecutionContext } from '@nestjs/graphql';
import { IS_PUBLIC_KEY } from './public.decorator';

type JwtPayload = {
  sub?: number;
  username?: string;
  iat?: number;
  exp?: number;
  [k: string]: any;
};

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(
    private jwtService: JwtService,
    private reflector: Reflector,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (isPublic) {
      return true;
    }

    // Soporta HTTP y GraphQL
    const ctx = GqlExecutionContext.create(context);
    const gqlCtx = ctx.getContext<{ req?: Request }>();
    const request = (gqlCtx?.req ??
      context.switchToHttp().getRequest<Request>()) as Request & {
      user?: JwtPayload;
    };
    const token = this.extractTokenFromHeader(request);
    if (!token) {
      throw new UnauthorizedException();
    }
    try {
      const payload = await this.jwtService.verifyAsync<JwtPayload>(token, {
        secret: jwtConstants.secret,
      });
      request.user = payload;
    } catch {
      throw new UnauthorizedException();
    }
    return true;
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    // 1. Intenta obtener desde Authorization header
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    if (type === 'Bearer' && token) {
      return token;
    }

    // 2. Si no está en header, busca en cookies
    const cookieToken = request.cookies?.['auth_token'];
    return cookieToken;
  }
}
