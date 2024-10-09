import { EntityData, EntityDTO, EntityManager, EntityRepository, FilterQuery, FindAllOptions, FromEntityType, RequiredEntityData, wrap } from '@mikro-orm/postgresql'
import { BaseEntity } from '../entities/base.entity';

export abstract class BaseRepository<T extends BaseEntity, ID> {
  constructor(
    protected readonly em: EntityManager,
    protected readonly entityRepository: EntityRepository<T>,
  ) {}

  async create(data: RequiredEntityData<T>): Promise<T> {
    const entity = this.entityRepository.create(data);
    await this.em.persistAndFlush(entity);
    return entity;
  }

  async findById(id: ID): Promise<T | null> {
    const query: FilterQuery<T> = { id } as FilterQuery<T>;
    return this.entityRepository.findOneOrFail(query);
  }

  async update(id: ID, data: EntityData<T>): Promise<T> {
    const entity = await this.findById(id);
    if (!entity) {
      throw new Error('Entity not found');
    }
    this.entityRepository.assign(entity, data as any)
    await this.em.persistAndFlush(entity);
    return entity;
  }

  async softDelete(id: ID): Promise<void> {
    const entity = await this.findById(id);
    if (!entity) {
      throw new Error('Entity not found');
    }
    entity['deletedAt'] = new Date();
    await this.em.flush();
  }

  async findAll(query?: FindAllOptions<T>): Promise<T[]> {
    return this.entityRepository.findAll(query);
  }

  async findAllIncludingSoftDeleted(): Promise<T[]> {
    // Disable the notDeleted filter for this specific query
    return this.entityRepository.findAll({ filters: { notDeleted: false } });
  }
}
