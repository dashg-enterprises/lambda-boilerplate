import { DomainEvent, EventMetadata, IDomainEvent } from "@dashg-enterprises/ddd-platform";
import { CreateExample } from "../commands/CreateExample";

export class ExampledScheduledEvent {
    exampleId: string;
    name: string;
    constructor(exampleId: string, name: string) {
        this.exampleId = exampleId;
        this.name = name;
    }
}

type ConcreteMetadata = Pick<EventMetadata, 'aggregateId' | 'correlationId' | 'cause'>;

export class ExampledScheduled extends DomainEvent<ExampledScheduledEvent> {
    static isTypeOf = (event: IDomainEvent): event is ExampledScheduled => {
        return event.metadata.type == ExampledScheduled.metadata.type;
    }

    static metadata = {
        type: "ExampledScheduled",
        context: "ExampleContext",
        aggregate: "Example",
    };

    constructor(event: ExampledScheduledEvent, cause: CreateExample) {
        super(event, new EventMetadata({
            ...ExampledScheduled.metadata,
            cause
        }));
    }
}