import { DomainEvent } from "./DomainEvent";
import { v4 as uuidv4 } from 'uuid';
import { EventLog } from "./EventLog";


export abstract class Aggregate {
    protected id: string;
    protected eventLog: EventLog;
    constructor(eventLog?: EventLog) {
        this.id = eventLog?.aggregateId || uuidv4();
        this.eventLog = eventLog || new EventLog(this.id);
    }
    toSnapshot() {
        const { eventLog, ...snapshot } = this;
        return snapshot;
    }
    getEventLog() {
        return this.eventLog;
    }
}
