import {
	Injectable,
	Logger,
} from "@nestjs/common";
import { ClientEntity } from "../entities/client";
import { DynamoBaseFinderService } from "../../../shared/services/dynamodb/dynamo-base-finder.service";

@Injectable()
export class FinderService extends DynamoBaseFinderService<
	ClientEntity,
	{ id: string; cpf: string }
> {
	protected readonly logger = new Logger(FinderService.name);
}
