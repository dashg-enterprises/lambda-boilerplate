import { DomainEvent } from "@dashg-enterprises/ddd-platform";
import { UpdateExample } from "../commands/UpdateExample";

export class ExampleUpdated extends DomainEvent {
    name: string;
    reason: string;
    constructor(sequenceId: number, correlationId: string, cause: UpdateExample, exampleId: string, exampleName: string, reason: string) {
        super("ExampleUpdated", "ExampleContext", "Example", cause, exampleId, correlationId, sequenceId);
        this.name = exampleName;
        this.reason = reason;
    }
}