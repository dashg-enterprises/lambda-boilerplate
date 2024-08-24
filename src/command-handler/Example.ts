import { DomainEvent, IDomainEvent } from "./DomainEvent";
import { ExampleCreated } from "./ExampleCreated";
import { ExampleUpdated } from "./ExampleUpdated";

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

export class CreateExample extends DomainCommand {
    name: string;
    constructor(name: string, correlationId?: string) {
        super(correlationId);
        this.name = name;
    }
}

export class Example extends Aggregate {
    private name?: string;
    constructor(eventLog?: ExampleCreated[]) {
        if (eventLog) {
            super(eventLog);
            eventLog.map(this.apply);
        } else {
            super();
        }
    }
    handle(createExample: CreateExample) {
        if (!createExample.name) throw new Error("Name is required for this example.");

        const sequenceId = this.eventLog.length + 1;
        const domainEvent = new ExampleCreated(sequenceId.toString(), createExample.correlationId, this.id, createExample.name);
        this.apply(domainEvent);
        return this;
    }

    apply(exampleCreated: ExampleCreated) {
        this.id = exampleCreated.aggregateId;
        this.name = exampleCreated.name;
        this.eventLog.push(exampleCreated);
        return this;
    }
}