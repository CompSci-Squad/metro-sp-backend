import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { CreateEntranceDto } from './dto/create-entrance.dto';
import { UpdateEntranceDto } from './dto/update-entrance.dto';
import { CreatorService } from './services/creator.service';
import { IndexerService } from './services/indexer.service';
import { FinderService } from './services/finder.service';
import { UpdaterService } from './services/updater.service';
import { RemoverService } from './services/remover.service';
import { FindOneParamsDto } from './dto/find-one-params.dto';

@Controller('entrance')
export class EntranceController {
  constructor(
    private readonly creatorService: CreatorService,
    private readonly indexerService: IndexerService,
    private readonly finderService: FinderService,
    private readonly updaterService: UpdaterService,
    private readonly removerService: RemoverService,
  ) {}

  @Post()
  public async create(@Body() createEntranceDto: CreateEntranceDto) {
    return this.creatorService.create(createEntranceDto);
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
    @Body() updateEntranceDto: UpdateEntranceDto,
  ) {
    return this.updaterService.update(dto.id, updateEntranceDto);
  }

  @Delete(':id')
  public async remove(@Param() dto: FindOneParamsDto) {
    return this.removerService.remove(dto.id);
  }
}
