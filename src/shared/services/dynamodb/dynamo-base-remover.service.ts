import { InternalServerErrorException, Logger } from "@nestjs/common";
import { BaseDynamoEntity } from "../../entities/dynamo";
import { DynamoDBRepository } from "../../repositories/dynamo.repository";
import { KeyType } from "../../types/dynamodb-key.type";

export abstract class DynamoBaseRemoverService<
	T extends BaseDynamoEntity,
	K extends KeyType,
> {
	protected abstract readonly logger: Logger;
	constructor(private readonly baseRepository: DynamoDBRepository<T, K>) {}

	public async removeById(id: string) {
		try {
			await this.baseRepository.deleteItemById(id);
		} catch (error) {
			this.logger.error(error);
			throw new InternalServerErrorException(error);
		}
	}
}
