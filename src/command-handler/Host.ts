import { DomainEventPublisher } from '../DDD/DomainEventPublisher';
import { EventBridgeClient } from '@aws-sdk/client-eventbridge';
import { SnapshotRepository } from '../DDD/SnapshotRepository';
import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { DomainEventBroadcaster } from '../DDD/DomainEventBroadcaster';
import { EventLogRepository } from '../DDD/EventLogRepository';
import { ExampleRepository } from './infrastructure/ExampleRepository';
import { ExampleService } from './application/ExampleService';

export class Host {

    get<T>(): T {
        const eventTopicArn = process.env.EVENT_TOPIC_ARN;
        const eventBusName = process.env.EVENT_BUS_NAME;
        const snapshotTableName = process.env.SNAPSHOT_TABLE_NAME;
        const eventLogTableName = process.env.EVENT_LOG_TABLE_NAME;

        const broadcaster = new DomainEventBroadcaster(eventTopicArn);
        const publisher = new DomainEventPublisher(new EventBridgeClient(), "Example", eventBusName);
        const eventLogRepository = new EventLogRepository(new DynamoDBClient(), eventLogTableName);
        const snapshotRepository = new SnapshotRepository(new DynamoDBClient(), snapshotTableName);
        const exampleRepository = new ExampleRepository(eventLogRepository, snapshotRepository);
        const exampleService = new ExampleService(exampleRepository, broadcaster, publisher);

        return exampleService as T;
    }
}