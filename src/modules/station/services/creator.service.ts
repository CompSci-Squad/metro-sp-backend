import { Injectable, InternalServerErrorException } from "@nestjs/common";
import { CreateStationDto } from "../dto/create-station.dto";
import { StationRepository } from '../repositories/station.repository'

@Injectable()
export class CreatorService {
    constructor(private readonly stationRepository: StationRepository) {}

    public async create(dto: CreateStationDto) {
        try {
            console.log(this.stationRepository)
            return await this.stationRepository.createEntity(dto)
        } catch (error) {
            throw new InternalServerErrorException(error)
        }
    }
}