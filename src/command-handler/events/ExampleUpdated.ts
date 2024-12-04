import { DomainEvent, EventMetadata, IDomainEvent } from "@dashg-enterprises/ddd-platform";
import { UpdateExample } from "../commands/UpdateExample";

export class ExampleUpdatedEvent {

}

export class ExampleUpdated extends DomainEvent<ExampleUpdatedEvent> {
    static isTypeOf = (event: IDomainEvent): event is ExampleUpdated => {
        return event.metadata.type == ExampleUpdated.metadata.type;
    }

    static metadata = {
        type: "ExampleUpdated",
        context: "ExampleContext",
        aggregate: "Example",
    };

    constructor(event: ExampleUpdated, cause: UpdateExample) {
        super(event, new EventMetadata({
            type: "ExampleUpdated",
            context: "ExampleContext",
            aggregate: "Example",
            cause,
        }));
    }
}