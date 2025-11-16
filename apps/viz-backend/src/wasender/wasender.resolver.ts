import { Resolver, Mutation, Query, Args } from '@nestjs/graphql';
import { Logger } from '@nestjs/common';
import { WasenderService } from './wasender.service';
import { Field, ObjectType, InputType } from '@nestjs/graphql';

// ============= GraphQL Types =============

@ObjectType()
class ContactPhone {
  @Field({ nullable: true })
  id?: string;

  @Field({ nullable: true })
  name?: string;

  @Field({ nullable: true })
  phone?: string;
}

@ObjectType()
class ContactsListResponse {
  @Field()
  success: boolean;

  @Field(() => [ContactPhone])
  data: ContactPhone[];

  @Field({ nullable: true })
  error?: string;
}

@ObjectType()
class SendMessageResponse {
  @Field()
  success: boolean;

  @Field({ nullable: true })
  message?: string;

  @Field({ nullable: true })
  error?: string;
}

@InputType()
class SendMessageInput {
  @Field()
  to: string;

  @Field()
  text: string;
}

// ============= Resolver =============

@Resolver()
export class WasenderResolver {
  private readonly logger = new Logger(WasenderResolver.name);

  constructor(private readonly wasenderService: WasenderService) {}

  /**
   * Send a text message via WhatsApp
   */
  @Mutation(() => SendMessageResponse)
  async sendWhatsAppText(
    @Args('input') input: SendMessageInput,
  ): Promise<SendMessageResponse> {
    try {
      this.logger.log(`Sending WhatsApp message to ${input.to}`);

      await this.wasenderService.sendSimpleText({
        to: input.to,
        text: input.text,
      });

      return {
        success: true,
        message: `Message sent successfully to ${input.to}`,
      };
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : String(error);
      this.logger.error(`Failed to send WhatsApp message: ${message}`, error);

      return {
        success: false,
        error: message,
      };
    }
  }

  /**
   * Get all WhatsApp contacts
   */
  @Query(() => ContactsListResponse)
  async getWhatsAppContacts(): Promise<ContactsListResponse> {
    try {
      this.logger.log('Fetching WhatsApp contacts');

      const result = await this.wasenderService.getContacts();

      return {
        success: result.success,
        data: result.data || [],
        error: result.error,
      };
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : String(error);
      this.logger.error(`Failed to fetch WhatsApp contacts: ${message}`, error);

      return {
        success: false,
        data: [],
        error: message,
      };
    }
  }
}
