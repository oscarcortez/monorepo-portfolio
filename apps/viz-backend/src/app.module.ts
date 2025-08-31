import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { ApolloServerPluginLandingPageLocalDefault } from '@apollo/server/plugin/landingPage/default';
import { join } from 'path';
import { DrizzleModule } from './drizzle/drizzle.module';

import { HelloWorldModule } from './hello-world/hello-world.module';
import { UserModule } from './user/user.module';
import { HeroUserModule } from './hero-user/hero-user.module';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      playground: false,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      sortSchema: true,
      plugins: [ApolloServerPluginLandingPageLocalDefault()],
    }),
    DrizzleModule,
    HelloWorldModule,
    UserModule,
    HeroUserModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
