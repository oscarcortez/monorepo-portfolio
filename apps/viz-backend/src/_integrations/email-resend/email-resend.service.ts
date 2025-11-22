import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Resend } from 'resend';

export interface SendEmailOptions {
  from: string;
  to: string | string[];
  subject: string;
  html: string;
  text?: string;
  replyTo?: string;
}

export interface SendEmailResponse {
  success: boolean;
  messageId?: string;
  error?: string;
}

@Injectable()
export class EmailResendService implements OnModuleInit {
  private readonly logger = new Logger(EmailResendService.name);
  private resendClient!: Resend;
  private defaultFromEmail!: string;

  constructor(private configService: ConfigService) {}

  onModuleInit() {
    const apiKey = this.configService.get<string>('RESEND_API_KEY');
    this.defaultFromEmail =
      this.configService.get<string>('RESEND_FROM_EMAIL') ||
      'onboarding@resend.dev';

    if (!apiKey) {
      throw new Error('RESEND_API_KEY not configured in environment variables');
    }

    try {
      this.resendClient = new Resend(apiKey);
      this.logger.log(
        `Resend email service initialized with default from: ${this.defaultFromEmail}`,
      );
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : String(error);
      this.logger.error(
        `Failed to initialize Resend client: ${message}`,
        error,
      );
      throw error;
    }
  }

  async sendEmail(options: SendEmailOptions): Promise<SendEmailResponse> {
    try {
      this.logger.log(`Sending email to ${options.to as string}`);

      const response = await this.resendClient.emails.send({
        from: options.from || this.defaultFromEmail,
        to: options.to as string,
        subject: options.subject,
        html: options.html,
        // text: options.text,
        // ...(options.replyTo && { reply_to: options.replyTo }),
      });

      if (response.error) {
        throw new Error(response.error.message);
      }

      this.logger.log(`Email sent successfully: ${response.data?.id}`);

      return {
        success: true,
        messageId: response.data?.id,
      };
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : String(error);
      this.logger.error(`Failed to send email: ${message}`, error);

      return {
        success: false,
        error: message,
      };
    }
  }
}
