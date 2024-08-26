import { AggregateRepository } from "./AggregateRepository";
import { EventLogRepository } from "./EventLogRepository";
import { SnapshotRepository } from "./SnapshotRepository";

export class ExampleRepository extends AggregateRepository {
    constructor(eventLogRepository: EventLogRepository, snapshotRepository: SnapshotRepository) {
        super(eventLogRepository, snapshotRepository);
    }
}