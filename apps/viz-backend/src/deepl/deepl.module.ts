import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DeeplService } from './deepl.service';
import { DeeplResolver } from './deepl.resolver';

@Module({
  imports: [ConfigModule],
  providers: [DeeplService, DeeplResolver],
})
export class DeeplModule {}
