import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { TerminalRepository } from '../repositories/terminal.repository';

@Injectable()
export class IndexerService {
  constructor(private readonly terminalRepository: TerminalRepository) {}

  public async index() {
    try {
      return await this.terminalRepository.findAllEntities();
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }
}
