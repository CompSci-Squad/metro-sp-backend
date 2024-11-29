import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { TerminalRepository } from '../repositories/terminal.repository';
import { BaseIndexerService } from '../../../shared/services/base-indexer.service';
import { TerminalEntity } from '../entities/terminal.entity';

@Injectable()
export class IndexerService {
  constructor(private readonly terminalRepository: TerminalRepository) {
  }
  public async index() {
    return this.terminalRepository.findAll({ populate: ['entrance'] });
   }
}
