import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma.service';
import { Prisma, User } from '@prisma/client';
import { hashPassword } from '../../utils/password';
import { SupabaseStorageService } from '../../_integrations/supabase-storage/supabase-storage.service';
import { QrCodeService } from 'src/_integrations/qr-code/qr-code.service';
import { ConfigService } from '@nestjs/config';
import { GoogleUser } from 'src/_features/auth/interfaces/google-profile.interface';

@Injectable()
export class UserService {
  constructor(
    private prisma: PrismaService,
    private supabaseStorageService: SupabaseStorageService,
    private qrCodeService: QrCodeService,
    private configService: ConfigService,
  ) {}

  private getAppUrl(): string {
    return this.configService.get<string>('app.url') || 'http://localhost:3000';
  }

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

  async validateGoogleUser(googleUser: GoogleUser): Promise<User> {
    const existingUser = await this.prisma.user.findUnique({
      where: { email: googleUser.email },
    });

    if (existingUser) {
      return existingUser;
    }

    return await this.prisma.user.create({
      data: {
        email: googleUser.email,
        firstName: googleUser.firstName,
        lastName: googleUser.lastName,
        picture: googleUser.picture,
        username: googleUser.email.split('@')[0].toLowerCase(),
        provider: 'google',
        passwordHash: '123',
      },
    });
  }

  async createUser(data: Prisma.UserCreateInput): Promise<User> {
    try {
      if (data.passwordHash) {
        data.passwordHash = await hashPassword(data.passwordHash);
      }
      const user = await this.prisma.user.create({
        data,
      });
      const qrBuffer = await this.qrCodeService.toBuffer(
        `${this.getAppUrl()}/viz/${user.uuid}`,
      );
      await this.supabaseStorageService.uploadFromBuffer(
        qrBuffer,
        `hero/qr/uuid/${user.uuid}.png`,
        { contentType: 'image/png', upsert: true },
      );
      return user;
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
