import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { Prisma, Template } from '@prisma/client';

@Injectable()
export class TemplateService {
  constructor(private prisma: PrismaService) {}

  async findAll(): Promise<Template[]> {
    return this.prisma.template.findMany();
  }

  async templates(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.TemplateWhereUniqueInput;
    where?: Prisma.TemplateWhereInput;
    orderBy?: Prisma.TemplateOrderByWithRelationInput;
  }): Promise<Template[]> {
    const { skip, take, cursor, where, orderBy } = params;
    return this.prisma.template.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
    });
  }

  async createTemplate(data: Prisma.TemplateCreateInput): Promise<Template> {
    return this.prisma.template.create({
      data,
    });
  }

  async getTemplateById(templateId: number): Promise<Template | null> {
    return this.prisma.template.findUnique({ where: { templateId } });
  }

  async getTemplateByUuid(uuid: string): Promise<Template | null> {
    return this.prisma.template.findUnique({ where: { uuid } });
  }

  async updateTemplate(params: {
    where: Prisma.TemplateWhereUniqueInput;
    data: Prisma.TemplateUpdateInput;
  }): Promise<Template> {
    const { where, data } = params;
    return this.prisma.template.update({
      data,
      where,
    });
  }

  async deleteTemplate(
    where: Prisma.TemplateWhereUniqueInput,
  ): Promise<Template> {
    return this.prisma.template.delete({
      where,
    });
  }
}
