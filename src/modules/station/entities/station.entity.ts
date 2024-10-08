import { Property, Entity, OneToMany, Collection } from "@mikro-orm/core";
import { BaseEntity } from "../../../shared/entities/base.entity";
import { UserEntity } from "../../user/entities/user.entity";
import { StationRepository } from "../repositories/station.repository";

@Entity({ repository: () => StationRepository })
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

	@OneToMany(() => UserEntity, user => user.station)
	users = new Collection<UserEntity>(this);
}
