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
import * as bcrypt from 'bcrypt';

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
    const data = {
      ...createUserDto,
      password: await bcrypt.hash(createUserDto.password, 10),
      cpf: await bcrypt.hash(createUserDto.cpf, 10),
    };

    const createdUser = await this.creatorService.create(data);

    return {
      ...createdUser,
      password: undefined,
      cpf: undefined,
    };
  }

  @Get()
  public async findAll() {
    return this.indexerService.index();
  }

  @Get(':email')
  public async findOne(@Param() dto: FindOneParamsDto) {
    return this.finderService.findByEmail(dto.email);
  }

  @Patch(':email')
  public async update(
    @Param() dto: FindOneParamsDto,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return this.updaterService.updateByEmail(dto.email, updateUserDto);
  }

  @Delete(':email')
  public async remove(@Param() dto: FindOneParamsDto) {
    return this.removerService.removeByEmail(dto.email);
  }
}
