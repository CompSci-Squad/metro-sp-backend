import {
	Injectable,
	InternalServerErrorException,
	NotFoundException,
} from "@nestjs/common";
import { NotFoundError } from "@mikro-orm/postgresql";
import { BaseRepository } from "../repositories/base.repository";
import { BaseFinderService } from "./base-finder.service";
import { BaseEntity } from "../entities/base.entity";

export abstract class BaseRemoverService<T extends BaseEntity> {
	constructor(private readonly baseRepository: BaseRepository<T>) {}

	public async remove(id: number) {
		try {
			return await this.baseRepository.softDelete(id);
		} catch (error) {
			if (error instanceof NotFoundError) throw new NotFoundException();
			throw new InternalServerErrorException(error);
		}
	}
}
