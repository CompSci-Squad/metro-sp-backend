import { Injectable, InternalServerErrorException, NotFoundException } from "@nestjs/common";
import { UpdateStationDto } from "../dto/update-station.dto";
import { BaseUpdaterService } from "src/shared/services/base-updater.service";
import { StationEntity } from "../entities/station.entity";

@Injectable()
export class UpdaterService extends BaseUpdaterService<StationEntity, UpdateStationDto> {}
