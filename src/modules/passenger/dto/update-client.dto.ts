import { PartialType } from '@nestjs/swagger';
import { CreateClientDto } from './create-passenger.dto';

export class UpdateClientDto extends PartialType(CreateClientDto) {}
