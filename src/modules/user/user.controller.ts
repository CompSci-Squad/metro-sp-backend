import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { CreatorService } from './services';
import { FinderService } from './services/finder.service';
import { FindOneParamsDto } from './dto/find-one-params.dto';
import { IndexerService } from './services/indexer.service';
import { UpdaterService } from './services/updater.service';
import { RemoverService } from './services/remover.service';

@Controller('user')
export class UserController {
  constructor(
    private readonly creatorService: CreatorService,
    private readonly finderService: FinderService,
    private readonly indexerService: IndexerService,
    private readonly updaterService: UpdaterService,
    private readonly removerService: RemoverService,
  ) {}

  @Post()
  public async create(@Body() createUserDto: CreateUserDto) {
    return this.creatorService.create(createUserDto);
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
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return this.updaterService.update(dto.id, updateUserDto);
  }

  @Delete(':id')
  public async remove(@Param() dto: FindOneParamsDto) {
    return this.removerService.remove(dto.id);
  }
}
