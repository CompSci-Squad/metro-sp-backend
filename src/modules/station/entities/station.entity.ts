import {
  Property,
  Entity,
  Collection,
  ManyToMany,
  OneToMany,
  ManyToOne,
} from '@mikro-orm/postgresql';
import { BaseEntity } from '../../../shared/entities/base.entity';
import { UserEntity } from '../../user/entities/user.entity';
import { StationRepository } from '../repositories/station.repository';
import { EntranceEntity } from '../../entrance/entities/entrance.entity';

@Entity({ repository: () => StationRepository, tableName: 'station' })
export class StationEntity extends BaseEntity {
  @Property()
  name: string;

  @Property({ type: 'float8' })
  latitude: number;

  @Property({ type: 'float8' })
  longitude: number;

  @Property()
  address: string;

  @Property()
  streetNumber: string;

  @Property({ columnType: 'time' })
  openingTime: string;

  @Property({ columnType: 'time' })
  closingTime: string;

  @ManyToMany({ entity: () => UserEntity })
  users = new Collection<UserEntity>(this);

  constructor(
    name: string,
    latitude: number,
    longitude: number,
    address: string,
    streetNumber: string,
    openingTime: string,
    closingTime: string,
  ) {
    super();
    this.name = name;
    this.latitude = latitude;
    this.longitude = longitude;
    this.address = address;
    this.streetNumber = streetNumber;
    this.openingTime = openingTime;
    this.closingTime = closingTime;
  }
}
