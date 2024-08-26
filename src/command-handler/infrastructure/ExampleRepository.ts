import { AggregateRepository } from "../DDD/AggregateRepository";
import { EventLogRepository } from "../DDD/EventLogRepository";
import { SnapshotRepository } from "../DDD/SnapshotRepository";

export class ExampleRepository extends AggregateRepository {
    constructor(eventLogRepository: EventLogRepository, snapshotRepository: SnapshotRepository) {
        super(eventLogRepository, snapshotRepository);
    }
}