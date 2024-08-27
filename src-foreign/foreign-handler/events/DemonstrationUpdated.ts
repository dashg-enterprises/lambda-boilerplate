import { DomainEvent } from "../../../src/DDD/DomainEvent";

export class DemonstrationUpdated extends DomainEvent {
    name: string;
    reason: string;
    constructor(sequenceId: string, correlationId: string, demonstrationId: string, demonstrationName: string, reason: string) {
        super("DemonstrationUpdated", sequenceId, demonstrationId, correlationId);
        this.name = demonstrationName;
        this.reason = reason;
    }
}