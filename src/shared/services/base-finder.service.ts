import {
	Injectable,
	InternalServerErrorException,
	NotFoundException,
} from "@nestjs/common";
import { NotFoundError } from "@mikro-orm/postgresql";
import { BaseRepository } from "../repositories/base.repository";
import { BaseEntity } from "../entities/base.entity";

export abstract class BaseFinderService<T extends BaseEntity> {
	constructor(private readonly baseRepository: BaseRepository<T>) {}

	public async findById(id: number) {
		try {
			return await this.baseRepository.findById(id);
		} catch (error) {
			if (error instanceof NotFoundError) throw new NotFoundException();
			throw new InternalServerErrorException(error);
		}
	}
}
