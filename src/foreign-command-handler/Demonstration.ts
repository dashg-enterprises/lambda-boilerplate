import { DomainEvent, IDomainEvent } from "./DomainEvent";
import { DemonstrationCreated } from "./DemonstrationCreated";
import { DemonstrationUpdated } from "./DemonstrationUpdated";

export abstract class Aggregate {
    protected id: string;
    protected eventLog: DomainEvent[];
    constructor(eventLog?: DomainEvent[]) {
        this.id = Math.random().toString().substring(2);
        this.eventLog = eventLog || [];
    }
    toSnapshot() {
        const {eventLog, ...snapshot} = this;
        return snapshot;
    }
    getEventLog() {
        return [...this.eventLog];
    }
}

export interface IDomainCommand {
    correlationId: string;
}

export abstract class DomainCommand {
    correlationId: string;
    constructor(correlationId?: string) {
        this.correlationId = correlationId || Math.random().toString().substring(2);
    }
}

export class CreateDemonstration extends DomainCommand {
    name: string;
    constructor(name: string, correlationId?: string) {
        super(correlationId);
        this.name = name;
    }
}

export class Demonstration extends Aggregate {
    private name?: string;
    constructor(eventLog?: DemonstrationCreated[]) {
        if (eventLog) {
            super(eventLog);
            eventLog.map(this.apply);
        } else {
            super();
        }
    }
    handle(createDemonstration: CreateDemonstration) {
        if (!createDemonstration.name) throw new Error("Name is required for this demonstration.");

        const sequenceId = this.eventLog.length + 1;
        const domainEvent = new DemonstrationCreated(sequenceId.toString(), createDemonstration.correlationId, this.id, createDemonstration.name);
        this.apply(domainEvent);
        return this;
    }

    apply(demonstrationCreated: DemonstrationCreated) {
        this.id = demonstrationCreated.aggregateId;
        this.name = demonstrationCreated.name;
        this.eventLog.push(demonstrationCreated);
        return this;
    }
}