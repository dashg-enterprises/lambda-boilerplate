import { CommandMetadata, DomainCommand } from "@dashg-enterprises/ddd-platform";

export class UpdateExampleCommand {
    exampleId: string;
    name: string;
    status: string;
    constructor(exampleId: string, name: string, status: 'hidden' | 'visible'){
        this.exampleId = exampleId;
        this.name = name;
        this.status = status;
    }
}

export class UpdateExample extends DomainCommand<UpdateExampleCommand> {
    constructor(command: UpdateExampleCommand) {
        super(command, new CommandMetadata({
            type: "ExampleUpdated",
            context: "ExampleContext",
            aggregate: "Example",
            aggregateId: command.exampleId
        }));
    }
}
