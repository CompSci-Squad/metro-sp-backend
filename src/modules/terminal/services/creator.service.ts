import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { TerminalRepository } from '../repositories/terminal.repository';
import { TerminalEntity } from '../entities/terminal.entity';
import { CreateTerminalDto } from '../dto/create-terminal.dto';

@Injectable()
export class CreatorService {
  constructor(private readonly terminalRepository: TerminalRepository) {}

  public async create(dto: CreateTerminalDto): Promise<TerminalEntity> {
    try {
      return await this.terminalRepository.createEntity(dto);
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }
}
