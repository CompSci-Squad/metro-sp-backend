import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { EntranceRepository } from '../repositories/entrance.repository';

@Injectable()
export class IndexerService {
  constructor(private readonly entranceRepository: EntranceRepository) {}

  public async index() {
    try {
      return await this.entranceRepository.findAllEntities();
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }
}
