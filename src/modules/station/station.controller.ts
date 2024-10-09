import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { CreateStationDto } from './dto/create-station.dto';
import { UpdateStationDto } from './dto/update-station.dto';
import { CreatorService } from './services/creator.service';
import { IndexerService } from './services/indexer.service';
import { FinderService } from './services/finder.service';
import { UpdaterService } from './services/updater.service';
import { RemoverService } from './services/remover.service';
import { FindOneParamsDto } from './dto/find-one-params.dto';

@Controller('station')
export class StationController {
  constructor(
    private readonly creatorService: CreatorService,
    private readonly indexerService: IndexerService,
    private readonly finderService: FinderService,
    private readonly updaterService: UpdaterService,
    private readonly removerService: RemoverService,
  ) {}

  @Post()
  public async create(@Body() createStationDto: CreateStationDto) {
    return this.creatorService.create(createStationDto);
  }

  @Get()
  public async findAll() {
    console.log('aqui');
    return this.indexerService.index();
  }

  @Get(':id')
  public async findOne(@Param() dto: FindOneParamsDto) {
    return this.finderService.findById(dto.id);
  }

  @Patch(':id')
  public async update(
    @Param() dto: FindOneParamsDto,
    @Body() updateStationDto: UpdateStationDto,
  ) {
    return this.updaterService.update(dto.id, updateStationDto);
  }

  @Delete(':id')
  public async remove(@Param() dto: FindOneParamsDto) {
    return this.removerService.remove(dto.id);
  }
}
