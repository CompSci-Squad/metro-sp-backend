import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { CreatePassengerDto } from '../dto/create-passenger.dto';
import { ValidatePassengerStrategy } from '../interfaces/validate-passenger.interface';
import { PassengerEntity } from '../entities/passenger';
import { JustificationType } from '../enums/justification-type.enum';
import {
  PassengerValidatorAgeStrategy,
  PassengerValidatorUnemployedStrategy,
  PassengerValidatorPoliceOfficerStrategy,
} from '../strategies';
import { PassengerRepository } from '../repositories/passenger.repository';
import { ulid } from 'ulid';

@Injectable()
export class PassengerCreatorContextService {
  private readonly logger = new Logger(PassengerCreatorContextService.name);
  private strategy: ValidatePassengerStrategy;
  private readonly strategyMap: Record<
    JustificationType,
    ValidatePassengerStrategy
  >;

  constructor(
    private readonly ageStrategy: PassengerValidatorAgeStrategy,
    private readonly unemployedStrategy: PassengerValidatorUnemployedStrategy,
    private readonly policeOfficerStrategy: PassengerValidatorPoliceOfficerStrategy,
    private readonly clientRepository: PassengerRepository,
  ) {
    this.strategyMap = {
      [JustificationType.AGE]: this.ageStrategy,
      [JustificationType.UNEMPLOYED]: this.unemployedStrategy,
      [JustificationType.POLICEOFFICER]: this.policeOfficerStrategy,
      [JustificationType.PCD]: null,
    };
  }

  private setStrategy(strategy: ValidatePassengerStrategy) {
    this.strategy = strategy;
  }

  public async create(data: CreatePassengerDto): Promise<PassengerEntity> {
    try {
      const strategy = this.strategyMap[data.justificationType];

      if (!strategy && strategy !== null) {
        throw new BadRequestException('Invalid justification type');
      }

      this.setStrategy(strategy);

      if (
        this.strategy !== null &&
        !(await this.strategy.validate(data.justificationDetails))
      ) {
        throw new BadRequestException('Invalid justification details');
      }
      return await this.clientRepository.createItem(
        new PassengerEntity({ ...data, id: ulid() }),
      );
    } catch (error) {
      this.logger.error(error);
      throw new InternalServerErrorException(error);
    }
  }
}
