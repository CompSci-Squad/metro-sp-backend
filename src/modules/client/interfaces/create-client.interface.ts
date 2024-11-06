import { CreateClientDto } from '../dto/create-client.dto';
import { ClientEntity } from '../entities/client';

export interface CreateClientStrategy {
  validate: (justificationDetail: string) => Promise<boolean>;
}
