import { DomainEvent } from "@dashg-enterprises/ddd-platform";
import { CreateExample } from "../commands/CreateExample";

export class ExampleCreated extends DomainEvent {
    name: string;
    constructor(correlationId: string, exampleId: string, exampleName: string, cause: CreateExample) {
        super("ExampleCreated", "ExampleContext", "Example", cause, exampleId, correlationId);
        this.name = exampleName;
    }
}