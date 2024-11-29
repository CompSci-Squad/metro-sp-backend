import { Logger } from '@nestjs/common';
import { BaseRepository } from '../../../shared/repositories/base.repository';
import { TerminalEntity } from '../entities/terminal.entity';

export class TerminalRepository extends BaseRepository<TerminalEntity> {
  private readonly logger = new Logger(TerminalRepository.name);
  public override async createEntity(
    info: Partial<TerminalEntity>,
  ): Promise<TerminalEntity> {
    try {
      const terminal = this.create(info);

      terminal.entrance = info.entrance;

      await this.em.persistAndFlush(terminal);
      return terminal;
    } catch (error) {
      this.logger.error(error);
      throw new Error(error);
    }
  }
}
