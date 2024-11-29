import { AggregateRepository, IAggregateRepository, IEventLogRepository, ISnapshotRepository, PLATFORM_TYPES } from "@dashg-enterprises/ddd-platform";
import { Example } from "../domain/Example";
import { inject } from "inversify";

export interface IExampleRepository extends IAggregateRepository<Example> {

}

export class ExampleRepository extends AggregateRepository<Example> implements IExampleRepository {
    constructor(
        @inject(PLATFORM_TYPES.IEventLogRepository) eventLogRepository: IEventLogRepository,
        @inject(PLATFORM_TYPES.ISnapshotRepository) snapshotRepository: ISnapshotRepository
    ) {
        super(eventLogRepository, snapshotRepository, Example);
    }
}