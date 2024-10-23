import { Collection, Entity, OneToOne, Property, Rel } from '@mikro-orm/postgresql';

import { BaseEntity } from '../../../shared/entities/base.entity';

import { TerminalRepository } from '../repositories/terminal.repository';
import { EntranceEntity } from '../../entrance/entities/entrance.entity';

@Entity({ repository: () => TerminalRepository, tableName: 'terminal' })
export class TerminalEntity extends BaseEntity {
  @Property()
  isActive!: boolean;

  @OneToOne({ mappedBy: 'terminal' })
  entrance: Rel<EntranceEntity>
}
