import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { Prisma, User } from '@prisma/client';
import { hashPassword } from '../utils/password';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async users(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.UserWhereUniqueInput;
    where?: Prisma.UserWhereInput;
    orderBy?: Prisma.UserOrderByWithRelationInput;
  }): Promise<User[]> {
    const { skip, take, cursor, where, orderBy } = params;
    try {
      return await this.prisma.user.findMany({
        skip,
        take,
        cursor,
        where,
        orderBy,
      });
    } catch (error) {
      console.error('Error fetching users:', error);
      throw new Error('Failed to fetch users');
    }
  }

  async createUser(data: Prisma.UserCreateInput): Promise<User> {
    try {
      if (data.passwordHash) {
        data.passwordHash = await hashPassword(data.passwordHash);
      }
      return await this.prisma.user.create({
        data,
      });
    } catch (error) {
      console.error('Error creating user:', error);
      throw new Error('Failed to create user');
    }
  }

  async getUserById(userId: number): Promise<User | null> {
    return this.prisma.user.findUnique({ where: { userId } });
  }

  async updateUser(params: {
    where: Prisma.UserWhereUniqueInput;
    data: Prisma.UserUpdateInput;
  }): Promise<User> {
    const { where, data } = params;
    try {
      return await this.prisma.user.update({
        data,
        where,
      });
    } catch (error) {
      console.error('Error updating user:', error);
      throw new Error('Failed to update user');
    }
  }

  async deleteUser(where: Prisma.UserWhereUniqueInput): Promise<User> {
    try {
      return await this.prisma.user.delete({
        where,
      });
    } catch (error) {
      console.error('Error deleting user:', error);
      throw new Error('Failed to delete user');
    }
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.prisma.user.findUnique({ where: { email } });
  }
}
