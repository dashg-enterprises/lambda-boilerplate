import { DomainEvent, EventMetadata, IDomainEvent } from "@dashg-enterprises/ddd-platform";
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
    static isTypeOf = (event: IDomainEvent): event is ExampleCreated => {
        return event.metadata.type == ExampleCreated.metadata.type;
    }

    static metadata = {
        type: "ExampleCreated",
        context: "ExampleContext",
        aggregate: "Example",
    };

    constructor(event: ExampleCreatedEvent, cause: CreateExample) {
        super(event, new EventMetadata({
            ...ExampleCreated.metadata,
            cause
        }));
    }
}