import { Injectable } from '@nestjs/common';
import { CreateClientStrategy } from '../interfaces/create-client.interface';
import { CreateClientDto } from '../dto/create-client.dto';
import { ClientEntity } from '../entities/client';
import { ClientRepository } from '../repositories/client.repository';

@Injectable()
export class ClientCreatorAgeStrategy implements CreateClientStrategy {
  constructor(private readonly clientRepository: ClientRepository) {}
  public async create(client: CreateClientDto): Promise<ClientEntity> {}
}
