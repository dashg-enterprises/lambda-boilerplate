import { DomainCommand } from "../../DDD/DomainCommand";


export class CreateExample extends DomainCommand {
    name: string;
    constructor(name: string, correlationId?: string) {
        super(correlationId);
        this.name = name;
    }
}
