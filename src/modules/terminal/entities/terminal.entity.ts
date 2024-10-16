import { Collection, Entity, OneToOne, Property } from '@mikro-orm/postgresql';

import { BaseEntity } from '../../../shared/entities/base.entity';

import { TerminalRepository } from '../repositories/terminal.repository';
import { EntranceEntity } from 'src/modules/entrance/entities/entrance.entity';

@Entity({ repository: () => TerminalRepository, tableName: 'terminal' })
export class TerminalEntity extends BaseEntity {
  @Property()
  isActive!: boolean;

  @OneToOne({ entity: () => EntranceEntity, mappedBy: 'terminals' })
  entrances = new Collection<EntranceEntity>(this);
}
