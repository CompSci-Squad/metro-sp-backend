import { Module } from "@nestjs/common";
import { StationController } from "./station.controller";
import { CreatorService } from "./services/creator.service";
import { StationRepository } from "./repositories/station.repository";
import { IndexerService } from "./services/indexer.service";
import { FinderService } from "./services/finder.service";
import { UpdaterService } from "./services/updater.service";
import { RemoverService } from "./services/remover.service";
import { MikroORM } from "@mikro-orm/postgresql";
import { MikroOrmModule } from "@mikro-orm/nestjs";
import { UserEntity } from "../user/entities/user.entity";
import { StationEntity } from "./entities/station.entity";

@Module({
  imports: [MikroOrmModule.forFeature([UserEntity, StationEntity])],
	controllers: [StationController],
	providers: [
		CreatorService,
		StationRepository,
		IndexerService,
		FinderService,
		UpdaterService,
		RemoverService,
	],
})
export class StationModule {}
