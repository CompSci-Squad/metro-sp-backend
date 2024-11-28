import {
    Injectable,
    InternalServerErrorException,
    NotFoundException,
  } from '@nestjs/common';
  import { NotFoundError } from '@mikro-orm/postgresql';
  import { BaseEntity } from '../entities/base.entity';
  import { BaseRepository } from '../repositories/base.repository';
  
  export abstract class BaseRemoverService<T extends BaseEntity> {
    private readonly baseRepository: BaseRepository<T>;
    constructor(private readonly repository: BaseRepository<T>) {
      this.baseRepository = repository;
    }
  
    public async remove(id: number) {
      try {
        return await this.baseRepository.softDelete(id);
      } catch (error) {
        if (error instanceof NotFoundError) throw new NotFoundException();
        throw new InternalServerErrorException(error);
      }
    }
  
    public async removeByEmail(email: string) {
      try {
        return await this.baseRepository.softDeleteByEmail(email);
      } catch (error) {
        if (error instanceof NotFoundError) throw new NotFoundException();
        throw new InternalServerErrorException(error);
      }
    }
  }