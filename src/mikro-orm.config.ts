import { defineConfig, PostgreSqlDriver } from '@mikro-orm/postgresql';
import 'dotenv/config'
import { SqlHighlighter } from '@mikro-orm/sql-highlighter';
import { TsMorphMetadataProvider } from '@mikro-orm/reflection';
import { Migrator } from '@mikro-orm/migrations';
import { EntityGenerator } from '@mikro-orm/entity-generator';
// import { SeedManager } from '@mikro-orm/seeder';

export default defineConfig({
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  user: process.env.DB_USER ?? '',
  password: process.env.DB_PASSWORD ?? '',
  dbName: 'coreDb',
  entities: ['./dist/**/*.entity.js'],
  entitiesTs: ['./src/**/*.entity.ts'],
  debug: true,
  highlighter: new SqlHighlighter(),
  metadataProvider: TsMorphMetadataProvider,
  // @ts-expect-error nestjs adapter option
  registerRequestContext: false,
  extensions: [Migrator, EntityGenerator],
  migrations: {
    path: 'dist/shared/database/migrations',
    pathTs: 'src/shared/database/migrations',
    glob: '!(*.d).{js,ts}',
  }
});