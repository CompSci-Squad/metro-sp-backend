import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocumentClient } from '@aws-sdk/lib-dynamodb';
import { ConfigService } from '@nestjs/config';
import { PassengerRepository } from '../repositories/passenger.repository';

export class PassengerRepositorySingleton {
  private static instance: PassengerRepository;

  private constructor() {}

  public static getInstance(configService: ConfigService): PassengerRepository {
    if (!this.instance) {
      this.instance = this.createClientRepositoryFactory(configService);
    }
    return this.instance;
  }

  private static createClientRepositoryFactory(
    configService: ConfigService,
  ): PassengerRepository {
    const dbClient = new DynamoDBClient({
      region: configService.get('AWS_REGION') ?? 'us-east-1',
      endpoint: configService.get('AWS_ENDPOINT') ?? 'http://localhost:4566',
      credentials: {
        accessKeyId: configService.get('AWS_ACCESS_KEY') ?? 'test',
        secretAccessKey: configService.get('AWS_SECRET_KEY') ?? 'test',
      },
    });

    const docClient = DynamoDBDocumentClient.from(dbClient);
    return new PassengerRepository(dbClient, docClient);
  }
}
