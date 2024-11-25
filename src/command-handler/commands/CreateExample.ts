import { DomainCommand } from "@dashg-enterprises/ddd-platform";

export class CreateExample extends DomainCommand {
    name: string;
    constructor(exampleId: string, exampleName: string) {
        super("ExampleCreated", "ExampleContext", "Example", exampleId);
        this.name = exampleName;
    }
}
