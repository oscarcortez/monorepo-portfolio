import { Module, Global } from '@nestjs/common';
import { drizzle } from 'drizzle-orm/postgres-js';
import type { PostgresJsDatabase } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import * as schema from './schema';
import 'dotenv/config';

@Global()
@Module({
  providers: [
    {
      provide: 'DRIZZLE_DB',
      useFactory: (): PostgresJsDatabase<typeof schema> => {
        const connectionString = process.env.DATABASE_URL;

        if (!connectionString) {
          throw new Error('DATABASE_URL environment variable is not set');
        }

        console.log(
          'Creating postgres client with URL:',
          connectionString.replace(/:[^:@]*@/, ':***@'),
        );

        try {
          const client = postgres(connectionString);
          return drizzle(client, { schema });
        } catch (error) {
          console.error('Error creating postgres client:', error);
          throw error;
        }
      },
    },
  ],
  exports: ['DRIZZLE_DB'],
})
export class DrizzleModule {}
