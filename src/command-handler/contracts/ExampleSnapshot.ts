import { ExampleStatus } from "./ExampleStatus";

export class ExampleSnapshot {
    id: string;
    name?: string;
    userId?: string;
    status?: ExampleStatus;
    constructor(poco: ExampleSnapshot) {
        this.id = poco.id;
        this.name = poco.name;
        this.userId = poco.userId;
        this.status = poco.status;
    }
}