import { DomainEvent } from "./DomainEvent";

export class DemonstrationCreated extends DomainEvent {
    name: string;
    constructor(sequenceId: string, correlationId: string, demonstrationId: string, demonstrationName: string) {
        super("DemonstrationCreated", sequenceId, demonstrationId, correlationId);
        this.name = demonstrationName;
    }
}