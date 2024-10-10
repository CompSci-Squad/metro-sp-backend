import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { StationRepository } from '../repositories/station.repository';

@Injectable()
export class FinderService {
  constructor(private readonly stationRepository: StationRepository) {}

  public async findById(id: number) {
    try {
      return await this.stationRepository.findById(id);
    } catch (error) {
      if (error.name === 'NotFoundError') throw new NotFoundException();
      throw new InternalServerErrorException(error);
    }
  }
}
