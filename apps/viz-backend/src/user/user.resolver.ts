import { Resolver, Mutation, Args } from '@nestjs/graphql';
import { UserService } from './user.service';
// import { UserOrderByWithRelationInput } from '../prisma-generate/user/user-order-by-with-relation.input';
// import { UserWhereUniqueInput } from '../prisma-generate/user/user-where-unique.input';
// import { UserWhereInput } from '../prisma-generate/user/user-where.input';
import { User } from '../prisma-generate/user/user.model';
import { UserCreateInput } from '../prisma-generate/user/user-create.input';
import { Public } from '../auth/public.decorator';

@Resolver(() => User)
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  // @Query(() => [User], { name: 'users' })
  // async getUsers(
  //   @Args('skip', { type: () => Int, nullable: true }) skip?: number,
  //   @Args('take', { type: () => Int, nullable: true }) take?: number,
  //   @Args('cursor', { type: () => UserWhereUniqueInput, nullable: true })
  //   cursor?: UserWhereUniqueInput,
  //   @Args('where', { type: () => UserWhereInput, nullable: true })
  //   where?: UserWhereInput,
  //   @Args('orderBy', {
  //     type: () => [UserOrderByWithRelationInput],
  //     nullable: true,
  //   })
  //   orderBy?: UserOrderByWithRelationInput[],
  // ): Promise<User[]> {
  //   return this.userService.users({
  //     skip,
  //     take,
  //     cursor: cursor || {},
  //     where,
  //     orderBy,
  //   });
  // }

  @Public()
  @Mutation(() => User)
  async createUser(
    @Args('data', { type: () => UserCreateInput }) data: UserCreateInput,
  ): Promise<User> {
    return this.userService.createUser(data);
  }
}
