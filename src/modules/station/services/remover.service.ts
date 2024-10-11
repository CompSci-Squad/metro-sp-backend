import { Injectable, InternalServerErrorException, NotFoundException } from "@nestjs/common";
import { BaseRemoverService } from "src/shared/services/base-remover.service";
import { StationEntity } from "../entities/station.entity";

@Injectable()
export class RemoverService extends BaseRemoverService<StationEntity> {}
