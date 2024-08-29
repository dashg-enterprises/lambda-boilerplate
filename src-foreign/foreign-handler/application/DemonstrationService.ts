import { ExampleCreated } from "../../../src/command-handler/events/ExampleCreated";
import { DomainEventBroadcaster } from "../../../src/DDD/DomainEventBroadcaster";
import { DomainEventPublisher } from "../../../src/DDD/DomainEventPublisher";
import { Demonstration } from "../domain/Demonstration";
import { DemonstrationCreated } from "../events/DemonstrationCreated";
import { DemonstrationRepository } from "../infrastructure/DemonstrationRepository";

export interface IDemonstrationService {
    handle(exampleCreated: ExampleCreated): Promise<[DemonstrationCreated, object]>
}

export class DemonstrationService implements IDemonstrationService {
    private readonly repository: DemonstrationRepository;
    private readonly broadcaster: DomainEventBroadcaster;
    private readonly publisher: DomainEventPublisher;
    constructor(repository: DemonstrationRepository, broadcaster: DomainEventBroadcaster, publisher: DomainEventPublisher) {
        this.repository = repository;
        this.broadcaster = broadcaster;
        this.publisher = publisher;
    }

    async handle(exampleCreated: ExampleCreated): Promise<[DemonstrationCreated, object]> {
        const demonstration = new Demonstration(exampleCreated);
        // demonstration.handle(exampleCreated);
        const demonstrationCreated = demonstration.getEventLog().mostRecent<DemonstrationCreated>();
        await Promise.all([
            this.repository.save(demonstration),
            this.broadcaster.publish(demonstrationCreated),
            this.publisher.publish(demonstrationCreated)
        ]);
        return [demonstrationCreated, demonstration.toSnapshot()];
    }
}