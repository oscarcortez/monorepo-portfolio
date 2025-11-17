import { Module } from '@nestjs/common';
import { AiGroqService } from './ai-groq.service';
import { AiGroqResolver } from './ai-groq.resolver';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule],
  providers: [AiGroqService, AiGroqResolver],
})
export class AiGroqModule {}
