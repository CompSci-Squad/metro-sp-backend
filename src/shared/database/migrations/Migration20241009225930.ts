import { Migration } from '@mikro-orm/migrations';

export class Migration20241009225930 extends Migration {
  override async up(): Promise<void> {
    this.addSql(
      `create table "base_entity" ("id" serial primary key, "created_at" timestamptz not null, "updated_at" timestamptz not null, "deleted_at" timestamptz null);`,
    );

    this.addSql(
      `alter table "station" alter column "opening_time" type time using ("opening_time"::time);`,
    );
    this.addSql(
      `alter table "station" alter column "closing_time" type time using ("closing_time"::time);`,
    );
  }

  override async down(): Promise<void> {
    this.addSql(`drop table if exists "base_entity" cascade;`);

    this.addSql(
      `alter table "station" alter column "opening_time" type timestamptz using ("opening_time"::timestamptz);`,
    );
    this.addSql(
      `alter table "station" alter column "closing_time" type timestamptz using ("closing_time"::timestamptz);`,
    );
  }
}
