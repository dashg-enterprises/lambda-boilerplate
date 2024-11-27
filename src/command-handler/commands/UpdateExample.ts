import { CommandMetadata, DomainCommand } from "@dashg-enterprises/ddd-platform";

export class UpdateExampleCommand {
    name: string;
    status: string;
    constructor(name: string, status: 'hidden' | 'visible'){
        this.name = name;
        this.status = status;
    }
}

export class UpdateExample extends DomainCommand<UpdateExampleCommand> {
    constructor(command: UpdateExampleCommand) {
        const metadata = new CommandMetadata({type: "ExampleUpdated", context: "ExampleContext", aggregate: "Example", aggregateId: ""});
        super(command, metadata);
    }
}
