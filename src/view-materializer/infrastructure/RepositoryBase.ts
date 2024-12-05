import {EntityManager, getEntityManager} from '@typedorm/core';
import { interfaces } from 'inversify';
import { IRepository } from './IRepository';
import { SingleTableConnection } from './SingleTableConnection';

export abstract class RepositoryBase<TEntity> implements IRepository<TEntity> { 
    private readonly entityManager: EntityManager;
    private readonly connection: SingleTableConnection;
    protected abstract ViewEntity: interfaces.Newable<TEntity>;

    constructor(
        entityManager: EntityManager,
        connection: SingleTableConnection
    ) {       
        this.entityManager = entityManager;
        this.connection = connection;
        this.connection.Check();
    }

    async create(entity: Partial<TEntity>) {
        return await this.entityManager.create<TEntity>(this.ViewEntity, entity);
    }

    async findOne(query: Partial<TEntity>) {
        return await this.entityManager.findOne<TEntity>(this.ViewEntity, query);
    }
    
    async find(query: Partial<TEntity>) {
        const results = await this.entityManager.find<TEntity>(this.ViewEntity, query);
        return results.items;
    }
}