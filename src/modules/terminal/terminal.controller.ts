import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { CreateTerminalDto } from './dto/create-terminal.dto';
import { UpdateTerminalDto } from './dto/update-terminal.dto';
import { CreatorService } from './services';
import { FinderService } from './services/finder.service';
import { FindOneParamsDto } from './dto/find-one-params.dto';
import { IndexerService } from './services/indexer.service';
import { UpdaterService } from './services/updater.service';
import { RemoverService } from './services/remover.service';

@Controller('terminal')
export class TerminalController {
  constructor(
    private readonly creatorService: CreatorService,
    private readonly finderService: FinderService,
    private readonly indexerService: IndexerService,
    private readonly updaterService: UpdaterService,
    private readonly removerService: RemoverService,
  ) {}

  @Post()
  public async create(@Body() createTerminalDto: CreateTerminalDto) {
    return this.creatorService.create(createTerminalDto);
  }

  @Get()
  public async findAll() {
    return this.indexerService.index();
  }

  @Get(':id')
  public async findOne(@Param() dto: FindOneParamsDto) {
    return this.finderService.findById(dto.id);
  }

  @Patch(':id')
  public async update(
    @Param() dto: FindOneParamsDto,
    @Body() updateTerminalDto: UpdateTerminalDto,
  ) {
    return this.updaterService.update(dto.id, updateTerminalDto);
  }

  @Delete(':id')
  remove(@Param() dto: FindOneParamsDto) {
    return this.removerService.remove(dto.id);
  }
}
