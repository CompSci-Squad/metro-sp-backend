import {
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { DynamoDBRepository } from '../../../shared/repositories/dynamo.repository';
import {
  passengerAttributes,
  passengerKeyAttributes,
  passengerGlobalSecondaryIndexes,
  passengerLocalSecondaryIndexes,
} from '../entities/passenger.attributes';
import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocumentClient } from '@aws-sdk/lib-dynamodb';
import { PassengerEntity } from '../entities/passenger';

export class PassengerRepository extends DynamoDBRepository<
  PassengerEntity,
  { id: string; cpf: string }
> {
  protected readonly logger = new Logger(PassengerRepository.name);
  protected tableName = 'clients';
  protected keyAttributes = passengerKeyAttributes;

  protected secondaryIndexes = passengerLocalSecondaryIndexes;
  protected globalSecondaryIndexes = passengerGlobalSecondaryIndexes;
  protected attributes = passengerAttributes;

  constructor(dbClient: DynamoDBClient, docClient: DynamoDBDocumentClient) {
    super(dbClient, docClient);
    this.ensureTableExists().catch((error) => {
      this.logger.error(`Table initialization failed: ${error.message}`);
      throw new InternalServerErrorException(
        `Table initialization failed: ${error.message}`,
      );
    });
  }
}
