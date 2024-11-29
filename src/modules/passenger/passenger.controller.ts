import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpCode,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { CreatePassengerDto } from './dto/create-passenger.dto';
import { UpdatePassengerDto } from './dto/update-passenger.dto';
import {
  PassengerCreatorContextService,
  FinderService,
  IndexerService,
  RemoverService,
  UpdaterService,
} from './services';
import { FindOneParamsDto } from './dto/find-one-params.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { FindByCpfDto } from './dto/find-by-cpf.dto';

@Controller('passenger')
export class PassengerController {
  constructor(
    private readonly creatorService: PassengerCreatorContextService,
    private readonly finderService: FinderService,
    private readonly indexerService: IndexerService,
    private readonly removerService: RemoverService,
    private readonly updaterService: UpdaterService,
  ) {}

  @Post()
  @UseInterceptors(FileInterceptor('image'))
  async create(
    @Body() createPassengerDto: CreatePassengerDto,
    @UploadedFile() image: Express.Multer.File,
  ) {
    return this.creatorService.create(createPassengerDto, image);
  }

  @Get()
  async findAll() {
    return this.indexerService.index();
  }

  @Get(':id')
  async findOne(@Param() { id }: FindOneParamsDto) {
    return this.finderService.findById(id);
  }

  @Get('cpf/:cpf')
  async findByCpf(@Param() { cpf }: FindByCpfDto) {
    return this.finderService.findByCpf(cpf);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updatePassengerDto: UpdatePassengerDto,
  ) {
    return this.updaterService.update(id, updatePassengerDto);
  }

  @HttpCode(204)
  @Delete(':id')
  async remove(@Param() { id }: FindOneParamsDto) {
    return this.removerService.remove(id);
  }
}
