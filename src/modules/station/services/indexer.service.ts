import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { StationRepository } from '../repositories/station.repository';
import { EntityManager } from '@mikro-orm/postgresql';

@Injectable()
export class IndexerService {
  constructor(private readonly stationRepository: StationRepository) {}

  public async index() {
    try {
      return await this.stationRepository.findAllEntities();
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }
}
