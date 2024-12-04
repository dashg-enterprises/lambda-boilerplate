import { Aggregate, EventLog } from "@dashg-enterprises/ddd-platform";
import { CreateExample } from "../commands/CreateExample";
import { ExampleCreated, ExampleCreatedEvent } from "../events/ExampleCreated";
import { ExampleUpdated } from "../events/ExampleUpdated";

export class Example extends Aggregate {
    type = "Example";
    private name?: string;
    constructor(eventLog?: EventLog) {
        super(eventLog);
        this.registerHandler(this.create.bind(this)).for(CreateExample.metadata.type);
        this.registerApplier(this.created.bind(this)).for(ExampleCreated.metadata.type);
    }
    create(createExample: CreateExample) {
        if (!createExample.command.name) throw new Error("Name is required for this example.");

        const exampleCreatedEvent = new ExampleCreatedEvent(this.id, createExample.command.name);
        const domainEvent = new ExampleCreated(exampleCreatedEvent, createExample);
        return domainEvent;
    }

    created(exampleCreated: ExampleCreated) {
        this.name = exampleCreated.event.name;
    }

    getName() {
        return this.name;
    }
}