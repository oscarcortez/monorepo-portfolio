import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { ConfigService } from '@nestjs/config';
import { readFile, access, constants } from 'fs/promises';
import { basename } from 'path';
import { lookup } from 'mime-types';

interface UploadOptions {
  contentType?: string;
  upsert?: boolean;
  cacheControl?: string;
}

@Injectable()
export class SupabaseStorageService implements OnModuleInit {
  private readonly logger = new Logger(SupabaseStorageService.name);
  private supabase!: SupabaseClient;
  private bucket = 'monorepo-portfolio'; // nombre de tu bucket
  constructor(private configService: ConfigService) {}

  onModuleInit(): void {
    const supabaseUrl = this.configService.getOrThrow<string>('SUPABASE_URL');
    const supabaseServiceKey = this.configService.getOrThrow<string>(
      'SUPABASE_SERVICE_KEY',
    );

    this.supabase = createClient(supabaseUrl, supabaseServiceKey, {
      auth: {
        autoRefreshToken: false,
        persistSession: false,
      },
    }) as SupabaseClient;

    this.logger.log('Supabase storage client initialized successfully');
  }

  async uploadFromPath(
    filePath: string,
    storagePath?: string,
    options?: UploadOptions,
  ): Promise<string> {
    try {
      await access(filePath, constants.R_OK).catch(() => {
        throw new Error(`File not found or not readable: ${filePath}`);
      });

      const fileBuffer = await readFile(filePath);
      const detectedMimeType = (lookup as (path: string) => string | false)(
        filePath,
      );
      const contentType: string =
        options?.contentType ??
        (typeof detectedMimeType === 'string'
          ? detectedMimeType
          : 'application/octet-stream');
      const fileName = storagePath ?? `qr/uuid/${basename(filePath)}`;

      const { data, error } = await this.supabase.storage
        .from(this.bucket)
        .upload(fileName, fileBuffer, {
          contentType: contentType,
          upsert: options?.upsert ?? false, // false = error si ya existe
          cacheControl: options?.cacheControl ?? '3600', // cache 1 hora
        });

      if (error) {
        throw new Error(`Upload failed: ${error.message}`);
      }

      if (!data?.path) {
        throw new Error('Upload succeeded but no path returned');
      }

      this.logger.log(`File uploaded successfully to ${data.path}`);
      return this.getPublicUrl(data.path);
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : String(error);
      this.logger.error(`Upload from path error: ${message}`, error);
      throw error;
    }
  }

  async uploadFromBuffer(
    buffer: Buffer,
    storagePath: string,
    options?: UploadOptions,
  ): Promise<string> {
    const contentType = options?.contentType ?? 'application/octet-stream';

    const { data, error } = await this.supabase.storage
      .from(this.bucket)
      .upload(storagePath, buffer, {
        contentType,
        upsert: options?.upsert ?? false,
        cacheControl: options?.cacheControl ?? '3600',
      });

    if (error) {
      throw new Error(`Upload failed: ${error.message}`);
    }

    if (!data?.path) {
      throw new Error('Upload succeeded but no path returned');
    }

    this.logger.log(`Buffer uploaded successfully to ${data.path}`);
    return this.getPublicUrl(data.path);
  }

  getPublicUrl(path: string): string {
    try {
      const { data } = this.supabase.storage
        .from(this.bucket)
        .getPublicUrl(path);

      if (!data?.publicUrl) {
        throw new Error('Failed to generate public URL');
      }

      return data.publicUrl;
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : String(error);
      this.logger.error(`Get public URL error: ${message}`, error);
      throw error;
    }
  }
}
