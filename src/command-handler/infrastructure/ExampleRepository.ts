import { AggregateRepository, EventLogRepository, SnapshotRepository } from "@dashg-enterprises/ddd-platform";


export class ExampleRepository extends AggregateRepository {
    constructor(eventLogRepository: EventLogRepository, snapshotRepository: SnapshotRepository) {
        super(eventLogRepository, snapshotRepository);
    }
}