import { DomainEventPublisher } from '../../src/DDD/DomainEventPublisher';
import { EventBridgeClient } from '@aws-sdk/client-eventbridge';
import { SnapshotRepository } from '../../src/DDD/SnapshotRepository';
import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { DomainEventBroadcaster } from '../../src/DDD/DomainEventBroadcaster';
import { EventLogRepository } from '../../src/DDD/EventLogRepository';
import { DemonstrationRepository } from './infrastructure/DemonstrationRepository';
import { DemonstrationService } from './application/DemonstrationService';
import { DynamoDBDocumentClient } from '@aws-sdk/lib-dynamodb';

export class Host {

    get<T>(): T {
        const eventTopicArn = process.env.EVENT_TOPIC_ARN;
        const eventBusName = process.env.EVENT_BUS_NAME;
        const snapshotTableName = process.env.SNAPSHOT_TABLE_NAME;
        const eventLogTableName = process.env.EVENT_LOG_TABLE_NAME;

        const broadcaster = new DomainEventBroadcaster(eventTopicArn);
        const publisher = new DomainEventPublisher(new EventBridgeClient(), "Demonstration", eventBusName);
        const docDbClient = DynamoDBDocumentClient.from(new DynamoDBClient());
        const eventLogRepository = new EventLogRepository(docDbClient, eventLogTableName);
        const snapshotRepository = new SnapshotRepository(docDbClient, snapshotTableName);
        const demonstrationRepository = new DemonstrationRepository(eventLogRepository, snapshotRepository);
        const demonstrationService = new DemonstrationService(demonstrationRepository, broadcaster, publisher);

        return demonstrationService as T;
    }
}