import { DomainEventBroadcaster, DomainEventPublisher } from "@dashg-enterprises/ddd-platform";
import { CreateExample } from "../commands/CreateExample";
import { Example } from "../domain/Example";
import { ExampleCreated } from "../events/ExampleCreated";
import { ExampleRepository } from "../infrastructure/ExampleRepository";

export interface IExampleService {
    createExample(command: CreateExample): Promise<[ExampleCreated, object]>;
}

export class ExampleService implements IExampleService {
    private readonly repository: ExampleRepository;
    private readonly broadcaster: DomainEventBroadcaster;
    private readonly publisher: DomainEventPublisher;
    constructor(repository: ExampleRepository, broadcaster: DomainEventBroadcaster, publisher: DomainEventPublisher) {
        this.repository = repository;
        this.broadcaster = broadcaster;
        this.publisher = publisher;
    }

    async createExample(command: CreateExample): Promise<[ExampleCreated, object]> {
        const example = new Example();
        example.handle(command);
        const exampleCreated = example.getEventLog().mostRecent<ExampleCreated>();
        await Promise.all([
            this.repository.save(example),
            this.broadcaster.publish(exampleCreated),
            this.publisher.publish(exampleCreated)
        ]);
        return [exampleCreated, example.toSnapshot()];
    }
}