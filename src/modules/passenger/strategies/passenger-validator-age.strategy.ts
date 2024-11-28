import { Injectable } from '@nestjs/common';
import { ValidatePassengerStrategy } from '../interfaces/validate-passenger.interface';
import dayjs from 'dayjs';

@Injectable()
export class PassengerValidatorAgeStrategy
  implements ValidatePassengerStrategy
{
  constructor() {}
  public async validate(justificationDetail: string): Promise<boolean> {
    return new Promise((resolve, reject) => {
      const age = dayjs().diff(dayjs(justificationDetail), 'year');
      if (age >= 60) {
        resolve(true);
      } else {
        reject(false);
      }
    });
  }
}
