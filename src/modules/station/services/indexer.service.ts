import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { StationRepository } from '../repositories/station.repository';
import { EntityManager } from '@mikro-orm/postgresql';

@Injectable()
export class IndexerService {
  constructor(
    private readonly stationRepository: StationRepository,
    private readonly em: EntityManager,
  ) {}

  public async index() {
    try {
      console.log('aqui, 2');
      return await this.stationRepository.findAllEntities();
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }
}
