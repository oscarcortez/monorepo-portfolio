import { Module } from '@nestjs/common';
import { TemplateService } from './template.service';
import { TemplateResolver } from './template.resolver';
import { PrismaService } from '../prisma.service';

@Module({
  providers: [TemplateService, TemplateResolver, PrismaService],
})
export class TemplateModule {}
