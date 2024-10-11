import { Injectable } from '@nestjs/common';
import { BaseRepository } from '../../../shared/repositories/base.repository';
import { StationEntity } from '../entities/station.entity';
import { EntityManager, EntityRepository } from '@mikro-orm/postgresql';
import { UserEntity } from '../../user/entities/user.entity';

export class StationRepository extends BaseRepository<StationEntity> {
    async findAllWithUsers() {
        return this.findAll({ populate: ['users'] });
      }
}
