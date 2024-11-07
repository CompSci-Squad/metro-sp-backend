import {
	Injectable,
	InternalServerErrorException,
	Logger,
} from "@nestjs/common";
import { ClientRepository } from "../repositories/passenger.repository";
import { DynamoBaseRemoverService } from "../../../shared/services/dynamodb/dynamo-base-remover.service";
import { ClientEntity } from "../entities/client";

@Injectable()
export class RemoverService extends DynamoBaseRemoverService<
	ClientEntity,
	{ id: string; cpf: string }
> {
	protected readonly logger = new Logger(RemoverService.name);
}
