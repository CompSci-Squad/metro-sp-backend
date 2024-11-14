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
      region: configService.get<string>('DYNAMODB_REGION') || 'local',
      endpoint:
        configService.get<string>('DYNAMODB_ENDPOINT') ||
        'http://localhost:8000',
      credentials: {
        accessKeyId: configService.get<string>('AWS_ACCESS_KEY_ID') || '',
        secretAccessKey:
          configService.get<string>('AWS_SECRET_ACCESS_KEY') || '',
      },
    });

    const docClient = DynamoDBDocumentClient.from(dbClient);
    return new PassengerRepository(dbClient, docClient);
  }
}