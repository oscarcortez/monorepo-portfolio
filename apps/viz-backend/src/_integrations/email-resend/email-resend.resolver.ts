import { Resolver, Mutation, Args } from '@nestjs/graphql';
import { Logger } from '@nestjs/common';
import { EmailResendService, SendEmailResponse } from './email-resend.service';
import { SendEmailResponseType, SendEmailInput } from './types';

@Resolver()
export class EmailResendResolver {
  private readonly logger = new Logger(EmailResendResolver.name);

  constructor(private readonly emailResendService: EmailResendService) {}

  /**
   * Send an email via Resend
   */
  @Mutation(() => SendEmailResponseType)
  async sendEmail(
    @Args('input') input: SendEmailInput,
  ): Promise<SendEmailResponse> {
    try {
      this.logger.log(
        `Sending email to ${input.to} with subject: ${input.subject}`,
      );

      return await this.emailResendService.sendEmail({
        from: input.from,
        to: input.to,
        subject: input.subject,
        html: input.html,
        text: input.text,
        replyTo: input.replyTo,
      });
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
