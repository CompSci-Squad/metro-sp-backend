import { Migration } from '@mikro-orm/migrations';

export class Migration20241016144409 extends Migration {
  override async up(): Promise<void> {
    this.addSql(
      `create table "terminal" ("id" serial primary key, "created_at" timestamptz not null, "updated_at" timestamptz not null, "deleted_at" timestamptz null, "is_active" boolean not null);`,
    );

    this.addSql(
      `create table "entrance" ("id" serial primary key, "created_at" timestamptz not null, "updated_at" timestamptz not null, "deleted_at" timestamptz null, "latitude" double precision not null, "longitude" double precision not null, "address" varchar(255) not null, "status" text[] not null, "entrances_id" int not null, "terminals_id" int not null);`,
    );
    this.addSql(
      `alter table "entrance" add constraint "entrance_terminals_id_unique" unique ("terminals_id");`,
    );

    this.addSql(
      `alter table "entrance" add constraint "entrance_entrances_id_foreign" foreign key ("entrances_id") references "station" ("id") on update cascade;`,
    );
    this.addSql(
      `alter table "entrance" add constraint "entrance_terminals_id_foreign" foreign key ("terminals_id") references "terminal" ("id") on update cascade;`,
    );

    this.addSql(`drop table if exists "base_entity" cascade;`);
  }

  override async down(): Promise<void> {
    this.addSql(
      `alter table "entrance" drop constraint "entrance_terminals_id_foreign";`,
    );

    this.addSql(
      `create table "base_entity" ("id" serial primary key, "created_at" timestamptz not null, "updated_at" timestamptz not null, "deleted_at" timestamptz null);`,
    );

    this.addSql(`drop table if exists "terminal" cascade;`);

    this.addSql(`drop table if exists "entrance" cascade;`);
  }
}
