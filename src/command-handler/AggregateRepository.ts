import { AttributeValue, DynamoDBClient, PutItemCommand, PutItemCommandInput } from "@aws-sdk/client-dynamodb"; // ES Modules import
import { DomainEvent } from "./DomainEvent";
import { EventLogRepository } from "./EventLogRepository";
import { SnapshotRepository } from "./SnapshotRepository";
import { Aggregate, Example } from "./Example";

export class AggregateRepository {
    eventLogRepository: EventLogRepository;
    snapshotRepository: SnapshotRepository;
    constructor(eventLogRepository: EventLogRepository, snapshotRepository: SnapshotRepository) {
        this.eventLogRepository = eventLogRepository;
        this.snapshotRepository = snapshotRepository;
    }   

    async save(aggregate: Aggregate) {
        await this.eventLogRepository.save(aggregate.getEventLog());
        await this.snapshotRepository.save(aggregate.toSnapshot());
    }

    // async get(id: string) {
    //     const eventLog = await this.eventLogRepository.get(id);
    //     const model = new Example(eventLog);
    //     return model;
    // }
}