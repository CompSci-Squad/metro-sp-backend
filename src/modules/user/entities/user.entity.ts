import { Entity, Enum, ManyToOne, Property } from "@mikro-orm/core";

import { BaseEntity } from "../../../shared/entities/base.entity";

import { UserPermissions } from "../enums/user-permissions.enum";

import { StationEntity } from "../../station/entities/station.entity";

@Entity()
export class UserEntity extends BaseEntity {
	@Property()
	email!: string;

	@Property()
	password!: string;

	@Property()
	cpf!: string;

	@Enum({ items: () => UserPermissions, array: true })
	permissions!: UserPermissions;

	@ManyToOne()
	station!: StationEntity;
}
