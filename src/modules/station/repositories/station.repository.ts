import { Injectable } from "@nestjs/common";
import { BaseRepository } from "../../../shared/repositories/base.repository";
import { StationEntity } from "../entities/station.entity";


@Injectable()
export class StationRepository extends BaseRepository<StationEntity, number> {}