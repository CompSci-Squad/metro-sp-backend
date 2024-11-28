import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { EntranceRepository } from '../repositories/entrance.repository';
import { NotFoundError } from '@mikro-orm/postgresql';
import { EntranceEntity } from '../entities/entrance.entity';
import { BaseFinderService } from '../../../shared/services/base-finder.service';

@Injectable()
export class FinderService extends BaseFinderService<EntranceEntity> {
  constructor(private readonly entranceRepository: EntranceRepository) {
    super(entranceRepository);
  }
}
