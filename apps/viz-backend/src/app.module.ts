import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { ApolloServerPluginLandingPageLocalDefault } from '@apollo/server/plugin/landingPage/default';
import { join } from 'path';

import { HelloWorldModule } from './hello-world/hello-world.module';
import { UserHeroModule } from './user-hero/user-hero.module';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      playground: false,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      sortSchema: true,
      plugins: [ApolloServerPluginLandingPageLocalDefault()],
      context: ({ req }: { req: Request }) => ({ req }),
    }),
    HelloWorldModule,
    UserHeroModule,
    AuthModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
