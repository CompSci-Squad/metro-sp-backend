import {
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { BaseDynamoEntity } from '../../entities/dynamo';
import { DynamoDBRepository } from '../../repositories/dynamo.repository';
import { KeyType } from '../../types/dynamodb-key.type';

export abstract class DynamoBaseFinderService<
  T extends BaseDynamoEntity,
  K extends KeyType,
> {
  protected abstract readonly logger: Logger;
  constructor(private readonly baseRepository: DynamoDBRepository<T, K>) {}

  public async findById(id: string) {
    try {
      return await this.baseRepository.getItemById(id);
    } catch (error) {
      this.logger.error(error);
      throw new InternalServerErrorException(error);
    }
  }
}
