import { Injectable, InternalServerErrorException, NotFoundException } from "@nestjs/common";
import { StationRepository } from "../repositories/station.repository";
import { NotFoundError } from "@mikro-orm/postgresql";

@Injectable()
export class RemoverService {
	constructor(private readonly stationRepository: StationRepository) {}

	public async remove(id: number) {
		try {
			return await this.stationRepository.softDelete(id);
		} catch (error) {
			if (error instanceof NotFoundError) throw new NotFoundException();
			throw new InternalServerErrorException(error);
		}
	}
}
