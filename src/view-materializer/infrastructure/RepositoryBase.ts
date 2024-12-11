import {EntityManager, EntityManagerFindOneOptions, EntityManagerFindOptions, getEntityManager, ScanManager, ScanManagerFindOptions, ScanManagerScanOptions} from '@typedorm/core';
import { interfaces } from 'inversify';
import { IRepository } from './IRepository';
import { EntityAttributes } from '@typedorm/common';
import { PartitionMetadata } from './PartitionMetadata';
import { PickOne } from './PickOne';
import { Paginated } from '../../view-api/presentation/base/Paginated';

export abstract class RepositoryBase<
    TEntity,
    TPartitionKey extends PickOne<TEntity>,
    TSortKey extends PickOne<TEntity>
> implements IRepository<TEntity, TPartitionKey, TSortKey> { 
    private readonly entityManager: EntityManager;
    private readonly scanManager: ScanManager;
    protected abstract MaterializedView: interfaces.Newable<TEntity>;
    protected abstract partitionMetadata: PartitionMetadata<TEntity>;

    constructor(
        entityManager: EntityManager,
        scanManager: ScanManager,
    ) {       
        this.entityManager = entityManager;
        this.scanManager = scanManager;
    }

    async create(entity: Partial<TEntity>) {
        return await this.entityManager.create<TEntity>(entity);
    }

    async findOne(byKeys: TPartitionKey & TSortKey, withOptions: EntityManagerFindOneOptions<TEntity> | undefined) {
        return await this.entityManager.findOne<TEntity>(this.MaterializedView, byKeys as Partial<TEntity>, withOptions);
    }
    
    async find(byKey: TPartitionKey, withOptions: EntityManagerFindOptions<TEntity, string | Partial<EntityAttributes<TEntity>>> | undefined) {
        const result = await this.entityManager.find<TEntity>(this.MaterializedView, byKey as Partial<TEntity>, withOptions);
        return result.items;
    }

    async page(byKey: TPartitionKey, withOptions: EntityManagerFindOptions<TEntity, string | Partial<EntityAttributes<TEntity>>> | undefined): Promise<Paginated<TEntity>> {
        if (!withOptions?.limit || !withOptions.cursor) throw new Error("limit and cursor are required for pagination")
        const count = await this.entityManager.count<TEntity>(this.MaterializedView, byKey as Partial<TEntity>, withOptions);
        const result = await this.entityManager.find<TEntity>(this.MaterializedView, byKey as Partial<TEntity>, withOptions);
        return {
            results: result.items, 
            cursor: result.cursor?.partitionKey + result.cursor?.partitionKey, 
            resultsPerPage: withOptions?.limit,
            totalPages: count / withOptions.limit,
            totalResults: count
        };
    }

    async scan(withOptions: ScanManagerFindOptions<TEntity> | undefined) {
        const result = await this.scanManager.find<TEntity>(this.MaterializedView, withOptions);
        return result.items || [];
    }
}