import { Migration } from '@mikro-orm/migrations';

export class Migration20241129064522 extends Migration {

  override async up(): Promise<void> {
    this.addSql(`create table "station" ("id" serial primary key, "created_at" timestamptz not null, "updated_at" timestamptz not null, "deleted_at" timestamptz null, "name" varchar(255) not null, "latitude" double precision not null, "longitude" double precision not null, "address" varchar(255) not null, "street_number" varchar(255) not null, "opening_time" time not null, "closing_time" time not null);`);

    this.addSql(`create table "terminal" ("id" serial primary key, "created_at" timestamptz not null, "updated_at" timestamptz not null, "deleted_at" timestamptz null, "is_active" boolean not null);`);

    this.addSql(`create table "entrance" ("id" serial primary key, "created_at" timestamptz not null, "updated_at" timestamptz not null, "deleted_at" timestamptz null, "latitude" double precision not null, "longitude" double precision not null, "address" varchar(255) not null, "status" text[] not null, "station_id" int not null, "terminal_id" int null);`);
    this.addSql(`alter table "entrance" add constraint "entrance_terminal_id_unique" unique ("terminal_id");`);

    this.addSql(`create table "user" ("id" serial primary key, "created_at" timestamptz not null, "updated_at" timestamptz not null, "deleted_at" timestamptz null, "name" varchar(255) not null, "email" varchar(255) not null, "password" varchar(255) not null, "cpf" varchar(255) not null, "permissions" text[] not null);`);
    this.addSql(`alter table "user" add constraint "user_email_unique" unique ("email");`);
    this.addSql(`alter table "user" add constraint "user_cpf_unique" unique ("cpf");`);

    this.addSql(`create table "station_users" ("station_entity_id" int not null, "user_entity_id" int not null, constraint "station_users_pkey" primary key ("station_entity_id", "user_entity_id"));`);

    this.addSql(`alter table "entrance" add constraint "entrance_station_id_foreign" foreign key ("station_id") references "station" ("id") on update cascade;`);
    this.addSql(`alter table "entrance" add constraint "entrance_terminal_id_foreign" foreign key ("terminal_id") references "terminal" ("id") on update cascade on delete set null;`);

    this.addSql(`alter table "station_users" add constraint "station_users_station_entity_id_foreign" foreign key ("station_entity_id") references "station" ("id") on update cascade on delete cascade;`);
    this.addSql(`alter table "station_users" add constraint "station_users_user_entity_id_foreign" foreign key ("user_entity_id") references "user" ("id") on update cascade on delete cascade;`);
  }

  override async down(): Promise<void> {
    this.addSql(`alter table "entrance" drop constraint "entrance_station_id_foreign";`);

    this.addSql(`alter table "station_users" drop constraint "station_users_station_entity_id_foreign";`);

    this.addSql(`alter table "entrance" drop constraint "entrance_terminal_id_foreign";`);

    this.addSql(`alter table "station_users" drop constraint "station_users_user_entity_id_foreign";`);

    this.addSql(`drop table if exists "station" cascade;`);

    this.addSql(`drop table if exists "terminal" cascade;`);

    this.addSql(`drop table if exists "entrance" cascade;`);

    this.addSql(`drop table if exists "user" cascade;`);

    this.addSql(`drop table if exists "station_users" cascade;`);
  }

}
