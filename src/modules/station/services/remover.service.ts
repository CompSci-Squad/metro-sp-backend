import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { StationRepository } from '../repositories/station.repository';
import { NotFoundError } from '@mikro-orm/postgresql';
import { BaseRemoverService } from '../../../shared/services/base-remover.service';
import { StationEntity } from '../entities/station.entity';

@Injectable()
export class RemoverService extends BaseRemoverService<StationEntity> {
  constructor(private readonly stationRepository: StationRepository) {
    super(stationRepository);
  }
}
