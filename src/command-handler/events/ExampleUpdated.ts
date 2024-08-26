import { DomainEvent } from "../DDD/DomainEvent";

export class ExampleUpdated extends DomainEvent {
    name: string;
    reason: string;
    constructor(sequenceId: string, correlationId: string, exampleId: string, exampleName: string, reason: string) {
        super("ExampleUpdated", sequenceId, exampleId, correlationId);
        this.name = exampleName;
        this.reason = reason;
    }
}