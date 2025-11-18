import { Module, forwardRef } from '@nestjs/common';
import { AuthModule } from './_features/auth/auth.module';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { ApolloServerPluginLandingPageLocalDefault } from '@apollo/server/plugin/landingPage/default';
import { join } from 'path';

import { HelloWorldModule } from './hello-world/hello-world.module';
import { UserHeroModule } from './_features/user-hero/user-hero.module';
import { TemplateModule } from './_models/template/template.module';
import { DeeplModule } from './_integrations/deepl/deepl.module';
import { ConfigModule } from '@nestjs/config';
import { WasenderModule } from './_integrations/wasender/wasender.module';
import { AiGroqModule } from './_integrations/ai-groq/ai-groq.module';
import { EmailResendModule } from './_integrations/email-resend/email-resend.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    forwardRef(() => AuthModule),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      playground: false,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      sortSchema: true,
      plugins: [ApolloServerPluginLandingPageLocalDefault()],
      context: ({ req, res }: { req: Request; res: Response }) => ({
        req,
        res,
      }),
    }),
    HelloWorldModule,
    UserHeroModule,
    TemplateModule,
    DeeplModule,
    WasenderModule,
    AiGroqModule,
    EmailResendModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
