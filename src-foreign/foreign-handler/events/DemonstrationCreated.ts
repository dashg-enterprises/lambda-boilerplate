import { DomainEvent } from "../../../src/DDD/DomainEvent";
import { Example } from "../domain/Example";

export class DemonstrationCreated extends DomainEvent {
    name: string;
    example: Example;
    constructor(sequenceId: string, correlationId: string, demonstrationId: string, demonstrationName: string, example: Example) {
        super("DemonstrationCreated", sequenceId, demonstrationId, correlationId);
        this.name = demonstrationName;
        this.example = example;
    }
}