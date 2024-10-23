import { Collection, Entity, OneToOne, Property } from '@mikro-orm/postgresql';

import { BaseEntity } from '../../../shared/entities/base.entity';

import { TerminalRepository } from '../repositories/terminal.repository';
import { IsBoolean, IsNotEmpty } from 'class-validator';

@Entity({ repository: () => TerminalRepository, tableName: 'terminal' })
export class TerminalEntity extends BaseEntity {
  @Property()
  @IsBoolean()
  @IsNotEmpty()
  isActive!: boolean;
}
