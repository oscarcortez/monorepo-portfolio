import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { Logger } from '@nestjs/common';
import { DeeplService } from './deepl.service';
import * as deepl from 'deepl-node';

// DTOs/Types para GraphQL
import { Field, ObjectType, InputType } from '@nestjs/graphql';

// ============= GraphQL Types =============

@ObjectType()
class TranslationResult {
  @Field()
  translatedText!: string;

  @Field({ nullable: true })
  detectedSourceLanguage?: string;
}

@ObjectType()
class LanguageInfo {
  @Field()
  code!: string;

  @Field()
  name!: string;

  @Field({ nullable: true })
  supportsFormality?: boolean;
}

@ObjectType()
class UsageInfo {
  @Field()
  characterCount!: number;

  @Field({ nullable: true })
  characterLimit?: number;

  @Field({ nullable: true })
  documentCount?: number;

  @Field({ nullable: true })
  documentLimit?: number;

  @Field({ nullable: true })
  teamDocumentCount?: number;

  @Field({ nullable: true })
  teamDocumentLimit?: number;
}

@InputType()
class TranslateTextInput {
  @Field()
  text!: string;

  @Field()
  targetLang!: string;

  @Field({ nullable: true })
  sourceLang?: string;

  @Field({ nullable: true })
  preserveFormatting?: boolean;

  @Field({ nullable: true })
  formality?: string; // 'default' | 'more' | 'less' | 'prefer_more' | 'prefer_less'
}

@InputType()
class TranslateTextsInput {
  @Field(() => [String])
  texts!: string[];

  @Field()
  targetLang!: string;

  @Field({ nullable: true })
  sourceLang?: string;
}

@Resolver()
export class DeeplResolver {
  private readonly logger = new Logger(DeeplResolver.name);

  constructor(private readonly deeplService: DeeplService) {}

  /**
   * Translate a single text
   */
  @Mutation(() => TranslationResult)
  async translateText(
    @Args('input') input: TranslateTextInput,
  ): Promise<TranslationResult> {
    this.logger.log(
      `Translating text to ${input.targetLang}${input.sourceLang ? ` from ${input.sourceLang}` : ''}`,
    );

    try {
      const result = await this.deeplService.translateWithDetails(
        input.text,
        input.targetLang as deepl.TargetLanguageCode,
        input.sourceLang as deepl.SourceLanguageCode | undefined,
      );

      return {
        translatedText: result.text,
        detectedSourceLanguage: result.detectedSourceLang,
      };
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error);
      this.logger.error(`Translation failed: ${message}`, error);
      throw new Error(`Translation failed: ${message}`);
    }
  }

  /**
   * Translate multiple texts
   */
  @Mutation(() => [String])
  async translateTexts(
    @Args('input') input: TranslateTextsInput,
  ): Promise<string[]> {
    this.logger.log(
      `Translating ${input.texts.length} texts to ${input.targetLang}`,
    );

    try {
      return await this.deeplService.translateTexts(
        input.texts,
        input.targetLang as deepl.TargetLanguageCode,
        input.sourceLang as deepl.SourceLanguageCode | undefined,
      );
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error);
      this.logger.error(`Batch translation failed: ${message}`, error);
      throw new Error(`Batch translation failed: ${message}`);
    }
  }

  /**
   * Get available source languages
   */
  @Query(() => [LanguageInfo])
  async getSourceLanguages(): Promise<LanguageInfo[]> {
    this.logger.log('Fetching source languages');

    try {
      const languages = await this.deeplService.getSourceLanguages();
      return languages.map((lang) => ({
        code: lang.code,
        name: lang.name,
        supportsFormality: lang.supportsFormality,
      }));
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error);
      this.logger.error(`Failed to fetch source languages: ${message}`, error);
      throw new Error(`Failed to fetch source languages: ${message}`);
    }
  }

  /**
   * Get available target languages
   */
  @Query(() => [LanguageInfo])
  async getTargetLanguages(): Promise<LanguageInfo[]> {
    this.logger.log('Fetching target languages');

    try {
      const languages = await this.deeplService.getTargetLanguages();
      return languages.map((lang) => ({
        code: lang.code,
        name: lang.name,
        supportsFormality: lang.supportsFormality,
      }));
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error);
      this.logger.error(`Failed to fetch target languages: ${message}`, error);
      throw new Error(`Failed to fetch target languages: ${message}`);
    }
  }

  /**
   * Get current API usage statistics
   */
  @Query(() => UsageInfo)
  async getDeeplUsage(): Promise<UsageInfo> {
    this.logger.log('Fetching DeepL usage statistics');

    try {
      const usage = await this.deeplService.getUsage();

      return {
        characterCount: usage.character?.count || 0,
        characterLimit: usage.character?.limit,
        documentCount: usage.document?.count,
        documentLimit: usage.document?.limit,
        teamDocumentCount: usage.teamDocument?.count,
        teamDocumentLimit: usage.teamDocument?.limit,
      };
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error);
      this.logger.error(`Failed to fetch usage: ${message}`, error);
      throw new Error(`Failed to fetch usage: ${message}`);
    }
  }

  /**
   * Health check for DeepL service
   */
  @Query(() => Boolean)
  async isDeeplHealthy(): Promise<boolean> {
    try {
      await this.deeplService.getUsage();
      return true;
    } catch (error) {
      this.logger.error('DeepL health check failed', error);
      return false;
    }
  }
}
