import { Module } from "@nestjs/common";
import { AIController } from "./ai.controller";
import { AISearchRepository } from "./repository/ai-search.repository";
import { AICreateImageRepository } from "./repository/ai-create-image.repository";
import { AIDatasource } from "../../shared/datasources/ai.datasource";
import { ConfigModule } from "@nestjs/config";
import { SearchForImageService } from "./services/search-for-image.service";
import { LogModule } from "../log/log.module";

@Module({
	imports: [ConfigModule, LogModule],
	controllers: [AIController],
	providers: [
		AISearchRepository,
		AICreateImageRepository,
		AIDatasource,
		SearchForImageService,
	],
	exports: [AICreateImageRepository],
})
export class AIModule {}
