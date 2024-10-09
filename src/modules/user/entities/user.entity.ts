import { Collection, Entity, Enum, ManyToMany, ManyToOne, Property, Rel } from "@mikro-orm/postgresql";

import { BaseEntity } from "../../../shared/entities/base.entity";

import { UserPermissions } from "../enums/user-permissions.enum";

import { StationEntity } from "../../station/entities/station.entity";
import { UserRepository } from "../repositories/user.repository";

@Entity({ repository: () => UserRepository, tableName: 'user' })
export class UserEntity extends BaseEntity {

	@Property()
	name!: string;

	@Property({ unique: true })
	email!: string;

	@Property()
	password!: string;

	@Property()
	cpf!: string;

	@Enum({ items: () => UserPermissions, array: true })
	permissions!: UserPermissions[];

	@ManyToMany({entity: () => StationEntity, mappedBy: 'users' })
	stations = new Collection<StationEntity>(this);
}
