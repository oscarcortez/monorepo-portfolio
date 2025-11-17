import { Resolver, Mutation, Args, Int, Float } from '@nestjs/graphql';
import { Logger } from '@nestjs/common';
import { AiGroqService, GenerateTextResponse } from './ai-groq.service';
import { Field, ObjectType, InputType } from '@nestjs/graphql';

@ObjectType()
class TokenUsage {
  @Field(() => Int)
  inputTokens: number;

  @Field(() => Int)
  outputTokens: number;
}

@ObjectType()
class GenerateTextResponseType {
  @Field()
  success: boolean;

  @Field({ nullable: true })
  text?: string;

  @Field({ nullable: true })
  error?: string;

  @Field(() => TokenUsage, { nullable: true })
  usage?: TokenUsage;
}

@InputType()
class GenerateTextInput {
  @Field()
  prompt: string;

  @Field({ nullable: true })
  model?: string;

  @Field(() => Float, { nullable: true })
  temperature?: number;

  @Field(() => Int, { nullable: true })
  maxOutputTokens?: number;
}

@Resolver()
export class AiGroqResolver {
  private readonly logger = new Logger(AiGroqResolver.name);

  constructor(private readonly aiGroqService: AiGroqService) {}

  @Mutation(() => GenerateTextResponseType)
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
