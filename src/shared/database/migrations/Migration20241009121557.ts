import { Migration } from '@mikro-orm/migrations';

export class Migration20241009121557 extends Migration {

  override async up(): Promise<void> {
    this.addSql(`create table "station" ("id" serial primary key, "created_at" timestamptz not null, "updated_at" timestamptz not null, "deleted_at" timestamptz null, "name" varchar(255) not null, "latitude" double precision not null, "longitude" double precision not null, "address" varchar(255) not null, "opening_time" timestamptz not null, "closing_time" timestamptz not null);`);

    this.addSql(`create table "user" ("id" serial primary key, "created_at" timestamptz not null, "updated_at" timestamptz not null, "deleted_at" timestamptz null, "name" varchar(255) not null, "email" varchar(255) not null, "password" varchar(255) not null, "cpf" varchar(255) not null, "permissions" text[] not null);`);
    this.addSql(`alter table "user" add constraint "user_email_unique" unique ("email");`);

    this.addSql(`create table "station_users" ("station_entity_id" int not null, "user_entity_id" int not null, constraint "station_users_pkey" primary key ("station_entity_id", "user_entity_id"));`);

    this.addSql(`alter table "station_users" add constraint "station_users_station_entity_id_foreign" foreign key ("station_entity_id") references "station" ("id") on update cascade on delete cascade;`);
    this.addSql(`alter table "station_users" add constraint "station_users_user_entity_id_foreign" foreign key ("user_entity_id") references "user" ("id") on update cascade on delete cascade;`);
  }

}
