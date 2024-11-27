import { CommandMetadata, DomainCommand } from "@dashg-enterprises/ddd-platform";

export class CreateExampleCommand {
    name: string;
    constructor(name: string){
        this.name = name;
    }
}

export class CreateExample extends DomainCommand<CreateExampleCommand> {
    constructor(command: CreateExampleCommand) {
        const metadata = new CommandMetadata({type: "ExampleCreated", context: "ExampleContext", aggregate: "Example", aggregateId: ""});
        super(command, metadata);
    }
}
