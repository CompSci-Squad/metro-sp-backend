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
export class FinderService extends BaseFinderService<TerminalEntity> {
  constructor(private readonly terminalRepository: TerminalRepository) {
    super(terminalRepository);
  }
}
