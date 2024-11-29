import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { StationRepository } from '../repositories/station.repository';
import { UpdateStationDto } from '../dto/update-station.dto';
import { NotFoundError } from '@mikro-orm/postgresql';

@Injectable()
export class UpdaterService {
  constructor(private readonly stationRepository: StationRepository) {}

  public async update(id: number, dto: UpdateStationDto) {
    try {
      return await this.stationRepository.update(id, dto);
    } catch (error) {
      if (error instanceof NotFoundError) throw new NotFoundException();
      throw new InternalServerErrorException(error);
    }
  }
}
