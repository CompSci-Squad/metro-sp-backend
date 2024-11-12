import {
	Injectable,
	Logger,
} from "@nestjs/common";
import { PassengerEntity } from "../entities/passenger";
import { DynamoBaseFinderService } from "../../../shared/services/dynamodb/dynamo-base-finder.service";

@Injectable()
export class FinderService extends DynamoBaseFinderService<
	PassengerEntity,
	{ id: string; cpf: string }
> {
	protected readonly logger = new Logger(FinderService.name);
}
