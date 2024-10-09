import { Injectable } from '@nestjs/common';
import { BaseRepository } from '../../../shared/repositories/base.repository';
import { UserEntity } from '../entities/user.entity';
import { EntityManager } from '@mikro-orm/postgresql';

@Injectable()
export class UserRepository extends BaseRepository<UserEntity> {}
