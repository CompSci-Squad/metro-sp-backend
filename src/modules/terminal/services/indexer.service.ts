import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { TerminalRepository } from '../repositories/terminal.repository';
import { BaseIndexerService } from '../../../shared/services/base-indexer.service';
import { TerminalEntity } from '../entities/terminal.entity';

@Injectable()
export class IndexerService extends BaseIndexerService<TerminalEntity> {
  constructor(private readonly terminalRepository: TerminalRepository) {
    super(terminalRepository);
  }
}
