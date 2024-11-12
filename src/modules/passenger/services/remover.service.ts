import {
	Injectable,
	Logger,
} from "@nestjs/common";
import { DynamoBaseRemoverService } from "../../../shared/services/dynamodb/dynamo-base-remover.service";
import { PassengerEntity } from "../entities/passenger";

@Injectable()
export class RemoverService extends DynamoBaseRemoverService<
	PassengerEntity,
	{ id: string; cpf: string }
> {
	protected readonly logger = new Logger(RemoverService.name);
}
