import { Migration } from '@mikro-orm/migrations';

export class Migration20241022185209 extends Migration {
  override async up(): Promise<void> {
    this.addSql(
      `alter table "entrance" drop constraint "entrance_terminals_id_foreign";`,
    );

    this.addSql(`drop table if exists "terminal" cascade;`);

    this.addSql(
      `alter table "entrance" drop constraint "entrance_entrances_id_foreign";`,
    );

    this.addSql(
      `alter table "entrance" drop constraint "entrance_terminals_id_unique";`,
    );
    this.addSql(
      `alter table "entrance" drop column "entrances_id", drop column "terminals_id";`,
    );
  }

  override async down(): Promise<void> {
    this.addSql(
      `create table "terminal" ("id" serial primary key, "created_at" timestamptz not null, "updated_at" timestamptz not null, "deleted_at" timestamptz null, "is_active" boolean not null);`,
    );

    this.addSql(
      `alter table "entrance" add column "entrances_id" int not null, add column "terminals_id" int null;`,
    );
    this.addSql(
      `alter table "entrance" add constraint "entrance_entrances_id_foreign" foreign key ("entrances_id") references "station" ("id") on update cascade;`,
    );
    this.addSql(
      `alter table "entrance" add constraint "entrance_terminals_id_foreign" foreign key ("terminals_id") references "terminal" ("id") on update cascade on delete set null;`,
    );
    this.addSql(
      `alter table "entrance" add constraint "entrance_terminals_id_unique" unique ("terminals_id");`,
    );
  }
}
