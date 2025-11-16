import { Module } from '@nestjs/common';
import { WasenderService } from './wasender.service';
import { WasenderResolver } from './wasender.resolver';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule],
  providers: [WasenderService, WasenderResolver],
})
export class WasenderModule {}
