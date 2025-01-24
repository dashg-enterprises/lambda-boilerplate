import { CommandMetadata, DomainCommand, IDomainCommand } from "@dashg-enterprises/ddd-platform";

export class UpdateExampleCommand {
    exampleId: string;
    userId: string;
    name: string;
    constructor(exampleId: string, userId: string, name: string){
        this.exampleId = exampleId;
        this.name = name;
        this.userId = userId;
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
