import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateClientDto } from '../dto/create-client.dto';
import { CreateClientStrategy } from '../interfaces/create-client.interface';
import { ClientEntity } from '../entities/client';
import { JustificationType } from '../enums/justification-type.enum';
import {
  ClientCreatorAgeStrategy,
  ClientCreatorPCDStrategy,
  ClientCreatorPoliceOfficerStrategy,
  ClientCreatorUnemployedStrategy,
} from '../strategies';

@Injectable()
export class ClientCreatorContextService {
  private strategy: CreateClientStrategy;

  constructor(
    private readonly ageStrategy: ClientCreatorAgeStrategy,
    private readonly pcdStrategy: ClientCreatorPCDStrategy,
    private readonly unemployedStrategy: ClientCreatorUnemployedStrategy,
    private readonly policeOfficerStrategy: ClientCreatorPoliceOfficerStrategy,
  ) {}

  private setStrategy(strategy: CreateClientStrategy) {
    this.strategy = strategy;
  }

  public async create(data: CreateClientDto): Promise<ClientEntity> {
    switch (data.justificationType) {
      case JustificationType.AGE:
        this.setStrategy(this.ageStrategy);
        break;
      case JustificationType.PCD:
        this.setStrategy(this.pcdStrategy);
        break;
      case JustificationType.UNEMPLOYED:
        this.setStrategy(this.unemployedStrategy);
        break;
      case JustificationType.POLICEOFFICER:
        this.setStrategy(this.policeOfficerStrategy);
        break;
      default:
        throw new BadRequestException('Invalid justification type');
    }
    return await this.strategy.create(data);
  }
}
