import { Query, Resolver } from '@nestjs/graphql';
import { HelloWorldService } from './hello-world.service';

@Resolver()
export class HelloWorldResolver {
  constructor(private readonly helloWorldService: HelloWorldService) {}

  @Query(() => String, { name: 'hello' })
  getHello(): string {
    return this.helloWorldService.getHello();
  }
}
