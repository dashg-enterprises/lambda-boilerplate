import { EntityManager, ScanManager } from '@typedorm/core';
import { Example, ExampleMetadata } from './Example';
import { IExampleRepository } from './IExampleRepository';
import { inject, injectable } from 'inversify';
import { TYPES } from '../TYPES';
import { PartitionMetadata, PLATFORM_TYPES, RepositoryBase } from '@dashg-enterprises/ddd-platform';

export type ExamplePartitionKey = Pick<Example, 'userId'>;
export type ExampleSortKey = Pick<Example, 'id'>;

@injectable()
export class ExampleRepository extends RepositoryBase<Example, ExamplePartitionKey, ExampleSortKey> implements IExampleRepository {
    protected MaterializedView = Example;
    protected partitionMetadata: PartitionMetadata<Example> = ExampleMetadata;

    constructor(
        @inject(PLATFORM_TYPES.EntityManager) entityManager: EntityManager,
        @inject(PLATFORM_TYPES.ScanManager) scanManager: ScanManager,
    ) {
        super(entityManager, scanManager);
    }
}