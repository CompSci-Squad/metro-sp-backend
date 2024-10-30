import { CreateClientDto } from '../dto/create-client.dto';
import { ClientEntity } from '../entities/client';

export interface CreateClientStrategy {
  create: (data: CreateClientDto) => Promise<ClientEntity>;
}
