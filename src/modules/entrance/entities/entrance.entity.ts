import {
  Property,
  Entity,
  Collection,
  OneToMany,
  Enum,
  OneToOne,
  ManyToOne,
} from '@mikro-orm/postgresql';
import { BaseEntity } from '../../../shared/entities/base.entity';
import { EntranceRepository } from '../repositories/entrance.repository';
import { EntranceStatus } from '../enums/entrance-status.enum';
import { StationEntity } from '../../station/entities/station.entity';
import { TerminalEntity } from '../../terminal/entities/terminal.entity';

@Entity({ repository: () => EntranceRepository, tableName: 'entrance' })
export class EntranceEntity extends BaseEntity {
  @Property({ type: 'float8' })
  latitude: number;

  @Property({ type: 'float8' })
  longitude: number;

  @Property()
  address: string;

  @Enum({ items: () => EntranceStatus, array: true })
  status!: EntranceStatus[];

  @ManyToOne({ entity: () => StationEntity })
  entrances = new Collection<StationEntity>(this);

  @OneToOne({ entity: () => TerminalEntity })
  terminals = new TerminalEntity();
}
