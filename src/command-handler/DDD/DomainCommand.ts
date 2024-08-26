
export abstract class DomainCommand implements IDomainCommand {
    correlationId: string;
    constructor(correlationId?: string) {
        this.correlationId = correlationId || Math.random().toString().substring(2);
    }
}
export interface IDomainCommand {
    correlationId: string;
}

