import { EntityManager, ScanManager } from '@typedorm/core';
import { RepositoryBase } from './RepositoryBase';
import { Example, ExampleMetadata } from './Example';
import { IExampleRepository } from './IExampleRepository';
import { inject, injectable } from 'inversify';
import { TYPES } from '../TYPES';
import { PLATFORM_TYPES } from '../PLATFORM_TYPES';
import { PartitionMetadata } from './PartitionMetadata';

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