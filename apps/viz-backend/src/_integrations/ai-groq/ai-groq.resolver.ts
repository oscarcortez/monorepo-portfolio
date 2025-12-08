import { Resolver, Mutation, Args } from '@nestjs/graphql';
import {
  Logger,
  UsePipes,
  ValidationPipe,
  UseInterceptors,
} from '@nestjs/common';
import { AiGroqService } from './ai-groq.service';
import { GenerateTextInput, GenerateTextResponse } from './types';
import { PromptLoggingInterceptor } from './interceptors/prompt-logging.interceptor';

@Resolver()
export class AiGroqResolver {
  private readonly logger = new Logger(AiGroqResolver.name);

  constructor(private readonly aiGroqService: AiGroqService) {}

  @Mutation(() => GenerateTextResponse)
  @UseInterceptors(PromptLoggingInterceptor)
  @UsePipes(new ValidationPipe({ transform: true }))
  async generateText(
    @Args('input') input: GenerateTextInput,
  ): Promise<GenerateTextResponse> {
    try {
      this.logger.log(`Generating text with model: ${input.model}`);

      return await this.aiGroqService.generateText({
        prompt: input.prompt,
        model: input.model,
        temperature: input.temperature,
        maxOutputTokens: input.maxOutputTokens,
      });
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : String(error);
      this.logger.error(`Failed to generate text: ${message}`, error);

      return {
        success: false,
        error: message,
      };
    }
  }
}
