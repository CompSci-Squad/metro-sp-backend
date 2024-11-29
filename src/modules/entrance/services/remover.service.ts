import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { EntranceRepository } from '../repositories/entrance.repository';
import { NotFoundError } from '@mikro-orm/postgresql';
import { BaseRemoverService } from '../../../shared/services/base-remover.service';
import { EntranceEntity } from '../entities/entrance.entity';

@Injectable()
export class RemoverService extends BaseRemoverService<EntranceEntity> {
  constructor(private readonly entranceRepository: EntranceRepository) {
    super(entranceRepository);
  }
}
