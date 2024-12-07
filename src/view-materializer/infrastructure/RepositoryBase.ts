import {EntityManager, getEntityManager, ScanManager} from '@typedorm/core';
import { interfaces } from 'inversify';
import { IRepository } from './IRepository';

export abstract class RepositoryBase<TEntity> implements IRepository<TEntity> { 
    private readonly entityManager: EntityManager;
    private readonly scanManager: ScanManager;
    protected abstract ViewEntity: interfaces.Newable<TEntity>;

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

    async findOne(query: Partial<TEntity>) {
        return await this.entityManager.findOne<TEntity>(this.ViewEntity, query);
    }
    
    async find(query: Partial<TEntity>) {
        // const results = await this.entityManager.find<TEntity>(this.ViewEntity, query);
        const result = await this.scanManager.scan<TEntity>();
        return result.items || [];
    }
}