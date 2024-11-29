import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { TerminalRepository } from '../repositories/terminal.repository';
import { NotFoundError } from '@mikro-orm/postgresql';
import { BaseFinderService } from '../../../shared/services/base-finder.service';
import { TerminalEntity } from '../entities/terminal.entity';

@Injectable()
export class FinderService {
  constructor(private readonly terminalRepository: TerminalRepository) {
  }
  public async findById(id: number) {
    try {
      return await this.terminalRepository.findOneOrFail(id, { populate: ['entrance'] });
    } catch (error) {
      if (error instanceof NotFoundError) throw new NotFoundException();
      throw new InternalServerErrorException(error);
    }
  }
}
