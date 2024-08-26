export interface IDomainEvent {
    type: string;
    sequenceId: string;
    aggregateId: string;
    correlationId: string;
}

export abstract class DomainEvent implements IDomainEvent {
    type: string;
    sequenceId: string;
    aggregateId: string;
    correlationId: string;
    timestamp: Date = new Date();
    constructor(type: string, sequenceId: string, aggregateId: string, correlationId: string) {
        this.type = type;
        this.sequenceId = sequenceId;
        this.aggregateId = aggregateId;
        this.correlationId = correlationId;
    }
}