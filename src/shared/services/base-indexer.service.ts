import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { NotFoundError } from '@mikro-orm/postgresql';
import { BaseRepository } from '../repositories/base.repository';
import { BaseEntity } from '../entities/base.entity';

export abstract class BaseIndexerService<T extends BaseEntity> {
  private readonly baseRepository: BaseRepository<T>;
  constructor(private readonly repository: BaseRepository<T>) {
    this.baseRepository = repository;
  }

  public async index() {
    try {
      return await this.baseRepository.findAllEntities();
    } catch (error) {
      if (error instanceof NotFoundError) throw new NotFoundException();
      throw new InternalServerErrorException(error);
    }
  }
}
