import { DomainEvent, EventMetadata, IDomainEvent } from "@dashg-enterprises/ddd-platform";
import { UpdateExample } from "../commands/UpdateExample";
import { ExampleSnapshot } from "../contracts/ExampleSnapshot";

export class ExampleUpdatedEvent {
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

export class ExampleUpdated extends DomainEvent<ExampleUpdatedEvent, ExampleSnapshot> {
    static isTypeOf = (event: IDomainEvent): event is ExampleUpdated => {
        return event.metadata.type == ExampleUpdated.metadata.type;
    }

    static metadata = {
        type: "ExampleUpdated",
        context: "ExampleContext",
        aggregate: "Example",
    };

    constructor(event: ExampleUpdatedEvent, cause: UpdateExample) {
        super(event, new EventMetadata({
            type: "ExampleUpdated",
            context: "ExampleContext",
            aggregate: "Example",
            cause,
        }));
    }
}