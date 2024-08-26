import { DomainEvent } from "../DDD/DomainEvent";

export class ExampleCreated extends DomainEvent {
    name: string;
    constructor(sequenceId: string, correlationId: string, exampleId: string, exampleName: string) {
        super("ExampleCreated", sequenceId, exampleId, correlationId);
        this.name = exampleName;
    }
}