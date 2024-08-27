import { AggregateRepository } from "../../../src/DDD/AggregateRepository";
import { EventLogRepository } from "../../../src/DDD/EventLogRepository";
import { SnapshotRepository } from "../../../src/DDD/SnapshotRepository";

export class DemonstrationRepository extends AggregateRepository {
    constructor(eventLogRepository: EventLogRepository, snapshotRepository: SnapshotRepository) {
        super(eventLogRepository, snapshotRepository);
    }

    get(byId: string) {

    }
}