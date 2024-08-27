import { Aggregate } from "../../../src/DDD/Aggregate";
import { IDomainEvent } from "../../../src/DDD/DomainEvent";
import { EventLog } from "../../../src/DDD/EventLog";
import { DemonstrationCreated } from "../events/DemonstrationCreated";
import { DemonstrationUpdated } from "../events/DemonstrationUpdated";
import { ExampleCreated } from "../../../src/command-handler/events/ExampleCreated";
import { Example } from "./Example";

export class Demonstration extends Aggregate {
    private name?: string;
    private example?: Example;
    constructor(exampleCreated: ExampleCreated, eventLog?: EventLog) {
        if (eventLog) {
            super(eventLog);
            (eventLog.domainEvents as DemonstrationCreated[]).map(this.apply);
        } else {
            super();
            this.handle(exampleCreated);
        }
    }

    handle(exampleCreated: ExampleCreated) {
        const example = {
            id: exampleCreated.aggregateId,
            name: exampleCreated.name
        }
        const sequenceId = this.eventLog.nextSequenceId();
        const initialName = `${exampleCreated.name} demonstration`
        const demonstrationCreated = new DemonstrationCreated(sequenceId.toString(), exampleCreated.correlationId, this.id, initialName, example);

        this.apply(demonstrationCreated);
        return this;
    }

    private apply(demonstrationCreated: DemonstrationCreated) {
        this.id = demonstrationCreated.aggregateId;
        this.name = demonstrationCreated.name;
        this.example = demonstrationCreated.example;
        this.eventLog.append(demonstrationCreated);
        return this;
    }
}