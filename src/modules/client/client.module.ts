import { Module } from "@nestjs/common";
import { ClientController } from "./client.controller";
import { ClientRepository } from "./repositories/client.repository";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { ClientRepositorySingleton } from "./factories/create-client-repository.factory";
import {
	ClientValidatorPoliceOfficerStrategy,
	ClientValidatorUnemployedStrategy,
	ClientValidatorAgeStrategy,
} from "./strategies";
import {
	ClientCreatorContextService,
	FinderService,
	IndexerService,
	RemoverService,
	UpdaterService,
} from "./services";

@Module({
	controllers: [ClientController],
	imports: [ConfigModule],
	providers: [
		{
			provide: ClientRepository,
			useFactory: (configService: ConfigService) =>
				ClientRepositorySingleton.getInstance(configService),
			inject: [ConfigService],
		},
		ClientValidatorAgeStrategy,
		ClientValidatorPoliceOfficerStrategy,
		ClientValidatorUnemployedStrategy,
		ClientCreatorContextService,
		FinderService,
		UpdaterService,
		RemoverService,
		IndexerService,
	],
})
export class ClientModule {}
