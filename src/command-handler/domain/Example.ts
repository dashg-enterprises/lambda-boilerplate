import { Aggregate, EventLog, IApplierMap, IHandlerMap, ISnapshot } from "@dashg-enterprises/ddd-platform";
import { CreateExample } from "../commands/CreateExample";
import { ExampleCreated, ExampleCreatedEvent } from "../events/ExampleCreated";
import { ExampleUpdated } from "../events/ExampleUpdated";
import { ExampleStatus } from "../contracts/ExampleStatus";
import { ExampleSnapshot } from "../contracts/ExampleSnapshot";

export class Example extends Aggregate {
    public readonly type = "Example";

    private static initialStatus: ExampleStatus = ExampleStatus.Active;

    private status?: ExampleStatus;
    private name?: string;
    private userId?: string;

    constructor(eventLog?: EventLog) {
        super(eventLog);
    }

    protected registerHandlers() {
        this.registerHandler(CreateExample.metadata.type, this.create.bind(this));
    }

    protected registerAppliers() {
        this.registerApplier(ExampleCreated.metadata.type, this.created.bind(this));
    }

    create(createExample: CreateExample) {
        if (!createExample.command.name || !createExample.command.userId) throw new Error("Name and userId are required for this example.");

        const exampleCreatedEvent = new ExampleCreatedEvent(
            this.id,
            createExample.command.userId,
            createExample.command.name,
            Example.initialStatus
        );
        const domainEvent = new ExampleCreated(exampleCreatedEvent, createExample);
        return domainEvent;
    }

    created(exampleCreated: ExampleCreated) {
        this.name = exampleCreated.event.name;
        this.userId = exampleCreated.event.userId;
        this.status = ExampleStatus[exampleCreated.event.status as keyof typeof ExampleStatus];
    }

    getName() {
        return this.name;
    }
    getStatus() {
        return this.status;
    }
    getUserId() {
        return this.userId;
    }

    toSnapshot(): ExampleSnapshot {
        const { id, name, status, userId } = this;
        return new ExampleSnapshot({ id, name, status, userId });
    }
}