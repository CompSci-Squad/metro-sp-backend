import { Module } from "@nestjs/common";
import { PassengerController } from "./passenger.controller";
import { PassengerRepository } from "./repositories/passenger.repository";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { PassengerRepositorySingleton } from "./factories/create-client-repository.factory";
import {
	PassengerValidatorPoliceOfficerStrategy,
	PassengerValidatorUnemployedStrategy,
	PassengerValidatorAgeStrategy,
} from "./strategies";
import {
	PassengerCreatorContextService,
	FinderService,
	IndexerService,
	RemoverService,
	UpdaterService,
} from "./services";
import { CryptographyUtils } from "../../shared/utils/cryptography.utils";
import { AIModule } from "../ai/ai.module";

@Module({
	controllers: [PassengerController],
	imports: [ConfigModule, AIModule],
	providers: [
		{
			provide: PassengerRepository,
			useFactory: (configService: ConfigService) =>
				PassengerRepositorySingleton.getInstance(configService),
			inject: [ConfigService],
		},
		PassengerValidatorAgeStrategy,
		PassengerValidatorPoliceOfficerStrategy,
		PassengerValidatorUnemployedStrategy,
		PassengerCreatorContextService,
		FinderService,
		UpdaterService,
		RemoverService,
		IndexerService,
		CryptographyUtils
	],
})
export class PassengerModule {}
