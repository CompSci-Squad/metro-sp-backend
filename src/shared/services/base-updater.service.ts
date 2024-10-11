import {
    Injectable,
    InternalServerErrorException,
    NotFoundException,
} from '@nestjs/common';
import { UpdateUserDto } from '../dto/update-user.dto';
import { NotFoundError } from '@mikro-orm/postgresql';
import { BaseEntity } from '../entities/base.entity';
import { BaseRepository } from '../repositories/base.repository';

export abstract class BaseUpdaterService<T extends BaseEntity, D> {
    constructor(private readonly baseRepository: BaseRepository<T>) {}
  
    public async update(id: number, dto: D) {
        try {
            return await this.baseRepository.update(id, dto);
        } catch (error) {
            if (error instanceof NotFoundError) throw new NotFoundException();
            throw new InternalServerErrorException(error);
        }
    }
  }