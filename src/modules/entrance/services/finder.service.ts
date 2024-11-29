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
export class FinderService  {
  constructor(private readonly entranceRepository: EntranceRepository) {
  }
  public async findById(id: number) {
    try {
      return await this.entranceRepository.findOneOrFail(id, { populate: ['station', 'terminal'] });
    } catch (error) {
      if (error instanceof NotFoundError) throw new NotFoundException();
      throw new InternalServerErrorException(error);
    }
  }
  
}
