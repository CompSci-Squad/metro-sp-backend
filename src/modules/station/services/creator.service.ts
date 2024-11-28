import {
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { CreateStationDto } from '../dto/create-station.dto';
import { StationRepository } from '../repositories/station.repository';

@Injectable()
export class CreatorService {
  private readonly logger = new Logger(CreatorService.name);
  constructor(private readonly stationRepository: StationRepository) {}

  public async create(dto: CreateStationDto) {
    try {
      return await this.stationRepository.createEntity(dto);
    } catch (error) {
      this.logger.error(error);
      throw new InternalServerErrorException(error);
    }
  }
}
