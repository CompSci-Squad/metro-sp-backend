import {
	Injectable,
	InternalServerErrorException,
	Logger,
} from "@nestjs/common";
import { PassengerEntity } from "../entities/passenger";
import { DynamoBaseFinderService } from "../../../shared/services/dynamodb/dynamo-base-finder.service";
import { PassengerRepository } from "../repositories/passenger.repository";
import { EncryptionUtil } from "../utils";

@Injectable()
export class FinderService extends DynamoBaseFinderService<
  PassengerEntity,
  { id: string; cpf: string }
> {
	protected readonly logger = new Logger(FinderService.name);
	constructor(
		private readonly passengerRepository: PassengerRepository,
		private readonly encryptionUtil: EncryptionUtil
	) {
		super(passengerRepository);
	}

	public override async findById(id: string): Promise<PassengerEntity> {
		try {
			const item = await this.passengerRepository.getItemById(id);
			return { ...item, cpf: this.encryptionUtil.decrypt(item.cpf) };
		} catch (error) {
			this.logger.error(error);
			throw new InternalServerErrorException(error);
		}
	}
}
