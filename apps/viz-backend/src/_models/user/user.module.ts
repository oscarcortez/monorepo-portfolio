import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserResolver } from './user.resolver';
import { PrismaService } from '../../prisma.service';

@Module({
  providers: [PrismaService, UserService, UserResolver],
  exports: [UserService], // Exporta UserService para que otros módulos puedan usarlo
})
export class UserModule {}
