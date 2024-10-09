import { Entity, Opt, PrimaryKey, Property } from "@mikro-orm/postgresql";

@Entity()
export abstract class BaseEntity {
	@PrimaryKey({ autoincrement: true })
	id!: number;

	@Property()
	createdAt = new Date();

	@Property({ onUpdate: () => new Date() })
	updatedAt = new Date();

	@Property({ nullable: true })
	deletedAt?: Date & Opt = null;
}
