import { Injectable } from '@nestjs/common';
import { BaseRepository } from '../../../shared/repositories/base.repository';
import { EntranceEntity } from '../entities/entrance.entity';

export class EntranceRepository extends BaseRepository<EntranceEntity> {}
