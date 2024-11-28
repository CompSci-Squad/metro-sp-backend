import { Injectable } from '@nestjs/common';
import { BaseRepository } from '../../../shared/repositories/base.repository';
import { UserEntity } from '../entities/user.entity';
import { EntityManager } from '@mikro-orm/postgresql';
import { StationEntity } from 'src/modules/station/entities/station.entity';

export class UserRepository extends BaseRepository<UserEntity> {
  public async addUserToStation(station: StationEntity, userId: number) {
    const user = await this.findById(userId);
    user.stations.add(station);
    await this.em.persistAndFlush(user);
  }
}
