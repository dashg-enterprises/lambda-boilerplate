import { EntityManager } from '@typedorm/core';
import { RepositoryBase } from './RepositoryBase';
import { Example } from './Example';
import { IExampleRepository } from './IExampleRepository';
import { SingleTableConnection } from './SingleTableConnection';
import { injectable } from 'inversify';

@injectable()
export class ExampleRepository extends RepositoryBase<Example> implements IExampleRepository {
    protected ViewEntity = Example;

    constructor(
        entityManager: EntityManager,
        connection: SingleTableConnection
    ) {
        super(entityManager, connection);
    }
}