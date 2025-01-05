import { CommandMetadata, DomainCommand, IDomainCommand } from "@dashg-enterprises/ddd-platform";

export class ScheduleExampleCommand {
    nextRunInSeconds: number; 
    name: string;
    constructor(nextRunInSeconds: number, name: string){
        this.nextRunInSeconds = nextRunInSeconds;
        this.name = name;
    }
}

export class ScheduleExample extends DomainCommand<ScheduleExampleCommand> {
    static isTypeOf = (command: IDomainCommand): command is ScheduleExample => {
        return command.metadata.type == ScheduleExample.metadata.type;
    }

    static metadata = new CommandMetadata({
        type: "ScheduleExample",
        context: "ExampleContext",
        aggregate: "Example",
        aggregateId: ""
    });

    constructor(command: ScheduleExampleCommand) {
        super(command, ScheduleExample.metadata);
    }
}
