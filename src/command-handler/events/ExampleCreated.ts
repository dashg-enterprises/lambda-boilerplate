import { DomainEvent, EventMetadata } from "@dashg-enterprises/ddd-platform";
import { CreateExample } from "../commands/CreateExample";

export class ExampleCreatedEvent {
    exampleId: string;
    name: string;
    constructor(exampleId: string, name: string) {
        this.exampleId = exampleId;
        this.name = name;
    }
}

type ConcreteMetadata = Pick<EventMetadata, 'aggregateId' | 'correlationId' | 'cause'>;

export class ExampleCreated extends DomainEvent<ExampleCreatedEvent> {
    constructor(event: ExampleCreatedEvent, cause: CreateExample) {
        const metadata = new EventMetadata({
            type: "ExampleCreated",
            context: "ExampleContext",
            aggregate: "Example",
            cause
        })
        super(event, metadata);
    }
}