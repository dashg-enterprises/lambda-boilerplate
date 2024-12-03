import { CommandMetadata, DomainCommand, IDomainCommand } from "@dashg-enterprises/ddd-platform";

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
    static isTypeOf = (command: IDomainCommand): command is UpdateExample => {
        return command.metadata.type == UpdateExample.metadata.type;
    }

    static metadata = new CommandMetadata({
        type: "UpdateExample",
        context: "ExampleContext",
        aggregate: "Example",
        aggregateId: ""
    });

    constructor(command: UpdateExampleCommand) {
        super(command, UpdateExample.metadata);
    }
}
