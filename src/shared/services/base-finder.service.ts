import {
    InternalServerErrorException,
    NotFoundException,
  } from '@nestjs/common';
  import { BaseEntity } from '../entities/base.entity';
  import { BaseRepository } from '../repositories/base.repository';
  import { NotFoundError } from '@mikro-orm/postgresql';
  
  export abstract class BaseFinderService<T extends BaseEntity> {
    private readonly baseRepository: BaseRepository<T>;
    constructor(private readonly repository: BaseRepository<T>) {
      this.baseRepository = repository;
    }
  
    public async findById(id: number) {
      try {
        return await this.baseRepository.findById(id);
      } catch (error) {
        if (error instanceof NotFoundError) throw new NotFoundException();
        throw new InternalServerErrorException(error);
      }
    }
  
    public async findByEmail(email: string) {
      try {
        return await this.baseRepository.findByEmail(email);
      } catch (error) {
        if (error instanceof NotFoundError) throw new NotFoundException();
        throw new InternalServerErrorException(error);
      }
    }
  }