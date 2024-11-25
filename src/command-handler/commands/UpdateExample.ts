import { DomainCommand } from "@dashg-enterprises/ddd-platform";

export class UpdateExample extends DomainCommand {
    name: string;
    constructor(exampleId: string, exampleName: string) {
        super("ExampleUpdated", "ExampleContext", "Example", exampleId);
        this.name = exampleName;
    }
}
