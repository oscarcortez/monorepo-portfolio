import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { Request } from 'express';

export const Token = createParamDecorator(
  (_data: unknown, ctx: ExecutionContext): string | undefined => {
    const request = ctx.switchToHttp().getRequest<Request>();

    const fromCookie = request.cookies?.['auth_token'] as string | undefined;
    const fromHeader = request.headers.authorization?.replace('Bearer ', '');

    return fromCookie || fromHeader;
  },
);
