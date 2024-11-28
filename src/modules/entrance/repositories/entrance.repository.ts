import { Injectable, Logger } from '@nestjs/common';
import { BaseRepository } from '../../../shared/repositories/base.repository';
import { EntranceEntity } from '../entities/entrance.entity';
import { StationEntity } from '../../station/entities/station.entity';

export class EntranceRepository extends BaseRepository<EntranceEntity> {
  private readonly logger = new Logger(EntranceRepository.name);
  public override async createEntity(
    info: Partial<EntranceEntity>,
  ): Promise<EntranceEntity> {
    try {
      const { terminal, station } = info;

      const entrance = this.create(info);

      if (terminal) entrance.terminal = terminal;

      entrance.station = station;

      await this.em.persistAndFlush(entrance);

      return entrance;
    } catch (error) {
      this.logger.error('Error creating entrance:', error);

      // Re-throw the error with additional context
      throw new Error(`Failed to create entrance: ${error.message}`);
    }
  }
}
