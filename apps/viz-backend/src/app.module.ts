import { Module, forwardRef } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { ApolloServerPluginLandingPageLocalDefault } from '@apollo/server/plugin/landingPage/default';
import { join } from 'path';

import { HelloWorldModule } from './hello-world/hello-world.module';
import { UserHeroModule } from './user-hero/user-hero.module';
import { TemplateModule } from './template/template.module';
import { DeeplModule } from './deepl/deepl.module';
import { ConfigModule } from '@nestjs/config';
import { WasenderModule } from './wasender/wasender.module';

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
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
