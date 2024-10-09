import {
  EntityData,
  EntityDTO,
  EntityManager,
  EntityName,
  EntityRepository,
  FilterQuery,
  FindAllOptions,
  FromEntityType,
  RequiredEntityData,
  wrap,
} from '@mikro-orm/postgresql';
import { BaseEntity } from '../entities/base.entity';

export abstract class BaseRepository<
  T extends BaseEntity,
> extends EntityRepository<T> {
  async createEntity(info: Partial<T>): Promise<T> {
    console.log(info)
    const entity = this.create(info as T);
    await this.em.persistAndFlush(entity);
    return entity;
  }

  async findById(id: number): Promise<T | null> {
    const query: FilterQuery<T> = { id } as FilterQuery<T>;
    return this.findOneOrFail(query);
  }

  async update(id: number, data: EntityData<T>): Promise<T> {
    const entity = await this.findById(id);
    if (!entity) {
      throw new Error('Entity not found');
    }
    this.assign(entity, data as any);
    await this.em.persistAndFlush(entity);
    return entity;
  }

  async softDelete(id: number): Promise<void> {
    const entity = await this.findById(id);
    if (!entity) {
      throw new Error('Entity not found');
    }
    entity['deletedAt'] = new Date();
    await this.em.flush();
  }

  async findAllEntities(query?: FindAllOptions<T>): Promise<T[]> {
    console.log(this);
    return await this.findAll(query);
  }

  async findAllIncludingSoftDeleted(): Promise<T[]> {
    // Disable the notDeleted filter for this specific query
    return this.findAll({ filters: { notDeleted: false } });
  }
}
