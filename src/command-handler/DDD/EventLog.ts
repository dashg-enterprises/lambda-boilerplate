import { DomainEvent } from "./DomainEvent";

export class EventLog {
    aggregateId: string;
    domainEvents: DomainEvent[];
    constructor(aggregateId: string, domainEvents?: DomainEvent[]) {
        this.domainEvents = domainEvents || [];
        this.aggregateId = aggregateId;
    }
    append(domainEvent: DomainEvent) {
        this.domainEvents.push(domainEvent);
        return this;
    }
    mostRecent() {
        return this.domainEvents[this.domainEvents.length - 1];   
    }
    nextSequenceId() {
        return this.domainEvents.length + 1;
    }
}