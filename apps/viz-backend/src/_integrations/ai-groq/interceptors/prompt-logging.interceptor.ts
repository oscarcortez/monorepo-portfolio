import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  Logger,
} from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { GenerateTextInput } from '../types';

@Injectable()
export class PromptLoggingInterceptor implements NestInterceptor {
  private readonly logger = new Logger(PromptLoggingInterceptor.name);

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const ctx = GqlExecutionContext.create(context);
    const { input } = ctx.getArgs<{ input: GenerateTextInput }>(); // ✅ Destructuring con tipo

    if (input?.prompt) {
      const promptPreview = input.prompt.substring(0, 100);
      this.logger.log(`Prompt received: "${promptPreview}..."`);
      this.logger.log(`Prompt length: ${input.prompt.length} chars`);

      if (input.model) {
        this.logger.log(`Model: ${input.model}`);
      }
      if (input.temperature !== undefined) {
        this.logger.log(`Temperature: ${input.temperature}`);
      }
    }

    const startTime = Date.now();

    return next.handle().pipe(
      tap({
        next: () => {
          const duration = Date.now() - startTime;
          this.logger.log(`✅ Text generation completed in ${duration}ms`);
        },
        error: (error: Error) => {
          const duration = Date.now() - startTime;
          this.logger.error(
            `❌ Text generation failed in ${duration}ms: ${error.message}`,
          );
        },
      }),
    );
  }
}
