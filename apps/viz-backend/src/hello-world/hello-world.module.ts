import { Module } from '@nestjs/common';
import { HelloWorldService } from './hello-world.service';
import { HelloWorldResolver } from './hello-world.resolver';

@Module({
  providers: [HelloWorldService, HelloWorldResolver],
})
export class HelloWorldModule {}
