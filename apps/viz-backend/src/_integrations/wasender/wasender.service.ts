import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {
  createWasender,
  RetryConfig,
  // FetchImplementation,
  TextOnlyMessage,
  type Wasender,
} from 'wasenderapi';

import {
  SendMessageOptions,
  // SendMediaOptions,
  // MessageResponse,
  // DeviceStatus,
  // Contact,
  ContactsResponse,
} from './types/wasender.types';

@Injectable()
export class WasenderService implements OnModuleInit {
  private readonly logger = new Logger(WasenderService.name);
  private wasenderClient!: Wasender; // Type from wasenderapi
  private defaultSessionId: string;

  constructor(private configService: ConfigService) {}

  onModuleInit() {
    const apiKey = this.configService.get<string>('WASENDER_API_KEY');
    const personalAccessToken = this.configService.get<string>(
      'WASENDER_PERSONAL_ACCESS_TOKEN',
    );

    if (!apiKey && !personalAccessToken) {
      throw new Error(
        'Either WASENDER_API_KEY or WASENDER_PERSONAL_ACCESS_TOKEN must be defined',
      );
    }

    try {
      const retryOptions: RetryConfig = {
        enabled: true,
        maxRetries: this.configService.get<number>('WASENDER_MAX_RETRIES') || 3,
      };

      this.wasenderClient = createWasender(
        apiKey || undefined,
        personalAccessToken || undefined,
        undefined,
        undefined,
        retryOptions,
        undefined,
      );

      this.logger.log('WASender SDK initialized successfully');
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : String(error);
      this.logger.error(`Failed to initialize WASender SDK: ${message}`, error);
      throw error;
    }
  }

  async sendSimpleText(options: SendMessageOptions): Promise<void> {
    try {
      const textPayload: TextOnlyMessage = {
        messageType: 'text',
        to: options.to, // Recipient's JID
        text: options.text,
      };
      const result = await this.wasenderClient.send(textPayload);
      console.log('Message sent:', result.response.message);
      console.log('Rate limit remaining:', result.rateLimit?.remaining);
    } catch (error) {
      console.error('Error sending message:', error);
    }
  }

  async getContacts(): Promise<ContactsResponse> {
    try {
      this.logger.log('Fetching contacts from WASender');

      const result = await this.wasenderClient.getContacts();

      const contacts = result.response?.data ?? [];
      this.logger.log(`Found ${contacts.length} contacts`);

      if (contacts.length > 0) {
        this.logger.debug(`First contact: ${JSON.stringify(contacts[0])}`);
      }

      return {
        success: true,
        data: contacts,
      };
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : String(error);
      this.logger.error(`Error fetching contacts: ${message}`, error);

      throw error;
    }
  }
}
