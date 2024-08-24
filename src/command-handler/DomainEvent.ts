export interface IDomainEvent {
    type: string;
    sequenceId: number;
    aggregateId: string;
    correlationId: string;
}

export abstract class DomainEvent implements IDomainEvent {
    type: string;
    sequenceId: number;
    aggregateId: string;
    correlationId: string;
    constructor(type: string, sequenceId: number, aggregateId: string, correlationId: string) {
        this.type = type;
        this.sequenceId = sequenceId;
        this.aggregateId = aggregateId;
        this.correlationId = correlationId;
    }
}