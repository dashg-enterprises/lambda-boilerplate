import { DomainEvent, EventMetadata } from "@dashg-enterprises/ddd-platform";
import { UpdateExample } from "../commands/UpdateExample";

export class ExampleUpdatedEvent {

}

export class ExampleUpdated extends DomainEvent<ExampleUpdatedEvent> {
    constructor(event: ExampleUpdated, cause: UpdateExample) {
        super(event, new EventMetadata({
            type: "ExampleUpdated",
            context: "ExampleContext",
            aggregate: "Example",
            cause,
        }));
    }
}