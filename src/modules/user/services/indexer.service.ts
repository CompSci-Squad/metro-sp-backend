import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { UserRepository } from '../repositories/user.repository';

@Injectable()
export class IndexerService {
  constructor(private readonly stationRepository: UserRepository) {}

  public async index() {
    try {
      return await this.stationRepository.findAllEntities();
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }
}
