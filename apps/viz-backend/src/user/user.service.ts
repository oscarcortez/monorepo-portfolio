import { Injectable, Inject } from '@nestjs/common';
import { PostgresJsDatabase } from 'drizzle-orm/postgres-js';
import { users } from 'src/drizzle/schema';
import { eq } from 'drizzle-orm';

@Injectable()
export class UserService {
  constructor(@Inject('DRIZZLE_DB') private readonly db: PostgresJsDatabase) {}

  async findOne(uuid: string) {
    try {
      const result = await this.db
        .select({
          userId: users.userId,
          uuid: users.uuid,
          email: users.email,
          name: users.name,
          deletedAt: users.deletedAt,
          createdAt: users.createdAt,
          updatedAt: users.updatedAt,
          passwordHash: users.passwordHash,
        })
        .from(users)
        .where(eq(users.uuid, uuid))
        .limit(1);
      return result.at(0);
    } catch (error) {
      console.error('Error fetching user:', error);
      throw error;
    }
  }
}
