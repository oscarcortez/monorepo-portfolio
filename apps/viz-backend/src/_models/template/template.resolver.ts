import { Resolver, Query, Args } from '@nestjs/graphql';
import { TemplateService } from './template.service';
import { Template } from '../../prisma-generate/template/template.model';

@Resolver(() => Template)
export class TemplateResolver {
  constructor(private readonly templateService: TemplateService) {}

  @Query(() => [Template], { name: 'templates' })
  findAll(): Promise<Template[]> {
    return this.templateService.findAll();
  }

  @Query(() => Template, { name: 'template', nullable: true })
  async getTemplateByUuid(
    @Args('uuid') uuid: string,
  ): Promise<Template | null> {
    return this.templateService.getTemplateByUuid(uuid);
  }
}
