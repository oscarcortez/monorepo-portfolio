import { Injectable, Inject } from '@nestjs/common';
import { PostgresJsDatabase } from 'drizzle-orm/postgres-js';
import { users } from 'src/drizzle/schema';
import { eq, getTableColumns } from 'drizzle-orm';

const getUserPublicColumns = () => {
  const { passwordHash, ...publicColumns } = getTableColumns(users);
  void passwordHash;
  return publicColumns;
};

@Injectable()
export class UserService {
  constructor(@Inject('DRIZZLE_DB') private readonly db: PostgresJsDatabase) {}

  async findOne(uuid: string) {
    try {
      const result = await this.db
        .select(getUserPublicColumns())
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
