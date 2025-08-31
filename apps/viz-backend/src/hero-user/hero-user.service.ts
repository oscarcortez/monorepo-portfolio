import { Injectable, Inject } from '@nestjs/common';
import { PostgresJsDatabase } from 'drizzle-orm/postgres-js';
import * as schema from '../drizzle/schema';
import { eq, and, isNull, asc } from 'drizzle-orm';

@Injectable()
export class HeroUserService {
  constructor(
    @Inject('DRIZZLE_DB')
    private readonly db: PostgresJsDatabase<typeof schema>,
  ) {}

  async findOne(uuid: string, languageCode: string) {
    const result = await this.db.query.users.findFirst({
      where: and(eq(schema.users.uuid, uuid), isNull(schema.users.deletedAt)),
      columns: {
        uuid: true,
        name: true,
        email: true,
      },
      with: {
        contacts: {
          where: isNull(schema.contacts.deletedAt),
          columns: {
            uuid: true,
            link: true,
            title: true,
            displayText: true,
          },
          orderBy: asc(schema.contacts.sortOrder),
        },
      },
    });

    return result ?? null;
  }
}
