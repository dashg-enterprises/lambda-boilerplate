
import { v4 as uuidv4 } from 'uuid';

export abstract class DomainCommand implements IDomainCommand {
    correlationId: string;
    constructor(correlationId?: string) {
        this.correlationId = correlationId || uuidv4();
    }
}
export interface IDomainCommand {
    correlationId: string;
}

