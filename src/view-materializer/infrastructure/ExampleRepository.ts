import { EntityManager, ScanManager } from '@typedorm/core';
import { RepositoryBase } from './RepositoryBase';
import { Example } from './Example';
import { IExampleRepository } from './IExampleRepository';
import { inject, injectable } from 'inversify';
import { TYPES } from '../TYPES';
import { PLATFORM_TYPES } from '../PLATFORM_TYPES';

@injectable()
export class ExampleRepository extends RepositoryBase<Example> implements IExampleRepository {
    protected ViewEntity = Example;

    constructor(
        @inject(PLATFORM_TYPES.EntityManager) entityManager: EntityManager,
        @inject(PLATFORM_TYPES.ScanManager) scanManager: ScanManager,
    ) {
        super(entityManager, scanManager);
    }
}