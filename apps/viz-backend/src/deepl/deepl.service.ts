import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as deepl from 'deepl-node';

@Injectable()
export class DeeplService implements OnModuleInit {
  private readonly logger = new Logger(DeeplService.name);
  private translator: deepl.Translator;

  constructor(private configService: ConfigService) {}

  async onModuleInit() {
    const authKey = this.configService.get<string>('DEEPL_API_KEY');

    if (!authKey) {
      throw new Error('DEEPL_API_KEY environment variable not defined');
    }

    const serverUrl = this.configService.get<string>('DEEPL_SERVER_URL');

    this.translator = new deepl.Translator(authKey, {
      serverUrl: serverUrl,
    });

    // Log usage on startup
    try {
      const usage = await this.translator.getUsage();
      this.logger.log(`DeepL initialized. Usage: ${JSON.stringify(usage)}`);
    } catch (error) {
      this.logger.error('Failed to get DeepL usage', error);
    }
  }

  /**
   * Translate text to target language
   */
  async translateText(
    text: string,
    targetLang: deepl.TargetLanguageCode,
    sourceLang?: deepl.SourceLanguageCode | null,
  ): Promise<string> {
    try {
      const result: deepl.TextResult = await this.translator.translateText(
        text,
        sourceLang || null,
        targetLang,
      );
      return result.text;
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : String(error);
      this.logger.error(`Translation failed: ${message}`, error);
      throw error;
    }
  }

  /**
   * Translate multiple texts
   */
  async translateTexts(
    texts: string[],
    targetLang: deepl.TargetLanguageCode,
    sourceLang?: deepl.SourceLanguageCode | null,
  ): Promise<string[]> {
    try {
      const results: deepl.TextResult[] = await this.translator.translateText(
        texts,
        sourceLang || null,
        targetLang,
      );
      return results.map((result) => result.text);
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : String(error);
      this.logger.error(`Batch translation failed: ${message}`, error);
      throw error;
    }
  }

  /**
   * Translate with detailed result
   */
  async translateWithDetails(
    text: string,
    targetLang: deepl.TargetLanguageCode,
    sourceLang?: deepl.SourceLanguageCode | null,
  ): Promise<deepl.TextResult> {
    try {
      const result: deepl.TextResult = await this.translator.translateText(
        text,
        sourceLang || null,
        targetLang,
      );
      return result;
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : String(error);
      this.logger.error(`Translation with details failed: ${message}`, error);
      throw error;
    }
  }

  /**
   * Get current API usage
   */
  async getUsage(): Promise<deepl.Usage> {
    try {
      return await this.translator.getUsage();
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : String(error);
      this.logger.error(`Failed to get usage: ${message}`, error);
      throw error;
    }
  }

  /**
   * Get available source languages
   */
  async getSourceLanguages(): Promise<readonly deepl.Language[]> {
    try {
      return await this.translator.getSourceLanguages();
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : String(error);
      this.logger.error(`Failed to get source languages: ${message}`, error);
      throw error;
    }
  }

  /**
   * Get available target languages
   */
  async getTargetLanguages(): Promise<readonly deepl.Language[]> {
    try {
      return await this.translator.getTargetLanguages();
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : String(error);
      this.logger.error(`Failed to get target languages: ${message}`, error);
      throw error;
    }
  }

  /**
   * Translate document
   */
  async translateDocument(
    inputPath: string,
    outputPath: string,
    targetLang: deepl.TargetLanguageCode,
    sourceLang?: deepl.SourceLanguageCode | null,
  ): Promise<void> {
    try {
      await this.translator.translateDocument(
        inputPath,
        outputPath,
        sourceLang || null,
        targetLang,
      );
      this.logger.log(`Document translated: ${inputPath} -> ${outputPath}`);
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : String(error);
      this.logger.error(`Document translation failed: ${message}`, error);
      throw error;
    }
  }
}
