import { DomainEvent, EventMetadata, IDomainEvent } from "@dashg-enterprises/ddd-platform";
import { CreateExample } from "../commands/CreateExample";

export class ExampleScheduledEvent {
    exampleId: string;
    name: string;
    constructor(exampleId: string, name: string) {
        this.exampleId = exampleId;
        this.name = name;
    }
}

type ConcreteMetadata = Pick<EventMetadata, 'aggregateId' | 'correlationId' | 'cause'>;

export class ExampleScheduled extends DomainEvent<ExampleScheduledEvent> {
    static isTypeOf = (event: IDomainEvent): event is ExampleScheduled => {
        return event.metadata.type == ExampleScheduled.metadata.type;
    }

    static metadata = {
        type: "ExampleScheduled",
        context: "ExampleContext",
        aggregate: "Example",
    };

    constructor(event: ExampleScheduledEvent, cause: CreateExample) {
        super(event, new EventMetadata({
            ...ExampleScheduled.metadata,
            cause
        }));
    }
}