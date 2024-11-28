import { Migration } from '@mikro-orm/migrations';

export class Migration20241009225942 extends Migration {
  override async up(): Promise<void> {
    this.addSql(
      `alter table "station" add column "street_number" varchar(255) not null;`,
    );
  }

  override async down(): Promise<void> {
    this.addSql(`alter table "station" drop column "street_number";`);
  }
}
