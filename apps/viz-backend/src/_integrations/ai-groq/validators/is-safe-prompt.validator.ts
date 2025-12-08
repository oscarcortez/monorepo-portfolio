// validators/is-safe-prompt.validator.ts
import {
  registerDecorator,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';

@ValidatorConstraint({ async: false })
export class IsSafePromptConstraint implements ValidatorConstraintInterface {
  private readonly FORBIDDEN_PATTERNS = [
    /ignore\s+previous\s+instructions/i,
    /disregard\s+all/i,
    /forget\s+everything/i,
    /system\s+prompt/i,
    /jailbreak/i,
    /prompt\s+injection/i,
  ];

  private readonly MALICIOUS_PATTERNS = [
    /<script[^>]*>.*?<\/script>/gi,
    /javascript:/gi,
    /on\w+\s*=/gi,
    /(\bSELECT\b|\bINSERT\b|\bDELETE\b|\bUPDATE\b|\bDROP\b)/gi,
  ];

  validate(prompt: string): boolean {
    if (!prompt) return false;

    const trimmed = prompt.trim().toLowerCase();

    // 1. Check forbidden patterns
    for (const pattern of this.FORBIDDEN_PATTERNS) {
      if (pattern.test(trimmed)) {
        return false;
      }
    }

    // 2. Check malicious patterns
    for (const pattern of this.MALICIOUS_PATTERNS) {
      if (pattern.test(trimmed)) {
        return false;
      }
    }

    // 3. Check excessive repetition (more than 50 same chars)
    if (/(.)\1{49,}/.test(prompt)) {
      return false;
    }

    return true;
  }

  defaultMessage(): string {
    return 'Prompt contains unsafe or malicious content';
  }
}

export function IsSafePrompt(validationOptions?: ValidationOptions) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: IsSafePromptConstraint,
    });
  };
}
