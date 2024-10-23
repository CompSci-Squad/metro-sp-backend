import { Injectable, InternalServerErrorException, Logger } from '@nestjs/common';
import { TerminalRepository } from '../repositories/terminal.repository';
import { TerminalEntity } from '../entities/terminal.entity';
import { CreateTerminalDto } from '../dto/create-terminal.dto';
import { FinderService as EntranceFinderService } from '../../entrance/services/finder.service';

@Injectable()
export class CreatorService {
  private readonly logger = new Logger(CreatorService.name)
  constructor(private readonly terminalRepository: TerminalRepository, private readonly entranceFinderService: EntranceFinderService) {}

  public async create({ entranceId, ...rest }: CreateTerminalDto): Promise<TerminalEntity> {
    try {
      const entrance = await this.entranceFinderService.findById(entranceId);
      return await this.terminalRepository.createEntity({ ...rest, entrance });
    } catch (error) {
      this.logger.error(error);
      throw new InternalServerErrorException(error);
    }
  }
}
