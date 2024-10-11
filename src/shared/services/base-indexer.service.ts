import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { BaseEntity } from '../entities/base.entity';
import { BaseRepository } from '../repositories/base.repository';

@Injectable()
export class BaseIndexerService<T extends BaseEntity> {
  constructor(private readonly baseRepository: BaseRepository<T>) {}

  public async index() {
    try {
      return await this.baseRepository.findAllEntities();
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }
}
