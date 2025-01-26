import { Aggregate, EventLog, IApplierMap, IHandlerMap, ISnapshot } from "@dashg-enterprises/ddd-platform";
import { CreateExample } from "../commands/CreateExample";
import { ExampleCreated, ExampleCreatedEvent } from "../events/ExampleCreated";
import { ExampleUpdated } from "../events/ExampleUpdated";
import { ExampleStatus } from "../contracts/ExampleStatus";
import { ExampleSnapshot } from "../contracts/ExampleSnapshot";

export class Example extends Aggregate {
    public readonly type = "Example";

    private static _initialStatus: ExampleStatus = ExampleStatus.Active;

    private _status?: ExampleStatus;
    private _name?: string;
    private _userId?: string;

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
            Example._initialStatus
        );
        const domainEvent = new ExampleCreated(exampleCreatedEvent, createExample);
        return domainEvent;
    }

    created(exampleCreated: ExampleCreated) {
        this._name = exampleCreated.event.name;
        this._userId = exampleCreated.event.userId;
        this._status = ExampleStatus[exampleCreated.event.status as keyof typeof ExampleStatus];
    }

    getName() {
        return this._name;
    }
    getStatus() {
        return this._status;
    }
    getUserId() {
        return this._userId;
    }

    toSnapshot(): ExampleSnapshot {
        const { _name, _status, _userId } = this;
        return { 
            name: _name,
            status: _status,
            userId: _userId
        };
    }
}