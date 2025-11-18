import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { groq } from '@ai-sdk/groq';
import { generateText } from 'ai';

export interface GenerateTextOptions {
  prompt: string;
  model?: string;
  temperature?: number;
  maxOutputTokens?: number;
}

export interface GenerateTextResponse {
  success: boolean;
  text?: string;
  error?: string;
  usage?: {
    inputTokens: number;
    outputTokens: number;
  };
}

@Injectable()
export class AiGroqService implements OnModuleInit {
  private readonly logger = new Logger(AiGroqService.name);
  // private groqApiKey: string | undefined;
  private defaultModel: string;

  constructor(private configService: ConfigService) {}
  onModuleInit() {
    const groqApiKey = this.configService.get<string>('GROQ_API_KEY');
    this.defaultModel =
      this.configService.get<string>('GROQ_MODEL') || 'llama-3.3-70b-versatile';
    if (!groqApiKey) {
      throw new Error('GROQ_API_KEY not configured in environment variables');
    }

    this.logger.log(
      `Groq service initialized with model: ${this.defaultModel}`,
    );
  }

  async generateText(
    options: GenerateTextOptions,
  ): Promise<GenerateTextResponse> {
    try {
      this.logger.log(
        `Generating text with prompt: "${options.prompt.substring(0, 50)}..."`,
      );

      const modelName = options.model || this.defaultModel;

      const result = await generateText({
        model: groq(modelName),
        prompt: options.prompt,
        temperature: options.temperature || 0.7,
        maxOutputTokens: options.maxOutputTokens || 1024,
      });

      this.logger.log(`Text generated successfully`);
      this.logger.debug(
        `Usage - Input: ${result.usage?.inputTokens}, Output: ${result.usage?.outputTokens}`,
      );

      return {
        success: true,
        text: result.text,
        usage: {
          inputTokens: result.usage?.inputTokens || 0,
          outputTokens: result.usage?.outputTokens || 0,
        },
      };
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
