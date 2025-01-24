import { CommandMetadata, DomainCommand, IDomainCommand } from "@dashg-enterprises/ddd-platform";

export class CreateExampleCommand {
    name: string;
    userId: string;
    constructor(name: string, userId: string){
        this.name = name;
        this.userId = userId;
    }
}

export class CreateExample extends DomainCommand<CreateExampleCommand> {
    static isTypeOf = (command: IDomainCommand): command is CreateExample => 
        command.metadata.type == CreateExample.metadata.type;

    static metadata = new CommandMetadata({
        type: "CreateExample",
        context: "ExampleContext",
        aggregate: "Example",
        aggregateId: ""
    });

    constructor(command: CreateExampleCommand) {
        super(command, CreateExample.metadata);
    }
}
