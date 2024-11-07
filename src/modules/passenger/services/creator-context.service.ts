import {
	BadRequestException,
	Injectable,
	InternalServerErrorException,
	Logger,
} from "@nestjs/common";
import { CreateClientDto } from "../dto/create-passenger.dto";
import { ValidatePassengerStrategy } from "../interfaces/validate-passenger.interface";
import { ClientEntity } from "../entities/client";
import { JustificationType } from "../enums/justification-type.enum";
import {
	PassengerValidatorAgeStrategy,
	PassengerValidatorUnemployedStrategy,
	PassengerValidatorPoliceOfficerStrategy,
} from "../strategies";
import { PassengerRepository } from "../repositories/passenger.repository";
import { ulid } from "ulid";

@Injectable()
export class PassengerCreatorContextService {
	private readonly logger = new Logger(PassengerCreatorContextService.name);
	private strategy: ValidatePassengerStrategy;
	private readonly strategyMap: Record<JustificationType, ValidatePassengerStrategy>;

	constructor(
		private readonly ageStrategy: PassengerValidatorAgeStrategy,
		private readonly unemployedStrategy: PassengerValidatorUnemployedStrategy,
		private readonly policeOfficerStrategy: PassengerValidatorPoliceOfficerStrategy,
		private readonly clientRepository: PassengerRepository
	) {
		this.strategyMap = {
			[JustificationType.AGE]: this.ageStrategy,
			[JustificationType.UNEMPLOYED]: this.unemployedStrategy,
			[JustificationType.POLICEOFFICER]: this.policeOfficerStrategy,
		};
	}

	private setStrategy(strategy: ValidatePassengerStrategy) {
		this.strategy = strategy;
	}

	public async create(data: CreateClientDto): Promise<ClientEntity> {
		try {
			const strategy = this.strategyMap[data.justificationType];

			if (!strategy) {
				throw new BadRequestException("Invalid justification type");
			}

			this.setStrategy(strategy);

			if (!(await this.strategy.validate(data.justificationDetails))) {
				throw new BadRequestException("Invalid justification details");
			}
			return await this.clientRepository.createItem(
				new ClientEntity({ ...data, id: ulid() })
			);
		} catch (error) {
			this.logger.error(error);
			throw new InternalServerErrorException(error);
		}
	}
}
