import {
  Injectable,
  CanActivate,
  ExecutionContext,
  ConflictException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { SessionService } from 'src/_models/session/session.service';

@Injectable()
export class NotAuthenticatedGuard implements CanActivate {
  constructor(
    private jwtService: JwtService,
    private sessionService: SessionService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<Request>();
    const token =
      (request.cookies?.['auth_token'] as string | undefined) ||
      request.headers.authorization?.replace('Bearer ', '');

    if (!token) return true;

    const isValidToken = this.isTokenValid(token);
    if (!isValidToken) return true;

    const isActive = await this.sessionService.isTokenActive(token);
    if (isActive) {
      throw new ConflictException('Ya tienes una sesión activa');
    }

    return true;
  }

  private isTokenValid(token: string): boolean {
    try {
      this.jwtService.verify(token);
      return true;
    } catch {
      return false;
    }
  }
}
