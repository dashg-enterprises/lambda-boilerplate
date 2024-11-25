import { Aggregate, EventLog } from "@dashg-enterprises/ddd-platform";
import { CreateExample } from "../commands/CreateExample";
import { ExampleCreated } from "../events/ExampleCreated";
import { ExampleUpdated } from "../events/ExampleUpdated";

export class Example extends Aggregate {
    type = "Example";
    private name?: string;
    constructor(eventLog?: EventLog) {
        super(eventLog);
        this.registerHandler(this.create, "CreateExample");
        this.registerApplier(this.created);
    }
    create(createExample: CreateExample) {
        if (!createExample.name) throw new Error("Name is required for this example.");

        const domainEvent = new ExampleCreated(createExample.correlationId, this.id, createExample.name, createExample);
        return domainEvent;
    }

    created(exampleCreated: ExampleCreated) {
        this.id = exampleCreated.aggregateId;
        this.name = exampleCreated.name;
        this.eventLog.append(exampleCreated);
        return this;
    }
}