import { DomainEvent, EventMetadata, IDomainEvent } from "@dashg-enterprises/ddd-platform";
import { CreateExample } from "../commands/CreateExample";
import { ExampleSnapshot } from "../contracts/ExampleSnapshot";

export class ExampleCreatedEvent {
    exampleId: string;
    userId: string;
    name: string;
    status: string;
    constructor(exampleId: string, userId: string, name: string, status: string) {
        this.exampleId = exampleId;
        this.userId = userId;
        this.name = name;
        this.status = status;
    }
}

type ConcreteMetadata = Pick<EventMetadata, 'aggregateId' | 'correlationId' | 'cause'>;

export class ExampleCreated extends DomainEvent<ExampleCreatedEvent, ExampleSnapshot> {
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