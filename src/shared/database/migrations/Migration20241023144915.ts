import { Migration } from '@mikro-orm/migrations';

export class Migration20241023144915 extends Migration {
  override async up(): Promise<void> {
    this.addSql(
      `alter table "entrance" add column "station_id" int not null, add column "terminal_id" int null;`,
    );
    this.addSql(
      `alter table "entrance" add constraint "entrance_station_id_foreign" foreign key ("station_id") references "station" ("id") on update cascade;`,
    );
    this.addSql(
      `alter table "entrance" add constraint "entrance_terminal_id_foreign" foreign key ("terminal_id") references "terminal" ("id") on update cascade on delete set null;`,
    );
    this.addSql(
      `alter table "entrance" add constraint "entrance_terminal_id_unique" unique ("terminal_id");`,
    );
  }

  override async down(): Promise<void> {
    this.addSql(
      `alter table "entrance" drop constraint "entrance_station_id_foreign";`,
    );
    this.addSql(
      `alter table "entrance" drop constraint "entrance_terminal_id_foreign";`,
    );

    this.addSql(
      `alter table "entrance" drop constraint "entrance_terminal_id_unique";`,
    );
    this.addSql(
      `alter table "entrance" drop column "station_id", drop column "terminal_id";`,
    );
  }
}
