import { Property, Entity, OneToMany, Collection } from "@mikro-orm/core";
import { BaseEntity } from "../../../shared/entities/base.entity";
import { UserEntity } from "../../user/entities/user.entity";

@Entity()
export class StationEntity extends BaseEntity {
	@Property()
	name: string;

	@Property({ type: "float8" })
	latitude: number;

	@Property({ type: "float8" })
	longitude: number;

	@Property()
	address: string;

	@Property()
	openingTime: Date;

	@Property()
	closingTime: Date;

	@OneToMany({ mappedBy: "user" })
	users = new Collection<UserEntity>(this);
}
