import {
  createParamDecorator,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { Request } from 'express';
import { User } from '@prisma/client';

interface RequestWithUser extends Request {
  user: User;
}

export const CurrentUser = createParamDecorator(
  (data: unknown, ctx: ExecutionContext): User => {
    const request = ctx.switchToHttp().getRequest<RequestWithUser>();

    if (!request.user) {
      throw new UnauthorizedException('User not found in request');
    }

    return request.user;
  },
);
