import { Migration } from '@mikro-orm/migrations';

export class Migration20241022192453 extends Migration {
  override async up(): Promise<void> {
    this.addSql(
      `create table "terminal" ("id" serial primary key, "created_at" timestamptz not null, "updated_at" timestamptz not null, "deleted_at" timestamptz null, "is_active" boolean not null);`,
    );
  }

  override async down(): Promise<void> {
    this.addSql(`drop table if exists "terminal" cascade;`);
  }
}
