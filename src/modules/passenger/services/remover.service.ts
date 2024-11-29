import {
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { PassengerRepository } from '../repositories/passenger.repository';

@Injectable()
export class RemoverService {
  private readonly logger = new Logger(RemoverService.name);
  constructor(private readonly passengerRepository: PassengerRepository) {}

  public async remove(passengerId: string): Promise<void> {
    try {
      const { id, cpf } =
        await this.passengerRepository.getItemById(passengerId);
      await this.passengerRepository.deleteItem({ id, cpf });
    } catch (error) {
      this.logger.error(error);
      throw new InternalServerErrorException(error);
    }
  }
}
