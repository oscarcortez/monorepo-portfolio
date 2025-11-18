import { Module } from '@nestjs/common';
import { EmailResendService } from './email-resend.service';
import { EmailResendResolver } from './email-resend.resolver';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule],
  providers: [EmailResendResolver, EmailResendService],
  exports: [EmailResendService],
})
export class EmailResendModule {}
