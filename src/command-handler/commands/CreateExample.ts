import { CommandMetadata, DomainCommand, IDomainCommand } from "@dashg-enterprises/ddd-platform";

export class CreateExampleCommand {
    name: string;
    constructor(name: string){
        this.name = name;
    }
}

export class CreateExample extends DomainCommand<CreateExampleCommand> {
    static isTypeOf = (command: IDomainCommand): command is CreateExample => {
        console.log("uh-oh here we go");
        console.log(command);
        console.log("static metadata");
        console.log(CreateExample.metadata);
        return command.metadata.type == CreateExample.metadata.type;
    }

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
