import { CreateExample } from "./commands/CreateExample";
import { Aggregate } from "./DDD/Aggregate";
import { IDomainEvent } from "./DDD/DomainEvent";
import { EventLog } from "./DDD/EventLog";
import { ExampleCreated } from "./events/ExampleCreated";
import { ExampleUpdated } from "./events/ExampleUpdated";

export class Example extends Aggregate {
    private name?: string;
    constructor(eventLog?: EventLog) {
        if (eventLog) {
            super(eventLog);
            (eventLog.domainEvents as ExampleCreated[]).map(this.apply);
        } else {
            super();
        }
    }
    handle(createExample: CreateExample) {
        if (!createExample.name) throw new Error("Name is required for this example.");

        const sequenceId = this.eventLog.nextSequenceId();
        const domainEvent = new ExampleCreated(sequenceId.toString(), createExample.correlationId, this.id, createExample.name);
        this.apply(domainEvent);
        return this;
    }

    apply(exampleCreated: ExampleCreated) {
        this.id = exampleCreated.aggregateId;
        this.name = exampleCreated.name;
        this.eventLog.append(exampleCreated);
        return this;
    }
}