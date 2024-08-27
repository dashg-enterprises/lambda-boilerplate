import { DomainCommand } from "../../../src/DDD/DomainCommand";


export class UpdateDemonstration extends DomainCommand {
    name: string;
    constructor(name: string, correlationId?: string) {
        super(correlationId);
        this.name = name;
    }
}
