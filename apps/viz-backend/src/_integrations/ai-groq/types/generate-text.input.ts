import { InputType, Field, Float, Int } from '@nestjs/graphql';
import {
  IsString,
  IsNotEmpty,
  MinLength,
  MaxLength,
  IsOptional,
  Min,
  Max,
  Matches,
  // ValidateIf,
} from 'class-validator';
import { IsSafePrompt } from '../validators/is-safe-prompt.validator';

@InputType()
export class GenerateTextInput {
  @Field()
  @IsString({ message: 'Prompt must be a string' })
  @IsNotEmpty({ message: 'Prompt cannot be empty' })
  @MinLength(3, { message: 'Prompt must be at least 3 characters long' })
  @MaxLength(10000, { message: 'Prompt must not exceed 10,000 characters' })
  @Matches(/^(?!.*(ignore previous|disregard|forget everything|jailbreak))/i, {
    message: 'Prompt contains forbidden content',
  })
  @IsSafePrompt({ message: 'Prompt contains unsafe or malicious content' })
  prompt!: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  @MaxLength(100)
  model?: string;

  @Field(() => Float, { nullable: true })
  @IsOptional()
  @Min(0, { message: 'Temperature must be between 0 and 2' })
  @Max(2, { message: 'Temperature must be between 0 and 2' })
  temperature?: number;

  @Field(() => Int, { nullable: true })
  @IsOptional()
  @Min(1, { message: 'Max tokens must be at least 1' })
  @Max(4096, { message: 'Max tokens cannot exceed 4096' })
  maxOutputTokens?: number;
}
