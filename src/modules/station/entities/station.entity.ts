import { Property, Entity, OneToMany, Collection, Rel, ManyToMany } from "@mikro-orm/postgresql";
import { BaseEntity } from "../../../shared/entities/base.entity";
import { UserEntity } from "../../user/entities/user.entity";
import { StationRepository } from "../repositories/station.repository";

@Entity({ repository: () => StationRepository, tableName: 'station' })
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

	@ManyToMany({ entity: () => UserEntity })
	users = new Collection<UserEntity>(this);
}
