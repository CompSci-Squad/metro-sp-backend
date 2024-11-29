import dayjs from 'dayjs';
import { BaseDynamoEntity } from '../../../shared/entities/dynamo';
import { JustificationType } from '../enums/justification-type.enum';

export class PassengerEntity extends BaseDynamoEntity {
  image: string;
  cpf: string;
  name: string;
  justificationType: JustificationType;
  justificationDetails: string;

  createdAt?: string;
  updatedAt?: string;

  constructor({
    id,
    cpf,
    name,
    justificationType,
    justificationDetails,
    image,
  }: {
    id: string;
    cpf: string;
    name: string;
    justificationType: JustificationType;
    justificationDetails: string;
    image?: string;
  }) {
    super(id);
    this.image = image;
    this.cpf = cpf;
    this.name = name;
    this.justificationType = justificationType;
    this.justificationDetails = justificationDetails;

    this.createdAt = dayjs().toISOString();
    this.updatedAt = dayjs().toISOString();
  }
}
