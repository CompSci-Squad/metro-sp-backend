import { Migration } from '@mikro-orm/migrations';

export class Migration20241010014449 extends Migration {
  override async up(): Promise<void> {
    this.addSql(
      `alter table "user" add constraint "user_cpf_unique" unique ("cpf");`,
    );
  }

  override async down(): Promise<void> {
    this.addSql(`alter table "user" drop constraint "user_cpf_unique";`);
  }
}
